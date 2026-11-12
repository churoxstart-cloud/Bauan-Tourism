// --- 1. MULTI-LANGUAGE TRANSLATION DICTIONARY ---
const translations = {
    en: {
        page_title: "Bauan | Batangas Tourism",
        nav_home: "Home",
        nav_about: "About",
        nav_destinations: "Destinations",
        nav_activities: "Activities",
        nav_discover: "Discover",
        nav_guide: "Travel Guide",
        nav_gallery: "Gallery",
        nav_reviews: "Reviews",
        nav_more: "More <i class=\"fa-solid fa-chevron-down nav-dropdown-caret\"></i>",
        home_title: "Discover <span>Bauan</span>",
        home_desc: "Experience pristine beaches, world-class diving spots, and the warm hospitality of Bauan — a hidden coastal gem in the heart of Batangas, Philippines.",
        home_btn: "Explore Destinations →",
        hero_explore: "Explore",
        hero_search: "Search tourist spots or ask Tourist Bot...",
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
        weather_rain: "Rain chance",
        weather_forecast: "5-day forecast",
        map_card_title: "Interactive Town Map",
        planner_tag: "Trip Planning",
        planner_title: "Interactive Itinerary Generator",
        plan_opt_1: "1-Day Day Trip",
        plan_opt_2: "Weekend Getaway (2 Days)",
        plan_opt_adv: "Extreme Adventure & Diving",
        plan_opt_rel: "Relaxed Beach & Food Trip",
        plan_btn: "Generate Plan",
        plan_out_title: "Select your preferences above and click Generate Plan!",
        plan_out_desc: "Your customized travel schedule for Bauan will appear right here.",
        plan_opt_3: "Long Weekend (3 Days)",
        plan_opt_fam: "Family Trip with Kids",
        plan_opt_her: "Heritage, Faith & Culture",
        plan_opt_cou: "Couples & Sunset Escape",
        plan_opt_bud: "Budget Barkada Trip",
        plan_opt_car: "By private car",
        plan_opt_com: "By bus & commute",
        faq_search: "Search questions, e.g. fees, food, commute...",
        faq_tag: "Got Questions?",
        faq_title: "Frequently Asked Questions",
        faq_q1: "How do I get to Bauan from Manila via public commute?",
        faq_a1: "You can ride a bus from terminals in Cubao or Buendia headed straight to the Batangas City Grand Terminal. From the grand terminal, step out to catch a local jeepney bound directly for Bauan town proper.",
        faq_q2: "Are there ATM services available in Bauan?",
        faq_a2: "Yes, multiple major commercial banks and ATMs are stationed around the municipal center. However, it is always recommended to bring sufficient cash if you are visiting remote beach or diving resorts.",
        faq_q3: "Do I need pre-booking for scuba diving packages?",
        faq_a3: "While walk-ins are occasionally accommodated, pre-booking with certified local dive operators is strongly advised especially during weekends and peak dry season months to secure gear and instructors.",
        faq_q4: "When is the best time to visit Bauan?",
        faq_a4: "The dry season, roughly November to May, has the calmest seas and clearest water for swimming and diving. March to May is the warmest and busiest, so book early. From June to October, rain and the habagat (southwest monsoon) can make the sea rough; check the weather and PAGASA advisories before you go.",
        faq_q5: "How do I get to Bauan by private car?",
        faq_a5: "From Metro Manila, take SLEX, continue to the STAR Tollway, and exit toward Batangas City, then follow the national road to Bauan. Without heavy traffic the drive is about 2 to 3 hours. Most beach and dive resorts are in coastal barangays such as Sampaguita, San Pablo and La Liga Locloc, so use the Travel Guide map for exact directions.",
        faq_q6: "How do I get around once I'm in Bauan?",
        faq_a6: "Jeepneys run along the main roads, and tricycles can take you from the town proper or the highway to resorts in the coastal barangays. Agree on the fare before the ride, especially for longer trips to beach areas. If you have a lot of gear (for example, dive equipment), a private car or a resort pick-up is easier.",
        faq_q7: "Can I book a resort through this website?",
        faq_a7: "Not yet. This site is run by the Municipal Tourism Office to help you find places; it does not take bookings or payments. Open a resort's page (tap Explore) to see its contact number, then reserve and confirm rates directly with the resort.",
        faq_q8: "Are there entrance or environmental fees?",
        faq_a8: "Resorts charge their own entrance or day-use fees, and some dive sites and marine sanctuaries collect a separate fee used for their protection. Amounts can change, so confirm with the resort, your dive operator, or the MTO before you go. Each place's page shows the fee if the MTO has posted it.",
        faq_q9: "What should I bring for a beach or dive trip?",
        faq_a9: "Bring reef-safe sunscreen, a hat, drinking water, a reusable bottle, a dry bag, water shoes, cash for small stores and tricycles, and a valid ID. Divers should bring their certification card and logbook. Please take your trash home with you: Bauan's reefs and beaches depend on it.",
        faq_q10: "What are the rules in the marine sanctuaries?",
        faq_a10: "Do not touch, stand on, or collect corals, shells or marine life, and do not feed the fish. Fishing and spearfishing are not allowed inside sanctuaries. Follow your dive guide, keep good buoyancy, and use only mooring buoys instead of dropping anchor on the reef.",
        faq_q11: "What local food should I try?",
        faq_a11: "Try Batangas lomi (thick noodle soup), bulalo (beef shank soup), goto, tapang Taal, and a cup of strong kapeng barako. Fresh seafood is easy to find near the coast, and the Bauan public market is a good stop for pasalubong.",
        faq_q12: "Is Bauan good for families with kids?",
        faq_a12: "Yes. Many resorts have pools and shallow areas, and short trips such as a beach day, a church visit and a food stop work well with kids. Some shorelines are rocky or drop off quickly, so bring water shoes, keep children supervised, and ask the resort where it is safe to swim.",
        faq_q13: "Who do I contact in an emergency or for tourist assistance?",
        faq_a13: "For emergencies, call 911. For tourist information, lost items, or complaints about a tourism establishment, contact the Municipal Tourism Office of Bauan through the Contact page. You can also ask the front desk of your resort for the nearest police station or hospital.",
        gallery_heading: "Photo Gallery",
        gallery_subheading: "Visual highlights capturing the beauty of Bauan.",
        gallery_tag: "Captured Moments",
        gallery_title: "Glimpses of Bauan",
        gallery_upload_heading: "Add Your Photo to the Gallery",
        gallery_upload_submit: "Add to Gallery",
        gallery_review_note: "Photos appear in the gallery after the Municipal Tourism Office reviews them. Please share only your own photos of Bauan.",
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
        chat_input_placeholder: "Ask Tourist Bot...",
        cookie_policy_link: "Cookie Policy",
        footer_contact_label: "Contact",
        menu_header_title: "Navigation Menu",
        cookiepolicy_contact_link: "Contact page",
        footer_quick: "Quick Links",
        footer_newsletter: "Newsletter",
        footer_dest_label: "Destinations",
        footer_about_label: "About Bauan",
        footer_gallery_label: "Gallery",
        home_badge: "Municipal Tourism Office • Bauan, Batangas",
    },
    tl: {
        page_title: "Bauan | Turismo sa Batangas",
        nav_home: "Tahanan",
        nav_about: "Tungkol",
        nav_destinations: "Destinasyon",
        nav_activities: "Gawain",
        nav_discover: "Tuklasin",
        nav_guide: "Gabay sa Paglalakbay",
        nav_gallery: "Larawan",
        nav_reviews: "Mga Rebyu",
        nav_more: "Iba Pa <i class=\"fa-solid fa-chevron-down nav-dropdown-caret\"></i>",
        home_title: "Tuklasin ang <span>Bauan</span>",
        home_desc: "Damhin ang malilinis na dalampasigan, world-class na diving spots, at ang mainit na pagtanggap ng Bauan — isang nakatagong hiyas sa puso ng Batangas, Pilipinas.",
        home_btn: "Galugarin ang mga Destinasyon →",
        hero_explore: "Tuklasin",
        hero_search: "Maghanap ng pasyalan o magtanong kay Tourist Bot...",
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
        weather_rain: "Tsansa ng ulan",
        weather_forecast: "Panahon sa susunod na 5 araw",
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
        plan_opt_3: "Long Weekend (3 Araw)",
        plan_opt_fam: "Pampamilya, may kasamang bata",
        plan_opt_her: "Kasaysayan, Pananampalataya at Kultura",
        plan_opt_cou: "Para sa Magkasintahan at Sunset",
        plan_opt_bud: "Tipid na Barkada Trip",
        plan_opt_car: "Sariling sasakyan",
        plan_opt_com: "Bus at commute",
        faq_search: "Maghanap ng tanong, hal. bayad, pagkain, commute...",
        faq_tag: "May Tanong Ba?",
        faq_title: "Mga Madalas Itanong",
        faq_q1: "Paano pumunta sa Bauan mula Maynila sa pamamagitan ng bus?",
        faq_q1: "Paano pumunta sa Bauan mula Maynila sa pamamagitan ng pampublikong sasakyan?",
        faq_a1: "Maaari kang sumakay ng bus mula Cubao o Buendia papuntang Batangas City Grand Terminal. Pagbaba roon, sumakay ng jeep papuntang Bauan.",
        faq_q2: "May mga ATM ba sa Bauan?",
        faq_a2: "Oo, maraming bangko at ATM sa paligid ng munisipyo. Subalit, mainam pa ring magdala ng sapat na cash kung pupunta sa liblib na resort.",
        faq_q3: "Kailangan ba ng pre-booking para sa scuba diving?",
        faq_a3: "Bagamat tinatanggap ang walk-in, mainam na mag-book nang maaga sa mga certified dive operator lalo na tuwing weekend.",
        faq_q4: "Kailan ang pinakamagandang panahon para bumisita sa Bauan?",
        faq_a4: "Ang tag-araw, mga Nobyembre hanggang Mayo, ang may pinakakalmadong dagat at pinakamalinaw na tubig para sa paglangoy at diving. Pinakamainit at pinakamaraming tao mula Marso hanggang Mayo, kaya mag-book nang maaga. Mula Hunyo hanggang Oktubre, maaaring maalon dahil sa ulan at habagat; tingnan muna ang panahon at abiso ng PAGASA.",
        faq_q5: "Paano pumunta sa Bauan gamit ang sariling sasakyan?",
        faq_a5: "Mula Metro Manila, dumaan sa SLEX, tumuloy sa STAR Tollway, at lumabas papuntang Batangas City, saka sundan ang national road papuntang Bauan. Kung hindi trapik, mga 2 hanggang 3 oras ang biyahe. Karamihan ng beach at dive resort ay nasa mga barangay sa baybayin gaya ng Sampaguita, San Pablo at La Liga Locloc; gamitin ang Travel Guide map para sa eksaktong direksyon.",
        faq_q6: "Paano umikot sa loob ng Bauan?",
        faq_a6: "May mga jeep sa mga pangunahing kalsada, at may tricycle mula sa bayan o highway papunta sa mga resort sa baybayin. Pag-usapan muna ang pamasahe bago sumakay, lalo na sa malayong beach area. Kung marami kang dala (gaya ng diving gear), mas madali ang sariling sasakyan o pick-up ng resort.",
        faq_q7: "Puwede bang mag-book ng resort dito sa website?",
        faq_a7: "Hindi pa. Pinapatakbo ito ng Municipal Tourism Office para tulungan kang makahanap ng pupuntahan; hindi ito tumatanggap ng booking o bayad. Buksan ang page ng resort (pindutin ang Explore) para makita ang contact number, saka direktang mag-reserve at kumpirmahin ang presyo sa resort.",
        faq_q8: "May bayad ba sa pagpasok o environmental fee?",
        faq_a8: "May sariling entrance o day-use fee ang mga resort, at may hiwalay na bayad ang ilang dive site at marine sanctuary para sa pangangalaga nito. Maaaring magbago ang halaga, kaya kumpirmahin muna sa resort, dive operator o sa MTO. Makikita ang fee sa page ng bawat lugar kung na-post na ito ng MTO.",
        faq_q9: "Ano ang dapat dalhin sa beach o dive trip?",
        faq_a9: "Magdala ng reef-safe sunscreen, sombrero, inuming tubig, reusable na bote, dry bag, water shoes, cash para sa maliliit na tindahan at tricycle, at valid ID. Dalhin ng mga diver ang certification card at logbook. Iuwi ang sariling basura: nakasalalay dito ang mga bahura at dalampasigan ng Bauan.",
        faq_q10: "Ano ang mga patakaran sa mga marine sanctuary?",
        faq_a10: "Huwag hawakan, tapakan o kunin ang mga coral, kabibe o hayop-dagat, at huwag pakainin ang mga isda. Bawal ang pangingisda at spearfishing sa loob ng sanctuary. Sundin ang dive guide, panatilihin ang tamang buoyancy, at gumamit ng mooring buoy sa halip na mag-angkla sa bahura.",
        faq_q11: "Anong lokal na pagkain ang dapat tikman?",
        faq_a11: "Tikman ang lomi ng Batangas, bulalo, goto, tapang Taal, at isang tasa ng matapang na kapeng barako. Madaling makahanap ng sariwang seafood malapit sa baybayin, at magandang puntahan ang pamilihang bayan ng Bauan para sa pasalubong.",
        faq_q12: "Maganda ba ang Bauan para sa pamilyang may kasamang bata?",
        faq_a12: "Oo. Maraming resort ang may pool at mababaw na bahagi, at bagay sa mga bata ang maiikling lakad gaya ng beach day, pagbisita sa simbahan at food stop. Mabato o biglang lumalalim ang ilang bahagi ng dagat, kaya magdala ng water shoes, bantayan ang mga bata, at itanong sa resort kung saan ligtas lumangoy.",
        faq_q13: "Sino ang tatawagan kapag may emergency o kailangan ng tulong?",
        faq_a13: "Para sa emergency, tumawag sa 911. Para sa impormasyon, nawawalang gamit, o reklamo tungkol sa isang tourism establishment, kontakin ang Municipal Tourism Office ng Bauan sa Contact page. Maaari ring itanong sa front desk ng resort ang pinakamalapit na pulis o ospital.",
        gallery_heading: "Gallery ng Larawan",
        gallery_subheading: "Mga visual na highlight na nagpapakita ng ganda ng Bauan.",
        gallery_tag: "Mga Sandali",
        gallery_title: "Sulyap sa Bauan",
        gallery_upload_heading: "Idagdag ang Iyong Larawan sa Gallery",
        gallery_upload_submit: "Idagdag sa Gallery",
        gallery_review_note: "Lalabas ang larawan sa gallery kapag na-review na ng Municipal Tourism Office. Sariling kuha mo lang na larawan ng Bauan ang i-share.",
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
        chat_input_placeholder: "Magtanong kay Tourist Bot...",
        cookie_policy_link: "Patakaran sa Cookie",
        footer_contact_label: "Makipag-ugnayan",
        menu_header_title: "Menu",
        cookiepolicy_contact_link: "Contact page",
        footer_quick: "Mabilisang Link",
        footer_newsletter: "Newsletter",
        footer_dest_label: "Mga Destinasyon",
        footer_about_label: "Tungkol sa Bauan",
        footer_gallery_label: "Gallery",
        home_badge: "Municipal Tourism Office • Bauan, Batangas",
    },
    btg: {
        page_title: "Bauan | Pasyalan sa Batangas",
        nav_home: "Tahanan",
        nav_discover: "Tuklasin",
        nav_guide: "Gabay sa Pasyal",
        hero_explore: "Tingnan",
        hero_search: "Maghanap ng pasyalan o magtanong kay Tourist Bot, ala eh...",
        footer_desc: "Ire ang gabay mo sa pagpasyal sa pagkagandang bayan ng Bauan, Batangas. Ala eh, tuklasin mo ang malilinis na dalampasigan, ang bantog na diving, at ang mayamang kultura nating Batangueño.",
        footer_contact: "Kontakin Kami",
        footer_resort_owner_link: "May-ari ka ga ng resort? Makipag-partner sa Tourism Office &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas. Nakareserba ang Lahat ng Karapatan.",
        about_heading: "Ang Aming Kwento",
        about_subheading: "Kilalanin mo ang kasaysayan, kultura, at buhay-dagat ng Bauan.",
        about_tag: "Tungkol sa Bayan",
        about_title: "Mayamang Pamana sa Tabing-Dagat",
        about_p1: "Ang Bauan ay isang pangunahing first-class na bayan sa lalawigan ng Batangas. Kilala ire sa masiglang industriya sa dagat, sa mga shipyard, at sa malalim na tradisyong pandagat, kaya dito ay sabay mong makikita ang sipag ng industriya at ang ganda ng kalikasan.",
        about_p2: "Bukod pa riyan, ala eh, bantog din ang Bauan sa malalim na kasaysayang panrelihiyon, sa masasayang pista, at sa lapit nito sa ilan sa pinakamayamang buhay-dagat sa buong Pilipinas.",
        dest_heading: "Mga Pangunahing Pasyalan",
        dest_subheading: "Libutin mo ang pinakamagagandang tanawin at pook sa Bauan.",
        dest_tag: "Dapat Mong Puntahan",
        dest_title: "Sikat na Pasyalan",
        dest_1_title: "Sampaguita Beach",
        dest_1_desc: "Tahimik na dalampasigan na swak sa paglangoy, pagpapahinga sa initan, at panonood ng pagkagandang paglubog ng araw sa Batangas.",
        dest_2_title: "Bauan Marine Sanctuaries",
        dest_2_desc: "Bantog na diving spot na may makukulay na coral reef, mga pawikan, at napakalinaw na tubig. Ala eh, pagkaganda sa ilalim ng dagat!",
        dest_3_title: "Immaculate Conception Parish",
        dest_3_desc: "Makasaysayang simbahan na tanda ng malalim na pananampalataya at kultura ng mga taga-Bauan.",
        guide_heading: "Kumpletong Gabay sa Pasyal",
        guide_subheading: "Panahon, direksyon sa GPS papunta sa mga resort, mga pista, plano ng lakad, at mga madalas itanong.",
        guide_gps_tag: "Live na GPS",
        guide_gps_title: "Hanapin at Puntahan ang mga Resort sa Bauan",
        guide_gps_desc: "Gamitin ang GPS ng cellphone mo para makita ang ruta at layo papunta sa mga resort dine sa Bauan.",
        guide_gps_btn: "Kunin ang Direksyon sa GPS",
        guide_gps_link: "Buksan sa Google Maps",
        guide_weather_tag: "Lugar at Panahon",
        guide_weather_title: "Live na Panahon at Mapa",
        weather_card_title: "Panahon dine sa Bauan",
        weather_humidity: "Alinsangan",
        weather_wind: "Hangin",
        weather_best: "Pinakamagandang buwan",
        weather_rain: "Tsansa ng ulan",
        weather_forecast: "Panahon sa susunod na 5 araw",
        map_card_title: "Mapa ng Bayan",
        planner_tag: "Plano ng Lakad",
        planner_title: "Gumawa ng Plano ng Pasyal",
        plan_opt_1: "Isang Araw na Lakad",
        plan_opt_2: "Weekend na Pasyal (2 Araw)",
        plan_opt_adv: "Matinding Adventure at Diving",
        plan_opt_rel: "Relaks sa Beach at Kainan",
        plan_btn: "Gumawa ng Plano",
        plan_out_title: "Pumili ka sa itaas at pindutin ang Gumawa ng Plano!",
        plan_out_desc: "Dine lalabas ang plano ng pasyal mo sa Bauan.",
        plan_opt_3: "Long Weekend (3 Araw)",
        plan_opt_fam: "Pampamilya, may kasamang bata",
        plan_opt_her: "Kasaysayan, Pananampalataya at Kultura",
        plan_opt_cou: "Para sa Magkasintahan at Sunset",
        plan_opt_bud: "Tipid na Lakad ng Barkada",
        plan_opt_car: "Sariling sasakyan",
        plan_opt_com: "Bus at commute",
        faq_search: "Maghanap ng tanong, hal. bayad, kainan, commute...",
        faq_tag: "May Tanong Ka Ga?",
        faq_title: "Mga Madalas Itanong",
        faq_q1: "Paano ga pumunta sa Bauan mula Maynila kung magko-commute?",
        faq_a1: "Sumakay ka ng bus sa Cubao o Buendia na diretso sa Batangas City Grand Terminal. Pagbaba mo roon, sumakay ka ng jeep na papuntang bayan ng Bauan. Ala eh, ganoon lang kadali!",
        faq_q2: "May ATM ga sa Bauan?",
        faq_a2: "Oo, mayroon. Maraming bangko at ATM sa paligid ng munisipyo. Pero magdala ka pa rin ng sapat na cash kung pupunta ka sa malalayong beach o dive resort.",
        faq_q3: "Kailangan ga mag-book nang maaga para sa scuba diving?",
        faq_a3: "Minsan ay tumatanggap ng walk-in, pero mas mainam na mag-book nang maaga sa mga certified na dive operator, lalo na kapag weekend at tag-araw, para sigurado ang gamit at instructor mo.",
        faq_q4: "Kailan ga ang pinakamagandang panahon para pumasyal sa Bauan?",
        faq_a4: "Tuwing tag-araw, mga Nobyembre hanggang Mayo, kalmado ang dagat at malinaw ang tubig, kaya swak sa paglangoy at diving. Pinakamainit at pinakamaraming tao mula Marso hanggang Mayo, kaya mag-book ka nang maaga. Mula Hunyo hanggang Oktubre, maaaring maalon dahil sa ulan at habagat, kaya tingnan mo muna ang panahon at abiso ng PAGASA bago umalis.",
        faq_q5: "Paano ga pumunta sa Bauan kung may sariling sasakyan?",
        faq_a5: "Mula Metro Manila, dumaan ka sa SLEX, tumuloy sa STAR Tollway, lumabas papuntang Batangas City, at sundan ang national road papuntang Bauan. Kung hindi trapik, mga 2 hanggang 3 oras lang ang biyahe. Karamihan ng beach at dive resort ay nasa mga barangay sa tabing-dagat gaya ng Sampaguita, San Pablo at La Liga Locloc, kaya gamitin mo ang mapa sa Travel Guide para sa eksaktong daan.",
        faq_q6: "Paano ga umikot dine sa loob ng Bauan?",
        faq_a6: "May jeep sa mga pangunahing kalsada, at may tricycle mula sa bayan o highway papunta sa mga resort sa tabing-dagat. Pag-usapan muna ninyo ang pamasahe bago sumakay, lalo na kung malayo ang beach. Kung marami kang bitbit gaya ng diving gear, mas madali ang sariling sasakyan o ang pick-up ng resort.",
        faq_q7: "Puwede ga mag-book ng resort dine sa website?",
        faq_a7: "Hindi pa. Ang Municipal Tourism Office ang nagpapatakbo nire para tulungan kang makahanap ng pasyalan; hindi ito tumatanggap ng booking o bayad. Buksan mo ang page ng resort (pindutin ang Tingnan) para makita ang numero nila, saka ka direktang mag-reserve at magtanong ng presyo sa resort.",
        faq_q8: "May bayad ga sa pagpasok o environmental fee?",
        faq_a8: "May sariling entrance o day-use fee ang mga resort, at may hiwalay na bayad ang ilang dive site at marine sanctuary para sa pangangalaga ng mga ire. Nagbabago-bago ang halaga, kaya magtanong ka muna sa resort, sa dive operator mo, o sa MTO. Makikita rin ang fee sa page ng bawat pasyalan kung naipaskil na ng MTO.",
        faq_q9: "Ano ga ang dapat dalhin sa beach o dive trip?",
        faq_a9: "Magdala ka ng reef-safe na sunscreen, sombrero, inuming tubig, reusable na bote, dry bag, water shoes, cash para sa tindahan at tricycle, at valid ID. Sa mga diver, dalhin ang certification card at logbook. At ala eh, iuwi mo ang sarili mong basura: nakasalalay dine ang mga bahura at dalampasigan ng Bauan.",
        faq_q10: "Ano ga ang mga patakaran sa marine sanctuary?",
        faq_a10: "Huwag hawakan, tapakan o kunin ang mga coral, kabibe at hayop-dagat, at huwag pakainin ang mga isda. Bawal ang pangingisda at pamamana ng isda sa loob ng sanctuary. Sundin ang dive guide, panatilihin ang tamang buoyancy, at sa mooring buoy lang magtali, huwag mag-angkla sa bahura.",
        faq_q11: "Anong pagkaing Batangueño ang dapat tikman?",
        faq_a11: "Ala eh, tikman mo ang lomi ng Batangas, bulalo, goto, tapang Taal, at isang tasa ng matapang na kapeng barako! Madali ring makahanap ng sariwang seafood sa may tabing-dagat, at ang palengke ng Bauan ay magandang puntahan para sa pasalubong.",
        faq_q12: "Maganda ga ang Bauan para sa pamilyang may kasamang bata?",
        faq_a12: "Oo naman. Maraming resort ang may pool at mababaw na parte, at bagay sa mga bata ang maiikling lakad gaya ng beach day, pagsimba, at kainan. Mabato o biglang lumalalim ang ilang bahagi ng dagat, kaya magdala ng water shoes, bantayan ang mga bata, at itanong sa resort kung saan ligtas lumangoy.",
        faq_q13: "Sino ga ang tatawagan kapag may emergency o kailangan ng tulong?",
        faq_a13: "Kapag emergency, tumawag sa 911. Para sa impormasyon, nawawalang gamit, o reklamo tungkol sa isang resort o establisimyento, kontakin ang Municipal Tourism Office ng Bauan sa Contact page. Puwede mo ring itanong sa front desk ng resort kung saan ang pinakamalapit na pulis o ospital.",
        gallery_heading: "Mga Larawan",
        gallery_subheading: "Mga larawang nagpapakita ng ganda ng Bauan.",
        gallery_tag: "Mga Sandali",
        gallery_title: "Sulyap sa Bauan",
        gallery_upload_heading: "Idagdag ang Iyong Larawan",
        gallery_upload_submit: "Idagdag sa Gallery",
        gallery_review_note: "Lalabas ang larawan mo sa gallery kapag na-review na ng Municipal Tourism Office. Sariling kuha mo lang na larawan ng Bauan ang i-share, ha.",
        reviews_heading: "Kwento ng mga Namasyal",
        reviews_subheading: "Magbasa at magbahagi ng sarili mong kwento ng pasyal sa Bauan.",
        reviews_tag: "Mga Rebyu at Kwento",
        reviews_title: "Karanasan ng mga Namasyal",
        form_heading: "Ikwento ang Pasyal Mo sa Bauan",
        form_submit: "I-post ang Rebyu at Larawan",
        nav_contact: "Kontakin",
        contact_heading: "Kontakin Kami",
        contact_subheading: "May tanong ka ga tungkol sa Bauan? Sumulat ka lang at sasagutin ka namin.",
        contact_tag: "Makipag-ugnayan",
        contact_title: "Gusto Naming Marinig Ka",
        contact_form_heading: "Magpadala ng Mensahe",
        contact_form_submit: "Ipadala",
        cookie_text: "Gumagamit kami ng cookies para gumanda ang pag-browse mo, matandaan ang napili mong wika, at masuri ang dami ng bumibisita sa site. Basahin ang aming <a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">Patakaran sa Cookie</a> para sa detalye.",
        cookie_accept: "Sige",
        cookie_decline: "Huwag",
        cookiepolicy_heading: "Patakaran sa Cookie",
        cookiepolicy_subheading: "Paano ginagamit ng Discover Bauan ang cookies, at paano mo ito makokontrol.",
        cookiepolicy_tag: "Iyong Privacy",
        cookiepolicy_title: "Patakaran sa Cookie",
        cookiepolicy_p1: "<strong>Ano ga ang cookies?</strong> Ang cookies ay maliliit na text file na naiipon sa device mo kapag bumisita ka sa isang website. Tinutulungan nito ang site na matandaan ang tungkol sa pagbisita mo, gaya ng napili mong wika at kung nasagot mo na ang aming cookie banner.",
        cookiepolicy_p2: "<strong>Paano namin ginagamit ang cookies.</strong> Gumagamit ang Discover Bauan ng cookies at local storage para sa: (1) pagtanda sa pinili mo tungkol sa cookies para hindi na ito lumabas tuwing bibisita ka, (2) pagtanda sa napili mong wika, at (3) maayos na takbo ng site gaya ng chat at mga form.",
        cookiepolicy_p3: "<strong>Content mula sa ibang kumpanya.</strong> Ang ilang bahagi ng site na ire, gaya ng Google Fonts, Font Awesome icons, at mga naka-embed na larawan, ay galing sa ibang server. Maaari silang maglagay ng sarili nilang cookies o kumuha ng basic na technical data gaya ng IP address mo.",
        cookiepolicy_p4: "<strong>Ang iyong pagpipilian.</strong> Puwede mong tanggapin o tanggihan ang mga hindi kailangang cookies sa banner na lumalabas sa una mong pagbisita. Puwede mo ring burahin ang cookies at data ng site anumang oras sa settings ng browser mo, at mare-reset ang mga napili mo.",
        cookiepolicy_p5: "<strong>Kontakin kami.</strong> Kung may tanong ka tungkol sa Patakarang ito sa Cookie, makipag-ugnayan sa amin sa aming <a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">Contact page</a>.",
        cookiepolicy_updated: "Huling na-update: Setyembre 2026.",
        chat_welcome: "🧭 Ala eh, kumusta ka! Ako si Tourist Bot, ang kabarkada mo dine sa Bauan. Itanong mo lang kung ano ang gusto mong malaman: resort, kainan, lakad, kahit ano pa ire!",
        chat_subtitle: "Kabarkada Mo sa Pasyal sa Bauan",
        terms_modal_title: "Bago ka tumuloy",
        terms_modal_intro: "Pakibasa muna ang aming Mga Tuntunin at Kundisyon. Kailangan mong sumang-ayon para magamit ang site.",
        terms_agree_label: "Nabasa ko at sumasang-ayon ako sa Mga Tuntunin at Kundisyon at sa Abiso sa Privacy.",
        terms_scroll_hint: "I-tsek ang kahon para tumuloy.",
        terms_agree_btn: "Sumang-ayon at Tumuloy",
        loc_title: "Kumpirmahin kung nasaan ka",
        loc_intro: "Payagan ang Discover Bauan na gamitin ang lokasyon mo para maipakita ang daan papunta sa mga resort at pasyalan, at para makapagmungkahi si Tourist Bot ng mga malapit sa iyo.",
        loc_note: "Hihingi ng pahintulot ang browser mo pagkatapos nire. Hindi namin sine-save ang lokasyon mo.",
        loc_confirm_q: "Dine ka ga ngayon?",
        loc_not_now: "Saka na",
        loc_allow: "Payagan at hanapin ako",
        loc_retry: "Hanapin ulit",
        loc_yes: "Oo, tama",
        loc_try_again: "Subukan ulit",
        loc_close: "Isara",
        chat_input_placeholder: "Magtanong kay Tourist Bot...",
        cookie_policy_link: "Patakaran sa Cookie",
        footer_contact_label: "Kontakin",
        menu_header_title: "Menu",
        cookiepolicy_contact_link: "Contact page",
        footer_quick: "Mabilisang Link",
        footer_newsletter: "Balita",
        footer_dest_label: "Mga Pasyalan",
        footer_about_label: "Tungkol sa Bauan",
        footer_gallery_label: "Mga Larawan",
        home_badge: "Municipal Tourism Office • Bauan, Batangas"
    },
    ko: {
        page_title: "바우안 | 바탕가스 관광",
        nav_home: "홈",
        nav_discover: "둘러보기",
        nav_guide: "여행 가이드",
        hero_explore: "자세히 보기",
        hero_search: "관광지를 검색하거나 투어리스트 봇에게 물어보세요...",
        footer_desc: "바탕가스의 아름다운 해안 마을 바우안을 위한 여행 가이드입니다. 깨끗한 해변, 세계적인 다이빙, 풍부한 필리핀 문화를 만나 보세요.",
        footer_contact: "문의하기",
        footer_resort_owner_link: "리조트 운영자이신가요? 관광사무소와 함께하세요 &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas. All Rights Reserved.",
        about_heading: "우리의 이야기",
        about_subheading: "바우안의 역사, 문화, 그리고 바다와 함께한 정체성을 알아보세요.",
        about_tag: "마을 소개",
        about_title: "바다와 함께한 풍요로운 유산",
        about_p1: "바우안은 바탕가스주의 대표적인 1급 지방자치단체입니다. 활발한 해양 산업과 조선소, 깊은 해안 전통으로 잘 알려져 있으며, 산업의 활력과 자연의 아름다움을 함께 느낄 수 있는 곳입니다.",
        about_p2: "바우안은 경제적 중요성뿐 아니라 오랜 종교 역사, 활기찬 지역 축제, 그리고 필리핀에서 손꼽히는 해양 생물 다양성 지역과 가까운 곳으로도 사랑받고 있습니다.",
        dest_heading: "추천 여행지",
        dest_subheading: "바우안의 가장 아름다운 해안 풍경과 명소를 둘러보세요.",
        dest_tag: "꼭 가봐야 할 곳",
        dest_title: "인기 명소",
        dest_1_title: "삼파귀타 비치",
        dest_1_desc: "수영과 일광욕, 그리고 멋진 바탕가스의 석양을 즐기기 좋은 한적한 해변입니다.",
        dest_2_title: "바우안 해양 보호구역",
        dest_2_desc: "화려한 산호초와 바다거북, 맑은 시야로 유명한 세계적인 다이빙 포인트입니다.",
        dest_3_title: "원죄 없으신 잉태 성당",
        dest_3_desc: "바우안의 깊은 신앙과 문화유산을 상징하는 역사적인 건축 명소입니다.",
        guide_heading: "종합 여행 가이드",
        guide_subheading: "날씨 정보, GPS 리조트 길 안내, 지역 축제, 여행 일정, 자주 묻는 질문.",
        guide_gps_tag: "실시간 GPS 길 안내",
        guide_gps_title: "바우안 리조트 찾기 및 길 안내",
        guide_gps_desc: "기기의 실시간 GPS로 바우안 리조트까지의 경로와 거리를 확인하세요.",
        guide_gps_btn: "GPS 길 안내 받기",
        guide_gps_link: "Google 지도에서 길 안내 열기",
        guide_weather_tag: "위치 및 기후",
        guide_weather_title: "실시간 날씨 및 지도",
        weather_card_title: "바우안 날씨",
        weather_humidity: "습도",
        weather_wind: "바람",
        weather_best: "여행 적기",
        weather_rain: "강수 확률",
        weather_forecast: "5일 예보",
        map_card_title: "마을 지도",
        planner_tag: "여행 계획",
        planner_title: "맞춤 여행 일정 만들기",
        plan_opt_1: "당일치기 (1일)",
        plan_opt_2: "주말 여행 (2일)",
        plan_opt_adv: "익스트림 어드벤처 & 다이빙",
        plan_opt_rel: "여유로운 해변 & 맛집 여행",
        plan_btn: "일정 만들기",
        plan_out_title: "위에서 원하는 옵션을 고르고 일정 만들기를 누르세요!",
        plan_out_desc: "맞춤 바우안 여행 일정이 여기에 표시됩니다.",
        plan_opt_3: "긴 주말 여행 (3일)",
        plan_opt_fam: "아이와 함께하는 가족 여행",
        plan_opt_her: "역사, 신앙 & 문화",
        plan_opt_cou: "커플 & 석양 여행",
        plan_opt_bud: "알뜰 친구 여행",
        plan_opt_car: "자가용 이용",
        plan_opt_com: "버스 & 대중교통 이용",
        faq_search: "질문 검색 (예: 요금, 음식, 교통...)",
        faq_tag: "궁금한 점이 있으신가요?",
        faq_title: "자주 묻는 질문",
        faq_q1: "마닐라에서 대중교통으로 바우안에 어떻게 가나요?",
        faq_a1: "쿠바오(Cubao) 또는 부엔디아(Buendia) 터미널에서 바탕가스 시티 그랜드 터미널행 버스를 타세요. 그랜드 터미널에서 바우안 시내로 가는 지프니를 타면 됩니다.",
        faq_q2: "바우안에 ATM이 있나요?",
        faq_a2: "네, 시청 주변에 여러 주요 은행과 ATM이 있습니다. 다만 외곽의 해변이나 다이빙 리조트에 가신다면 현금을 넉넉히 준비하시는 것이 좋습니다.",
        faq_q3: "스쿠버 다이빙 패키지는 미리 예약해야 하나요?",
        faq_a3: "현장 방문도 가능한 경우가 있지만, 특히 주말과 건기 성수기에는 장비와 강사를 확보하기 위해 공인 다이빙 업체에 미리 예약하시는 것을 강력히 권장합니다.",
        faq_q4: "바우안을 방문하기 가장 좋은 시기는 언제인가요?",
        faq_a4: "대략 11월부터 5월까지인 건기에는 바다가 가장 잔잔하고 물이 맑아 수영과 다이빙에 좋습니다. 3월부터 5월은 가장 덥고 붐비므로 일찍 예약하세요. 6월부터 10월까지는 비와 하바갓(남서 계절풍)으로 바다가 거칠 수 있으니 출발 전에 날씨와 PAGASA(필리핀 기상청) 주의보를 확인하세요.",
        faq_q5: "자가용으로 바우안에 어떻게 가나요?",
        faq_a5: "메트로 마닐라에서 SLEX를 타고 STAR 톨웨이로 이어서 바탕가스 시티 방면으로 나간 뒤, 국도를 따라 바우안으로 가세요. 교통이 막히지 않으면 약 2~3시간 걸립니다. 대부분의 해변 및 다이빙 리조트는 삼파귀타, 산파블로, 라리가 로클록 같은 해안 바랑가이에 있으니 정확한 길은 여행 가이드 지도를 이용하세요.",
        faq_q6: "바우안 안에서는 어떻게 이동하나요?",
        faq_a6: "주요 도로에는 지프니가 다니고, 시내나 고속도로에서 해안 바랑가이의 리조트까지는 트라이시클을 이용할 수 있습니다. 특히 해변 지역처럼 먼 거리라면 탑승 전에 요금을 미리 정하세요. 다이빙 장비처럼 짐이 많다면 자가용이나 리조트 픽업이 편리합니다.",
        faq_q7: "이 웹사이트에서 리조트를 예약할 수 있나요?",
        faq_a7: "아직은 불가능합니다. 이 사이트는 관광사무소가 여행지 정보를 안내하기 위해 운영하며, 예약이나 결제는 받지 않습니다. 리조트 페이지(자세히 보기)에서 연락처를 확인한 뒤 리조트에 직접 예약하고 요금을 확인하세요.",
        faq_q8: "입장료나 환경 보호 요금이 있나요?",
        faq_a8: "리조트마다 자체 입장료 또는 당일 이용료가 있으며, 일부 다이빙 포인트와 해양 보호구역은 보호 활동을 위한 별도 요금을 받습니다. 금액은 바뀔 수 있으니 출발 전에 리조트, 다이빙 업체 또는 관광사무소(MTO)에 확인하세요. 관광사무소가 등록한 경우 각 장소 페이지에서 요금을 볼 수 있습니다.",
        faq_q9: "해변이나 다이빙 여행에 무엇을 챙겨야 하나요?",
        faq_a9: "산호에 안전한 선크림, 모자, 마실 물, 다회용 물병, 방수 가방, 아쿠아슈즈, 작은 가게와 트라이시클용 현금, 유효한 신분증을 챙기세요. 다이버는 자격증 카드와 로그북을 가져오세요. 쓰레기는 꼭 가져가 주세요. 바우안의 산호초와 해변을 지키는 일입니다.",
        faq_q10: "해양 보호구역의 규칙은 무엇인가요?",
        faq_a10: "산호, 조개, 해양 생물을 만지거나 밟거나 채집하지 말고, 물고기에게 먹이를 주지 마세요. 보호구역 안에서는 낚시와 작살 낚시가 금지되어 있습니다. 다이빙 가이드의 안내를 따르고, 부력을 잘 유지하며, 산호초에 닻을 내리지 말고 계류 부표만 이용하세요.",
        faq_q11: "어떤 현지 음식을 맛봐야 하나요?",
        faq_a11: "바탕가스 로미(걸쭉한 국수), 불랄로(소 정강이 수프), 고토, 타팡 타알, 그리고 진한 카펭 바라코 커피를 꼭 맛보세요. 해안 근처에서는 신선한 해산물을 쉽게 찾을 수 있고, 바우안 재래시장은 기념품(파살루봉)을 사기 좋은 곳입니다.",
        faq_q12: "아이와 함께하는 가족 여행지로 좋은가요?",
        faq_a12: "네. 많은 리조트에 수영장과 얕은 물가가 있고, 해변 나들이, 성당 방문, 맛집 탐방 같은 짧은 일정은 아이들과 함께하기 좋습니다. 일부 해안은 바위가 많거나 갑자기 깊어지니 아쿠아슈즈를 챙기고, 아이들을 항상 지켜보며, 리조트에 안전한 수영 구역을 물어보세요.",
        faq_q13: "긴급 상황이나 여행 도움이 필요할 때 어디에 연락하나요?",
        faq_a13: "긴급 상황에는 911로 전화하세요. 여행 정보, 분실물, 관광업체 관련 불편 사항은 문의 페이지를 통해 바우안 관광사무소에 연락하세요. 가까운 경찰서나 병원은 리조트 프런트에 문의하셔도 됩니다.",
        gallery_heading: "포토 갤러리",
        gallery_subheading: "바우안의 아름다움을 담은 순간들.",
        gallery_tag: "담아낸 순간",
        gallery_title: "바우안의 풍경",
        gallery_upload_heading: "갤러리에 사진 올리기",
        gallery_upload_submit: "갤러리에 추가",
        gallery_review_note: "사진은 관광사무소의 검토 후 갤러리에 게시됩니다. 직접 찍은 바우안 사진만 공유해 주세요.",
        reviews_heading: "여행자 후기",
        reviews_subheading: "바우안에서의 잊지 못할 여행 이야기를 읽고 나눠 보세요.",
        reviews_tag: "후기 & 공유",
        reviews_title: "여행자들의 경험",
        form_heading: "바우안 여행 경험 공유하기",
        form_submit: "후기와 사진 올리기",
        nav_contact: "문의",
        contact_heading: "문의하기",
        contact_subheading: "바우안에 대해 궁금한 점이 있으신가요? 메시지를 남겨 주시면 답변드리겠습니다.",
        contact_tag: "연락하기",
        contact_title: "여러분의 이야기를 듣고 싶습니다",
        contact_form_heading: "메시지 보내기",
        contact_form_submit: "메시지 보내기",
        cookie_text: "더 나은 이용 환경 제공, 언어 설정 기억, 사이트 방문 분석을 위해 쿠키를 사용합니다. 자세한 내용은 <a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">쿠키 정책</a>을 확인하세요.",
        cookie_accept: "동의",
        cookie_decline: "거부",
        cookiepolicy_heading: "쿠키 정책",
        cookiepolicy_subheading: "Discover Bauan의 쿠키 사용 방식과 관리 방법을 안내합니다.",
        cookiepolicy_tag: "개인정보 보호",
        cookiepolicy_title: "쿠키 정책",
        cookiepolicy_p1: "<strong>쿠키란?</strong> 쿠키는 웹사이트를 방문할 때 기기에 저장되는 작은 텍스트 파일입니다. 선호하는 언어나 쿠키 배너에 응답했는지 여부 등 방문 정보를 기억하는 데 사용됩니다.",
        cookiepolicy_p2: "<strong>쿠키 사용 목적.</strong> Discover Bauan은 쿠키 및 유사한 로컬 저장소를 다음 용도로 사용합니다: (1) 방문할 때마다 배너가 다시 나타나지 않도록 쿠키 동의 선택 기억, (2) 선택한 언어 기억, (3) 채팅 위젯과 양식이 원활하게 작동하도록 하는 기본 기능.",
        cookiepolicy_p3: "<strong>외부 콘텐츠.</strong> Google Fonts, Font Awesome 아이콘, 삽입된 이미지 등 일부 요소는 외부 서버에서 불러오며, 일반적인 웹 전송 과정에서 해당 서버가 자체 쿠키를 설정하거나 IP 주소 같은 기본 기술 정보를 수집할 수 있습니다.",
        cookiepolicy_p4: "<strong>선택 사항.</strong> 처음 방문할 때 표시되는 동의 배너에서 필수가 아닌 쿠키를 허용하거나 거부할 수 있습니다. 브라우저 설정에서 언제든지 쿠키와 사이트 데이터를 삭제할 수 있으며, 이 경우 설정이 초기화됩니다.",
        cookiepolicy_p5: "<strong>문의.</strong> 이 쿠키 정책에 대해 궁금한 점이 있으시면 <a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">문의 페이지</a>로 연락해 주세요.",
        cookiepolicy_updated: "최종 업데이트: 2026년 9월.",
        chat_welcome: "🧭 안녕하세요! 저는 투어리스트 봇이에요. 바우안의 현지 친구라고 생각해 주세요. 리조트, 음식, 즐길 거리 등 궁금한 건 무엇이든 물어보세요! (답변은 영어로 드려요.)",
        chat_subtitle: "바우안 여행 친구",
        terms_modal_title: "계속하기 전에",
        terms_modal_intro: "이용 약관을 읽어 주세요. 이 사이트를 이용하려면 동의가 필요합니다.",
        terms_agree_label: "이용 약관 및 개인정보 처리방침을 읽었으며 이에 동의합니다.",
        terms_scroll_hint: "계속하려면 체크하세요.",
        terms_agree_btn: "동의하고 계속하기",
        loc_title: "현재 위치 확인",
        loc_intro: "Discover Bauan이 현재 위치를 사용하도록 허용하면 리조트와 명소까지의 길 안내를 보여 드리고, 투어리스트 봇이 가까운 장소를 추천할 수 있습니다.",
        loc_note: "다음 단계에서 브라우저가 권한을 요청합니다. 위치 정보는 저장하지 않습니다.",
        loc_confirm_q: "이곳이 현재 위치인가요?",
        loc_not_now: "나중에",
        loc_allow: "허용하고 위치 찾기",
        loc_retry: "다시 찾기",
        loc_yes: "네, 확인",
        loc_try_again: "다시 시도",
        loc_close: "닫기",
        chat_input_placeholder: "투어리스트 봇에게 물어보세요...",
        cookie_policy_link: "쿠키 정책",
        footer_contact_label: "문의",
        menu_header_title: "메뉴",
        cookiepolicy_contact_link: "문의 페이지",
        footer_quick: "바로가기",
        footer_newsletter: "뉴스레터",
        footer_dest_label: "여행지",
        footer_about_label: "바우안 소개",
        footer_gallery_label: "갤러리",
        home_badge: "바우안 관광사무소 • 바탕가스주 바우안"
    },
    zh: {
        page_title: "包安 | 八打雁旅游",
        nav_home: "首页",
        nav_discover: "探索",
        nav_guide: "旅行指南",
        hero_explore: "了解更多",
        hero_search: "搜索景点或询问旅游机器人...",
        footer_desc: "探索八打雁省美丽海滨小镇包安的旅行指南。这里有洁净的海滩、世界级的潜水点和丰富的菲律宾文化。",
        footer_contact: "联系我们",
        footer_resort_owner_link: "您是度假村经营者？欢迎与旅游办公室合作 &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas。保留所有权利。",
        about_heading: "我们的故事",
        about_subheading: "了解包安的历史、文化与海滨特色。",
        about_tag: "关于小镇",
        about_title: "临海而生的丰厚遗产",
        about_p1: "包安是八打雁省的一级市镇，以蓬勃发展的海事产业、造船厂和深厚的海洋传统而闻名，为游客带来工业活力与海岸自然风光交融的独特体验。",
        about_p2: "除了经济上的重要地位，包安还以悠久的宗教历史、热闹的地方节庆，以及邻近菲律宾海洋生物多样性最丰富的海域而著称。",
        dest_heading: "热门目的地",
        dest_subheading: "探索包安最令人惊叹的海岸风光与地标。",
        dest_tag: "必游之地",
        dest_title: "热门景点",
        dest_1_title: "桑帕吉塔海滩",
        dest_1_desc: "宁静的海滨胜地，适合游泳、晒太阳，以及欣赏八打雁壮丽的日落。",
        dest_2_title: "包安海洋保护区",
        dest_2_desc: "世界知名的潜水区，拥有绚丽的珊瑚礁、海龟和极佳的水下能见度。",
        dest_3_title: "圣母无原罪堂",
        dest_3_desc: "历史悠久的建筑地标，象征着包安深厚的宗教与文化传统。",
        guide_heading: "综合旅行指南",
        guide_subheading: "天气信息、度假村GPS导航、文化节庆、行程规划和常见问题。",
        guide_gps_tag: "实时GPS导航",
        guide_gps_title: "查找并导航至包安度假村",
        guide_gps_desc: "使用设备的实时GPS，计算前往包安当地度假村的路线和距离。",
        guide_gps_btn: "获取GPS路线",
        guide_gps_link: "在Google地图中逐步导航",
        guide_weather_tag: "位置与气候",
        guide_weather_title: "实时天气与地图",
        weather_card_title: "包安天气",
        weather_humidity: "湿度",
        weather_wind: "风速",
        weather_best: "最佳季节",
        weather_rain: "降雨概率",
        weather_forecast: "5天预报",
        map_card_title: "小镇地图",
        planner_tag: "行程规划",
        planner_title: "互动行程生成器",
        plan_opt_1: "一日游",
        plan_opt_2: "周末游（2天）",
        plan_opt_adv: "极限探险与潜水",
        plan_opt_rel: "轻松海滩与美食之旅",
        plan_btn: "生成行程",
        plan_out_title: "请在上方选择偏好，然后点击“生成行程”！",
        plan_out_desc: "您的包安专属行程将显示在这里。",
        plan_opt_3: "长周末（3天）",
        plan_opt_fam: "亲子家庭游",
        plan_opt_her: "历史、信仰与文化",
        plan_opt_cou: "情侣与日落之旅",
        plan_opt_bud: "经济实惠的朋友游",
        plan_opt_car: "自驾",
        plan_opt_com: "巴士与公共交通",
        faq_search: "搜索问题，例如：费用、美食、交通...",
        faq_tag: "有疑问吗？",
        faq_title: "常见问题",
        faq_q1: "如何乘坐公共交通从马尼拉前往包安？",
        faq_a1: "您可以在库包（Cubao）或布恩迪亚（Buendia）的车站乘坐直达八打雁市大巴总站的巴士。到达总站后，换乘开往包安镇中心的吉普尼即可。",
        faq_q2: "包安有ATM吗？",
        faq_a2: "有的，市政中心周边有多家主要商业银行和ATM。不过，如果您要前往较偏远的海滩或潜水度假村，建议携带足够的现金。",
        faq_q3: "潜水套餐需要提前预订吗？",
        faq_a3: "虽然有时可以现场报名，但强烈建议提前向持证的当地潜水机构预订，尤其是周末和旱季旺季，以确保装备和教练。",
        faq_q4: "什么时候去包安最好？",
        faq_a4: "旱季（大约11月至次年5月）海面最平静、海水最清澈，最适合游泳和潜水。3月至5月最炎热、游客最多，请尽早预订。6月至10月期间，降雨和西南季风（habagat）可能导致风浪较大，出发前请查看天气和菲律宾气象局（PAGASA）的预警。",
        faq_q5: "如何自驾前往包安？",
        faq_a5: "从马尼拉大都会出发，走SLEX高速公路，接STAR收费公路，在八打雁市方向出口下，然后沿国道前往包安。不堵车的话约需2至3小时。大多数海滩和潜水度假村位于桑帕吉塔、圣巴勃罗和拉利加洛克洛克等沿海村（barangay），具体路线请使用旅行指南地图。",
        faq_q6: "到了包安后如何出行？",
        faq_a6: "主要道路上有吉普尼，从镇中心或公路前往沿海村的度假村可以乘坐三轮摩托车（tricycle）。上车前请先谈好车费，尤其是前往较远的海滩地区。如果行李较多（例如潜水装备），自驾或度假村接送会更方便。",
        faq_q7: "可以通过本网站预订度假村吗？",
        faq_a7: "暂时不可以。本网站由市旅游办公室运营，用于帮助您了解旅游地点，不接受预订或付款。请打开度假村页面（点击“了解更多”）查看联系电话，然后直接向度假村预订并确认价格。",
        faq_q8: "有门票或环境保护费吗？",
        faq_a8: "各度假村收取各自的门票或日间使用费，部分潜水点和海洋保护区还会另收用于保护工作的费用。金额可能会变动，出发前请向度假村、潜水机构或市旅游办公室（MTO）确认。如果旅游办公室已公布，您可以在各地点页面查看费用。",
        faq_q9: "去海滩或潜水需要带什么？",
        faq_a9: "请携带对珊瑚礁无害的防晒霜、帽子、饮用水、可重复使用的水瓶、防水袋、溯溪鞋、用于小商店和三轮车的现金，以及有效证件。潜水员请携带潜水证和潜水日志。请把垃圾带走：包安的珊瑚礁和海滩需要大家共同守护。",
        faq_q10: "海洋保护区有哪些规定？",
        faq_a10: "请勿触摸、踩踏或采集珊瑚、贝壳及海洋生物，也不要喂鱼。保护区内禁止钓鱼和鱼枪捕鱼。请听从潜水向导的指示，保持良好的中性浮力，并只使用系泊浮标，不要在珊瑚礁上抛锚。",
        faq_q11: "有哪些当地美食值得一试？",
        faq_a11: "推荐品尝八打雁罗米面（浓稠汤面）、布拉洛（牛腱汤）、牛肚粥（goto）、塔阿尔牛肉干（tapang Taal），以及一杯浓郁的巴拉科咖啡（kapeng barako）。沿海一带很容易找到新鲜海鲜，包安公共市场也是购买伴手礼的好去处。",
        faq_q12: "包安适合带孩子的家庭吗？",
        faq_a12: "适合。许多度假村设有泳池和浅水区，海滩一日游、参观教堂和品尝美食等短途行程都很适合孩子。部分海岸多礁石或水深变化较快，请携带溯溪鞋、随时看护孩子，并向度假村询问安全的游泳区域。",
        faq_q13: "遇到紧急情况或需要旅游协助时该联系谁？",
        faq_a13: "紧急情况请拨打911。如需旅游信息、寻找失物或投诉旅游经营者，请通过“联系我们”页面联系包安市旅游办公室。您也可以向度假村前台询问最近的警察局或医院。",
        gallery_heading: "照片库",
        gallery_subheading: "记录包安之美的精彩瞬间。",
        gallery_tag: "定格瞬间",
        gallery_title: "包安掠影",
        gallery_upload_heading: "上传您的照片",
        gallery_upload_submit: "添加到照片库",
        gallery_review_note: "照片经市旅游办公室审核后才会显示在照片库中。请只分享您本人拍摄的包安照片。",
        reviews_heading: "游客评价",
        reviews_subheading: "阅读并分享您在包安的难忘旅行故事。",
        reviews_tag: "评价与分享",
        reviews_title: "游客心声",
        form_heading: "分享您的包安之旅",
        form_submit: "发布评价和照片",
        nav_contact: "联系",
        contact_heading: "联系我们",
        contact_subheading: "对包安有任何疑问吗？欢迎留言，我们会尽快回复您。",
        contact_tag: "保持联系",
        contact_title: "期待您的来信",
        contact_form_heading: "给我们留言",
        contact_form_submit: "发送消息",
        cookie_text: "我们使用Cookie来改善您的浏览体验、记住您的语言偏好并分析网站流量。详情请阅读我们的<a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">Cookie政策</a>。",
        cookie_accept: "接受",
        cookie_decline: "拒绝",
        cookiepolicy_heading: "Cookie政策",
        cookiepolicy_subheading: "Discover Bauan如何使用Cookie，以及您如何进行管理。",
        cookiepolicy_tag: "您的隐私",
        cookiepolicy_title: "Cookie政策",
        cookiepolicy_p1: "<strong>什么是Cookie？</strong> Cookie是您访问网站时存储在设备上的小型文本文件，用于帮助网站记住您的访问信息，例如您偏好的语言，以及您是否已回应过Cookie提示。",
        cookiepolicy_p2: "<strong>我们如何使用Cookie。</strong> Discover Bauan使用Cookie及类似的本地存储来：(1) 记住您的Cookie同意选择，避免每次访问都弹出提示；(2) 记住您选择的语言；(3) 保障基本功能，例如聊天窗口和表单的正常运行。",
        cookiepolicy_p3: "<strong>第三方内容。</strong> 本网站的部分内容（如Google Fonts、Font Awesome图标和嵌入的图片）由第三方服务器加载，这些服务器可能会在正常的网页传输中设置自己的Cookie或收集基本技术数据（如您的IP地址）。",
        cookiepolicy_p4: "<strong>您的选择。</strong> 您可以在首次访问时显示的同意提示中接受或拒绝非必要Cookie。您也可以随时通过浏览器设置清除Cookie和网站数据，这将重置您的偏好设置。",
        cookiepolicy_p5: "<strong>联系我们。</strong> 如果您对本Cookie政策有任何疑问，请通过我们的<a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">联系页面</a>与我们联系。",
        cookiepolicy_updated: "最后更新：2026年9月。",
        chat_welcome: "🧭 你好！我是旅游机器人，把我当成你在包安的本地朋友吧。度假村、美食、好玩的地方，想知道什么尽管问！（我会用英文回答。）",
        chat_subtitle: "您的包安旅行伙伴",
        terms_modal_title: "继续之前",
        terms_modal_intro: "请阅读我们的条款与条件。您需要同意后才能使用本网站。",
        terms_agree_label: "我已阅读并同意条款与条件及隐私声明。",
        terms_scroll_hint: "勾选方框以继续。",
        terms_agree_btn: "同意并继续",
        loc_title: "确认您的位置",
        loc_intro: "允许Discover Bauan使用您当前的位置，以便为您显示前往度假村和景点的路线，并帮助旅游机器人推荐您附近的地点。",
        loc_note: "接下来浏览器会请求您的授权。我们不会保存您的位置信息。",
        loc_confirm_q: "这是您现在的位置吗？",
        loc_not_now: "暂不",
        loc_allow: "允许并定位",
        loc_retry: "重新定位",
        loc_yes: "是的，确认",
        loc_try_again: "重试",
        loc_close: "关闭",
        chat_input_placeholder: "向旅游机器人提问...",
        cookie_policy_link: "Cookie政策",
        footer_contact_label: "联系",
        menu_header_title: "导航菜单",
        cookiepolicy_contact_link: "联系页面",
        footer_quick: "快速链接",
        footer_newsletter: "订阅资讯",
        footer_dest_label: "目的地",
        footer_about_label: "关于包安",
        footer_gallery_label: "照片库",
        home_badge: "包安市旅游办公室 • 八打雁省包安"
    },
    ja: {
        page_title: "バウアン | バタンガス観光",
        nav_home: "ホーム",
        nav_discover: "見どころ",
        nav_guide: "旅行ガイド",
        hero_explore: "詳しく見る",
        hero_search: "観光スポットを検索、またはツーリストボットに質問...",
        footer_desc: "バタンガス州の美しい海辺の町、バウアンを旅するためのガイドです。きれいなビーチ、世界レベルのダイビング、豊かなフィリピン文化をお楽しみください。",
        footer_contact: "お問い合わせ",
        footer_resort_owner_link: "リゾートを運営されている方へ：観光事務所と連携しませんか &rarr;",
        footer_copy: "© 2026 Discover Bauan, Batangas. All Rights Reserved.",
        about_heading: "私たちの物語",
        about_subheading: "バウアンの歴史、文化、そして海とともに歩んできた町の姿をご紹介します。",
        about_tag: "町について",
        about_title: "海とともに育まれた豊かな遺産",
        about_p1: "バウアンはバタンガス州を代表する一級自治体です。活気ある海運業や造船所、そして海に根ざした伝統で知られ、産業の力強さと海岸の自然美をあわせて楽しめる町です。",
        about_p2: "経済面での重要性に加え、バウアンは長い宗教の歴史、にぎやかな地元のお祭り、そしてフィリピン屈指の海洋生物多様性を誇る海域に近いことでも親しまれています。",
        dest_heading: "おすすめの観光地",
        dest_subheading: "バウアンで最も美しい海岸の景色と名所をご覧ください。",
        dest_tag: "必見スポット",
        dest_title: "人気の観光名所",
        dest_1_title: "サンパギータ・ビーチ",
        dest_1_desc: "海水浴や日光浴、そしてバタンガスの美しい夕日を楽しめる、静かな海辺の憩いの場です。",
        dest_2_title: "バウアン海洋保護区",
        dest_2_desc: "色鮮やかなサンゴ礁やウミガメ、抜群の透明度で知られる世界的なダイビングエリアです。",
        dest_3_title: "無原罪の御宿り教会",
        dest_3_desc: "バウアンの深い信仰と文化遺産を象徴する、歴史ある建築の名所です。",
        guide_heading: "総合旅行ガイド",
        guide_subheading: "天気情報、リゾートへのGPSナビ、文化祭り、旅程、よくある質問。",
        guide_gps_tag: "リアルタイムGPSナビ",
        guide_gps_title: "バウアンのリゾートを探してナビ",
        guide_gps_desc: "端末のGPSを使って、バウアンのリゾートまでのルートと距離を確認できます。",
        guide_gps_btn: "GPSで道順を表示",
        guide_gps_link: "Googleマップでナビを開く",
        guide_weather_tag: "場所と気候",
        guide_weather_title: "リアルタイムの天気と地図",
        weather_card_title: "バウアンの天気",
        weather_humidity: "湿度",
        weather_wind: "風速",
        weather_best: "ベストシーズン",
        weather_rain: "降水確率",
        weather_forecast: "5日間の予報",
        map_card_title: "町の地図",
        planner_tag: "旅の計画",
        planner_title: "旅程プランナー",
        plan_opt_1: "日帰り旅行",
        plan_opt_2: "週末旅行（2日間）",
        plan_opt_adv: "アドベンチャー＆ダイビング",
        plan_opt_rel: "のんびりビーチ＆グルメ旅",
        plan_btn: "プランを作成",
        plan_out_title: "上で条件を選んで「プランを作成」を押してください！",
        plan_out_desc: "あなただけのバウアン旅行プランがここに表示されます。",
        plan_opt_3: "3連休（3日間）",
        plan_opt_fam: "子ども連れの家族旅行",
        plan_opt_her: "歴史・信仰・文化",
        plan_opt_cou: "カップル＆夕日の旅",
        plan_opt_bud: "節約グループ旅行",
        plan_opt_car: "自家用車で",
        plan_opt_com: "バス・公共交通機関で",
        faq_search: "質問を検索（例：料金、食べ物、交通…）",
        faq_tag: "ご質問はありますか？",
        faq_title: "よくある質問",
        faq_q1: "マニラから公共交通機関でバウアンへ行くには？",
        faq_a1: "クバオ（Cubao）またはブエンディア（Buendia）のターミナルから、バタンガス・シティ・グランドターミナル行きのバスに乗ります。グランドターミナルで降りたら、バウアンの町の中心部行きのジープニーに乗り換えてください。",
        faq_q2: "バウアンにATMはありますか？",
        faq_a2: "はい、町役場の周辺に主要な銀行やATMが複数あります。ただし、離れたビーチやダイビングリゾートへ行く場合は、十分な現金をお持ちになることをおすすめします。",
        faq_q3: "ダイビングパッケージは事前予約が必要ですか？",
        faq_a3: "当日受付が可能な場合もありますが、特に週末や乾季の繁忙期は、器材やインストラクターを確保するため、公認の地元ダイビングショップへの事前予約を強くおすすめします。",
        faq_q4: "バウアンを訪れるのに最適な時期は？",
        faq_a4: "おおむね11月から5月の乾季は海が最も穏やかで透明度も高く、海水浴やダイビングに最適です。3月から5月は最も暑く混雑するため、早めの予約がおすすめです。6月から10月は雨や南西モンスーン（ハバガット）で海が荒れることがあるので、出発前に天気とPAGASA（フィリピン気象庁）の注意報を確認してください。",
        faq_q5: "車でバウアンへ行くには？",
        faq_a5: "マニラ首都圏からSLEXを走り、STARトールウェイに入ってバタンガス・シティ方面で降り、国道を進んでバウアンへ向かいます。渋滞がなければ約2〜3時間です。ほとんどのビーチやダイビングリゾートはサンパギータ、サンパブロ、ラ・リガ・ロクロクなど海沿いのバランガイにあるので、正確な道順は旅行ガイドの地図をご利用ください。",
        faq_q6: "バウアン市内の移動手段は？",
        faq_a6: "主要道路にはジープニーが走っており、町の中心部や幹線道路から海沿いのバランガイのリゾートまではトライシクルで移動できます。特にビーチ方面など遠い場所へ行く場合は、乗る前に運賃を決めておきましょう。ダイビング器材など荷物が多い場合は、自家用車やリゾートの送迎が便利です。",
        faq_q7: "このサイトでリゾートを予約できますか？",
        faq_a7: "現在はできません。このサイトは町の観光事務所が観光地の案内のために運営しており、予約や支払いは受け付けていません。リゾートのページ（「詳しく見る」）で連絡先を確認し、リゾートへ直接予約・料金の確認をしてください。",
        faq_q8: "入場料や環境保護料はありますか？",
        faq_a8: "各リゾートには独自の入場料・日帰り利用料があり、一部のダイビングスポットや海洋保護区では保護のための料金が別途かかります。金額は変わることがあるため、出発前にリゾート、ダイビングショップ、または観光事務所（MTO）にご確認ください。観光事務所が登録している場合は、各スポットのページで料金を確認できます。",
        faq_q9: "ビーチやダイビングの持ち物は？",
        faq_a9: "サンゴに優しい日焼け止め、帽子、飲み水、マイボトル、防水バッグ、マリンシューズ、小さなお店やトライシクル用の現金、有効な身分証をお持ちください。ダイバーの方はCカードとログブックもお忘れなく。ゴミは必ず持ち帰ってください。バウアンのサンゴ礁とビーチを守るためです。",
        faq_q10: "海洋保護区のルールは？",
        faq_a10: "サンゴや貝、海の生き物に触れたり、踏んだり、採ったりしないでください。魚へのエサやりも禁止です。保護区内での釣りや銛漁は禁止されています。ダイビングガイドの指示に従い、中性浮力を保ち、サンゴ礁にいかりを下ろさず係留ブイのみを使用してください。",
        faq_q11: "おすすめの郷土料理は？",
        faq_a11: "バタンガス名物のロミ（とろみのある麺スープ）、ブラロ（牛すね肉のスープ）、ゴト（もつ入りおかゆ）、タパン・タアル、そして濃いカペン・バラコ（コーヒー）をぜひ。海沿いでは新鮮なシーフードが手軽に味わえ、バウアンの公設市場はおみやげ（パサルボン）探しにぴったりです。",
        faq_q12: "子ども連れの家族旅行に向いていますか？",
        faq_a12: "はい。多くのリゾートにはプールや遠浅のエリアがあり、ビーチで過ごす日や教会見学、グルメめぐりなど短めの予定は子ども連れにぴったりです。岩場が多い場所や急に深くなる海岸もあるため、マリンシューズを用意し、お子さまから目を離さず、安全に泳げる場所をリゾートで確認してください。",
        faq_q13: "緊急時や観光の相談はどこに連絡すればいいですか？",
        faq_a13: "緊急時は911に電話してください。観光案内、落とし物、観光事業者への苦情については、お問い合わせページからバウアン町観光事務所へご連絡ください。最寄りの警察署や病院は、リゾートのフロントでも教えてもらえます。",
        gallery_heading: "フォトギャラリー",
        gallery_subheading: "バウアンの美しさを切り取った写真の数々。",
        gallery_tag: "思い出の瞬間",
        gallery_title: "バウアンの風景",
        gallery_upload_heading: "ギャラリーに写真を投稿",
        gallery_upload_submit: "ギャラリーに追加",
        gallery_review_note: "写真は観光事務所の確認後にギャラリーに掲載されます。ご自身で撮影したバウアンの写真のみ投稿してください。",
        reviews_heading: "旅行者の口コミ",
        reviews_subheading: "バウアンでの忘れられない旅の体験談を読んだり、シェアしたりしましょう。",
        reviews_tag: "口コミ＆投稿",
        reviews_title: "みんなの体験",
        form_heading: "バウアンでの体験をシェア",
        form_submit: "口コミと写真を投稿",
        nav_contact: "お問い合わせ",
        contact_heading: "お問い合わせ",
        contact_subheading: "バウアンについてご質問はありますか？メッセージをお送りいただければお返事いたします。",
        contact_tag: "ご連絡",
        contact_title: "お気軽にご連絡ください",
        contact_form_heading: "メッセージを送る",
        contact_form_submit: "送信する",
        cookie_text: "閲覧体験の向上、言語設定の保存、サイトのアクセス解析のためにCookieを使用しています。詳しくは<a href=\"#\" class=\"nav-btn cookie-policy-link\" data-target=\"cookie-policy\">Cookieポリシー</a>をご覧ください。",
        cookie_accept: "同意する",
        cookie_decline: "拒否する",
        cookiepolicy_heading: "Cookieポリシー",
        cookiepolicy_subheading: "Discover BauanにおけるCookieの使用方法と管理方法について。",
        cookiepolicy_tag: "プライバシー",
        cookiepolicy_title: "Cookieポリシー",
        cookiepolicy_p1: "<strong>Cookieとは？</strong> Cookieは、ウェブサイトを訪問した際に端末に保存される小さなテキストファイルです。お好みの言語や、Cookieの案内にすでに回答したかどうかなど、訪問に関する情報をサイトが記憶するために使われます。",
        cookiepolicy_p2: "<strong>Cookieの利用目的。</strong> Discover Bauanでは、Cookieおよび同様のローカルストレージを次の目的で使用しています：(1) 訪問のたびに案内が表示されないよう、Cookieへの同意を記憶する、(2) 選択した言語を記憶する、(3) チャットやフォームを快適に動作させるための基本機能。",
        cookiepolicy_p3: "<strong>第三者のコンテンツ。</strong> Google Fonts、Font Awesomeのアイコン、埋め込み画像など、本サイトの一部は第三者のサーバーから読み込まれます。これらのサーバーは通常のウェブ配信の一環として、独自のCookieを設定したり、IPアドレスなどの基本的な技術情報を収集したりする場合があります。",
        cookiepolicy_p4: "<strong>選択について。</strong> 初回訪問時に表示される同意バナーで、必須ではないCookieを許可または拒否できます。また、ブラウザの設定からいつでもCookieとサイトデータを削除でき、その場合は設定がリセットされます。",
        cookiepolicy_p5: "<strong>お問い合わせ。</strong> 本Cookieポリシーについてご質問がある場合は、<a href=\"#\" class=\"nav-btn\" data-target=\"contact\" style=\"color: var(--accent-orange); font-weight: 600;\">お問い合わせページ</a>からご連絡ください。",
        cookiepolicy_updated: "最終更新：2026年9月",
        chat_welcome: "🧭 こんにちは！ツーリストボットです。バウアンの地元の友だちだと思ってください。リゾート、グルメ、遊び方など、気になることは何でも聞いてくださいね！（回答は英語になります。）",
        chat_subtitle: "バウアン旅の相棒",
        terms_modal_title: "ご利用の前に",
        terms_modal_intro: "利用規約をお読みください。本サイトをご利用いただくには同意が必要です。",
        terms_agree_label: "利用規約およびプライバシー通知を読み、同意します。",
        terms_scroll_hint: "続けるにはチェックを入れてください。",
        terms_agree_btn: "同意して続ける",
        loc_title: "現在地の確認",
        loc_intro: "Discover Bauanに現在地の利用を許可すると、リゾートや観光地への道順を表示したり、ツーリストボットが近くのスポットを提案したりできます。",
        loc_note: "このあとブラウザが許可を求めます。位置情報は保存しません。",
        loc_confirm_q: "現在地はここで合っていますか？",
        loc_not_now: "今はしない",
        loc_allow: "許可して現在地を取得",
        loc_retry: "もう一度取得",
        loc_yes: "はい、確定",
        loc_try_again: "再試行",
        loc_close: "閉じる",
        chat_input_placeholder: "ツーリストボットに質問...",
        cookie_policy_link: "Cookieポリシー",
        footer_contact_label: "お問い合わせ",
        menu_header_title: "メニュー",
        cookiepolicy_contact_link: "お問い合わせページ",
        footer_quick: "クイックリンク",
        footer_newsletter: "ニュースレター",
        footer_dest_label: "観光地",
        footer_about_label: "バウアンについて",
        footer_gallery_label: "ギャラリー",
        home_badge: "バウアン町観光事務所 • バタンガス州バウアン"
    }
};

