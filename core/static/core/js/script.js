// --- 1. MULTI-LANGUAGE TRANSLATION DICTIONARY ---
const translations = {
    en: {
        page_title: "Bauan | Batangas Tourism",
        nav_home: "Home",
        nav_about: "About",
        nav_destinations: "Destinations",
        nav_activities: "Activities",
        nav_guide: "Travel Guide",
        nav_gallery: "Gallery",
        nav_reviews: "Reviews",
        nav_more: "More <i class=\"fa-solid fa-chevron-down nav-dropdown-caret\"></i>",
        home_title: "Discover <span>Bauan</span>",
        home_desc: "Experience pristine beaches, world-class diving spots, and the warm hospitality of Bauan — a hidden coastal gem in the heart of Batangas, Philippines.",
        home_btn: "Explore Destinations →",
        footer_desc: "Your ultimate guide to exploring the beautiful coastal town of Bauan, Batangas. Discover pristine beaches, world-class diving, and rich Filipino culture.",
        footer_contact: "Contact Us",
        footer_legal: "Legal",
        footer_cookie_policy_label: "Cookie Policy",
        footer_resort_owner_link: "Resort owner? Partner with the Tourism Office &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas. All Rights Reserved.",
        about_heading: "Our Story",
        about_subheading: "Learn about the heritage, culture, and coastal identity of Bauan.",
        about_tag: "About The Town",
        about_title: "A Rich Heritage by the Sea",
        about_p1: "Bauan is a premier first-class municipality in the province of Batangas. Known primarily for its thriving maritime industry, shipyards, and deep coastal traditions, it offers visitors a unique blend of industrial strength and natural coastal beauty.",
        about_p2: "Beyond its economic significance, Bauan is celebrated for its deep-rooted religious history, vibrant local festivals, and proximity to some of the richest marine biodiversity hotspots in the Philippines.",
        about_btn: "View Activities",
        dest_heading: "Top Destinations",
        dest_subheading: "Explore the most breathtaking coastal sights and landmarks in Bauan.",
        dest_tag: "Must-Visit Places",
        dest_title: "Popular Attractions",
        dest_1_title: "Sampaguita Beach",
        dest_1_desc: "A tranquil coastal getaway perfect for swimming, relaxing under the sun, and watching magnificent Batangas sunsets.",
        dest_2_title: "Bauan Marine Sanctuaries",
        dest_2_desc: "World-renowned diving zones boasting vibrant coral reefs, sea turtles, and pristine underwater visibility.",
        dest_3_title: "Immaculate Conception Parish",
        dest_3_desc: "A historic architectural landmark standing as a proud symbol of Bauan's deep religious and cultural heritage.",
        activ_heading: "Things to Do",
        activ_subheading: "Immerse yourself in adventure, water sports, and local culinary treats.",
        activ_tag: "Adventures & Cravings",
        activ_title: "Endless Experiences",
        activ_1_title: "Scuba & Macro Diving",
        activ_1_desc: "Dive deep into Bauan's rich waters and experience guided underwater expeditions suited for all skill levels.",
        activ_2_title: "Food Trip: Batangas Lomi",
        activ_2_desc: "Savor piping hot, thick bowls of authentic Batangas lomi loaded with fresh toppings and local spices.",
        activ_3_title: "Island Hopping",
        activ_3_desc: "Charter a local boat to explore hidden coves, white-sand strips, and crystal-clear swimming spots nearby.",
        guide_heading: "Comprehensive Travel Guide",
        guide_subheading: "Weather metrics, interactive GPS resort directions, cultural festivals, itineraries, and FAQs.",
        guide_gps_tag: "Live GPS Navigation",
        guide_gps_title: "Find & Navigate to Bauan Resorts",
        guide_gps_desc: "Use your live device GPS to calculate routes and distances to exclusive local resorts in Bauan.",
        guide_gps_btn: "Get GPS Directions",
        guide_gps_link: "Open Turn-by-Turn in Google Maps",
        guide_weather_tag: "Location & Climate",
        guide_weather_title: "Live Weather & Map Directory",
        weather_card_title: "Bauan Weather Status",
        weather_desc: "Partly Cloudy",
        weather_humidity: "Humidity",
        weather_wind: "Wind",
        weather_best: "Best time",
        map_card_title: "Interactive Town Map",
        planner_tag: "Trip Planning",
        planner_title: "Interactive Itinerary Generator",
        plan_opt_1: "1-Day Day Trip",
        plan_opt_2: "Weekend Getaway (2 Days)",
        plan_opt_adv: "Extreme Adventure & Diving",
        plan_opt_rel: "Relaxed Beach & Food Trip",
        plan_btn: "Generate Plan",
        plan_out_title: "Select your preferences above and click Generate Plan!",
        plan_out_desc: "Your customized custom travel schedule for Bauan will appear right here.",
        faq_tag: "Got Questions?",
        faq_title: "Frequently Asked Questions",
        faq_q1: "How do I get to Bauan from Manila via public commute?",
        faq_a1: "You can ride a bus from terminals in Cubao or Buendia headed straight to the Batangas City Grand Terminal. From the grand terminal, step out to catch a local jeepney bound directly for Bauan town proper.",
        faq_q2: "Are there ATM services available in Bauan?",
        faq_a2: "Yes, multiple major commercial banks and ATMs are stationed around the municipal center. However, it is always recommended to bring sufficient cash if you are visiting remote beach or diving resorts.",
        faq_q3: "Do I need pre-booking for scuba diving packages?",
        faq_a3: "While walk-ins are occasionally accommodated, pre-booking with certified local dive operators is strongly advised especially during weekends and peak dry season months to secure gear and instructors.",
        gallery_heading: "Photo Gallery",
        gallery_subheading: "Visual highlights capturing the beauty of Bauan.",
        gallery_tag: "Captured Moments",
        gallery_title: "Glimpses of Bauan",
        gallery_upload_heading: "Add Your Photo to the Gallery",
        gallery_upload_submit: "Add to Gallery",
        reviews_heading: "Traveler Reviews",
        reviews_subheading: "Read and share firsthand stories about your unforgettable trips to Bauan.",
        reviews_tag: "Testimonials & Submissions",
        reviews_title: "Community Experiences",
        form_heading: "Share Your Bauan Experience",
        form_submit: "Post Review & Photo",
        nav_contact: "Contact",
        contact_heading: "Contact Us",
        contact_subheading: "Have a question about Bauan? Reach out and we'll get back to you.",
        contact_tag: "Get In Touch",
        contact_title: "We'd Love to Hear From You",
        contact_form_heading: "Send Us a Message",
        contact_form_submit: "Send Message",
        contact_info_heading: "Municipal Tourism Office",
        contact_address: "Bauan, Batangas, Philippines",
        contact_hours: "Mon–Fri, 8:00 AM – 5:00 PM",
        cookie_text: "We use cookies to enhance your browsing experience, remember your language preference, and analyze site traffic. Read our <a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">Cookie Policy</a> to learn more.",
        cookie_accept: "Accept",
        cookie_decline: "Decline",
        cookiepolicy_heading: "Cookie Policy",
        cookiepolicy_subheading: "How Discover Bauan uses cookies, and how you can control them.",
        cookiepolicy_tag: "Your Privacy",
        cookiepolicy_title: "Cookie Policy",
        cookiepolicy_p1: "<strong>What are cookies?</strong> Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit, such as your preferred language and whether you've already responded to our cookie banner.",
        cookiepolicy_p2: "<strong>How we use cookies.</strong> Discover Bauan uses cookies and similar local storage for: (1) remembering your cookie consent choice so the banner doesn't reappear on every visit, (2) remembering your selected language, and (3) basic site functionality such as keeping the chat widget and forms working smoothly.",
        cookiepolicy_p3: "<strong>Third-party content.</strong> Some elements on this site — such as Google Fonts, Font Awesome icons, and embedded images — are loaded from third-party servers, which may set their own cookies or collect basic technical data (like your IP address) as part of standard web delivery.",
        cookiepolicy_p4: "<strong>Your choices.</strong> You can accept or decline non-essential cookies from the consent banner shown on your first visit. You can also clear cookies and site data at any time through your browser settings, which will reset your preferences.",
        cookiepolicy_p5: "<strong>Contact us.</strong> If you have questions about this Cookie Policy, please reach out via our <a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">Contact page</a>.",
        cookiepolicy_updated: "Last updated: September 2026.",
        chat_welcome: "🧭 Hey there! I'm Tourist Bot — think of me as your local buddy here in Bauan. Let's just chat, ask me anything you're curious about — resorts, food, things to do, whatever's on your mind!",
        chat_subtitle: "Your Bauan Travel Buddy",
        terms_modal_title: "Before you continue",
        terms_modal_intro: "Please read our Terms and Conditions. You need to agree to use this site.",
        terms_agree_label: "I have read and agree to the Terms and Conditions and Privacy Notice.",
        terms_scroll_hint: "Tick the box to continue.",
        terms_agree_btn: "Agree & Continue",
        footer_terms_label: "Terms & Conditions",
        loc_title: "Confirm your location",
        loc_intro: "Allow Discover Bauan to use your current location so we can show directions to resorts and attractions, and help Tourist Bot suggest places near you.",
        loc_note: "Your browser will ask for permission next. We do not save your location.",
        loc_confirm_q: "Is this where you are?",
        loc_not_now: "Not now",
        loc_allow: "Allow & detect my location",
        loc_retry: "Detect again",
        loc_yes: "Yes, confirm",
        loc_try_again: "Try again",
        loc_close: "Close",
        chat_input_placeholder: "Ask Tourist Bot..."
    },
    tl: {
        page_title: "Bauan | Turismo sa Batangas",
        nav_home: "Tahanan",
        nav_about: "Tungkol",
        nav_destinations: "Destinasyon",
        nav_activities: "Gawain",
        nav_guide: "Gabay sa Paglalakbay",
        nav_gallery: "Larawan",
        nav_reviews: "Mga Rebyu",
        nav_more: "Iba Pa <i class=\"fa-solid fa-chevron-down nav-dropdown-caret\"></i>",
        home_title: "Tuklasin ang <span>Bauan</span>",
        home_desc: "Damhin ang malilinis na dalampasigan, world-class na diving spots, at ang mainit na pagtanggap ng Bauan — isang nakatagong hiyas sa puso ng Batangas, Pilipinas.",
        home_btn: "Galugarin ang mga Destinasyon →",
        footer_desc: "Ang iyong gabay sa pagtuklas ng magandang bayan ng Bauan, Batangas. Tuklasin ang mga baybayin, diving, at kulturang Pilipino.",
        footer_contact: "Makipag-ugnayan",
        footer_legal: "Legal",
        footer_cookie_policy_label: "Patakaran sa Cookie",
        footer_resort_owner_link: "May-ari ng resort? Makipag-partner sa Tourism Office &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas. Nakareserba ang Lahat ng Karapatan.",
        about_heading: "Ang Aming Kwento",
        about_subheading: "Alamin ang kasaysayan, kultura, at ganda ng Bauan.",
        about_tag: "Tungkol sa Bayan",
        about_title: "Mayamang Pamana sa Tabing-Dagat",
        about_p1: "Ang Bauan ay isang pangunahing munisipalidad sa lalawigan ng Batangas. Kilala sa industriya ng paggawa ng barko at tradisyong pandagat, nag-aalok ito ng magandang timpla ng industriya at kalikasan.",
        about_p2: "Bukod dito, kilala rin ang Bauan sa malalim na kasaysayang relihiyoso, makukulay na pista, at mga yamang dagat.",
        about_btn: "Tignan ang mga Gawain",
        dest_heading: "Mga Pangunahing Destinasyon",
        dest_subheading: "Galugarin ang mga tanawin at pasyalan sa Bauan.",
        dest_tag: "Mga Dapat Bisitahin",
        dest_title: "Sikat na Atraksyon",
        dest_1_title: "Sampaguita Beach",
        dest_1_desc: "Isang tahimik na dalampasigan na perpekto para sa pag-langoy, pagpapahinga, at panonood ng magagandang paglubog ng araw.",
        dest_2_title: "Bauan Marine Sanctuaries",
        dest_2_desc: "Kilalang diving spots na may makukulay na coral reefs, mga pawikan, at malinaw na tubig.",
        dest_3_title: "Immaculate Conception Parish",
        dest_3_desc: "Isang makasaysayang simbahan na sumisimbolo sa relihiyoso at kultural na pamana ng Bauan.",
        activ_heading: "Mga Pwedeng Gawin",
        activ_subheading: "Isawsaw ang sarili sa pakikipagsapalaran at lokal na pagkain.",
        activ_tag: "Pakikipagsapalaran & Pagkain",
        activ_title: "Walang Katapusang Karanasan",
        activ_1_title: "Scuba & Macro Diving",
        activ_1_desc: "Sumisid sa malalim na tubig ng Bauan para sa mga guided underwater expedition.",
        activ_2_title: "Food Trip: Batangas Lomi",
        activ_2_desc: "Tikman ang mainit at malapot na sabaw ng tunay na Batangas lomi na puno ng sahog.",
        activ_3_title: "Island Hopping",
        activ_3_desc: "Sumakay sa bangka upang tuklasin ang mga nakatagong cove at puting buhangin.",
        guide_heading: "Komprehensibong Gabay",
        guide_subheading: "Panahon, direksyon ng GPS, mga pista, itineraryo, at mga FAQ.",
        guide_gps_tag: "Live na GPS",
        guide_gps_title: "Maghanap ng mga Reso sa Bauan",
        guide_gps_desc: "Gamitin ang GPS ng iyong device upang kwentahin ang ruta papunta sa mga resort.",
        guide_gps_btn: "Kunin ang GPS Direksyon",
        guide_gps_link: "Buksan sa Google Maps",
        guide_weather_tag: "Panahon",
        guide_weather_title: "Live na Panahon at Mapa",
        weather_card_title: "Katayuan ng Panahon sa Bauan",
        weather_desc: "Bahagyang Maulap",
        weather_humidity: "Alinsangan",
        weather_wind: "Hangin",
        weather_best: "Pinakamagandang buwan",
        map_card_title: "Mapa ng Bayan",
        planner_tag: "Pagpaplano",
        planner_title: "Tagagawa ng Itineraryo",
        plan_opt_1: "1-Araw na Biyahe",
        plan_opt_2: "Weekend Getaway (2 Araw)",
        plan_opt_adv: "Extreme Adventure at Diving",
        plan_opt_rel: "Relaxed Beach at Food Trip",
        plan_btn: "Gumawa ng Plano",
        plan_out_title: "Pumili sa itaas at i-click ang Gumawa ng Plano!",
        plan_out_desc: "Lilitaw dito ang iyong customized na iskedyul para sa Bauan.",
        faq_tag: "May Tanong Ba?",
        faq_title: "Mga Madalas Itanong",
        faq_q1: "Paano pumunta sa Bauan mula Maynila sa pamamagitan ng bus?",
        faq_q1: "Paano pumunta sa Bauan mula Maynila sa pamamagitan ng pampublikong sasakyan?",
        faq_a1: "Maaari kang sumakay ng bus mula Cubao o Buendia papuntang Batangas City Grand Terminal. Pagbaba roon, sumakay ng jeep papuntang Bauan.",
        faq_q2: "May mga ATM ba sa Bauan?",
        faq_a2: "Oo, maraming bangko at ATM sa paligid ng munisipyo. Subalit, mainam pa ring magdala ng sapat na cash kung pupunta sa liblib na resort.",
        faq_q3: "Kailangan ba ng pre-booking para sa scuba diving?",
        faq_a3: "Bagamat tinatanggap ang walk-in, mainam na mag-book nang maaga sa mga certified dive operator lalo na tuwing weekend.",
        gallery_heading: "Gallery ng Larawan",
        gallery_subheading: "Mga visual na highlight na nagpapakita ng ganda ng Bauan.",
        gallery_tag: "Mga Sandali",
        gallery_title: "Sulyap sa Bauan",
        gallery_upload_heading: "Idagdag ang Iyong Larawan sa Gallery",
        gallery_upload_submit: "Idagdag sa Gallery",
        reviews_heading: "Mga Rebyu ng Manlalakbay",
        reviews_subheading: "Magbasa at magbahagi ng sarili mong kwento tungkol sa iyong pagbisita sa Bauan.",
        reviews_tag: "Mga Patotoo at Rebyu",
        reviews_title: "Karanasan ng Komunidad",
        form_heading: "Ibahagi ang Iyong Karanasan",
        form_submit: "I-post ang Rebyu at Larawan",
        nav_contact: "Makipag-ugnayan",
        contact_heading: "Makipag-ugnayan sa Amin",
        contact_subheading: "May tanong ka ba tungkol sa Bauan? Sumulat sa amin at sasagutin ka namin.",
        contact_tag: "Makipag-ugnayan",
        contact_title: "Gusto Naming Marinig Mula Sa'yo",
        contact_form_heading: "Magpadala ng Mensahe",
        contact_form_submit: "Ipadala ang Mensahe",
        contact_info_heading: "Munisipal na Tanggapan ng Turismo",
        contact_address: "Bauan, Batangas, Pilipinas",
        contact_hours: "Lun–Biy, 8:00 AM – 5:00 PM",
        cookie_text: "Gumagamit kami ng cookies upang mapahusay ang iyong karanasan sa pagba-browse, tandaan ang iyong napiling wika, at suriin ang trapiko ng site. Basahin ang aming <a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">Patakaran sa Cookie</a> para sa karagdagang detalye.",
        cookie_accept: "Tanggapin",
        cookie_decline: "Tanggihan",
        cookiepolicy_heading: "Patakaran sa Cookie",
        cookiepolicy_subheading: "Paano ginagamit ng Discover Bauan ang cookies, at paano mo ito makokontrol.",
        cookiepolicy_tag: "Iyong Privacy",
        cookiepolicy_title: "Patakaran sa Cookie",
        cookiepolicy_p1: "<strong>Ano ang cookies?</strong> Ang cookies ay maliliit na text file na naka-store sa iyong device kapag bumisita ka sa isang website. Tinutulungan nito ang site na tandaan ang impormasyon tungkol sa iyong pagbisita, tulad ng iyong napiling wika at kung nakasagot ka na sa aming cookie banner.",
        cookiepolicy_p2: "<strong>Paano namin ginagamit ang cookies.</strong> Gumagamit ang Discover Bauan ng cookies at katulad na local storage para sa: (1) pagtandaan ng iyong pinili tungkol sa cookies para hindi na ito lumitaw sa bawat pagbisita, (2) pagtandaan ng iyong napiling wika, at (3) pangunahing functionality ng site tulad ng chat widget at mga form.",
        cookiepolicy_p3: "<strong>Third-party na content.</strong> Ang ilang elemento sa site na ito — tulad ng Google Fonts, Font Awesome icons, at mga embedded na larawan — ay nagmumula sa mga third-party server, na maaaring magtakda ng sarili nilang cookies o kumolekta ng basic technical data (tulad ng iyong IP address).",
        cookiepolicy_p4: "<strong>Ang iyong mga pagpipilian.</strong> Maaari mong tanggapin o tanggihan ang mga hindi mahalagang cookies mula sa consent banner na ipinapakita sa iyong unang pagbisita. Maaari mo ring i-clear ang cookies at data ng site anumang oras sa pamamagitan ng iyong browser settings.",
        cookiepolicy_p5: "<strong>Makipag-ugnayan sa amin.</strong> Kung may tanong ka tungkol sa Patakarang ito sa Cookie, mangyaring makipag-ugnayan sa amin sa pamamagitan ng aming <a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">Contact page</a>.",
        cookiepolicy_updated: "Huling na-update: Setyembre 2026.",
        chat_welcome: "🧭 Uy, kumusta! Ako si Tourist Bot — parang kaibigan mo lang dito sa Bauan. Chat lang tayo, itanong mo kung ano man ang gusto mong malaman — resorts, pagkain, mga gagawin, kahit ano!",
        chat_subtitle: "Kasama Mo sa Byahe sa Bauan",
        terms_modal_title: "Bago ka magpatuloy",
        terms_modal_intro: "Pakibasa ang aming Mga Tuntunin at Kundisyon. Kailangan mong sumang-ayon para magamit ang site.",
        terms_agree_label: "Nabasa ko at sumasang-ayon ako sa Mga Tuntunin at Kundisyon at Abiso sa Privacy.",
        terms_scroll_hint: "I-tick ang kahon para magpatuloy.",
        terms_agree_btn: "Sumang-ayon at Magpatuloy",
        footer_terms_label: "Mga Tuntunin at Kundisyon",
        loc_title: "Kumpirmahin ang iyong lokasyon",
        loc_intro: "Payagan ang Discover Bauan na gamitin ang kasalukuyan mong lokasyon para maipakita ang direksyon papunta sa mga resort at atraksyon, at matulungan ang Tourist Bot na magmungkahi ng mga lugar na malapit sa iyo.",
        loc_note: "Hihingi ng pahintulot ang browser mo pagkatapos nito. Hindi namin sine-save ang lokasyon mo.",
        loc_confirm_q: "Ito ba ang kinaroroonan mo?",
        loc_not_now: "Huwag muna",
        loc_allow: "Payagan at hanapin ang lokasyon ko",
        loc_retry: "Hanapin ulit",
        loc_yes: "Oo, kumpirmahin",
        loc_try_again: "Subukan ulit",
        loc_close: "Isara",
        chat_input_placeholder: "Magtanong kay Tourist Bot..."
    }
};

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });
}

