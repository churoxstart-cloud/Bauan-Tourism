"""Tourist Bot, FREE version: no API key, no cost.

A rule-based chat engine that:
- understands English, Tagalog and Taglish by keywords and phrases,
- remembers the whole conversation (days, group, interests, budget style),
- answers from your database (resorts, attractions, MTO programs),
- never invents prices, hours, phone numbers or availability,
- handles off-topic questions by saying so honestly and pivoting to Bauan.

Public function: reply(messages, page_lang, resorts, programs, distance_km, destinations, meta) -> (text, chips)
  messages   = [{"role": "user"|"assistant", "content": str}, ...] (last one is the user's)
  resorts    = [{"name","barangay","address","rooms","contact","attractions":[{"name","type"}]}]
  programs   = [{"title","description"}]
  distance_km = float or None (straight-line distance from the visitor to Bauan town)
  destinations = MTO-curated places [{"name","category","description","description_tl","best_time","entrance_fee",
                 "opening_hours","tips","activities":[...],"good_for":[...]}]   (optional)
  meta       = optional dict the bot fills in: meta["unanswered"] = reason string when it could not really
               answer (so the site can log it for the MTO), meta["focus"] = destination name when the reply
               is about one specific place
"""
import random
import re
import unicodedata

CONTACT_EMAIL = "info@discoverbauan.ph"   # same email shown in the site footer

# ---------------------------------------------------------------- text helpers

def _norm(text):
    text = unicodedata.normalize("NFKD", (text or "").lower())
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return " " + re.sub(r"\s+", " ", text).strip() + " "


def _has(text, pattern):
    return re.search(r"\b(?:%s)\b" % pattern, text) is not None


TAGALOG_WORDS = set(
    "po opo ako kami kayo tayo natin namin ano anong saan paano magkano gusto pwede puwede ba mo ko na naman lang "
    "salamat kumusta kamusta mga para yung ang may meron dito doon pumunta kain tulong sige oo hindi barkada pamilya "
    "sino bakit kailan mag niyo nyo ito iyan yan nito kasi pero tapos din rin ilan ilang araw gabi umaga hapon "
    "magandang maganda puntahan pasyalan matutuluyan tutuluyan mura tipid isang dalawang tatlong ng sa dagdagan gawing gawan "
    "ayusin kung ay si ni kay nga ito iyon".split()
)

NUMBER_WORDS = {
    "isa": 1, "dalawa": 2, "tatlo": 3, "apat": 4, "lima": 5, "anim": 6, "pito": 7, "walo": 8, "siyam": 9, "sampu": 10,
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "isang": 1, "dalawang": 2, "tatlong": 3,
}

OTHER_PLACES = (
    "palawan|el nido|coron|boracay|cebu|bohol|siargao|baguio|davao|manila|makati|tagaytay|vigan|ilocos|sagada|subic|"
    "zambales|laguna|pampanga|cavite|japan|tokyo|korea|seoul|singapore|thailand|bangkok|vietnam|bali|hong kong|"
    "hongkong|paris|london|usa|america|dubai|taiwan|china|hawaii"
)
OFFTOPIC_TOPICS = (
    "python|javascript|html|css|coding|homework|assignment|essay|math|equation|president|election|politics|"
    "senator|stocks?|crypto|bitcoin|recipe|lyrics|movie|netflix|basketball|nba|girlfriend|boyfriend|diagnosis|"
    "gamot|lawyer|translate|poem|tula"
)
BAUAN_WORDS = "bauan|batangas|sampaguita|lomi|anilao|mabini"


def _lang_of(text, page_lang):
    words = set(text.split())
    if words & TAGALOG_WORDS:
        return "tl"
    if len(words) <= 2:      # too short to tell: keep the page language
        return page_lang if page_lang in ("en", "tl") else "en"
    return "en"


# ---------------------------------------------------------------- slots (memory)

def _slots(user_texts):
    """What we learned about the trip from everything the visitor said so far (latest mention wins)."""
    s = {"days": None, "size": None, "group": None, "interest": None, "budget": None}
    for t in user_texts:
        m = re.search(r"\b(\d+)\s*(?:days?|araw|d)\b", t)
        w = re.search(r"\b(one|two|three|isang|dalawang|tatlong)\s+(?:days?|araw)\b", t)
        if m:
            s["days"] = min(int(m.group(1)), 3)
        elif w:
            s["days"] = NUMBER_WORDS[w.group(1)]
        elif _has(t, "weekend|overnight|2d1n"):
            s["days"] = 2
        elif _has(t, "day trip|isang araw|one day"):
            s["days"] = 1

        m = (re.search(r"\b(\d+)\s*(?:pax|people|persons|katao|tao|of us|kami)\b", t)
             or re.search(r"\bkami\s+(?:ay\s+)?(\d+)\b", t))
        w = re.search(r"\b(isa|dalawa|tatlo|apat|lima|anim|pito|walo|siyam|sampu)\s+kami\b", t)
        if m:
            s["size"] = int(m.group(1))
        elif w:
            s["size"] = NUMBER_WORDS[w.group(1)]

        if _has(t, "family|pamilya|kids|bata|anak|toddler|parents|magulang"):
            s["group"] = "family"
        elif _has(t, "barkada|friends|kaibigan|tropa|group|team|office|company|batchmates|classmates"):
            s["group"] = "friends"
        elif _has(t, "couple|honeymoon|jowa|partner|asawa|date|anniversary"):
            s["group"] = "couple"
        elif _has(t, "solo|mag isa|alone"):
            s["group"] = "solo"

        if _has(t, "dive|diving|scuba|snorkel|snorkeling|coral|underwater"):
            s["interest"] = "diving"
        elif _has(t, "beach|swim|swimming|langoy|dalampasigan|sunset|island hopping"):
            s["interest"] = "beach"
        elif _has(t, "food|kain|lomi|seafood|foodie|eat|eating"):
            s["interest"] = "food"
        elif _has(t, "church|simbahan|history|heritage|museum|kasaysayan|culture|kultura"):
            s["interest"] = "culture"
        elif _has(t, "relax|chill|pahinga|rest|peaceful|tahimik"):
            s["interest"] = "relax"

        if _has(t, "cheap|mura|budget|tipid|affordable|mababa"):
            s["budget"] = "budget"
        elif _has(t, "luxury|premium|mamahalin|fancy"):
            s["budget"] = "premium"
    return s


def _asked_about(last_bot):
    """What the bot's last message was asking, so a bare answer like '2' makes sense."""
    if not last_bot or "?" not in last_bot:
        return None
    q = _norm(last_bot.split("?")[0].split("\n")[-1] if "\n" in last_bot.split("?")[0] else last_bot.split("?")[0])
    tail = _norm(last_bot)
    if _has(tail, "ilang araw|how many days|gaano katagal|how long"):
        return "days"
    if _has(tail, "ilan kayo|how many (?:of you|people)|sino ang kasama|who(?:s| is) coming"):
        return "group"
    if _has(tail, "beach|diving|food|kultura|culture|ano ang gusto|what do you (?:want|enjoy)|trip ang"):
        return "interest"
    return "other"


# ---------------------------------------------------------------- intents

