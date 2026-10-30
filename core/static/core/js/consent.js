// Terms gate + "Confirm your location" flow for the public home page.
// Order: Terms (once per terms version) -> Confirm location (once per browser session) -> cookie banner.
(function () {
    'use strict';

    const TERMS_KEY = 'bauanTermsAccepted';
    const TERMS_VERSION = '2026-10';          // bump this when _terms_content.html changes
    const LOC_KEY = 'bauanLocation';          // sessionStorage: { lat, lon, acc, ts }
    const LOC_DECLINED_KEY = 'bauanLocationDeclined';

    const TEXT = {
        en: {
            detecting: 'Finding your location…',
            confirmed: '📍 Location confirmed. Directions will start from where you are.',
            accuracy: 'Accuracy: about {m} m',
            denied: 'Location permission is blocked. Allow it in your browser’s site settings (the lock icon near the address bar), then try again.',
            timeout: 'Finding your location took too long. Please move to a spot with better signal and try again.',
            unavailable: 'We could not find your location right now. Please try again.',
            unsupported: 'Your browser does not support location.',
            insecure: 'Location only works on a secure (HTTPS) connection.',
            close: 'Close',
            tryAgain: 'Try again'
        },
        tl: {
            detecting: 'Hinahanap ang iyong lokasyon…',
            confirmed: '📍 Nakumpirma na ang lokasyon. Magsisimula ang direksyon kung nasaan ka.',
            accuracy: 'Katumpakan: mga {m} m',
            denied: 'Naka-block ang pahintulot sa lokasyon. Payagan ito sa site settings ng browser (lock icon sa tabi ng address bar), saka subukan ulit.',
            timeout: 'Natagalan ang paghahanap ng lokasyon. Pumunta sa lugar na may mas malakas na signal at subukan ulit.',
            unavailable: 'Hindi mahanap ang lokasyon mo ngayon. Pakisubukan ulit.',
            unsupported: 'Hindi sinusuportahan ng browser mo ang lokasyon.',
            insecure: 'Gumagana lang ang lokasyon sa secure (HTTPS) na koneksyon.',
            close: 'Isara',
            tryAgain: 'Subukan ulit'
        }
    };

    const byId = (id) => document.getElementById(id);
    function lang() { const sel = byId('langToggle'); return sel && TEXT[sel.value] ? sel.value : 'en'; }
    function t(key) { return TEXT[lang()][key]; }

    function read(store, key) { try { return store.getItem(key); } catch (e) { return null; } }
    function write(store, key, val) { try { store.setItem(key, val); } catch (e) { /* private mode etc. */ } }

    // ---------- shared modal helpers ----------
    function lock(on) { document.documentElement.classList.toggle('consent-lock', on); }

    function trapTab(overlay) {
        overlay.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const items = overlay.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
            const visible = Array.from(items).filter(el => el.offsetParent !== null);
            if (!visible.length) return;
            const first = visible[0], last = visible[visible.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    }

    let toastTimer = null;
    function toast(message) {
        const el = byId('consentToast');
        if (!el) return;
        el.textContent = message;
        el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
    }

    // ---------- 1. TERMS ----------
    function termsAccepted() {
        try {
            const v = JSON.parse(read(localStorage, TERMS_KEY) || 'null');
            return !!v && v.version === TERMS_VERSION;
        } catch (e) { return false; }
    }

    function openTerms(done) {
        const overlay = byId('termsModal'), box = byId('termsAgreeBox'), btn = byId('termsAgreeBtn');
        if (!overlay || !box || !btn) { done(); return; }
        overlay.hidden = false;
        lock(true);
        box.checked = false;
        btn.disabled = true;
        setTimeout(() => box.focus(), 50);

        box.onchange = () => { btn.disabled = !box.checked; };
        btn.onclick = () => {
            if (!box.checked) return;
            write(localStorage, TERMS_KEY, JSON.stringify({ version: TERMS_VERSION, at: new Date().toISOString() }));
            overlay.hidden = true;
            lock(false);
            done();
        };
    }

    // ---------- 2. LOCATION ----------
    function getLocation() {
        try {
            const v = JSON.parse(read(sessionStorage, LOC_KEY) || 'null');
            if (v && typeof v.lat === 'number' && typeof v.lon === 'number') return v;
        } catch (e) { /* ignore */ }
        return null;
    }

    let locResolve = null;
    let pending = null;

    function showStep(step) {
        ['ask', 'detecting', 'confirm', 'error'].forEach(s => {
            const el = byId('locStep-' + s);
            if (el) el.hidden = (s !== step);
        });
        const icon = byId('locIcon');
        if (icon) icon.classList.toggle('pulse', step === 'detecting');

        const buttons = {
            ask: ['locNotNowBtn', 'locAllowBtn'],
            detecting: [],
            confirm: ['locAgainBtn', 'locYesBtn'],
            error: ['locCloseBtn', 'locRetryBtn']
        };
        ['locNotNowBtn', 'locAllowBtn', 'locAgainBtn', 'locYesBtn', 'locCloseBtn', 'locRetryBtn'].forEach(id => {
            const el = byId(id);
            if (el) el.hidden = !buttons[step].includes(id);
        });
    }

    function closeLocation(result) {
        const overlay = byId('locationModal');
        if (overlay) overlay.hidden = true;
        lock(false);
        const resolve = locResolve;
        locResolve = null;
        if (resolve) resolve(result);
    }

    function showLocError(kind) {
        const msg = byId('locErrorText');
        if (msg) msg.textContent = t(kind);
        showStep('error');
        const retry = byId('locRetryBtn');
        if (retry) retry.hidden = (kind === 'unsupported' || kind === 'insecure');
        const focusEl = (retry && !retry.hidden) ? retry : byId('locCloseBtn');
        if (focusEl) focusEl.focus();
    }

    function detect() {
        if (!('geolocation' in navigator)) { showLocError('unsupported'); return; }
        if (!window.isSecureContext) { showLocError('insecure'); return; }
        const status = byId('locDetectingText');
        if (status) status.textContent = t('detecting');
        showStep('detecting');

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                pending = { lat: pos.coords.latitude, lon: pos.coords.longitude, acc: Math.round(pos.coords.accuracy || 0), ts: Date.now() };
                const map = byId('locMap');
                if (map) map.src = `https://www.google.com/maps?q=${pending.lat},${pending.lon}&z=16&output=embed`;
                const coords = byId('locCoords');
                if (coords) {
                    coords.textContent = `${pending.lat.toFixed(5)}, ${pending.lon.toFixed(5)}` +
                        (pending.acc ? ' · ' + t('accuracy').replace('{m}', pending.acc) : '');
                }
                showStep('confirm');
                const yes = byId('locYesBtn');
                if (yes) yes.focus();
            },
            (err) => showLocError(err.code === 1 ? 'denied' : err.code === 3 ? 'timeout' : 'unavailable'),
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
        );
    }

    function wireLocationButtons() {
        const overlay = byId('locationModal');
        if (!overlay || overlay.dataset.wired) return;
        overlay.dataset.wired = '1';
        trapTab(overlay);

        const on = (id, fn) => { const el = byId(id); if (el) el.addEventListener('click', fn); };
        on('locNotNowBtn', () => { write(sessionStorage, LOC_DECLINED_KEY, '1'); closeLocation(null); });
        on('locAllowBtn', detect);
        on('locRetryBtn', detect);
        on('locCloseBtn', () => { write(sessionStorage, LOC_DECLINED_KEY, '1'); closeLocation(null); });
        on('locAgainBtn', detect);
        on('locYesBtn', () => {
            if (!pending) return;
            write(sessionStorage, LOC_KEY, JSON.stringify(pending));
            const confirmed = pending;
            pending = null;
            closeLocation(confirmed);
            toast(t('confirmed'));
        });
    }

    // Resolves with {lat, lon, acc, ts} once the visitor confirms, or null if they decline.
    function requestLocation(options) {
        const existing = getLocation();
        if (existing && !(options && options.force)) return Promise.resolve(existing);

        const overlay = byId('locationModal');
        if (!overlay) return Promise.resolve(null);
        wireLocationButtons();

        if (locResolve) { const prev = locResolve; locResolve = null; prev(null); }
        return new Promise((resolve) => {
            locResolve = resolve;
            pending = null;
            showStep('ask');
            overlay.hidden = false;
            lock(true);
            setTimeout(() => { const b = byId('locAllowBtn'); if (b) b.focus(); }, 50);
        });
    }

    // ---------- 3. COOKIE BANNER (after the two dialogs) ----------
    function showCookieBannerIfNeeded() {
        const banner = byId('cookieConsentBanner');
        if (!banner) return;
        let answered = null;
        try { answered = localStorage.getItem('bauanCookieConsent'); } catch (e) { /* ignore */ }
        if (!answered) banner.style.display = 'flex';
    }

    // ---------- start ----------
    function afterTerms() {
        const needsPrompt = !getLocation() && !read(sessionStorage, LOC_DECLINED_KEY);
        if (!needsPrompt) { showCookieBannerIfNeeded(); return; }
        setTimeout(() => {
            requestLocation().then(() => showCookieBannerIfNeeded());
        }, 500);
    }

    window.BauanConsent = { termsAccepted, getLocation, requestLocation };

    document.addEventListener('DOMContentLoaded', () => {
        const termsOverlay = byId('termsModal');
        if (termsOverlay) trapTab(termsOverlay);
        if (termsAccepted()) afterTerms(); else openTerms(afterTerms);
    });
})();