// --- 2. WINDOW/TAB SWITCHING & NAVBAR LOGIC ---
const navBtns = document.querySelectorAll('.nav-btn');
const windows = document.querySelectorAll('.window-view');
const mainNav = document.getElementById('mainNav');

const siteConfig = {
    backgroundImages: {
        beach: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoUixNNq5YaHqj8ihSOM9F49Iew9WniRPC5R64slDy9KAQ5zxMFks_OaqJpt7cfk3MyFL_ox-xhDS2VZD7S_6v0EyPQ3QDIsqxVtTjsMOJNgRnZBnSh56qTXvFqVDvP493KfhpplttO3so/s1600/SAMPAGUITA+BEACH+RESORT+BLOG+REVIEW.png',
        dive: 'https://www.dronestagr.am/wp-content/uploads/2017/10/Bauan-Dive.jpg',
        town: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDSPGltwbqmdQAoYk2HYtPD0PlU-BON-6y2RB3Wa09gWEEdYSHh1DI-zEQ&s=10'
    },
    backgroundAudioUrl: 'assets/bauan-bg-sound.mp3'
};

const bgAudio = document.getElementById('bgAudio');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const backgroundImageSelector = document.getElementById('backgroundImageSelector');
let soundEnabled = false;

function applyHeroBackground(mode) {
    const slideEls = document.querySelectorAll('.hero-section .slide');
    const imageUrl = siteConfig.backgroundImages[mode] || siteConfig.backgroundImages.beach;

    slideEls.forEach((slide) => {
        slide.style.backgroundImage = `url('${imageUrl}')`;
    });
}