INTENTS = [
    ("emergency", r"emergency|saklolo|nalulunod|nalunod|aksidente|accident|nasusunog|sunog|drowning|ambulance|pulis|police"),
    ("whoareyou", r"who are you|sino ka|what are you|ano ka|your name|pangalan mo|are you (?:a )?(?:bot|ai|human|real|robot)|robot ka|tao ka"),
    ("help", r"help|tulong|what can you do|ano kaya mo|ano magagawa|paano ka gamitin|how do(?: i)? use you"),
    ("plan", r"plan|itinerary|schedule|gawan mo|gawa ka|ayusin mo|trip plan|[123] ?day|weekend|day trip|overnight"),
    ("near_me", r"near me|nearby|malapit sa akin|malapit sa kin|where am i|nasaan ako|malapit sa amin"),
    ("getting_there", r"how to get|paano pumunta|paano makarating|commute|byahe|biyahe|bus|jeep|jeepney|direction|directions|route|ruta|sakay|layo|how far|distance|from manila|galing manila|get there|pumunta doon"),
    ("booking", r"book|booking|reserve|reservation|availability|available|bakante|vacant|mag book"),
    ("budget", r"price|prices|rate|rates|magkano|cost|how much|presyo|bayad|entrance fee|fee|budget|cheap|mura|affordable|tipid"),
    ("contact", r"contact|phone|number|call|tawag|email|mto|tourism office|text"),
    ("programs", r"event|events|festival|program|programs|announcement|announcements|balita|news|upcoming|ano ang bago"),
    ("best_time", r"best time|when to|when should|kailan|anong buwan|season|dry season|rainy|tag ulan|tag init|peak"),
    ("weather", r"weather|panahon|ulan|rain|typhoon|bagyo|hot|mainit"),
    ("safety", r"safe|safety|ligtas|crime|delikado|danger|elderly|senior|pwd|wheelchair"),
    ("lodging", r"stay|hotel|room|rooms|resort|resorts|tutuluyan|matutuluyan|mag stay|accommodation|accommodations|cottage|kwarto|saan matutulog|where to sleep"),
    ("food", r"eat|food|kain|lomi|restaurant|kainan|pagkain|seafood|gutom|hungry|lunch|dinner|breakfast|almusal"),
    ("diving", r"dive|diving|scuba|snorkel|snorkeling|coral|marine|sanctuary|underwater"),
    ("beach", r"beach|swim|swimming|dagat|langoy|dalampasigan|sunset|island hopping"),
    ("heritage", r"church|simbahan|parish|history|heritage|museum|kasaysayan|cross|krus|culture|kultura"),
    ("activities", r"activities|things to do|attraction|attractions|puntahan|pasyalan|tourist spot|destination|destinations|what to do|what can i do|what can we do|what do i do|ano meron|gawin|explore|see in bauan|sights"),
    ("joke", r"joke|funny|patawa|biro"),
    ("how_are_you", r"how are you|kumusta ka|kamusta ka|musta ka|kumusta na|kamusta na"),
    ("thanks", r"thank you|thanks|salamat|ty"),
    ("bye", r"bye|goodbye|paalam|see you|sige na|una na"),
    ("greeting", r"hi|hello|hey|helo|good morning|good afternoon|good evening|magandang umaga|magandang hapon|magandang gabi|magandang araw|kumusta|kamusta|mabuhay|uy|oy|hoy"),
]
INTENT_RES = [(name, re.compile(r"\b(?:%s)\b" % pat)) for name, pat in INTENTS]


def _detect_intent(text):
    for name, rx in INTENT_RES:
        if rx.search(text):
            return name
    return None


# ---------------------------------------------------------------- data helpers

_GENERIC = {"resort", "beach", "hotel", "inn", "club", "bauan", "batangas", "the", "and", "villa", "cottage", "cottages", "place"}


def _find_resort(text, resorts):
    best, best_hits = None, 0
    for r in resorts:
        tokens = [w for w in _norm(r["name"]).split() if len(w) >= 4 and w not in _GENERIC]
        hits = sum(1 for w in tokens if _has(text, re.escape(w)))
        if _norm(r["name"]).strip() in text:
            hits += 2
        if hits > best_hits:
            best, best_hits = r, hits
    return best


def _where(r):
    brgy = r.get("barangay") or ""
    if brgy and not _norm(brgy).strip().startswith(("brgy", "barangay")):
        brgy = f"Brgy. {brgy}"
    return ", ".join(p for p in (r.get("address"), brgy) if p)


ATTRACTION_WORDS = {
    "diving": r"dive|diving|diver|divers|scuba|snorkel|snorkeling|marine|coral|underwater|sanctuary",
    "beach": r"beach|island|swim|swimming|shore|cove|sandbar",
    "culture": r"church|parish|heritage|museum|plaza|shrine|cross",
    "relax": r"spa|relax|massage|garden",
    "food": r"food|restaurant|resto|lomi|seafood|cafe|kainan",
}


def _attraction_match(attr, interest):
    """Does this attraction fit the interest? Uses the type and keywords in the name."""
    kind = {"beach": "beach", "culture": "heritage"}.get(interest)
    if kind and attr.get("type") == kind:
        return True
    pattern = ATTRACTION_WORDS.get(interest)
    return bool(pattern and re.search(r"\b(?:%s)\b" % pattern, _norm(attr.get("name", ""))))


def _resorts_for(resorts, interest):
    """[(resort, [matching attraction names])] for resorts that offer the interest."""
    out = []
    for r in resorts:
        names = [a["name"] for a in r.get("attractions", []) if _attraction_match(a, interest)]
        if names:
            out.append((r, names))
    return out


def _pick_resorts(resorts, interest, n=3):
    matched = {id(r) for r, _ in _resorts_for(resorts, interest)} if interest else set()
    return sorted(resorts, key=lambda r: 0 if id(r) in matched else 1)[:n]


def _recommend(interest, resorts, lang, fallback_text):
    """Resorts that offer the interest, plus what other resorts offer. Names are exact so map cards appear."""
    L = lambda en, tl: tl if lang == "tl" else en
    label = {"diving": L("diving", "diving"), "beach": L("beach activities", "beach activities"),
             "culture": L("heritage and culture", "kasaysayan at kultura")}[interest]
    matches = _resorts_for(resorts, interest)
    matched_ids = {id(r) for r, _ in matches}
    lines = []
    if matches:
        lines.append(L(f"Resorts with {label} from the official list:", f"Mga resort na may {label} mula sa opisyal na listahan:"))
        for r, names in matches[:4]:
            lines.append(f"- {r['name']}" + (f" ({_where(r)})" if _where(r) else "") + f": {', '.join(names[:3])}")
    else:
        lines.append(L(f"No resort in the list shows {label} yet.", f"Wala pang resort sa listahan na may {label}."))
        lines.append(re.sub(r"\s*[^.!?]*\?\s*$", "", fallback_text))   # drop its own question; one question per reply
    others = [(r, [a["name"] for a in r.get("attractions", [])]) for r in resorts if id(r) not in matched_ids]
    others = [(r, n) for r, n in others if n][:3]
    if others:
        lines.append(L("Other activities at other resorts:", "Iba pang aktibidad sa ibang resort:"))
        for r, names in others:
            lines.append(f"- {r['name']}: {', '.join(names[:3])}")
    lines.append(L("Name any resort and I'll show its map. Want me to plan a trip around it?",
                   "Banggitin ang alinmang resort at ipapakita ko ang mapa. Gusto mo bang gawan kita ng plano?"))
    return "\n".join(lines)