// Languages: en, tl (Tagalog), btg (Batangueño), ko (Korean), zh (Simplified Chinese), ja (Japanese).
// A text missing in one language falls back to English, so nothing stays in the previous language.
const HTML_LANG = { en: 'en', tl: 'fil', btg: 'fil', ko: 'ko', zh: 'zh-Hans', ja: 'ja' };
function i18nText(lang, key) {
    return (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || null;
}
// Places, bot replies and itineraries only exist in English and Tagalog: Batangueño uses the Tagalog ones.
function baseLang(lang) { return lang === 'tl' || lang === 'btg' ? 'tl' : 'en'; }
function switchLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    document.documentElement.setAttribute('lang', HTML_LANG[lang] || 'en');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const text = i18nText(lang, el.getAttribute('data-i18n'));
        if (text) el.innerHTML = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const text = i18nText(lang, el.getAttribute('data-i18n-placeholder'));
        if (text) el.setAttribute('placeholder', text);
    });
    try { localStorage.setItem('bauanLang', lang); } catch (e) { /* private mode */ }
}
// remember the visitor's language between visits
document.addEventListener('DOMContentLoaded', () => {
    let saved = null;
    try { saved = localStorage.getItem('bauanLang'); } catch (e) { /* ignore */ }
    const sel = document.getElementById('langToggle');
    if (saved && saved !== 'en' && translations[saved] && sel) {
        sel.value = saved;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
});

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
    if (targetId === 'discover') { showSitePage('discover', true); return; }

    const targetView = document.getElementById(targetId);
    if (!targetView) return;

    if (targetView.classList.contains('home-section') || targetId === 'home') {
        showSitePage(targetId, true);
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

    document.body.dataset.page = targetId;
    mainNav.classList.add('solid-nav');
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
});