if (backgroundImageSelector) {
    backgroundImageSelector.addEventListener('change', (event) => {
        applyHeroBackground(event.target.value);
    });
}

if (bgAudio && soundToggleBtn) {
    bgAudio.src = siteConfig.backgroundAudioUrl;

    const setSoundState = (isOn) => {
        soundToggleBtn.classList.toggle('is-on', isOn);
        soundToggleBtn.innerHTML = isOn ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    };

    const toggleSound = async () => {
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            try {
                await bgAudio.play();
                setSoundState(true);
            } catch (err) {
                soundEnabled = false;
                setSoundState(false);
            }
        } else {
            bgAudio.pause();
            bgAudio.currentTime = 0;
            setSoundState(false);
        }
    };

    soundToggleBtn.addEventListener('click', toggleSound);

    const initAudioOnLoad = async () => {
        try {
            await bgAudio.play();
            soundEnabled = true;
            setSoundState(true);
        } catch (err) {
            soundEnabled = false;
            setSoundState(false);
        }
    };

    window.addEventListener('load', initAudioOnLoad, { once: true });
}

// Delegated click handler: works for nav-btn elements present now AND any
// re-created later by innerHTML swaps (e.g. links embedded in translated text).
// Highlights the "More" toggle when one of its dropdown items is the active link.
function syncMoreHighlight() {
    const toggle = document.getElementById('navMoreToggle');
    if (!toggle) return;
    const childActive = document.querySelector('.nav-dropdown-menu a.active-link');
    toggle.classList.toggle('active-link', !!childActive);
}