def _resort_line(r):
    line = f"- {r['name']} ({_where(r)})" if _where(r) else f"- {r['name']}"
    if r.get("rooms"):
        line += f", {r['rooms']} rooms"
    return line


def _group_opener(group, lang):
    L = lambda en, tl: tl if lang == "tl" else en
    return {
        "family": L("Family trip, nice! 🧒 ", "Family trip pala, ayos! 🧒 "),
        "friends": L("Barkada trip, let's go! 🎉 ", "Barkada trip, tara na! 🎉 "),
        "couple": L("A trip for two, lovely! 💙 ", "Trip para sa dalawa, ang sweet! 💙 "),
        "solo": L("Solo trip, I love it! ", "Solo trip, astig! "),
    }.get(group, "")


# ---------------------------------------------------------------- destinations (MTO-curated places)

DEST_GENERIC = {"bauan", "batangas", "the", "and", "resort", "place", "with", "from"}
# words that describe a KIND of place; alone they should show a list, not one place
CATEGORY_TOKENS = {"dive", "diving", "diver", "marine", "sanctuary", "spot", "beach", "church", "parish", "coast",
                   "island", "fall", "festival", "museum", "scenic", "nature", "park", "food", "restaurant"}

CAT_NOUNS = {
    "beach": ("beaches", "mga beach"),
    "diving": ("dive and marine spots", "mga dive at marine spot"),
    "heritage": ("heritage and culture spots", "mga pasyalang may kasaysayan at kultura"),
    "food": ("places to eat", "mga kainan"),
    "nature": ("scenic spots", "mga magagandang tanawin"),
    "event": ("events and festivals", "mga event at festival"),
    "other": ("other places", "iba pang lugar"),
}
INTENT_CATS = {
    "diving": ("diving",), "beach": ("beach", "nature"), "heritage": ("heritage",), "food": ("food",),
}
CAT_CHIP = {  # short tappable labels per category: (EN, TL)
    "beach": ("Beach spots", "Mga beach"), "diving": ("Diving", "Diving"), "heritage": ("History", "Kasaysayan"),
    "food": ("Food", "Pagkain"), "nature": ("Sunset views", "Sunset at tanawin"), "event": ("Events", "Mga event"),
}
GROUP_TAGS = {"family": {"family", "kids", "children", "pamilya"}, "friends": {"friends", "barkada", "group"},
              "couple": {"couple", "couples", "date"}, "solo": {"solo"}}

DEST_ASKS = [
    ("fee", r"fee|fees|entrance|admission|magkano|bayad|presyo|price|cost|how much|libre|free|ticket"),
    ("hours", r"hours|oras|open|opens|opening|bukas|close|closes|closing|sarado|schedule|what time|anong oras"),
    ("best_time", r"best time|when to|when should|kailan|anong buwan|season|pinakamagandang oras"),
    ("tips", r"tip|tips|bring|dalhin|dress|kasuotan|wear|safety|safe|ligtas|reminder|reminders|prepare|ihanda|need to know"),
    ("activities", r"things to do|activities|gawin|what can i do|ano ang pwede|ano ang puwede|do there"),
    ("good_for", r"kid|kids|children|bata|family|pamilya|couple|date|solo|senior|seniors|elderly|barkada|friends|suitable|bagay"),
    ("where", r"where|saan|map|location|direction|directions|paano pumunta|how to get|get there|layo|malayo"),
]
DEST_ASK_RES = [(k, re.compile(r"\b(?:%s)\b" % p)) for k, p in DEST_ASKS]


def _stem(w):
    if w.endswith("ies") and len(w) > 4:
        return w[:-3] + "y"
    if w.endswith("s") and len(w) > 4:
        return w[:-1]
    return w


def _dest_text(d, lang):
    return d["description_tl"] if lang == "tl" and d.get("description_tl") else d.get("description", "")


def _short(text, limit=110):
    text = " ".join((text or "").split())
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0].rstrip(",;:") + "..."


def _find_destination(text, dests):
    """-> (best, tied). `best` is one place when the visitor clearly named it; `tied` lists places when
    the name fits several equally (so we can ask which one they mean)."""
    words = {_stem(w) for w in text.split()}
    scored = []
    for d in dests:
        full = _norm(d["name"]).strip()
        if full and f" {full} " in text:
            scored.append((99, d))
            continue
        toks = [_stem(w) for w in full.split() if len(w) >= 4 and w not in DEST_GENERIC]
        hits = [t for t in toks if t in words]
        if not hits:
            continue
        distinct = [t for t in hits if t not in CATEGORY_TOKENS]
        if distinct or len(hits) >= 2:
            scored.append((len(hits) + 2 * len(distinct), d))
    if not scored:
        return None, []
    top = max(s for s, _ in scored)
    winners = [d for s, d in scored if s == top]
    return (winners[0], []) if len(winners) == 1 else (None, winners)


def _dests_in(dests, cats):
    return [d for d in dests if d["category"] in cats]


def _group_first(dests, group):
    tags = GROUP_TAGS.get(group)
    if not tags:
        return dests
    return sorted(dests, key=lambda d: 0 if tags & set(d.get("good_for", [])) else 1)


def _chip_names(dests, n=2):
    return [d["name"] for d in dests[:n]]