// --- SEPARATE PAGES ---
// Home shows only the destination carousel. About (with the video and Mission/Vision),
// Destinations, Gallery, Reviews and Contact each open as their own page, with their own
// address (#about, #gallery...) so the browser Back button and shared links work.
// "Discover" is one page holding About (video, Mission/Vision), Destinations, Gallery and Reviews.
const DISCOVER_SECTIONS = ['about', 'destinations', 'gallery', 'reviews'];
const SITE_PAGES = ['home', 'discover', 'contact'].concat(DISCOVER_SECTIONS);
function showSitePage(id, push) {
    if (SITE_PAGES.indexOf(id) < 0) id = 'home';
    const page = DISCOVER_SECTIONS.indexOf(id) > -1 ? 'discover' : id;
    document.querySelectorAll('.window-view').forEach(win => win.classList.remove('active-view'));
    document.getElementById('home').classList.add('active-view');
    document.body.dataset.page = page;
    document.querySelectorAll('.home-section').forEach(sec => sec.classList.toggle('page-current',
        page === 'discover' ? DISCOVER_SECTIONS.indexOf(sec.id) > -1 : sec.id === page));
    document.querySelectorAll('.nav-btn').forEach(nav => nav.classList.remove('active-link'));
    document.querySelectorAll(`nav .nav-links a[data-target="${page}"], .menu-links a[data-target="${page}"]`).forEach(link => link.classList.add('active-link'));
    syncMoreHighlight();
    if (page === 'home') mainNav.classList.remove('solid-nav'); else mainNav.classList.add('solid-nav');
    window.scrollTo({ top: 0, behavior: 'auto' });
    // a link to one part of Discover (e.g. the footer's "Gallery") jumps to that part
    if (page === 'discover' && id !== 'discover' && id !== 'about') {
        const sec = document.getElementById(id);
        if (sec) setTimeout(() => window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }), 60);
    }
    if (push) {
        const url = location.pathname + location.search + (id === 'home' ? '' : '#' + id);
        if (url !== location.pathname + location.search + location.hash) history.pushState({ page: id }, '', url);
    }
    // let scroll-reveal effects notice the newly shown page
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 50);
}
window.showSitePage = showSitePage;
window.addEventListener('popstate', () => {
    const id = (location.hash || '#home').slice(1);
    if (SITE_PAGES.indexOf(id) > -1) showSitePage(id, false);
});
document.addEventListener('DOMContentLoaded', () => {
    const id = (location.hash || '').slice(1);
    showSitePage(SITE_PAGES.indexOf(id) > -1 ? id : 'home', false);
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
// (the hero now uses the destination carousel in public_home.html; this only runs if old .slide markup is present)
const slides = document.querySelectorAll('.hero-section .slide');
const dots = document.querySelectorAll('.hero-dots .dot');
let currentSlide = 0;
let slideInterval = slides.length > 1 && dots.length === slides.length ? setInterval(nextSlide, 5000) : null;

function nextSlide() {
    if (!slides.length || dots.length !== slides.length) return;
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
    if (!slides.length || dots.length !== slides.length) return;
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

// --- 4b. GALLERY PHOTO UPLOAD (reviewed by the Admin before it is shown) ---
const GALLERY_SUBMIT_URL = '/api/gallery/submit/';
const GALLERY_LIST_URL = '/api/gallery/';

// shrink the photo in the browser first: faster upload on mobile data, small enough for the database
function shrinkPhoto(file, maxSide = 1600, quality = 0.85) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
            const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
            const c = document.createElement('canvas'); c.width = w; c.height = h;
            const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            c.toBlob(blob => blob ? resolve({ blob, w, h }) : reject(new Error('resize failed')), 'image/jpeg', quality);
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('not an image')); };
        img.src = url;
    });
}