document.addEventListener('click', (e) => {
    // Clicks inside the login panel (typing, pressing Sign In) must not close it.
    if (e.target.closest('.login-panel')) return;

    const loginButton = e.target.closest('.nav-login-btn');
    if (loginButton) {
        const loginDropdown = loginButton.closest('.login-dropdown');
        if (loginDropdown) {
            loginDropdown.classList.toggle('open');
        }
        return;
    }

    const btn = e.target.closest('.nav-btn');
    const moreDrop = document.getElementById('navMoreDropdown');
    if (btn && btn.id === 'navMoreToggle') {
        e.preventDefault();
        if (moreDrop) moreDrop.classList.toggle('open');
        return;
    }
    if (moreDrop && !moreDrop.contains(e.target)) moreDrop.classList.remove('open');
    if (!btn) {
        document.querySelectorAll('.login-dropdown').forEach(drop => drop.classList.remove('open'));
        return;
    }

    e.preventDefault();
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;

    const targetView = document.getElementById(targetId);
    if (!targetView) return;

    if (targetView.classList.contains('home-section')) {
        document.querySelectorAll('.window-view').forEach(win => win.classList.remove('active-view'));
        document.getElementById('home').classList.add('active-view');
        mainNav.classList.add('solid-nav');
        targetView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.nav-btn').forEach(nav => nav.classList.remove('active-link'));
        document.querySelectorAll(`nav .nav-links a[data-target="${targetId}"]`).forEach(link => {
            link.classList.add('active-link');
        });
        syncMoreHighlight();
        return;
    }

    document.querySelectorAll('.window-view').forEach(win => win.classList.remove('active-view'));
    document.querySelectorAll('.nav-btn').forEach(nav => nav.classList.remove('active-link'));

    targetView.classList.add('active-view');
    targetView.scrollTop = 0;
    document.querySelectorAll(`nav .nav-links a[data-target="${targetId}"]`).forEach(link => {
        link.classList.add('active-link');
    });
    syncMoreHighlight();

    if (targetId === 'home') mainNav.classList.remove('solid-nav');
    else mainNav.classList.add('solid-nav');
});

windows.forEach(win => {
    win.addEventListener('scroll', () => {
        if(win.id === 'home') {
            if (win.scrollTop > 50) mainNav.classList.add('solid-nav');
            else mainNav.classList.remove('solid-nav');
        }
    });
});

// --- 3. SLIDESHOW LOGIC ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    slides[currentSlide].classList.remove('active-slide');
    dots[currentSlide].classList.remove('active-dot');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active-slide');
    dots[currentSlide].classList.add('active-dot');
}
// --- ABOUT SECTION SLIDESHOW LOGIC ---
let aboutSlideIndex = 0;
const aboutSlides = document.querySelectorAll('.about-slides .slide');
const aboutDots = document.querySelectorAll('.about-dots .dot');

function showAboutSlide(n) {
    if (!aboutSlides.length) return;
    aboutSlideIndex = (n + aboutSlides.length) % aboutSlides.length;
    
    aboutSlides.forEach(slide => slide.classList.remove('active-slide'));
    aboutDots.forEach(dot => dot.classList.remove('active-dot'));
    
    aboutSlides[aboutSlideIndex].classList.add('active-slide');
    aboutDots[aboutSlideIndex].classList.add('active-dot');
}

function nextAboutSlide() {
    showAboutSlide(aboutSlideIndex + 1);
}