def _destination_answer(d, text, lang, meta):
    L = lambda en, tl: tl if lang == "tl" else en
    n = d["name"]
    meta["focus"] = n
    ask = next((k for k, rx in DEST_ASK_RES if rx.search(text)), None)
    chips_all = {
        "fee": L("Entrance fee?", "Magkano ang bayad?"), "hours": L("Opening hours?", "Anong oras bukas?"),
        "best_time": L("Best time to visit", "Kailan pinakamaganda?"), "tips": L("Any tips?", "May tips ba?"),
        "where": L("How to get there", "Paano pumunta?"),
    }

    def miss(field):
        meta["unanswered"] = f"missing:{field}:{n}"

    if ask == "fee":
        if d.get("entrance_fee"):
            body = L(f"Entrance fee at {n}: {d['entrance_fee']}. Rates can change, so please confirm with the Municipal Tourism Office before you go.",
                     f"Bayad sa {n}: {d['entrance_fee']}. Maaaring magbago ang halaga, kaya kumpirmahin sa Municipal Tourism Office bago pumunta.")
        else:
            miss("fee")
            body = L(f"I don't have an entrance fee posted for {n}, and I won't guess. Please ask the Municipal Tourism Office.",
                     f"Wala pang nakapost na bayad para sa {n}, at hindi ako manghuhula. Magtanong sa Municipal Tourism Office.")
    elif ask == "hours":
        if d.get("opening_hours"):
            body = L(f"{n} hours: {d['opening_hours']}. Please confirm with the tourism office, since schedules can change.",
                     f"Oras ng {n}: {d['opening_hours']}. Kumpirmahin sa tourism office dahil maaaring magbago ang iskedyul.")
        else:
            miss("hours")
            body = L(f"I don't have opening hours posted for {n}, and I won't guess. Please ask the Municipal Tourism Office.",
                     f"Wala pang nakapost na oras para sa {n}, at hindi ako manghuhula. Magtanong sa Municipal Tourism Office.")
    elif ask == "best_time":
        if d.get("best_time"):
            body = L(f"Best time to visit {n}: {d['best_time']}.", f"Pinakamagandang oras para bumisita sa {n}: {d['best_time']}.")
        else:
            miss("best_time")
            extra = L(" As far as I know, the dry season (roughly November to May) is usually best for beaches and diving.",
                      " Sa abot ng alam ko, kadalasang pinakamaganda ang tag-init (mga Nobyembre hanggang Mayo) para sa beach at diving.") \
                if d["category"] in ("beach", "diving", "nature") else ""
            body = L(f"No best time is posted for {n} yet.", f"Wala pang nakapost na pinakamagandang oras para sa {n}.") + extra
    elif ask == "tips":
        if d.get("tips"):
            body = L(f"Good to know before visiting {n}: {d['tips']}", f"Mga dapat malaman bago pumunta sa {n}: {d['tips']}")
        else:
            miss("tips")
            general = {
                "beach": L("bring sunscreen and water, and wear a life vest when swimming", "magdala ng sunscreen at tubig, at magsuot ng life vest sa paglangoy"),
                "diving": L("dive only with accredited local operators and follow your guide's briefing", "mag-dive lamang kasama ang accredited na local operator at sundin ang briefing ng gabay"),
                "heritage": L("dress modestly and keep your voice down inside the church", "magsuot ng disente at hinaan ang boses sa loob ng simbahan"),
            }.get(d["category"], L("bring water and follow local guides' advice", "magdala ng tubig at sundin ang payo ng mga lokal na gabay"))
            body = L(f"No special tips are posted for {n} yet. In general: {general}.", f"Wala pang nakapost na espesyal na tips para sa {n}. Sa pangkalahatan: {general}.")
    elif ask == "activities":
        if d.get("activities"):
            body = L(f"At {n} you can enjoy: {', '.join(d['activities'])}.", f"Sa {n} puwede kang mag-enjoy sa: {', '.join(d['activities'])}.")
        else:
            miss("activities")
            body = L(f"{n}: {_dest_text(d, lang) or 'no description yet.'} A full list of activities isn't posted yet.",
                     f"{n}: {_dest_text(d, lang) or 'wala pang paglalarawan.'} Wala pang nakapost na listahan ng aktibidad.")
    elif ask == "good_for":
        if d.get("good_for"):
            body = L(f"{n} is a good fit for: {', '.join(d['good_for'])}.", f"Bagay ang {n} para sa: {', '.join(d['good_for'])}.")
        else:
            miss("good_for")
            body = L(f"I don't have notes on who {n} suits best yet. {_dest_text(d, lang)}".strip(),
                     f"Wala pang tala kung kanino pinakabagay ang {n}. {_dest_text(d, lang)}".strip())
    elif ask == "where":
        body = L(f"I pulled up {n} on the map below. Tap Directions and it starts from your location.",
                 f"Ipinakita ko ang {n} sa mapa sa ibaba. Pindutin ang Directions at magsisimula ito sa lokasyon mo.")
    else:
        parts = [f"{n}: {_dest_text(d, lang) or L('no description yet.', 'wala pang paglalarawan.')}"]
        if d.get("activities"):
            parts.append(L(f"Things to do: {', '.join(d['activities'])}.", f"Mga puwedeng gawin: {', '.join(d['activities'])}."))
        if d.get("good_for"):
            parts.append(L(f"Good for: {', '.join(d['good_for'])}.", f"Bagay para sa: {', '.join(d['good_for'])}."))
        facts = []
        if d.get("best_time"):
            facts.append(L(f"Best time: {d['best_time']}", f"Pinakamagandang oras: {d['best_time']}"))
        if d.get("entrance_fee"):
            facts.append(L(f"Fee: {d['entrance_fee']}", f"Bayad: {d['entrance_fee']}"))
        if d.get("opening_hours"):
            facts.append(L(f"Hours: {d['opening_hours']}", f"Oras: {d['opening_hours']}"))
        if facts:
            parts.append(" | ".join(facts) + ".")
        if d.get("tips"):
            parts.append(L(f"Tip: {d['tips']}", f"Tip: {d['tips']}"))
        absent = [lab for lab, key in ((L("fee", "bayad"), "entrance_fee"), (L("opening hours", "oras"), "opening_hours")) if not d.get(key)]
        if absent:
            parts.append(L(f"The {' and '.join(absent)} aren't posted yet, so please confirm with the tourism office.",
                           f"Wala pang nakapost na {' at '.join(absent)}, kaya kumpirmahin sa tourism office."))
        body = " ".join(parts)
    asked_keys = {ask}
    chips = [chips_all[k] for k in ("best_time", "fee", "where", "tips") if k not in asked_keys][:2]
    chips.append(L("Plan my trip", "Gawan mo ako ng plano"))
    return body, chips


def _dest_list_reply(cats, dests, lang, slots, resorts, interest, opener=""):
    """List the MTO's destinations for these categories (best fit for the group first), then resorts that offer it."""
    L = lambda en, tl: tl if lang == "tl" else en
    found = _group_first(_dests_in(dests, cats), slots.get("group"))
    if not found:
        return None
    noun = CAT_NOUNS[cats[0]][1 if lang == "tl" else 0]
    lines = [L(f"Here are the {noun} listed by the Municipal Tourism Office:", f"Ito ang {noun} na nakalista ng Municipal Tourism Office:")]
    for d in found[:4]:
        desc = _short(_dest_text(d, lang), 95)
        lines.append(f"- {d['name']}" + (f": {desc}" if desc else ""))
    if interest:
        matches = _resorts_for(resorts, interest)[:2]
        if matches:
            lines.append(L("Resorts offering it:", "Mga resort na may ganito:") + " " + ", ".join(r["name"] for r, _ in matches) + ".")
    lines.append(L("Tap one for details, or I can plan a trip around it.", "Pumili ng isa para sa detalye, o gawan kita ng plano."))
    chips = _chip_names(found, 2) + [L("Plan my trip", "Gawan mo ako ng plano")]
    return opener + "\n".join(lines), chips


# ---------------------------------------------------------------- the engine

