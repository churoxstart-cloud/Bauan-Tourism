/* Bauan Tourism Portal - shared polish for every signed-in page.
   Adds icons to the menu, a consistent page header, form cards, empty states, room tiles and a photo preview.
   It only rearranges what is already on the page; every form still posts exactly the same fields. */
(function () {
  "use strict";
  var main = document.querySelector(".main-content");
  if (!main) return;

  var ICONS = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8a5 5 0 0 1 0 8"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
    bed: '<path d="M3 18V7M3 13h18v5M21 18v-3a3 3 0 0 0-3-3H10v1"/><circle cx="7" cy="11" r="1.6"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.2v.1"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.3 2.2 3.8 5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    logout: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.box) + "</svg>";
  }

  /* ---------- 1. menu icons (by link address, so it works for every role) ---------- */
  var MENU = [
    [/\/dashboard\/?$/, "home"], [/\/profile\/?$/, "user"], [/daily-log\/?$|daily_log/, "calendar"], [/\/import\//, "upload"],
    [/monthly-report|monthly_sheet/, "printer"], [/\/resort\/attractions|admin-panel\/attractions|attractions\/add/, "pin"],
    [/programs/, "megaphone"], [/my-resort/, "building"], [/\/rooms/, "bed"], [/recycle-bin/, "trash"],
    [/annual-summary/, "chart"], [/contact/, "inbox"], [/destinations/, "compass"], [/bot-questions/, "help"],
    [/admin-panel\/users|manage-users|\/users\//, "users"], [/gallery/, "image"], [/activity-log/, "list"],
    [/admin-panel\/resorts/, "star"], [/password-requests|password/, "key"], [/logout/, "logout"]
  ];
  document.querySelectorAll(".sidebar a.sidebar-link").forEach(function (a) {
    if (a.querySelector(".ui-ico")) return;
    var path = a.getAttribute("href") || "", icon = "box";
    for (var i = 0; i < MENU.length; i++) { if (MENU[i][0].test(path)) { icon = MENU[i][1]; break; } }
    a.insertAdjacentHTML("afterbegin", svg(icon, "ui-ico"));
  });

  /* pages that already have their own designed header are left alone */
  var wrap = main.querySelector(":scope > .container, :scope > .container-fluid");
  if (!wrap || wrap.querySelector(".dash, .rb-hero, .ui-head")) { finishRooms(); return; }

  /* ---------- 2. page header ---------- */
  var roleText = "";
  var who = document.querySelector(".sidebar-user span");
  if (who) { var parts = who.textContent.split("·"); roleText = (parts[1] || "").trim(); }
  var heading = null;
  for (var c = wrap.firstElementChild; c; c = c.nextElementSibling) {
    if (/^H[1-6]$/.test(c.tagName)) { heading = c; break; }
    var inner = c.querySelector && c.querySelector(":scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5");
    if (inner && c.children.length <= 3 && !c.querySelector("form, table, input")) { heading = inner; break; }
    if (c.tagName === "STYLE" || c.tagName === "SCRIPT") continue;
    if (c.matches && c.matches(".alert, .messages")) continue;
    break;
  }
  if (heading) {
    var holder = heading.parentElement === wrap ? null : heading.parentElement;     // e.g. .at-head with buttons
    var head = document.createElement("div"); head.className = "ui-head";
    var left = document.createElement("div"); left.className = "ui-head-main";
    if (roleText) left.innerHTML = '<div class="ui-eyebrow">' + roleText.replace(/[<>&]/g, "") + "</div>";
    var anchor = holder || heading;
    anchor.parentElement.insertBefore(head, anchor);
    head.appendChild(left);
    left.appendChild(heading);
    var sub = (holder || head).nextElementSibling;
    if (!holder && sub && sub.tagName === "P" && (sub.classList.contains("text-muted") || sub.classList.contains("small"))) left.appendChild(sub);
    if (holder) {            // keep the page's own buttons on the right
      var acts = document.createElement("div"); acts.className = "ui-head-actions";
      while (holder.firstChild) {
        var k = holder.firstChild;
        // text (description, badges) stays under the title; buttons and links go to the right
        var isText = k.nodeType === 1 && (k.tagName === "P" || k.tagName === "SPAN" || (k.tagName === "DIV" && !k.querySelector("a, button, form")));
        if (isText) { k.classList.add("ui-sub"); left.appendChild(k); }
        else if (k.nodeType === 1 && k.querySelector && k.querySelector("h1, h2, h3, h4, h5")) left.appendChild(k);
        else acts.appendChild(k);
      }
      if (acts.textContent.trim() || acts.children.length) head.appendChild(acts);
      holder.remove();
    }
  }

  /* ---------- 3. plain forms become cards ---------- */
  wrap.querySelectorAll("form").forEach(function (f) {
    if (f.closest(".card, .ui-card, table, .list-group, .im-wrap, .at-card, .dl-chips, .rb-hero") || f.querySelector("table")) return;
    var fields = f.querySelectorAll(".form-control, .form-select, textarea").length;
    if (fields < 3) return;
    f.classList.add("ui-card", "ui-form-card");
  });

  /* ---------- 4. empty states ---------- */
  var EMPTY = /^(no |wala pang|nothing |there are no|walang )/i;
  wrap.querySelectorAll(".list-group-item.text-muted, .at-empty, .empty, td[colspan]").forEach(function (el) {
    var t = el.textContent.trim();
    if (!EMPTY.test(t) || el.querySelector("form, a.btn, button")) return;
    if (el.tagName === "TD") { el.style.padding = "28px"; el.style.textAlign = "center"; el.style.color = "var(--ui-muted)"; return; }
    if (el.parentElement && el.parentElement.children.length > 1) return;
    el.classList.add("ui-empty");
    el.innerHTML = '<span class="ui-empty-ico">' + svg(/room/i.test(t) ? "bed" : /program/i.test(t) ? "megaphone" : /attraction/i.test(t) ? "pin" : "box") + "</span><span>" + el.innerHTML + "</span>";
  });

  /* ---------- 5. page specials ---------- */
  var path = location.pathname;

  // Programs (resort view): date chip
  if (/\/resort\/programs/.test(path)) {
    var lg = wrap.querySelector(".list-group");
    if (lg) {
      lg.classList.add("ui-programs");
      lg.querySelectorAll(".list-group-item p").forEach(function (p) {
        if (/^Posted /.test(p.textContent.trim())) { p.classList.add("ui-date"); p.classList.remove("text-muted", "mb-0"); p.insertAdjacentHTML("afterbegin", svg("calendar")); p.querySelector("svg").style.cssText = "width:13px;height:13px"; }
      });
    }
  }

  // My Resort / resort forms: two columns + live photo preview
  if (/my-resort|admin-panel\/resorts\/(add|\d+\/edit)/.test(path)) {
    var form = wrap.querySelector("form.ui-form-card") || wrap.querySelector("form");
    if (form) {
      form.classList.add("ui-card", "ui-form-card");
      var groups = Array.prototype.filter.call(form.children, function (el) { return el.tagName === "DIV" && el.querySelector("input, textarea, select"); });
      if (groups.length >= 4 && !form.querySelector(".row")) {
        var grid = document.createElement("div"); grid.className = "ui-grid-2";
        groups[0].parentElement.insertBefore(grid, groups[0]);
        groups.forEach(function (g) {
          if (g.querySelector("textarea") || /photo|url|description|address/i.test(g.textContent.slice(0, 40))) g.classList.add("ui-wide");
          grid.appendChild(g);
        });
      }
      var photo = form.querySelector('input[name="photo_url"]');
      if (photo) {
        var box = document.createElement("div"); box.className = "ui-photo-preview";
        photo.parentElement.appendChild(box);
        var show = function () {
          var u = photo.value.trim();
          box.classList.remove("bad");
          if (!u) { box.textContent = "Photo preview appears here"; return; }
          if (!/^https?:\/\//i.test(u)) { box.classList.add("bad"); box.textContent = "The link should start with https://"; return; }
          var img = new Image(); img.alt = "Photo preview"; img.referrerPolicy = "no-referrer";
          img.onload = function () { box.innerHTML = ""; box.appendChild(img); };
          img.onerror = function () { box.classList.add("bad"); box.textContent = "This link is not a picture, or it can't be shown. Copy the image address itself (right-click the photo, Copy image address)."; };
          img.src = u;
        };
        var timer; photo.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(show, 400); });
        show();
      }
    }
  }

  finishRooms();

  /* Manage Rooms (resort): labelled add form + room tiles */
  function finishRooms() {
    if (!/\/resort\/rooms/.test(location.pathname)) return;
    var w = main.querySelector(":scope > .container, :scope > .container-fluid") || main;
    var num = w.querySelector('form input[name="room_number"]');
    if (num && !num.closest(".ui-room-add")) {
      var f = num.form, cap = f.querySelector('input[name="capacity"]'), btn = f.querySelector('button[type="submit"]');
      var card = document.createElement("div"); card.className = "ui-card";
      card.innerHTML = '<div class="ui-card-title">' + svg("plus") + "Add a room</div>";
      f.parentElement.insertBefore(card, f); card.appendChild(f);
      f.classList.add("ui-room-add"); f.classList.remove("d-flex", "gap-2", "mb-4"); f.removeAttribute("style");
      var field = function (input, label, hint) {
        var d = document.createElement("div"); d.className = "ui-field";
        if (!input.id) input.id = "ui_" + input.name;
        d.innerHTML = '<label for="' + input.id + '">' + label + "</label>";
        input.parentElement.insertBefore(d, input); d.appendChild(input);
        if (hint && !input.placeholder) input.placeholder = hint;
      };
      field(num, "Room number", "e.g. 101");
      if (cap) field(cap, "Capacity (guests)", "e.g. 2");
      if (btn) { btn.classList.remove("btn-sm"); btn.textContent = "Add room"; }
    }
    w.querySelectorAll("ul.list-group").forEach(function (ul) {
      ul.classList.add("ui-room-grid"); ul.removeAttribute("style");
      var h = ul.previousElementSibling;
      var n = ul.querySelectorAll(":scope > li:not(.ui-empty):not(.text-muted:only-child)").length;
      if (h && /^H[4-6]$/.test(h.tagName) && !h.querySelector(".ui-count")) {
        h.classList.add("ui-section-title"); h.insertAdjacentHTML("beforeend", ' <span class="ui-count">' + n + "</span>");
      }
      ul.querySelectorAll(":scope > li").forEach(function (li) {
        if (li.classList.contains("ui-empty") || li.querySelector(".ui-room-no")) return;
        var first = li.firstChild;
        if (!first || first.nodeType !== 3 || !first.textContent.trim()) return;
        var no = document.createElement("span"); no.className = "ui-room-no";
        no.innerHTML = svg("bed"); no.appendChild(document.createTextNode(first.textContent.trim()));
        li.replaceChild(no, first);
        var cap = li.querySelector(":scope > span.text-muted");
        if (cap) { cap.classList.add("ui-room-cap"); var m = cap.textContent.match(/\d+/); if (m) cap.textContent = "Up to " + m[0] + (m[0] === "1" ? " guest" : " guests"); }
        var forms = li.querySelectorAll(":scope > form");
        if (forms.length) {
          var act = document.createElement("div"); act.className = "ui-room-act";
          forms.forEach(function (fm) { act.appendChild(fm); });
          li.appendChild(act);
        }
      });
    });
  }
})();