function currentAboutSlideManual(n) {
    showAboutSlide(n);
    resetAboutTimer();
}

let aboutTimer = setInterval(nextAboutSlide, 5000);

function resetAboutTimer() {
    clearInterval(aboutTimer);
    aboutTimer = setInterval(nextAboutSlide, 5000);
}

function currentSlideManual(index) {
    clearInterval(slideInterval);
    slides[currentSlide].classList.remove('active-slide');
    dots[currentSlide].classList.remove('active-dot');
    currentSlide = index;
    slides[currentSlide].classList.add('active-slide');
    dots[currentSlide].classList.add('active-dot');
    slideInterval = setInterval(nextSlide, 5000);
}

// --- 4. COMMUNITY-DRIVEN REVIEWS & CLOUDINARY UPLOAD HANDLER ---
function handleReviewSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewerName').value;
    const rating = document.getElementById('reviewRating').value;
    const title = document.getElementById('reviewTitle').value;
    const comment = document.getElementById('reviewComment').value;
    const fileInput = document.getElementById('reviewImageFile');

    // Simulate Cloudinary image URL generation or default fallback avatar
    let imageUrl = window.AVATAR_FALLBACK || '';
    if (fileInput.files && fileInput.files[0]) {
        imageUrl = URL.createObjectURL(fileInput.files[0]);
    }

    // Build the new testimonial slide with textContent (no raw HTML from user input)
    const stars = Math.max(1, Math.min(5, Array.from(rating).length));
    const container = document.getElementById('dynamicReviewsContainer');
    const slide = document.createElement('article');
    slide.className = 'tslide';
    slide.innerHTML = `
        <figure class="tcard">
            <img class="tavatar" alt="">
            <div class="tmain">
                <figcaption class="tperson"><strong></strong><span>Bauan visitor</span></figcaption>
                <div class="tstars" role="img" aria-label="${stars} out of 5 stars">
                    ${[1,2,3,4,5].map(n => `<svg class="star${n <= stars ? ' on' : ''}" viewBox="0 0 24 24" aria-hidden="true"><use href="#starIcon"/></svg>`).join('')}
                </div>
                <h3 class="tquote-title"></h3>
                <blockquote class="tquote"></blockquote>
            </div>
        </figure>`;
    const av = slide.querySelector('.tavatar');
    av.src = imageUrl;
    av.alt = name;
    av.onerror = function () { this.onerror = null; this.src = window.AVATAR_FALLBACK; };
    slide.querySelector('.tperson strong').textContent = name;
    slide.querySelector('.tquote-title').textContent = '\u201C' + title + '\u201D';
    slide.querySelector('.tquote').textContent = comment;

    container.prepend(slide);
    if (window.initReviewSlider) window.initReviewSlider(true);
    document.getElementById('reviewForm').reset();
    alert('✨ Review and photo uploaded successfully via simulated Cloudinary pipeline!');
}

// --- 4b. GALLERY PHOTO UPLOAD HANDLER ---
function handleGalleryUpload(e) {
    e.preventDefault();

    const captionInput = document.getElementById('galleryPhotoCaption');
    const fileInput = document.getElementById('galleryPhotoFile');

    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please choose a photo to upload.');
        return;
    }

    const caption = captionInput.value;
    const imageUrl = URL.createObjectURL(fileInput.files[0]);

    const grid = document.getElementById('galleryCardGrid');
    const newCard = document.createElement('a');
    newCard.href = imageUrl;
    newCard.target = '_blank';
    newCard.className = 'travel-card';
    newCard.style.display = 'block';
    newCard.innerHTML = `
        <img src="${imageUrl}" class="card-img" alt="${caption}" title="${caption}">
    `;

    grid.prepend(newCard);
    document.getElementById('galleryUploadForm').reset();
    alert('📸 Photo added to the gallery!');
}

// --- 4c. CONTACT FORM HANDLER ---
// Update CONTACT_API_URL if your backend runs on a different host/path
// (e.g. a separate API server, or behind a reverse-proxy prefix).
const CONTACT_API_URL = '/api/contact';

async function handleContactSubmission(e) {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const statusBox = document.getElementById('contactFormStatus');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusBox.innerHTML = '';

    try {
        const response = await fetch(CONTACT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong. Please try again.');
        }

        statusBox.innerHTML = `<p style="color:#22c55e; font-weight:500;"><i class="fa-solid fa-circle-check"></i> Thanks, ${name}! Your message has been sent. We'll get back to you at ${email} soon.</p>`;
        document.getElementById('contactForm').reset();

    } catch (err) {
        console.error('Contact form submission failed:', err);
        statusBox.innerHTML = `<p style="color:#ef4444; font-weight:500;"><i class="fa-solid fa-circle-exclamation"></i> ${err.message || 'Failed to send your message. Please try again later.'}</p>`;

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

// --- 5. GPS RESORT NAVIGATOR LOGIC ---
// Resorts have no stored lat/lng yet, so routing uses the resort's
// address/barangay text as the Maps destination instead of coordinates.
// The user's own position (via geolocation) is still used as the origin.
let activeUserLat = null;
let activeUserLon = null;
let activeResortMapsQuery = null;

async function calculateRouteToResort() {
    const resortSelect = document.getElementById('resortSelect');
    const selectedOption = resortSelect.options[resortSelect.selectedIndex];
    if (!selectedOption || !selectedOption.value) return;

    activeResortMapsQuery = selectedOption.getAttribute('data-maps-query');
    const resortName = selectedOption.text;

    const outputBox = document.getElementById('gpsOutput');
    const statusText = document.getElementById('gpsStatusText');
    const nameTitle = document.getElementById('resortNameTitle');
    const mapsLink = document.getElementById('googleMapsLink');

    outputBox.style.display = 'block';
    nameTitle.textContent = `📍 ${resortName} (Tap here to navigate)`;

    const searchOnly = () => {
        mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${activeResortMapsQuery}`;
        mapsLink.style.display = 'inline-block';
    };

    if (!window.BauanConsent) {
        statusText.textContent = "Location confirmation is unavailable. Showing the resort on the map instead.";
        searchOnly();
        return;
    }

    // Ask the visitor to confirm their location first (shows the "Confirm your location" dialog
    // unless they already confirmed it in this session).
    statusText.textContent = "Please confirm your location…";
    const loc = await window.BauanConsent.requestLocation();

    if (!loc) {
        statusText.textContent = "No location shared, so here is the resort on the map. Tap the resort name above to open it.";
        searchOnly();
        return;
    }

    activeUserLat = loc.lat;
    activeUserLon = loc.lon;
    statusText.innerHTML = `Got your location! <em>(Tap the resort name above to launch GPS guidance to </em><strong>${resortName}</strong><em>)</em>`;
    mapsLink.href = `https://www.google.com/maps/dir/?api=1&origin=${activeUserLat},${activeUserLon}&destination=${activeResortMapsQuery}&travelmode=driving`;
    mapsLink.style.display = 'inline-block';
}

// When the user taps the resort's address/name heading directly:
function openDirectResortNavigation() {
    if (activeResortMapsQuery) {
        let mapsUrl = "";
        if (activeUserLat !== null && activeUserLon !== null) {
            // Route from user's live GPS to resort
            mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${activeUserLat},${activeUserLon}&destination=${activeResortMapsQuery}&travelmode=driving`;
        } else {
            // Fallback: plain search if user hasn't clicked GPS button yet
            mapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeResortMapsQuery}`;
        }
        window.open(mapsUrl, '_blank');
    } else {
        alert("Please select a resort and click 'Get GPS Directions' first.");
    }
}

// --- 6. ITINERARY BUILDER LOGIC ---
function generateItinerary() {
    const duration = document.getElementById('durationSelect').value;
    const style = document.getElementById('styleSelect').value;
    const output = document.getElementById('itineraryResult');

    let html = '';
    if (duration === '1' && style === 'adventure') {
        html = `<h4>1-Day Extreme Adventure Itinerary</h4><ul><li><strong>07:00 AM:</strong> Arrival in Bauan & local breakfast.</li><li><strong>09:00 AM:</strong> Scuba diving session at Bauan Sanctuaries.</li><li><strong>12:30 PM:</strong> Lunch featuring Batangas Lomi.</li><li><strong>03:00 PM:</strong> Island hopping & speedboating.</li></ul>`;
    } else {
        html = `<h4>Customized Itinerary Generated</h4><ul><li><strong>Day 1:</strong> Scenic beach arrival, resort relaxation, and local culinary tour.</li><li><strong>Day 2:</strong> Heritage landmarks exploration and coastal sunset stroll.</li></ul>`;
    }
    output.innerHTML = html;
}

// --- 7. FAQ ACCORDION LOGIC ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.parentElement.classList.toggle('active');
    });
});