def reply(messages, page_lang, resorts, programs, distance_km=None, destinations=None, meta=None):
    destinations = destinations or []
    meta = meta if meta is not None else {}
    user_texts = [_norm(m["content"]) for m in messages if m["role"] == "user"]
    text = user_texts[-1]
    last_bot = next((m["content"] for m in reversed(messages[:-1]) if m["role"] == "assistant"), "")
    lang = _lang_of(text, page_lang)
    rng = random.Random(len(messages) * 31 + sum(map(ord, text)))
    pick = lambda en, tl: rng.choice(tl if lang == "tl" else en)
    L = lambda en, tl: tl if lang == "tl" else en

    slots = _slots(user_texts)
    asked = _asked_about(last_bot)
    resort = _find_resort(text, resorts)
    mentions_bauan = _has(text, BAUAN_WORDS) or resort is not None
    intent = _detect_intent(text)

    # a bare answer ("2", "family", "dalawa kami") to the bot's last question
    bare_number = re.fullmatch(r"\s*(\d+)\s*", text)
    if bare_number and asked == "days":
        slots["days"] = min(int(bare_number.group(1)), 3)
        intent = "plan"
    elif bare_number and asked == "group":
        slots["size"] = int(bare_number.group(1))
        intent = "plan"
    elif intent is None and asked in ("days", "group", "interest") and any(
            _slots([text]).get(k) for k in ("days", "size", "group", "interest")):
        intent = "plan"

    # yes / no to a follow-up offer
    if intent is None and re.fullmatch(r"\s*(?:yes|oo|opo|sige|game|ok|okay|oks|sure|yep|yeah|go|ayos|please|pls)\s*", text):
        low = _norm(last_bot)
        if _has(low, "plan|itinerary|schedule|draft|resort|stay|tutuluyan|puwedeng tuluyan"):
            intent = "plan"
        elif _has(low, "beach|diving|food|lomi|kultura|culture|puntahan"):
            intent = "activities"
        else:
            return (L("Great! What would you like help with: a place to stay, things to do, food, or a trip plan?",
                      "Sige! Ano ang gusto mong matulungan: tutuluyan, pasyalan, pagkain, o plano ng trip?"),
                    L(["Where to stay", "Things to do", "Plan my trip"], ["Saan mag-stay?", "Ano ang pasyalan?", "Gawan mo ako ng plano"]))
    if intent is None and re.fullmatch(r"\s*(?:no|hindi|ayaw|wag|huwag|nope|di na|hindi na|wala na)\s*", text):
        return (pick(["No problem! If you think of anything about Bauan, just ask. 😊",
                      "All good! I'm here whenever you need trip ideas."],
                     ["Sige, walang problema! Nandito lang ako kapag may tanong ka tungkol sa Bauan. 😊",
                      "Okay lang! Tawagin mo lang ako kapag kailangan mo ng ideya sa trip."]),
                L(["Things to do", "Where to stay"], ["Ano ang pasyalan?", "Saan mag-stay?"]))

    if intent in ("diving", "beach", "food", "heritage") and _has(_norm(last_bot), "first draft|unang draft"):
        intent = "plan"      # "More diving" after a plan = adjust the plan

    # emergencies first, always
    if intent == "emergency":
        return (L("If this is an emergency, please call 911 or your local authorities right now. Your safety comes first. I can help with trip questions after.",
                  "Kung emergency ito, tumawag agad sa 911 o sa lokal na awtoridad. Mas mahalaga ang kaligtasan mo. Tutulong ako sa trip pagkatapos."),
                [])

    # a specific resort by name
    if resort and intent not in ("greeting", "thanks", "bye"):
        attr = [a["name"] for a in resort.get("attractions", [])]
        parts = [L(f"{resort['name']} is in {_where(resort) or 'Bauan'}.", f"Ang {resort['name']} ay nasa {_where(resort) or 'Bauan'}.")]
        if resort.get("rooms"):
            parts.append(L(f"It has {resort['rooms']} rooms.", f"May {resort['rooms']} na kwarto ito."))
        if attr:
            parts.append(L("Attractions listed there: " + ", ".join(attr[:4]) + ".", "Mga atraksyon doon: " + ", ".join(attr[:4]) + "."))
        if resort.get("contact"):
            parts.append(L(f"You can reach them at {resort['contact']}.", f"Puwede mo silang tawagan sa {resort['contact']}."))
        parts.append(L("I pulled up the map below. For rates and availability, please ask the resort directly.",
                       "Nakalagay sa ibaba ang mapa. Para sa presyo at availability, direktang magtanong sa resort."))
        return (" ".join(parts), L(["Plan my trip", "Other resorts", "How to get there"], ["Gawan mo ako ng plano", "Iba pang resort", "Paano pumunta?"]))

    # a specific MTO destination by name ("Sampaguita Beach", "marine sanctuary", "the church")
    dest, tied = _find_destination(text, destinations)
    # follow-up without a name ("Magkano?", "Best time to visit", "How to get there") about the one place just discussed
    if not dest and not tied and destinations and intent in (None, "budget", "best_time", "safety", "getting_there"):
        if any(rx.search(text) for _, rx in DEST_ASK_RES):
            low_bot = _norm(last_bot)
            named = [d for d in destinations if f" {_norm(d['name']).strip()} " in low_bot]
            if len(named) == 1:
                dest = named[0]
    if intent == "plan" and dest and not slots["interest"]:
        slots["interest"] = {"beach": "beach", "diving": "diving", "heritage": "culture", "food": "food", "nature": "relax"}.get(dest["category"])
    if tied and intent not in ("greeting", "thanks", "bye", "plan"):
        names = [d["name"] for d in tied[:3]]
        return (L("Which one do you mean: " + ", ".join(names[:-1]) + (" or " if len(names) > 1 else "") + names[-1] + "?",
                  "Alin ang tinutukoy mo: " + ", ".join(names[:-1]) + (" o " if len(names) > 1 else "") + names[-1] + "?"),
                names)
    if dest and intent not in ("greeting", "thanks", "bye", "plan"):
        return _destination_answer(dest, text, lang, meta)

    # off-topic: honest, short, and pivot to Bauan
    if not mentions_bauan and intent not in ("greeting", "thanks", "bye", "joke", "how_are_you", "whoareyou", "help",
                                             "getting_there", "near_me"):
        place = re.search(r"\b(%s)\b" % OTHER_PLACES, text)
        if place:
            name = place.group(1).title()
            return (L(f"{name} sounds lovely, but Bauan is the only place I know well, so I can't give you good tips there. If you like beaches, diving or good food, Bauan, Batangas has all three. Want me to plan something?",
                      f"Ay, {name}! Maganda iyan, pero Bauan lang ang kabisado ko kaya hindi kita matutulungan nang maayos doon. Kung beach, diving o masarap na pagkain ang hanap mo, meron lahat sa Bauan, Batangas. Gusto mo bang gawan kita ng plano?"),
                    L(["Plan my trip", "Things to do in Bauan", "Where to stay"], ["Gawan mo ako ng plano", "Pasyalan sa Bauan", "Saan mag-stay?"]))
        if re.search(r"\b(?:%s)\b" % OFFTOPIC_TOPICS, text):
            return (L("Haha, that one is outside what I can help with. I'm only here for Bauan trips. But if you're planning a getaway, I'd love to help!",
                      "Hehe, labas na iyan sa kaya kong tulungan. Para lang ako sa mga trip sa Bauan. Pero kung may balak kang pasyal, game ako!"),
                    L(["Things to do", "Plan my trip"], ["Ano ang pasyalan?", "Gawan mo ako ng plano"]))

    # ------- answers by intent -------
    if intent == "greeting":
        return (pick(["Hi there! 👋 I'm Tourist Bot. Planning a trip to Bauan?",
                      "Hello! 😊 Ready to explore Bauan? Tell me what you're in the mood for."],
                     ["Kumusta! 👋 Ako si Tourist Bot. May plano ka bang pumunta sa Bauan?",
                      "Hello! 😊 Game ka na bang mag-explore ng Bauan? Sabihin mo lang kung ano ang trip mo."]),
                L(["Where to stay", "Things to do", "Plan my trip"], ["Saan mag-stay?", "Ano ang pasyalan?", "Gawan mo ako ng plano"]))

    if intent == "how_are_you":
        return (pick(["I'm doing great, thanks for asking! 😄 How about you, are you planning a trip?",
                      "All good here! Always happy to talk about Bauan. What are you planning?"],
                     ["Ayos lang ako, salamat sa pagtatanong! 😄 Ikaw, may plano ka bang pumasyal?",
                      "Maayos naman! Masaya akong makipagkwentuhan tungkol sa Bauan. Ano ang balak mo?"]),
                L(["Plan my trip", "Things to do"], ["Gawan mo ako ng plano", "Ano ang pasyalan?"]))

    if intent == "whoareyou":
        return (L("I'm Tourist Bot, a chatbot built for Discover Bauan. I'm a program, not a person, and I answer using the Municipal Tourism Office's own resort and attraction records. I can help with where to stay, what to do, and trip plans.",
                  "Ako si Tourist Bot, isang chatbot na ginawa para sa Discover Bauan. Program ako at hindi tao, at sumasagot ako gamit ang mga record ng Municipal Tourism Office tungkol sa resort at atraksyon. Makakatulong ako sa tutuluyan, pasyalan, at plano ng trip."),
                L(["Where to stay", "Things to do", "Plan my trip"], ["Saan mag-stay?", "Ano ang pasyalan?", "Gawan mo ako ng plano"]))

    if intent == "help":
        return (L("I can suggest where to stay, things to do, food, the best time to visit, how to get there, and build a simple trip plan. Just tell me who's coming and what you enjoy.",
                  "Matutulungan kita sa tutuluyan, pasyalan, pagkain, pinakamagandang oras bumisita, paano pumunta, at sa simpleng plano ng trip. Sabihin mo lang kung sino ang kasama mo at ano ang gusto mo."),
                L(["Where to stay", "Things to do", "Plan my trip"], ["Saan mag-stay?", "Ano ang pasyalan?", "Gawan mo ako ng plano"]))

    if intent == "thanks":
        return (pick(["You're welcome! 🙌 Anything else about Bauan?", "Happy to help! Ask me anytime."],
                     ["Walang anuman! 🙌 May iba ka pa bang tanong tungkol sa Bauan?", "Masaya akong makatulong! Tanong ka lang ulit."]),
                L(["Plan my trip", "Things to do"], ["Gawan mo ako ng plano", "Ano ang pasyalan?"]))

    if intent == "bye":
        return (pick(["Take care and enjoy Bauan! 🌊", "See you! Safe travels."],
                     ["Ingat at mag-enjoy sa Bauan! 🌊", "Paalam! Ingat sa biyahe."]), [])

    if intent == "joke":
        return (pick(["Why did the diver love Bauan? Because the view was always better underwater! 😄 Want trip ideas?",
                      "Beach joke: I would tell you a sea one, but it might be too shallow. 😄 Want a real beach idea?"],
                     ["Bakit mahilig ang diver sa Bauan? Kasi mas maganda ang view sa ilalim ng tubig! 😄 Gusto mo ng trip ideas?",
                      "Hirap akong magpatawa, pero hindi ako nahihirapang magplano ng beach trip! 😄 Gusto mo?"]),
                L(["Plan my trip", "Beach ideas"], ["Gawan mo ako ng plano", "Beach ideas"]))

    if intent == "plan":
        return _plan(slots, resorts, lang, destinations)

    if intent == "near_me":
        if distance_km is None:
            return (L("I don't know where you are yet. Refresh the page and tap 'Allow & detect my location', and I can tell how far you are from Bauan. The map buttons also start from your location.",
                      "Hindi ko pa alam kung nasaan ka. I-refresh ang page at pindutin ang 'Payagan at hanapin ang lokasyon ko' para masabi ko kung gaano ka kalayo sa Bauan. Magsisimula rin sa lokasyon mo ang mga map button."),
                    L(["Where to stay", "How to get there"], ["Saan mag-stay?", "Paano pumunta?"]))
        if distance_km < 5:
            names = ", ".join(r["name"] for r in resorts[:3]) or L("our listed resorts", "mga nakalistang resort")
            return (L(f"You seem to be in or very near Bauan town. Some places close by: {names}.",
                      f"Mukhang nasa Bauan ka na o malapit lang. Ilan sa mga malalapit na lugar: {names}."),
                    L(["Things to do", "Where to eat"], ["Ano ang pasyalan?", "Saan kakain?"]))
        return (L(f"You're roughly {distance_km:.0f} km from Bauan town (straight line). Tap a resort's map button and directions will start from where you are.",
                  f"Mga {distance_km:.0f} km ka mula sa bayan ng Bauan (tuwid na linya). Pindutin ang map button ng resort at magsisimula ang direksyon kung nasaan ka."),
                L(["Where to stay", "Plan my trip"], ["Saan mag-stay?", "Gawan mo ako ng plano"]))

    if intent == "getting_there":
        extra = ""
        if distance_km is not None and distance_km >= 5:
            extra = L(f" From where you are, it's roughly {distance_km:.0f} km in a straight line.",
                      f" Mula sa kinaroroonan mo, mga {distance_km:.0f} km ito sa tuwid na linya.")
        return (L("Bauan is in Batangas province and, as far as I know, is reached by land, with travel time depending on traffic." + extra +
                  " Name a resort and I'll pull up its map with directions that start from your location.",
                  "Ang Bauan ay nasa lalawigan ng Batangas at, sa abot ng alam ko, mararating sa pamamagitan ng lupa, at depende sa trapiko ang tagal ng biyahe." + extra +
                  " Banggitin mo lang ang resort at ilalabas ko ang mapa nito, kasama ang direksyon mula sa lokasyon mo."),
                L(["Where to stay", "Plan my trip"], ["Saan mag-stay?", "Gawan mo ako ng plano"]))

    if intent == "booking":
        return (L("I can't make bookings. Please contact the resort directly for reservations and availability. Name a resort and I'll show its details and map.",
                  "Hindi ako makakapag-book. Direktang makipag-ugnayan sa resort para sa reservation at availability. Banggitin mo ang resort at ipapakita ko ang detalye at mapa nito."),
                L(["Where to stay", "Contact the MTO"], ["Saan mag-stay?", "Contact ng MTO"]))

    if intent == "budget":
        meta["unanswered"] = "missing:rates"
        return (L("I don't have room rates or fees, and I won't guess. Please ask the resort directly, or message the tourism office. If you tell me your budget style, I can still suggest what fits.",
                  "Wala akong datos ng presyo ng kwarto o bayarin, at hindi ako manghuhula. Direktang magtanong sa resort o sa tourism office. Kung sasabihin mo kung anong budget ang gusto mo, makakapagmungkahi pa rin ako."),
                L(["Where to stay", "Contact the MTO"], ["Saan mag-stay?", "Contact ng MTO"]))

    if intent == "contact":
        return (L(f"You can use the Contact page on this site to message the Municipal Tourism Office, or email {CONTACT_EMAIL} (the email shown in the footer). For a resort's number, name the resort and I'll share what's listed.",
                  f"Puwede mong gamitin ang Contact page ng site para mag-message sa Municipal Tourism Office, o mag-email sa {CONTACT_EMAIL} (ang email sa footer). Para sa numero ng resort, banggitin ang resort at ibibigay ko kung ano ang nakalista."),
                L(["Where to stay", "Plan my trip"], ["Saan mag-stay?", "Gawan mo ako ng plano"]))

    if intent == "programs":
        if not programs:
            return (L("There are no announcements posted right now. Please check back soon or ask the tourism office.",
                      "Wala pang nakapost na anunsyo ngayon. Bumalik ka ulit mamaya o magtanong sa tourism office."),
                    L(["Things to do", "Contact the MTO"], ["Ano ang pasyalan?", "Contact ng MTO"]))
        lines = [f"- {p['title']}" + (f": {p['description'][:110].strip()}" if p.get("description") else "") for p in programs[:3]]
        return (L("Here's what the tourism office has posted:\n", "Ito ang mga ipinost ng tourism office:\n") + "\n".join(lines),
                L(["Plan my trip", "Where to stay"], ["Gawan mo ako ng plano", "Saan mag-stay?"]))

    if intent == "best_time":
        return (L("As far as I know, the dry season, roughly November to May, is the best time for beaches and diving, with calmer seas and clearer water. June to October can be rainy with typhoon risk, so check the forecast before you go. Want a plan for the dry season?",
                  "Sa abot ng alam ko, pinakamaganda ang tag-init, mga Nobyembre hanggang Mayo, para sa beach at diving dahil mas kalmado ang dagat at mas malinaw ang tubig. Maulan at may banta ng bagyo mula Hunyo hanggang Oktubre, kaya tingnan ang forecast bago umalis. Gusto mo ng plano para sa tag-init?"),
                L(["Plan my trip", "Where to stay"], ["Gawan mo ako ng plano", "Saan mag-stay?"]))

    if intent == "weather":
        return (L("I can't see live weather. Check a forecast the day before you go. As far as I know, November to May is usually drier and calmer, while June to October can bring rain and typhoons.",
                  "Hindi ko nakikita ang live na panahon. Tingnan ang forecast isang araw bago umalis. Sa abot ng alam ko, mas tuyo at kalmado ang Nobyembre hanggang Mayo, habang maulan at may bagyo mula Hunyo hanggang Oktubre."),
                L(["Best time to visit", "Plan my trip"], ["Kailan pinakamaganda?", "Gawan mo ako ng plano"]))

    if intent == "safety":
        return (L("A few basics: bring sunscreen and water, wear a life vest when swimming or on boats, dive only with accredited local operators, and follow local guides' advice. In an emergency, call 911.",
                  "Ilang paalala: magdala ng sunscreen at tubig, magsuot ng life vest sa paglangoy o sa bangka, mag-dive lamang kasama ang accredited na local operator, at sundin ang payo ng mga lokal na gabay. Kung emergency, tumawag sa 911."),
                L(["Things to do", "Plan my trip"], ["Ano ang pasyalan?", "Gawan mo ako ng plano"]))

    opener = _group_opener(_slots([text])["group"], lang) if intent in (
        "diving", "beach", "heritage", "food", "activities", "lodging") else ""

    if intent == "lodging":
        if not resorts:
            return (L("No resorts are listed yet. Please check back soon or ask the tourism office.",
                      "Wala pang nakalistang resort. Bumalik ka ulit mamaya o magtanong sa tourism office."),
                    [])
        chosen = _pick_resorts(resorts, slots["interest"], 3)
        lines = "\n".join(_resort_line(r) for r in chosen)
        intro = L("Here are some places to stay from the official list:", "Ito ang ilang puwedeng tuluyan mula sa opisyal na listahan:")
        close = L("Name any of them and I'll show the map. Who's coming with you?", "Banggitin ang alinman at ipapakita ko ang mapa. Sino ang kasama mo?")
        return (f"{opener}{intro}\n{lines}\n{close}", L(["Plan my trip", "Things to do"], ["Gawan mo ako ng plano", "Ano ang pasyalan?"]))

    if intent == "food":
        listed = _dest_list_reply(("food",), destinations, lang, slots, resorts, None, opener)
        if listed:
            return listed
        meta["unanswered"] = "missing:food"
        return (opener + L("As far as I know, you can't leave Batangas without trying Batangas lomi, and fresh seafood by the coast is a good bet too. I don't have a list of restaurants, so ask your resort or the tourism office for current favorites. Want food included in a plan?",
                  "Sa abot ng alam ko, hindi kumpleto ang Batangas kung hindi ka titikim ng Batangas lomi, at masarap din ang sariwang seafood sa tabing-dagat. Wala akong listahan ng mga kainan, kaya magtanong sa resort o sa tourism office para sa mga paborito ngayon. Gusto mo bang isama ang pagkain sa plano?"),
                L(["Plan my trip", "Where to stay"], ["Gawan mo ako ng plano", "Saan mag-stay?"]))

    if intent in ("diving", "beach", "heritage"):
        listed = _dest_list_reply(INTENT_CATS[intent], destinations, lang, slots, resorts,
                                  {"diving": "diving", "beach": "beach", "heritage": "culture"}[intent], opener)
        if listed:
            return listed

    if intent == "diving":
        fallback = L("Diving is a big draw here: the site lists the Bauan Marine Sanctuaries, the Bauan Divers Sanctuary and the Bauan Dive Spots, with spots for beginners and certified divers and local operators to guide you. Want me to build a dive-focused plan?",
                  "Malaking atraksyon ang diving dito: nakalista sa site ang Bauan Marine Sanctuaries, Bauan Divers Sanctuary at Bauan Dive Spots, para sa beginners at certified divers, may mga lokal na operator na gagabay. Gusto mo ng planong nakatuon sa diving?")
        return (opener + _recommend("diving", resorts, lang, fallback),
                L(["Plan my trip", "Where to stay"], ["Gawan mo ako ng plano", "Saan mag-stay?"]))

    if intent == "beach":
        fallback = L("For beaches, Sampaguita Beach is a tranquil spot for swimming and catching sunsets, and the Scenic Bauan Coastline is great for a stroll and photos. Want a beach-day plan?",
                  "Para sa beach, tahimik ang Sampaguita Beach para sa paglangoy at pagtanaw ng paglubog ng araw, at maganda ang Scenic Bauan Coastline para sa lakad at litrato. Gusto mo ng plano para sa isang beach day?")
        return (opener + _recommend("beach", resorts, lang, fallback),
                L(["Plan my trip", "Where to stay"], ["Gawan mo ako ng plano", "Saan mag-stay?"]))

    if intent == "heritage":
        fallback = L("For history and culture, visit the Immaculate Conception Parish, a landmark that reflects Bauan's religious and cultural heritage. Want it added to a plan?",
                  "Para sa kasaysayan at kultura, bisitahin ang Immaculate Conception Parish, isang landmark na sumasalamin sa pananampalataya at kultura ng Bauan. Gusto mo bang idagdag ito sa plano?")
        return (opener + _recommend("culture", resorts, lang, fallback),
                L(["Plan my trip", "Things to do"], ["Gawan mo ako ng plano", "Ano ang pasyalan?"]))

    if intent == "activities" and destinations:
        by_cat = {}
        for d in _group_first(destinations, slots.get("group")):
            by_cat.setdefault(d["category"], []).append(d["name"])
        lines = [L("Here's what the Municipal Tourism Office has listed:", "Ito ang nakalista ng Municipal Tourism Office:")]
        for cat, names in by_cat.items():
            noun = CAT_NOUNS.get(cat, CAT_NOUNS["other"])[1 if lang == "tl" else 0]
            lines.append(f"- {noun.capitalize()}: " + ", ".join(names[:3]))
        lines.append(L("What sounds most like you?", "Alin ang pinaka-gusto mo?"))
        chips = [CAT_CHIP[c][1 if lang == "tl" else 0] for c in by_cat if c in CAT_CHIP][:4]
        return (opener + "\n".join(lines), chips)

    if intent == "activities":
        return (opener + L("Popular picks: Sampaguita Beach for swimming and sunsets, the Bauan Marine Sanctuaries and dive spots for diving, the Immaculate Conception Parish for heritage, and the Scenic Bauan Coastline for views. What sounds most like you?",
                  "Mga paborito: Sampaguita Beach para sa paglangoy at sunset, Bauan Marine Sanctuaries at dive spots para sa diving, Immaculate Conception Parish para sa kasaysayan, at Scenic Bauan Coastline para sa tanawin. Alin ang pinaka-gusto mo?"),
                L(["Beach", "Diving", "History"], ["Beach", "Diving", "Kasaysayan"]))

    # nothing matched: stay conversational, guide gently
    if mentions_bauan:
        meta["unanswered"] = "unclear"
        return (L("Bauan is a great choice! Tell me more: are you after beaches, diving, food or history, and who's coming with you?",
                  "Magandang pagpipilian ang Bauan! Sabihin mo pa: beach, diving, pagkain o kasaysayan ba ang hanap mo, at sino ang kasama mo?"),
                L(["Beach", "Diving", "Plan my trip"], ["Beach", "Diving", "Gawan mo ako ng plano"]))
    meta["unanswered"] = "no_match"
    return (pick(["Hmm, I'm not sure I got that. I can help with places to stay, things to do, food, the best time to visit, or a trip plan. Which one?",
                  "Sorry, I didn't quite catch that. Want ideas for where to stay, things to do, or a trip plan?"],
                 ["Hmm, hindi ko yata nakuha iyon. Matutulungan kita sa tutuluyan, pasyalan, pagkain, kailan pumunta, o plano ng trip. Alin dito?",
                  "Pasensya na, hindi ko masyadong naintindihan. Gusto mo ba ng ideya sa tutuluyan, pasyalan, o plano ng trip?"]),
            L(["Where to stay", "Things to do", "Plan my trip"], ["Saan mag-stay?", "Ano ang pasyalan?", "Gawan mo ako ng plano"]))