function galleryStatus(msg, ok) {
    const el = document.getElementById('galleryStatus'); if (!el) { alert(msg); return; }
    el.textContent = msg; el.className = 'gallery-status ' + (ok ? 'ok' : 'err'); el.hidden = false;
}

async function handleGalleryUpload(e) {
    e.preventDefault();
    const form = document.getElementById('galleryUploadForm');
    const captionInput = document.getElementById('galleryPhotoCaption');
    const nameInput = document.getElementById('galleryPhotoName');
    const fileInput = document.getElementById('galleryPhotoFile');
    const btn = form.querySelector('button[type="submit"]');
    if (!fileInput.files || !fileInput.files[0]) { galleryStatus('Please choose a photo to upload.', false); return; }

    const original = btn.textContent; btn.disabled = true; btn.textContent = 'Sending...';
    try {
        let photo;
        try { photo = await shrinkPhoto(fileInput.files[0]); }
        catch (err) { galleryStatus('That file does not look like a photo. Please choose a JPG, PNG or WebP image.', false); return; }
        const fd = new FormData();
        fd.append('caption', captionInput.value.trim());
        fd.append('name', nameInput ? nameInput.value.trim() : '');
        fd.append('photo', photo.blob, 'photo.jpg');
        fd.append('width', photo.w); fd.append('height', photo.h);
        const res = await fetch(GALLERY_SUBMIT_URL, { method: 'POST', body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) { galleryStatus(data.error || 'Sorry, the photo could not be sent. Please try again.', false); return; }
        form.reset();
        galleryStatus('Thank you! Your photo was sent to the Municipal Tourism Office. It will appear in the gallery once it is approved.', true);
    } catch (err) {
        galleryStatus('Could not reach the server. Please check your connection and try again.', false);
    } finally {
        btn.disabled = false; btn.textContent = original;
    }
}

// approved photos from the server
async function loadGalleryPhotos() {
    const grid = document.getElementById('galleryCardGrid'); if (!grid) return;
    try {
        const res = await fetch(GALLERY_LIST_URL, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return;
        const data = await res.json();
        if (!data.photos || !data.photos.length) return;
        grid.innerHTML = '';
        data.photos.forEach(p => {
            const a = document.createElement('a');
            a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; a.className = 'travel-card'; a.style.display = 'block'; a.style.position = 'relative';
            const img = document.createElement('img'); img.src = p.url; img.className = 'card-img'; img.loading = 'lazy'; img.alt = p.caption; img.title = p.caption;
            const cap = document.createElement('div'); cap.className = 'gal-cap'; cap.textContent = p.caption;
            if (p.by) { const by = document.createElement('small'); by.textContent = 'Photo by ' + p.by; cap.appendChild(by); }
            a.appendChild(img); a.appendChild(cap); grid.appendChild(a);
        });
    } catch (e) { /* keep the "No photos yet" message */ }
}
document.addEventListener('DOMContentLoaded', loadGalleryPhotos);

// --- 4d. LIVE WEATHER (Open-Meteo, free and no API key) ---
// Bauan town proper, Batangas. Refreshes every 15 minutes while the page is open.
const BAUAN_LAT = 13.7917, BAUAN_LON = 121.0083;
const WX_URL = 'https://api.open-meteo.com/v1/forecast?latitude=' + BAUAN_LAT + '&longitude=' + BAUAN_LON
    + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&timezone=Asia%2FManila';
// WMO weather codes -> words and an icon
const WX_CODES = {
    0: ['Clear sky', 'Maaliwalas', 'fa-sun'], 1: ['Mainly clear', 'Halos maaliwalas', 'fa-sun'],
    2: ['Partly cloudy', 'Bahagyang maulap', 'fa-cloud-sun'], 3: ['Overcast', 'Makulimlim', 'fa-cloud'],
    45: ['Fog', 'Maulap / hamog', 'fa-smog'], 48: ['Fog', 'Maulap / hamog', 'fa-smog'],
    51: ['Light drizzle', 'Ambon', 'fa-cloud-rain'], 53: ['Drizzle', 'Ambon', 'fa-cloud-rain'], 55: ['Heavy drizzle', 'Malakas na ambon', 'fa-cloud-rain'],
    61: ['Light rain', 'Mahinang ulan', 'fa-cloud-rain'], 63: ['Rain', 'Ulan', 'fa-cloud-showers-heavy'], 65: ['Heavy rain', 'Malakas na ulan', 'fa-cloud-showers-heavy'],
    80: ['Rain showers', 'Pag-ulan', 'fa-cloud-sun-rain'], 81: ['Rain showers', 'Pag-ulan', 'fa-cloud-showers-heavy'], 82: ['Violent showers', 'Napakalakas na ulan', 'fa-cloud-showers-water'],
    95: ['Thunderstorm', 'Bagyo / kulog at kidlat', 'fa-cloud-bolt'], 96: ['Thunderstorm', 'Kulog at kidlat', 'fa-cloud-bolt'], 99: ['Thunderstorm', 'Kulog at kidlat', 'fa-cloud-bolt'],
};
let lastWeather = null;
// condition words and labels for the weather card in each language (btg uses Tagalog)
const WX_WORDS = {
    ko: { 0: '맑음', 1: '대체로 맑음', 2: '구름 조금', 3: '흐림', 45: '안개', 48: '안개', 51: '약한 이슬비', 53: '이슬비', 55: '강한 이슬비', 61: '약한 비', 63: '비', 65: '강한 비', 80: '소나기', 81: '소나기', 82: '강한 소나기', 95: '뇌우', 96: '뇌우', 99: '뇌우' },
    zh: { 0: '晴', 1: '晴间多云', 2: '多云', 3: '阴', 45: '雾', 48: '雾', 51: '小毛毛雨', 53: '毛毛雨', 55: '大毛毛雨', 61: '小雨', 63: '中雨', 65: '大雨', 80: '阵雨', 81: '阵雨', 82: '强阵雨', 95: '雷阵雨', 96: '雷阵雨', 99: '雷阵雨' },
    ja: { 0: '快晴', 1: '晴れ', 2: '晴れ時々くもり', 3: 'くもり', 45: '霧', 48: '霧', 51: '弱い霧雨', 53: '霧雨', 55: '強い霧雨', 61: '小雨', 63: '雨', 65: '大雨', 80: 'にわか雨', 81: 'にわか雨', 82: '激しいにわか雨', 95: '雷雨', 96: '雷雨', 99: '雷雨' },
};
const WX_LABELS = {
    en: { feels: 'Feels like ', updated: 'Updated ', today: 'Today', loading: 'Loading weather...', fail: 'Live weather is unavailable right now.', src: 'Live data from ', adv: 'For storm and sea advisories, check ', locale: 'en-PH' },
    tl: { feels: 'Ramdam: ', updated: 'Na-update ', today: 'Ngayon', loading: 'Kinukuha ang panahon...', fail: 'Hindi makuha ang panahon ngayon.', src: 'Live na datos mula sa ', adv: 'Para sa abiso sa bagyo at dagat, tingnan ang ', locale: 'fil-PH' },
    ko: { feels: '체감 ', updated: '업데이트 ', today: '오늘', loading: '날씨를 불러오는 중...', fail: '지금은 실시간 날씨를 불러올 수 없습니다.', src: '실시간 데이터 제공: ', adv: '태풍 및 해상 주의보는 다음에서 확인하세요: ', locale: 'ko-KR' },
    zh: { feels: '体感 ', updated: '更新于 ', today: '今天', loading: '正在获取天气...', fail: '暂时无法获取实时天气。', src: '实时数据来源：', adv: '台风和海况预警请查看 ', locale: 'zh-CN' },
    ja: { feels: '体感 ', updated: '更新 ', today: '今日', loading: '天気を取得中...', fail: '現在、天気情報を取得できません。', src: 'データ提供：', adv: '台風・海上の注意報は次で確認：', locale: 'ja-JP' },
};
function wxLang() {
    const sel = document.getElementById('langToggle'); const v = sel ? sel.value : 'en';
    return v === 'btg' ? 'tl' : (WX_LABELS[v] ? v : 'en');
}
function wxWord(code, lang) {
    const c = WX_CODES[code];
    if (WX_WORDS[lang] && WX_WORDS[lang][code]) return WX_WORDS[lang][code];
    return c ? (lang === 'tl' ? c[1] : c[0]) : '';
}
function renderWeather() {
    const w = lastWeather; if (!w) return;
    const lang = wxLang(), L = WX_LABELS[lang];
    const c = WX_CODES[w.code] || ['Weather', 'Panahon', 'fa-cloud-sun'];
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('wxTemp', Math.round(w.temp) + '°C');
    set('wxDesc', wxWord(w.code, lang) || c[0]);
    set('wxFeels', L.feels + Math.round(w.feels) + '°C');
    set('wxHum', Math.round(w.hum) + '%');
    set('wxWind', Math.round(w.wind) + ' km/h');
    set('wxRain', w.rain == null ? '--' : Math.round(w.rain) + '%');
    const icon = document.getElementById('wxIcon');
    if (icon) icon.className = 'fa-solid ' + (c[2] === 'fa-sun' && !w.day ? 'fa-moon' : c[2]);
    const time = w.at.toLocaleTimeString(L.locale, { hour: 'numeric', minute: '2-digit' });
    set('wxUpdated', L.updated + time);
    const live = document.getElementById('wxLive'); if (live) { live.classList.remove('off'); live.lastChild.textContent = 'LIVE'; }
    const fh = document.querySelector('.wx-forecast-head'); if (fh) fh.style.display = '';
    const fcBox = document.getElementById('wxForecast'); if (fcBox) fcBox.style.display = '';
    // 5-day forecast
    const fc = document.getElementById('wxForecast');
    if (fc && w.days && w.days.length) {
        fc.innerHTML = '';
        w.days.forEach((d, i) => {
            const dc = WX_CODES[d.code] || ['', '', 'fa-cloud'];
            const label = i === 0 ? L.today : new Date(d.date + 'T00:00:00').toLocaleDateString(L.locale, { weekday: 'short' });
            const el = document.createElement('div'); el.className = 'wx-day' + (i === 0 ? ' today' : '');
            el.title = wxWord(d.code, lang);
            el.innerHTML = '<span></span><i class="fa-solid ' + dc[2] + '"></i><b></b><small></small>' + (d.rain != null ? '<em class="rain"></em>' : '');
            el.querySelector('span').textContent = label;
            el.querySelector('b').textContent = Math.round(d.max) + '°';
            el.querySelector('small').textContent = Math.round(d.min) + '°';
            if (d.rain != null) { const r = el.querySelector('.rain'); r.textContent = Math.round(d.rain) + '%'; r.style.fontStyle = 'normal'; }
            fc.appendChild(el);
        });
    }
    const src = document.getElementById('wxSource');
    if (src) {
        src.innerHTML = L.src + '<a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>. '
            + L.adv + '<a href="https://www.pagasa.dost.gov.ph/" target="_blank" rel="noopener">PAGASA</a>.';
    }
}
async function loadWeather() {
    if (!document.getElementById('weatherBox')) return;
    const retry = document.getElementById('wxRetry'); if (retry) retry.hidden = true;
    if (!lastWeather) { const desc = document.getElementById('wxDesc'); if (desc) desc.textContent = WX_LABELS[wxLang()].loading; }
    try {
        const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 10000);
        const res = await fetch(WX_URL, { signal: ctrl.signal }); clearTimeout(t);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const d = await res.json(); const cur = d.current || {};
        lastWeather = {
            temp: cur.temperature_2m, feels: cur.apparent_temperature, hum: cur.relative_humidity_2m,
            wind: cur.wind_speed_10m, code: cur.weather_code, day: cur.is_day !== 0,
            rain: d.daily && d.daily.precipitation_probability_max ? d.daily.precipitation_probability_max[0] : null,
            days: d.daily && d.daily.time ? d.daily.time.map((t, i) => ({
                date: t, code: d.daily.weather_code ? d.daily.weather_code[i] : null,
                max: d.daily.temperature_2m_max[i], min: d.daily.temperature_2m_min[i],
                rain: d.daily.precipitation_probability_max ? d.daily.precipitation_probability_max[i] : null,
            })) : [],
            at: new Date(),
        };
        renderWeather();
    } catch (e) {
        if (!lastWeather) {
            const desc = document.getElementById('wxDesc');
            if (desc) desc.textContent = WX_LABELS[wxLang()].fail;
            const live = document.getElementById('wxLive'); if (live) { live.classList.add('off'); live.lastChild.textContent = 'OFFLINE'; }
            const retry = document.getElementById('wxRetry'); if (retry) retry.hidden = false;
            console.warn('[Weather] Could not load live weather from Open-Meteo:', e);
            const fc = document.getElementById('wxForecast'); if (fc) fc.style.display = 'none';
            const fh = document.querySelector('.wx-forecast-head'); if (fh) fh.style.display = 'none';
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    setInterval(loadWeather, 15 * 60 * 1000);
    const retry = document.getElementById('wxRetry'); if (retry) retry.addEventListener('click', loadWeather);
    const sel = document.getElementById('langToggle'); if (sel) sel.addEventListener('change', () => setTimeout(renderWeather, 0));
});

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
// Each style has a full-day plan for a day trip, and three days for longer stays
// (arrival day, main day, going-home day). A 2-day trip uses the first and last.
const ITINERARY_STYLES = {
    adventure: {
        title: 'Adventure & Diving',
        oneDay: [
            ['6:30 AM', 'Arrive at a dive resort in Brgy. San Pablo or Sampaguita; quick breakfast and gear check.'],
            ['8:00 AM', 'First boat dive or guided snorkel at a Bauan dive site (book with a certified operator ahead of time).'],
            ['10:30 AM', 'Surface interval: rest, hydrate, and log your dive.'],
            ['11:30 AM', 'Second dive in the marine sanctuary area: look for turtles, reef fish and macro critters.'],
            ['1:00 PM', 'Late lunch: hot Batangas lomi or grilled seafood.'],
            ['3:00 PM', 'Easy swim or kayak along the shore while you off-gas.'],
            ['5:00 PM', 'Head home before dark. Wait at least 18 hours after diving before flying.'],
        ],
        days: [
            [['Morning', 'Travel to Bauan and check in at a dive resort in San Pablo or Sampaguita.'],
             ['Afternoon', 'Check-out dive or refresher with your dive operator; set up gear.'],
             ['Evening', 'Sunset by the water and a seafood dinner. Early night.']],
            [['7:00 AM', 'Two morning boat dives at Bauan dive sites and sanctuaries.'],
             ['12:30 PM', 'Lunch and rest (surface interval).'],
             ['2:30 PM', 'Afternoon dive or snorkeling; non-divers can kayak or swim.'],
             ['Evening', 'Night dive if offered, or a relaxed dinner and dive-log session.']],
            [['Morning', 'Last shallow dive or snorkel, then rinse and pack gear.'],
             ['Lunch', 'Bulalo or lomi in town before the drive home.'],
             ['Afternoon', 'Pasalubong stop: kapeng barako and local delicacies.']],
        ],
        tips: ['Book dives ahead, especially on weekends and from March to May.', 'Bring your certification card and logbook.', 'Do not touch corals or feed the fish inside sanctuaries.'],
    },
    relax: {
        title: 'Relaxed Beach & Food Trip',
        oneDay: [
            ['8:00 AM', 'Breakfast of kapeng barako and pandesal on the way.'],
            ['9:30 AM', 'Day-use at a beach resort in Brgy. Sampaguita: swim and lounge.'],
            ['12:00 NN', 'Lunch: grilled seafood, sinigang or a big bowl of Batangas lomi.'],
            ['2:00 PM', 'Nap, pool time, or a slow walk along the coast.'],
            ['4:30 PM', 'Merienda and photos as the light turns golden.'],
            ['5:45 PM', 'Watch the sunset over Batangas Bay, then head home.'],
        ],
        days: [
            [['Afternoon', 'Check in at a beachfront resort in Sampaguita or La Liga Locloc.'],
             ['Late afternoon', 'Swim, then catch the sunset by the shore.'],
             ['Dinner', 'Seafood dinner at the resort or a nearby eatery.']],
            [['Morning', 'Slow breakfast, then beach and pool time.'],
             ['Lunch', 'Food trip: lomi, bulalo, goto or tapang Taal.'],
             ['Afternoon', 'Massage, nap, or a short trip to another beach resort.'],
             ['Evening', 'Bonfire or stargazing if the resort allows it.']],
            [['Morning', 'Final swim and late check-out.'],
             ['Lunch', 'One last bowl of lomi in town.'],
             ['Afternoon', 'Pasalubong at the public market: kapeng barako, panutsa and local sweets.']],
        ],
        tips: ['Bring reef-safe sunscreen and water shoes.', 'Weekends get crowded: arrive early for a good spot.', 'Ask the resort about day-use rates before you go.'],
    },
    family: {
        title: 'Family Trip with Kids',
        oneDay: [
            ['8:00 AM', 'Leave early to beat the heat; breakfast on the road.'],
            ['10:00 AM', 'Day-use at a resort with a pool and shallow area in Sampaguita.'],
            ['12:00 NN', 'Family lunch: lomi, fried chicken and rice, fresh fruit.'],
            ['1:30 PM', 'Rest and shade time; light snacks and water for the kids.'],
            ['3:00 PM', 'Pool and beach games, sand castles, shell spotting (look, don\'t take).'],
            ['5:00 PM', 'Quick stop at Immaculate Conception Parish, then head home.'],
        ],
        days: [
            [['Afternoon', 'Check in at a family-friendly resort with a pool.'],
             ['Late afternoon', 'Pool time and an easy walk on the beach.'],
             ['Evening', 'Early dinner and movie or game night.']],
            [['Morning', 'Beach morning while the sun is still mild.'],
             ['Lunch', 'Lomi or seafood lunch; rest in the room after.'],
             ['3:00 PM', 'Snorkeling in shallow water with life vests, or pool games.'],
             ['Evening', 'Sunset walk and dinner.']],
            [['Morning', 'Visit Immaculate Conception Parish in the town proper.'],
             ['Lunch', 'Family lunch in town.'],
             ['Afternoon', 'Pasalubong shopping, then the trip home.']],
        ],
        tips: ['Pack life vests or ask if the resort lends them.', 'Some shores are rocky: bring water shoes for the kids.', 'Plan swims before 10 AM and after 3 PM to avoid the strongest sun.'],
    },
    heritage: {
        title: 'Heritage, Faith & Culture',
        oneDay: [
            ['8:00 AM', 'Arrive in the town proper; breakfast with kapeng barako.'],
            ['9:00 AM', 'Visit Immaculate Conception Parish (Bauan Church) and admire its old stone architecture.'],
            ['10:30 AM', 'Walk around the town plaza and municipal center.'],
            ['11:30 AM', 'Browse the Bauan public market for local produce and snacks.'],
            ['12:30 PM', 'Lunch: Batangas lomi, goto or bulalo.'],
            ['2:30 PM', 'Drive to the coast and visit a beach in Sampaguita for the afternoon.'],
            ['5:30 PM', 'Sunset by Batangas Bay before going home.'],
        ],
        days: [
            [['Afternoon', 'Check in, then visit Immaculate Conception Parish.'],
             ['Late afternoon', 'Stroll around the plaza and town center.'],
             ['Evening', 'Dinner with local Batangueño dishes.']],
            [['Morning', 'Attend Mass or visit the church in the quiet morning hours.'],
             ['10:00 AM', 'Public market visit: local produce, snacks and pasalubong ideas.'],
             ['Lunch', 'Lomi, goto or bulalo.'],
             ['Afternoon', 'Beach time in Sampaguita and sunset by the bay.']],
            [['Morning', 'Ask the MTO about any fiesta or event happening during your visit.'],
             ['Lunch', 'Last local lunch in town.'],
             ['Afternoon', 'Pasalubong shopping and trip home.']],
        ],
        tips: ['Dress modestly when visiting the church.', 'Check the MTO Programs and Events for festivals during your dates.', 'Keep quiet and respectful during Masses and services.'],
    },
    couple: {
        title: 'Couples & Sunset Escape',
        oneDay: [
            ['9:00 AM', 'Coffee date with kapeng barako on the way to Bauan.'],
            ['10:30 AM', 'Arrive at a quiet beach resort; swim and relax.'],
            ['12:30 PM', 'Seafood lunch by the water.'],
            ['2:00 PM', 'Snorkeling together or a kayak along the shore.'],
            ['4:00 PM', 'Photos at a viewpoint resort such as Binukbok View Point in San Pablo.'],
            ['5:45 PM', 'Sunset over Batangas Bay, then dinner before heading home.'],
        ],
        days: [
            [['Afternoon', 'Check in at a quiet resort with a sea view.'],
             ['5:30 PM', 'Sunset watching from the shore or a viewpoint.'],
             ['Evening', 'Candle-lit or seaside dinner.']],
            [['Morning', 'Slow breakfast and a swim.'],
             ['10:00 AM', 'Discover scuba or snorkeling with a dive operator.'],
             ['Afternoon', 'Massage or nap, then photos around the resort.'],
             ['Evening', 'Stargazing by the beach.']],
            [['Morning', 'Sunrise walk and a last swim.'],
             ['Lunch', 'Lomi or bulalo in town.'],
             ['Afternoon', 'Pasalubong and a relaxed drive home.']],
        ],
        tips: ['Weekdays are quieter than weekends.', 'Ask the resort for sea-view rooms when you book.', 'Bring a light jacket for windy evenings by the sea.'],
    },
    budget: {
        title: 'Budget Barkada Trip',
        oneDay: [
            ['6:00 AM', 'Meet up early; bring packed breakfast and water to save money.'],
            ['8:30 AM', 'Arrive at a day-use beach resort in Sampaguita; split a cottage with the group.'],
            ['12:00 NN', 'Boodle-style lunch: grilled liempo, fish, rice and fruit you brought or bought at the market.'],
            ['2:00 PM', 'Swimming, beach games and group photos.'],
            ['4:00 PM', 'Merienda of lomi in town (cheap, filling, and very Batangas).'],
            ['5:30 PM', 'Sunset, then head home together.'],
        ],
        days: [
            [['Afternoon', 'Check in at an overnight resort; share a big room or cottage.'],
             ['Late afternoon', 'Swim and sunset.'],
             ['Evening', 'Group dinner: buy fish and meat at the public market and grill (ask the resort first).']],
            [['Morning', 'Beach and pool time.'],
             ['Lunch', 'Lomi or goto in town.'],
             ['Afternoon', 'Snorkeling (rent gear as a group) or beach games.'],
             ['Evening', 'Videoke or a bonfire if the resort allows it.']],
            [['Morning', 'Last swim, then clean up and check out on time.'],
             ['Lunch', 'Budget lunch in town.'],
             ['Afternoon', 'Pasalubong: kapeng barako and panutsa, then ride home.']],
        ],
        tips: ['Ask resorts about corkage and grilling rules before you bring food.', 'Bring cash for tricycles and small stores.', 'Bring trash bags and take your trash home.'],
    },
};

const TRAVEL_NOTES = {
    car: ['Getting there', 'From Metro Manila take SLEX and the STAR Tollway, exit toward Batangas City, then follow the national road to Bauan (about 2 to 3 hours without heavy traffic).'],
    commute: ['Getting there', 'Take a bus from Cubao or Buendia to the Batangas City Grand Terminal, then a jeepney to Bauan town proper. Tricycles go from town to the coastal resorts; agree on the fare first.'],
};

function escapeHtml(t) {
    return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function generateItinerary() {
    const duration = parseInt(document.getElementById('durationSelect').value, 10) || 1;
    const styleKey = document.getElementById('styleSelect').value;
    const travelSel = document.getElementById('travelSelect');
    const travel = travelSel ? travelSel.value : 'car';
    const style = ITINERARY_STYLES[styleKey] || ITINERARY_STYLES.relax;
    const output = document.getElementById('itineraryResult');

    const days = duration === 1 ? [style.oneDay] : duration === 2 ? [style.days[0], style.days[2]] : style.days;
    const lengthLabel = duration === 1 ? '1-Day Trip' : duration === 2 ? '2-Day Weekend' : '3-Day Long Weekend';
    const note = TRAVEL_NOTES[travel] || TRAVEL_NOTES.car;

    let html = `<div class="it-head"><h4>${escapeHtml(lengthLabel)}: ${escapeHtml(style.title)}</h4>`
        + `<div class="it-chips"><span>${duration} ${duration === 1 ? 'day' : 'days'}</span><span>${escapeHtml(style.title)}</span><span>${travel === 'commute' ? 'Bus & commute' : 'Private car'}</span></div></div>`;
    html += `<p class="it-travel"><strong>${escapeHtml(note[0])}:</strong> ${escapeHtml(note[1])}</p>`;
    days.forEach((day, i) => {
        html += `<div class="it-day">${days.length > 1 ? `<h5>Day ${i + 1}${i === 0 ? ' · Arrival' : i === days.length - 1 ? ' · Going home' : ''}</h5>` : ''}<ol class="it-list">`;
        day.forEach(([time, what]) => { html += `<li><span class="it-time">${escapeHtml(time)}</span><span>${escapeHtml(what)}</span></li>`; });
        html += '</ol></div>';
    });
    html += `<div class="it-tips"><strong>Tips</strong><ul>${style.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div>`;
    html += '<p class="it-note">Times are suggestions. Confirm rates, schedules and bookings directly with the resort or dive operator.</p>';
    html += '<div class="it-actions"><button type="button" class="it-btn" id="itAskBot"><i class="fa-solid fa-comment-dots"></i> Ask Tourist Bot to adjust this plan</button>'
        + '<button type="button" class="it-btn ghost" id="itCopy"><i class="fa-regular fa-copy"></i> Copy plan</button>'
        + '<button type="button" class="it-btn ghost" id="itPrint"><i class="fa-solid fa-print"></i> Print</button></div>';
    output.innerHTML = html;
    output.classList.remove('it-show'); void output.offsetWidth; output.classList.add('it-show');

    const plainText = () => {
        const lines = [`${lengthLabel}: ${style.title} (${travel === 'commute' ? 'bus & commute' : 'private car'})`, `${note[0]}: ${note[1]}`];
        days.forEach((day, i) => { if (days.length > 1) lines.push('', `Day ${i + 1}`); day.forEach(([t, w]) => lines.push(`${t} - ${w}`)); });
        lines.push('', 'Tips:', ...style.tips.map(t => '- ' + t));
        return lines.join('\n');
    };
    document.getElementById('itAskBot').addEventListener('click', () => {
        const win = document.getElementById('chatWindow'); if (win) win.classList.add('open');
        sendMessage(`Help me adjust a ${duration}-day ${style.title.toLowerCase()} itinerary in Bauan (${travel === 'commute' ? 'by commute' : 'by car'}).`);
    });
    document.getElementById('itCopy').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const done = () => { btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied'; setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy plan'; }, 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(plainText()).then(done, () => window.prompt('Copy your plan:', plainText()));
        else window.prompt('Copy your plan:', plainText());
    });
    document.getElementById('itPrint').addEventListener('click', () => {
        const w = window.open('', '_blank'); if (!w) return;
        w.document.write('<!doctype html><title>Bauan itinerary</title><style>body{font:15px/1.6 Arial,sans-serif;margin:32px;color:#111}h1{font-size:20px}h2{font-size:16px;margin-top:18px}li{margin:4px 0}</style>');
        w.document.write('<h1>' + escapeHtml(lengthLabel + ': ' + style.title) + '</h1>' + output.querySelector('.it-travel').outerHTML);
        output.querySelectorAll('.it-day').forEach(d => { w.document.write(d.innerHTML.replace(/<h5>/g, '<h2>').replace(/<\/h5>/g, '</h2>')); });
        w.document.write(output.querySelector('.it-tips').outerHTML + '<p><small>Municipal Tourism Office of Bauan, Batangas</small></p>');
        w.document.close(); w.focus(); w.print();
    });
}

// --- 7. FAQ ACCORDION LOGIC ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.parentElement.classList.toggle('active');
    });
});