// --- 8. TOURIST BOT (Claude via /api/chat/, keyword replies as offline fallback) ---
const chatBtn = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBody = document.getElementById('chatBody');

chatBtn.addEventListener('click', () => chatWindow.classList.toggle('open'));
closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

const chatHistory = [];   // [{role: 'user'|'assistant', content}] sent to the server each turn
let botBusy = false;

function appendBotMessage(fill) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bot-msg-wrapper';

    const avatar = document.createElement('div');
    avatar.className = 'bot-msg-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-compass"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'chat-message msg-bot';
    fill(bubble);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatBody.appendChild(wrapper);
    chatBody.scrollTop = chatBody.scrollHeight;
    return wrapper;
}

// Shows an embedded Google Map INSIDE the chat for the first resort the bot names,
// plus "Open in Google Maps", "Directions" and "Guide me there" buttons. Any other
// resort the bot mentions (max 2 total) gets the buttons only, to keep the chat light.
// Full-screen map panel that opens on top of the page (no new tab, no page change).
function openMapPanel(resort, mode, loc) {
    let overlay = document.getElementById('mapPanelOverlay');
    if (overlay) overlay.remove();

    const placeUrl = `https://www.google.com/maps?q=${resort.mapsQuery}&output=embed`;
    const routeUrl = loc ? `https://www.google.com/maps?saddr=${loc.lat},${loc.lon}&daddr=${resort.mapsQuery}&output=embed` : placeUrl;
    const appUrl = loc
        ? `https://www.google.com/maps/dir/?api=1&origin=${loc.lat},${loc.lon}&destination=${resort.mapsQuery}&travelmode=driving`
        : `https://www.google.com/maps/search/?api=1&query=${resort.mapsQuery}`;
    const showingRoute = mode !== 'place' && !!loc;

    overlay = document.createElement('div');
    overlay.id = 'mapPanelOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:4600;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(5,8,14,0.7);';

    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.style.cssText = 'width:min(760px,100%);height:min(86vh,680px);display:flex;flex-direction:column;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);';

    const head = document.createElement('div');
    head.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 16px;background:#2a9d8f;color:#fff;';
    const title = document.createElement('div');
    title.style.cssText = 'flex:1;font-weight:700;line-height:1.3;';
    title.textContent = (showingRoute ? '🧭 Route to ' : '📍 ') + resort.name;
    const close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close map');
    close.textContent = '✕';
    close.style.cssText = 'border:none;background:rgba(255,255,255,0.2);color:#fff;width:34px;height:34px;border-radius:50%;font-size:1rem;cursor:pointer;';
    head.append(title, close);

    const frame = document.createElement('iframe');
    frame.title = `Map of ${resort.name}`;
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    frame.src = showingRoute ? routeUrl : placeUrl;
    frame.style.cssText = 'flex:1;width:100%;border:0;';

    const foot = document.createElement('div');
    foot.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:10px 16px;background:#f4f7f7;font-size:0.85rem;color:#4a4f5c;';
    const msg = document.createElement('span');
    msg.style.flex = '1';
    msg.textContent = showingRoute
        ? 'Route from your confirmed location.'
        : (mode === 'place' ? 'Location on the map.' : 'Location not shared, so only the place is shown.');
    const go = document.createElement('a');
    go.href = appUrl;
    go.target = '_blank';
    go.rel = 'noopener';
    go.textContent = showingRoute ? '🚗 Start turn-by-turn in Google Maps ↗' : 'Open in Google Maps ↗';
    go.style.cssText = 'padding:8px 14px;border-radius:20px;background:#2a9d8f;color:#fff;font-weight:600;text-decoration:none;';
    foot.append(msg, go);

    panel.append(head, frame, foot);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const closePanel = () => { overlay.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') closePanel(); };
    close.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });
    document.addEventListener('keydown', onKey);
    close.focus();
}

function addResortMapCards(bubble, replyText) {
    const lower = replyText.toLowerCase();
    // One card only: the resort mentioned first in the reply (say another name to get its buttons).
    const mentioned = KNOWN_RESORTS
        .map(r => ({ r, at: lower.indexOf(r.name.toLowerCase()) }))
        .filter(x => x.at !== -1)
        .sort((a, b) => a.at - b.at)
        .slice(0, 1)
        .map(x => x.r);

    mentioned.forEach((r) => {
        const card = document.createElement('div');
        card.style.cssText = 'margin-top:10px;width:min(280px,100%);';

        const label = document.createElement('div');
        label.textContent = `📍 ${r.name}`;
        label.style.cssText = 'font-weight:600;margin-bottom:6px;';
        card.appendChild(label);

        const row = document.createElement('div');
        row.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
        const btnStyle = 'padding:7px 12px;border-radius:20px;background:#2a9d8f;color:#fff;font-weight:600;font-size:0.85rem;border:none;cursor:pointer;';
        const mkBtn = (text, onClick) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = text;
            b.style.cssText = btnStyle;
            b.addEventListener('click', onClick);
            return b;
        };

        // Directions / Guide me there: confirm location first, then open the route map.
        const route = async () => {
            const loc = window.BauanConsent ? await window.BauanConsent.requestLocation() : null;
            openMapPanel(r, 'route', loc);
        };

        row.append(
            mkBtn('📍 Google Maps', () => openMapPanel(r, 'place', null)),
            mkBtn('🚗 Directions', route),
            mkBtn('🧭 Guide me there', route)
        );
        card.appendChild(row);
        bubble.appendChild(card);
    });
}