# ---------------------------------------------------------------- trip plans

def _plan(slots, resorts, lang, destinations=None):
    L = lambda en, tl: tl if lang == "tl" else en
    destinations = destinations or []
    days = slots["days"] or 1
    interest = slots["interest"] or "beach"

    main = {
        "diving": (L("dive or snorkel at the Bauan Marine Sanctuaries with a local operator", "mag-dive o snorkel sa Bauan Marine Sanctuaries kasama ang local operator"),
                   L("an easy dive at the Bauan Divers Sanctuary", "madaling dive sa Bauan Divers Sanctuary")),
        "beach": (L("swim and relax at Sampaguita Beach", "maglangoy at magpahinga sa Sampaguita Beach"),
                  L("stroll the Scenic Bauan Coastline", "maglakad sa Scenic Bauan Coastline")),
        "food": (L("start with a bowl of Batangas lomi", "magsimula sa isang mangkok ng Batangas lomi"),
                 L("fresh seafood lunch by the coast", "sariwang seafood na tanghalian sa tabing-dagat")),
        "culture": (L("visit the Immaculate Conception Parish", "bisitahin ang Immaculate Conception Parish"),
                    L("a heritage walk around the town proper", "heritage walk sa bayan")),
        "relax": (L("slow morning and resort time", "mabagal na umaga at pahinga sa resort"),
                  L("a gentle walk along the Scenic Bauan Coastline", "banayad na lakad sa Scenic Bauan Coastline")),
    }[interest]

    sunset = L("watch the sunset by the coast and have dinner (try Batangas lomi)", "pagmasdan ang paglubog ng araw at maghapunan (subukan ang Batangas lomi)")
    parish = L("visit the Immaculate Conception Parish", "bisitahin ang Immaculate Conception Parish")

    # prefer the MTO's own destinations when they exist for what the visitor likes
    cats = {"diving": ("diving",), "beach": ("beach", "nature"), "culture": ("heritage",), "food": ("food",), "relax": ("nature", "beach")}[interest]
    picks = _group_first(_dests_in(destinations, cats), slots.get("group"))
    verb = {
        "diving": (L("dive or snorkel at {n}", "mag-dive o snorkel sa {n}")),
        "beach": (L("swim and relax at {n}", "maglangoy at magpahinga sa {n}")),
    }.get(interest, L("visit {n}", "bisitahin ang {n}"))
    if picks:
        main = (verb.format(n=picks[0]["name"]),
                (verb.format(n=picks[1]["name"]) if len(picks) > 1 else main[1]))
    beach_d = next(iter(_dests_in(destinations, ("beach", "nature"))), None)
    if beach_d:
        sunset = L(f"watch the sunset at {beach_d['name']} and have dinner (try Batangas lomi)",
                   f"pagmasdan ang paglubog ng araw sa {beach_d['name']} at maghapunan (subukan ang Batangas lomi)")
    heritage_d = next(iter(_dests_in(destinations, ("heritage",))), None)
    if heritage_d:
        parish = L(f"visit {heritage_d['name']}", f"bisitahin ang {heritage_d['name']}")
    home = L("souvenirs, then head home", "mamili ng pasalubong, tapos umuwi")
    m, a, e = L("Morning", "Umaga"), L("Afternoon", "Hapon"), L("Evening", "Gabi")

    lines = []
    if days == 1:
        lines.append(f"- {m}: {main[0]}. {a}: {main[1]}. {e}: {sunset}.")
    else:
        lines.append(f"- Day 1 - {m}: {main[0]}. {a}: {main[1]}. {e}: {sunset}.")
        lines.append(f"- Day 2 - {m}: {parish if interest != 'culture' else main[1]}. {a}: {home if days == 2 else L('free time at the resort', 'libreng oras sa resort')}.")
        if days >= 3:
            lines.append(f"- Day 3 - {m}: " + L("slow breakfast and any activity you missed. ", "mabagal na almusal at anumang aktibidad na hindi mo nagawa. ") + f"{a}: {home}.")

    group = _group_opener(slots["group"], lang)

    stay = ""
    if days >= 2 and resorts:
        picks = _pick_resorts(resorts, interest, 2)
        stay = L("\nPlaces to stay from the official list: ", "\nMga puwedeng tuluyan mula sa opisyal na listahan: ") + ", ".join(r["name"] for r in picks) + "."

    if not slots["days"]:
        ask = L("\nHow many days will you stay? I'll adjust the plan.", "\nIlang araw kayo mag-stay? Aayusin ko ang plano.")
    elif not slots["group"] and not slots["size"]:
        ask = L("\nWho's coming with you, and how many?", "\nSino ang kasama mo, at ilan kayo?")
    else:
        ask = L("\nWant me to change anything?", "\nGusto mo bang baguhin ang anumang parte?")

    note = L("(Rates and schedules aren't in my data, so please confirm with the resorts.)",
             "(Wala sa datos ko ang presyo at iskedyul, kaya kumpirmahin sa mga resort.)")
    text = group + L("Here's a first draft:\n", "Ito ang unang draft:\n") + "\n".join(lines) + stay + "\n" + note + ask
    return text, L(["Make it 2 days", "More diving", "Where to stay"], ["Gawing 2 araw", "Dagdagan ng diving", "Saan mag-stay?"])