// FAQ search: filters questions and answers as you type
(function () {
    const box = document.getElementById('faqSearch');
    const list = document.getElementById('faqList');
    if (!box || !list) return;
    const empty = document.getElementById('faqEmpty');
    box.addEventListener('input', () => {
        const words = box.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        let shown = 0;
        list.querySelectorAll('.faq-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            const hit = words.every(w => text.includes(w));
            item.hidden = !hit; if (hit) shown++;
            item.classList.toggle('active', hit && words.length > 0 && shown <= 2);
        });
        if (empty) empty.hidden = shown > 0;
    });
    const ask = document.getElementById('faqAskBot');
    if (ask) ask.addEventListener('click', (e) => {
        e.preventDefault();
        const win = document.getElementById('chatWindow'); if (win) win.classList.add('open');
        if (box.value.trim()) sendMessage(box.value.trim());
    });
})();

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

const BOT_FACE_HTML = '<span class="bot" aria-hidden="true"><span class="bot-antenna"></span><span class="bot-ear l"></span><span class="bot-ear r"></span>'
    + '<span class="bot-face"><span class="bot-eye l"></span><span class="bot-eye r"></span><span class="bot-smile"></span><span class="bot-cheek l"></span><span class="bot-cheek r"></span></span></span>';
function appendBotMessage(fill) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bot-msg-wrapper';

    const avatar = document.createElement('div');
    avatar.className = 'bot-msg-avatar bot-av';
    avatar.innerHTML = BOT_FACE_HTML;   // the same little bot as the chat button

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
    return sel ? baseLang(sel.value) : 'en';
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
    typing.classList.add('is-typing');

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