function currentPageLang() {
    const sel = document.getElementById('langToggle');
    return sel && sel.value === 'tl' ? 'tl' : 'en';
}

// Tappable quick replies under the bot's message (suggested by the server, or the welcome set).
function clearChips() {
    document.querySelectorAll('.chat-chips').forEach(el => el.remove());
}

function renderChips(list) {
    clearChips();
    if (!Array.isArray(list) || !list.length) return;
    const row = document.createElement('div');
    row.className = 'chat-chips';
    list.slice(0, 4).forEach(label => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chat-chip';
        chip.textContent = label;
        chip.addEventListener('click', () => sendMessage(label));
        row.appendChild(chip);
    });
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
}

const WELCOME_CHIPS = {
    en: ['🏖️ Beach spots', '🤿 Diving', '⛪ History', '🗓️ Plan my trip'],
    tl: ['🏖️ Mga beach', '🤿 Diving', '⛪ Kasaysayan', '🗓️ Gawan mo ako ng plano']
};
document.addEventListener('DOMContentLoaded', () => {
    renderChips(WELCOME_CHIPS[currentPageLang()]);
});

// Photo cards for the places the bot just talked about (from the MTO's Destinations list).
function addDestinationCards(cards) {
    if (!Array.isArray(cards) || !cards.length) return;
    const tl = currentPageLang() === 'tl';
    const T = tl ? { map: '📍 Mapa', dir: '🚗 Direksyon', more: 'ℹ️ Detalye', ask: 'Ikwento mo ang ' } : { map: '📍 Map', dir: '🚗 Directions', more: 'ℹ️ Details', ask: 'Tell me about ' };
    const row = document.createElement('div');
    row.className = 'chat-cards';
    cards.forEach(c => {
        const place = { name: c.name, mapsQuery: c.maps_query };
        const card = document.createElement('div');
        card.className = 'chat-dcard';
        if (c.photo) {
            const img = document.createElement('img');
            img.src = c.photo; img.alt = c.name; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
            img.addEventListener('error', () => img.remove());
            card.appendChild(img);
        }
        const body = document.createElement('div');
        body.className = 'chat-dcard-body';
        const cat = document.createElement('span'); cat.className = 'chat-dcard-cat'; cat.textContent = c.category;
        const name = document.createElement('strong'); name.textContent = c.name;
        body.append(cat, name);
        if (c.summary) { const p = document.createElement('p'); p.textContent = c.summary; body.appendChild(p); }
        const btns = document.createElement('div'); btns.className = 'chat-dcard-btns';
        const mk = (label, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); return b; };
        btns.append(
            mk(T.map, () => openMapPanel(place, 'place', null)),
            mk(T.dir, async () => { const loc = window.BauanConsent ? await window.BauanConsent.requestLocation() : null; openMapPanel(place, 'route', loc); })
        );
        if (!c.focus) btns.appendChild(mk(T.more, () => sendMessage(T.ask + c.name)));
        body.appendChild(btns);
        card.appendChild(body);
        row.appendChild(card);
    });
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage(preset) {
    const text = (typeof preset === 'string' ? preset : userInput.value).trim();
    if (text === '' || botBusy) return;
    clearChips();

    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message msg-user';
    userDiv.textContent = text;
    chatBody.appendChild(userDiv);

    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    chatHistory.push({ role: 'user', content: text });
    botBusy = true;
    sendBtn.disabled = true;
    const typing = appendBotMessage(b => { b.innerHTML = '<span class="typing-dots" aria-label="Tourist Bot is typing"><span></span><span></span><span></span></span>'; });

    let reply = null;
    let suggestions = [];
    let cards = [];
    let serverError = null;
    try {
        // Only sent if the visitor confirmed their location; rounded, and never stored by the server.
        const loc = window.BauanConsent ? window.BauanConsent.getLocation() : null;
        const payload = { messages: chatHistory.slice(-20), lang: currentPageLang() };
        if (loc) payload.location = { lat: Number(loc.lat.toFixed(3)), lon: Number(loc.lon.toFixed(3)) };

        const res = await fetch('/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.reply) { reply = data.reply; suggestions = data.suggestions || []; cards = data.cards || []; }
        else if (res.status === 429) serverError = data.error;
    } catch (err) {
        console.warn('Tourist Bot request failed, using offline replies:', err);
    }

    typing.remove();

    if (reply) {
        chatHistory.push({ role: 'assistant', content: reply });
        appendBotMessage(b => {
            b.style.whiteSpace = 'pre-wrap';
            b.textContent = reply;      // textContent: model output is never injected as HTML
            addResortMapCards(b, reply);
        });
        addDestinationCards(cards);
        renderChips(suggestions);
    } else if (serverError) {
        chatHistory.pop();
        appendBotMessage(b => { b.textContent = serverError; });
    } else {
        // Server/API unavailable: fall back to the built-in keyword replies.
        chatHistory.pop();
        appendBotMessage(b => { b.innerHTML = keywordFallbackReply(text); });
    }

    botBusy = false;
    sendBtn.disabled = false;
    userInput.focus();
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- Tourist Bot's response logic ---
// Offline fallback used only when /api/chat/ is unavailable.
// Handles small talk (greetings, thanks, "who are you", etc.) plus keyword
// matching across common tourist topics (lodging, food, activities, best
// time to visit, safety/weather, events, booking) before a friendly fallback.
// --- Known resorts: loaded live from the Django backend (/api/resorts/) ---
// so the Travel Guide dropdown and the chatbot's resort recognition both
// reflect the real, current resort list instead of a hardcoded sample.
let KNOWN_RESORTS = [];

async function loadResortsFromAPI() {
    const resortSelect = document.getElementById('resortSelect');
    try {
        const response = await fetch('/api/resorts/');
        if (!response.ok) throw new Error('Request failed');
        const resorts = await response.json();

        KNOWN_RESORTS = resorts.map(r => ({
            id: r.id,
            name: r.name,
            mapsQuery: r.maps_query,
            keywords: [r.name.toLowerCase()],
        }));

        if (resortSelect) {
            resortSelect.innerHTML = '';
            resorts.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = r.name;
                opt.setAttribute('data-maps-query', r.maps_query);
                resortSelect.appendChild(opt);
            });
        }
    } catch (err) {
        console.error('Failed to load resorts from API:', err);
        if (resortSelect) {
            resortSelect.innerHTML = '<option value="">Unable to load resorts — please try again later</option>';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadResortsFromAPI);

function findMentionedResort(query) {
    return KNOWN_RESORTS.find(r => query.includes(r.name.toLowerCase()) || r.keywords.some(k => query.includes(k))) || null;
}

// Opens the Travel Guide tab with the resort preselected and starts the GPS route.
function guideToResortFromChat(resortId) {
    document.querySelectorAll('.window-view').forEach(w => w.classList.remove('active-view'));
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active-link'));
    const guide = document.getElementById('guide');
    if (guide) { guide.classList.add('active-view'); guide.scrollTop = 0; }
    document.querySelectorAll('nav .nav-links a[data-target="guide"]').forEach(l => l.classList.add('active-link'));
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.add('solid-nav');
    const sel = document.getElementById('resortSelect');
    if (sel) { sel.value = String(resortId); calculateRouteToResort(); }
    chatWindow.classList.remove('open');
}

function keywordFallbackReply(promptText) {
    const query = promptText.toLowerCase().trim();

    const resort = findMentionedResort(query);
    if (resort) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${resort.mapsQuery}`;
        return `Great choice! 🏝️ <strong>${resort.name}</strong> is one of our resorts here in Bauan, Batangas.<br><br>` +
            `<a href="${mapsUrl}" target="_blank" rel="noopener" style="color:#2a9d8f;font-weight:600;">📍 View on Google Maps</a><br><br>` +
            `Want me to guide you there? ` +
            `<button type="button" onclick="guideToResortFromChat(${resort.id})" style="margin-top:6px;padding:8px 14px;border:none;border-radius:20px;background:#2a9d8f;color:#fff;cursor:pointer;font-weight:600;">🧭 Guide me there</button>`;
    }

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
        return "Hi there! 👋 I’m your Bauan travel guide. Want to explore the best beaches, food spots, activities, or local tips in Bauan?";

    } else if (query.includes('how are you') || query.includes('kamusta ka') || query.includes('kumusta ka')) {
        return "I’m doing great, thanks for asking! 😄 I’m always ready to help you plan a smooth and enjoyable trip to Bauan.";

    } else if (query.includes('who are you') || query.includes('sino ka') || query.includes('what are you')) {
        return "I’m your Bauan travel assistant, here to help with resorts, food, activities, local insights, and trip planning for your visit.";

    } else if (/(thank you|thanks|salamat)\b/.test(query)) {
        return "You’re welcome! 🙌 Feel free to ask me anything else about Bauan.";

    } else if (/(bye|goodbye|see you|paalam|sige na)\b/.test(query)) {
        return "Take care and enjoy your trip to Bauan! 🌊 I’ll be here whenever you need travel help again.";

    } else if (query.includes('joke') || query.includes('funny') || query.includes('patawa')) {
        return "Sure! Why do people love Bauan so much? Because even the beach feels like a stress-free vacation plan. 😄 Want another one?";

    } else if (query.includes('family') || query.includes('toddler') || query.includes('3-day') || query.includes('itinerary') || query.includes('plan')) {
        return "Perfect idea! 😊 For a family-friendly trip, I’d suggest: <br>• <strong>Day 1:</strong> Check in to a beach resort and enjoy a relaxing swim. <br>• <strong>Day 2:</strong> Do an island-hopping trip or visit a beach area with clear water. <br>• <strong>Day 3:</strong> Explore the town center, try local lomi, and enjoy a sunset walk before heading home.";

    } else if (query.includes('budget') || query.includes('cheap') || query.includes('afford') || query.includes('cost') || query.includes('mura')) {
        return "If you’re planning a budget trip, ride a public jeepney from the terminal to town, choose a family-run inn or simple guesthouse, and eat at local eateries. That’s often the best way to enjoy Bauan without overspending.";

    } else if (query.includes('resort') || query.includes('hotel') || query.includes('stay') || query.includes('lodging') || query.includes('room') || query.includes('accommodation')) {
        return "Bauan has plenty of options! 🏝️ You can choose from beachfront resorts, simple family-run inns, and dive-friendly accommodations depending on your budget and preferences.";

    } else if (query.includes('food') || query.includes('eat') || query.includes('restaurant') || query.includes('lomi') || query.includes('cuisine')) {
        return "Don’t miss the famous <strong>Batangas lomi</strong>! 🍜 It’s a local favorite, and seafood is also excellent here. Pair it with fresh local dishes and a quiet seaside view for a memorable meal.";

    } else if (query.includes('activity') || query.includes('activities') || query.includes('things to do') || query.includes('dive') || query.includes('diving') || query.includes('snorkel') || query.includes('swim')) {
        return "There are many great activities in Bauan! 🤿 You can enjoy diving and snorkeling, island hopping, relaxing on the beach, and exploring local heritage spots around town.";

    } else if (query.includes('best time') || query.includes('when to visit') || query.includes('season') || query.includes('weather') || query.includes('kailan')) {
        return "The best time to visit Bauan is during the dry season, usually from November to May. The sea is calmer and the water is clearer, which is ideal for swimming, diving, and island trips.";

    } else if (query.includes('safe') || query.includes('safety') || query.includes('typhoon') || query.includes('weather alert')) {
        return "Bauan is generally safe for travelers, but it’s always smart to check local weather and resort updates before diving or taking a boat, especially during storm season.";

    } else if (query.includes('festival') || query.includes('event') || query.includes('fiesta') || query.includes('celebration')) {
        return "Bauan has lively community festivals and celebrations throughout the year, often featuring food, music, and local culture. The municipal tourism office is the best place to confirm upcoming schedules.";

    } else if (query.includes('book') || query.includes('reserve') || query.includes('reservation') || query.includes('walk-in')) {
        return "Booking in advance is a good idea, especially for popular resorts and dive packages during weekends or peak seasons. Walk-ins may still work for small inns, but reservations are safer.";

    } else {
        return `That sounds interesting! 🧭 Bauan is a great place to explore with its beaches, diving spots, food, and local culture. Ask me about resorts, activities, travel tips, food, or the best time to visit, and I’ll help you out.`;
    }
}
// --- 6. COOKIE CONSENT BANNER ---
const COOKIE_CONSENT_KEY = 'bauanCookieConsent';

function getCookieConsent() {
    try {
        return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (err) {
        return null;
    }
}

function setCookieConsent(value) {
    try {
        localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (err) {
        console.warn('Unable to store cookie preference:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookieConsentBanner');
    if (!banner) return;

    // consent.js shows the banner after the Terms and location dialogs; this is only a fallback.
    const existingConsent = getCookieConsent();
    if (!existingConsent && !window.BauanConsent) {
        banner.style.display = 'flex';
    }

    const acceptBtn = document.getElementById('cookieAcceptBtn');
    const declineBtn = document.getElementById('cookieDeclineBtn');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            setCookieConsent('accepted');
            banner.style.display = 'none';
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            setCookieConsent('declined');
            banner.style.display = 'none';
        });
    }
});

// --- Popular Attractions: clicking a picture goes to that place ---
// If a resort in the database matches the card's keyword, open the Travel Guide with
// that resort selected (map + GPS). Otherwise open the place on Google Maps.
document.addEventListener('click', (e) => {
    const card = e.target.closest('.place-card');
    if (!card) return;
    e.preventDefault();

    const keyword = (card.dataset.resort || '').toLowerCase();
    const place = card.dataset.place || '';
    const resort = KNOWN_RESORTS.find(r => keyword && r.name.toLowerCase().includes(keyword));

    if (resort) {
        guideToResortFromChat(resort.id);
    } else {
        const q = encodeURIComponent(`${place}, Bauan, Batangas, Philippines`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener');
    }
});