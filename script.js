// =========================================================
// ===== KisanMitra — Multi-Language Smart Mandi Engine =====
// =========================================================

// --- AUDIO CHIME SYNTHESIZER (Web Audio API) ---
function playMandiChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // First tone (659.25 Hz - E5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.25, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);

    // Second tone (880 Hz - A5)
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, ctx.currentTime);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.8);
    }, 180);
  } catch (e) {
    console.log('Audio chime alert initialized');
  }
}

// =========================================================
// ===== MULTI-LANGUAGE TRANSLATION DICTIONARY (i18n) ======
// =========================================================

let currentLang = localStorage.getItem('kisan_lang') || 'en'; // 'en', 'ta', 'hi'

const I18N = {
  en: {
    nav_find_mandi: '📍 Find Mandi',
    nav_directory: '🏛️ State Directory',
    nav_tracker: '🎟️ Pass Tracker',
    nav_book_slot: '📅 Book Slot',
    nav_admin: '⚙️ Mandi Admin',
    nav_how_it_works: 'How It Works',
    nav_about: 'About',
    nav_officer_login: '⚙️ Officer Login',
    nav_login: 'Official / Farmer Login',
    nav_register: 'Register',
    
    hero_badge: 'Smart Digital Mandi & Procurement System',
    hero_title: 'Eliminating <span class="text-gradient">Long Queues</span> & Delays in Farmer Procurement',
    hero_subtitle: 'Smart digital platform for Indian farmers to find nearby Government APMC Mandis, browse state & district directories, book scheduled time slots, and track live queue weighments with direct DBT MSP payments.',
    lang_select_title: 'Choose Your Preferred Language / மொழியைத் தேர்ந்தெடுக்கவும்',
    lang_select_desc: 'Select language to translate all mandi services, queue tokens, and portals',
    
    stat_reduced_wait: 'Reduced Wait Time',
    stat_mandis: 'Govt Mandis',
    stat_dbt: 'Digital DBT Payments',
    btn_book_slot: 'Book Procurement Slot',
    btn_view_directory: '🏛️ Browse State Mandis',
    btn_admin_portal: '⚙️ Mandi Admin Portal',
    
    phone_greeting: 'Namaste, Ramesh 🙏',
    phone_today: 'Today',
    card_active_slot: '● Active Slot',
    card_queue_eta: '2 farmers ahead • Turn in ~15 mins',
    card_completed_paid: '✓ Completed & Paid',
    paid_badge: 'Transferred via DBT',
    scroll_label: 'Scroll',
    
    // Locator
    locator_label: 'Proximity Engine',
    locator_title: 'Find Government Mandis Near You',
    locator_desc: 'Enter postal pincode, district, or mandi name to locate verified Government APMC Regulated Markets, full addresses, contact numbers, and open capacity.',
    pincode_label: 'Enter Pincode / District',
    pincode_placeholder: 'e.g. 642001, 638107, 422001, Coimbatore, Erode...',
    btn_search_mandis: '🔍 Search Mandis',
    btn_auto_detect: '🎯 Auto Detect Location',
    quick_pins_label: 'Quick Pincode Examples:',
    found_mandis_text: 'Government Mandis Found',
    live_dist_tag: '✓ Proximity Sorted',
    
    // Directory
    dir_label: 'All-India APMC Directory',
    dir_title: 'Government Mandis by State & District',
    dir_desc: 'Select your State and District to view verified Government APMC Yards, Regulated Markets, Mandi Superintendent contacts, and live crop MSP purchase rates.',
    label_state: '1. Select State',
    label_district: '2. Select District',
    label_crop: '3. Filter by Crop Variety',
    label_search_name: 'Search Mandi / APMC Name',
    search_mandi_ph: 'Type Mandi, Town or Market Committee name...',
    showing_centres: 'Showing Government Procurement Centres in',
    all_live_connected: 'All Centres Live Connected',
    
    // Tracker
    tracker_label: 'Farmer Live Status',
    tracker_title: 'Track Your Procurement Pass & Live Queue',
    tracker_desc: 'Check your token position, estimated arrival turn, gate number, and weighment status in real time without standing under the sun.',
    track_token_ph: 'Enter 4-digit Token (e.g. 2048, 1401, 2045)...',
    btn_track_live: 'Track Live Position',
    pass_badge_text: 'DIGITAL MANDI PASS',
    step_booked: 'Slot Booked',
    step_gate: 'Gate Checked-In',
    step_quality: 'Quality & Moisture',
    step_weigh: 'IoT Weighment',
    step_payment: 'DBT Payment',
    eta_gate: 'Assigned Gate',
    eta_crop: 'Crop & Est. Quantity',
    eta_pos: 'Current Position',
    eta_turn: 'Estimated Turn In',
    
    // Admin Gateway & Page
    admin_label: 'Independent Centre Operations',
    admin_title: 'Government Mandi Admin Control Centre',
    admin_desc: 'Each Government Mandi operates independently. Select any Mandi to view its isolated slot capacity, live calling queue, IoT weighbridge scale logs, and DBT payment settlements.',
    admin_portal_box_title: 'APMC Superintendent & Weighbridge Officer Suite',
    admin_portal_box_desc: 'Authorized mandi personnel can log in with their Mandi Centre credentials to announce tokens, capture IoT gross/tare weights, issue official stamped receipts, and manage daily quota.',
    btn_enter_admin_portal: '🔐 Enter APMC Officer Admin Portal',
    btn_book_farmer_slot: '👨‍🌾 Farmer Slot Booking',
    admin_select_lbl: '🏛️ Select Operating Mandi Centre:',
    tab_overview: '📊 Live Overview',
    tab_queue: '👨‍🌾 Live Queue & Calling',
    tab_weighbridge: '⚖️ IoT Weighbridge Terminal',
    tab_slots: '📅 Slot & Capacity Control',
    tab_msp: '🌾 Daily MSP Rates Master',
    tab_reports: '💳 DBT Settlements & Reports',
    
    stat_today_bookings: 'Total Bookings Today',
    stat_procured: 'Procured & Weighed',
    stat_in_queue: 'Currently in Queue',
    stat_dbt_payouts: 'DBT Payouts Settled',
    
    now_serving_title: '📢 NOW SERVING AT WEIGHBRIDGE #1',
    btn_call_next: '🔊 Call Next Farmer',
    today_queue_title: 'Today\'s Mandi Token Queue',
    live_sync_tag: 'Live Syncing',
    
    th_token: 'Token #',
    th_farmer: 'Farmer Name',
    th_mobile: 'Mobile',
    th_crop: 'Crop',
    th_qty: 'Est. Qty (Qtl)',
    th_slot: 'Slot Time',
    th_status: 'Status',
    th_actions: 'Actions',
    btn_advance: 'Advance Stage ➔',

    // Problem Section
    problem_label: 'The Problem',
    problem_title: 'Why KisanMitra?',
    prob_wait_title: 'Hours of Waiting',
    prob_wait_desc: 'Farmers spend 6-8 hours waiting in unorganized queues at procurement centres, losing a full day of productive work.',
    prob_trans_title: 'No Transparency',
    prob_trans_desc: 'Paper-based systems leave farmers with zero visibility into queue position, weighment records, or payment timelines.',
    prob_cong_title: 'Congestion at Mandis',
    prob_cong_desc: 'Hundreds of farmers arrive simultaneously causing chaotic congestion, vehicle blockages, and crop spoilage.',
    prob_pay_title: 'Delayed Payments',
    prob_pay_desc: 'Lack of digital tracking means farmers have no way to know when their procurement payment will be processed.',

    // How It Works
    how_label: 'The Solution',
    how_title: 'How KisanMitra Works',
    how_desc: 'A seamless 9-step digital journey that transforms the procurement experience',
    step1_title: 'Farmer Registration',
    step1_desc: 'Simple mobile/Aadhaar-linked sign-up process. Farmers create accounts using their phone number and verify via OTP.',
    step2_title: 'Slot Booking',
    step2_desc: 'Choose a preferred procurement centre, date, and time slot. The system shows real-time slot availability to prevent overcrowding.',
    step3_title: 'SMS / App Notification',
    step3_desc: 'Instant confirmation via SMS and in-app notification with slot details, directions, and a reminder before the appointment.',
    step4_title: 'Real-time Queue Management',
    step4_desc: 'A digital token system with live position tracking. Farmers can see exactly how many people are ahead in the queue.',
    step5_title: 'Turn Approaching Alert',
    step5_desc: 'Automatic notification when the farmer\'s turn is approaching, so they don\'t need to wait physically at the centre.',
    step6_title: 'Arrival & Quality Check',
    step6_desc: 'Staff verifies crop quality upon arrival. Results are digitally recorded with photos and grading for full transparency.',
    step7_title: 'Weighment',
    step7_desc: 'Quantity is recorded digitally via IoT-enabled weighing systems. Farmers receive instant weight confirmation on their device.',
    step8_title: 'Procurement Status Update',
    step8_desc: 'Live tracking of procurement status in the app — from quality check to weighment to payment initiation.',
    step9_title: 'Payment Processed',
    step9_desc: 'Direct bank transfer with SMS/app notification. Complete payment history and digital receipts accessible anytime.',
    outcome_title: 'Result: Reduced Congestion & Waiting Time',
    outcome_desc: 'Farmers save hours, mandis run efficiently, and the entire procurement process becomes transparent and dignified.',

    // Booking Page
    booking_page_title: '📅 Farmer Procurement Slot Booking',
    booking_page_subtitle: 'Schedule your mandi delivery appointment in advance to avoid long truck queues, ensure instant weighment, and secure government MSP rates.',
    step1_mandi_header: 'Select Government APMC Mandi Centre',
    step2_farmer_header: 'Farmer & Crop Information',
    step3_schedule_header: 'Choose Reporting Date & Time Slot',
    btn_confirm_generate_pass: '🎟️ Confirm Booking & Generate Digital Pass',
    summary_header: '📊 Booking & MSP Calculation',

    // Admin
    admin_auth_title: 'APMC Officer Authentication',
    admin_auth_subtitle: 'Enter your designated Mandi Centre credentials to access the live operations suite.',
    admin_login_btn: '🔐 Secure Officer Login & Open Command Center',
    
    // Buttons
    btn_book_here: '🎟️ Book Slot',
    btn_call_mandi: '📞 Call Mandi',
    btn_call_centre: '📞 Call Centre'
  },
  
  ta: {
    nav_find_mandi: '📍 மண்டி தேடல்',
    nav_directory: '🏛️ மாநில மண்டிகள்',
    nav_tracker: '🎟️ டோக்கன் நிலை',
    nav_book_slot: '📅 முன்பதிவு',
    nav_admin: '⚙️ மண்டி நிர்வாகம்',
    nav_how_it_works: 'எப்படி செயல்படுகிறது',
    nav_about: 'எங்களை பற்றி',
    nav_officer_login: '⚙️ அதிகாரி உள்நுழைவு',
    nav_login: 'அதிகாரி / விவசாயி உள்நுழைவு',
    nav_register: 'பதிவு செய்க',
    
    hero_badge: 'டிஜிட்டல் மண்டி & நெல் கொள்முதல் தளம்',
    hero_title: 'விவசாயிகள் கொள்முதலில் <span class="text-gradient">நீண்ட வரிசைகள்</span> மற்றும் தாமதங்களை ஒழிப்போம்',
    hero_subtitle: 'இந்திய விவசாயிகளுக்கு அருகிலுள்ள அரசு ஒழுங்குமுறை விற்பனைக்கூடங்கள் (APMC), நேரடி நேர முன்பதிவு, நேரலை வரிசை கண்காணிப்பு மற்றும் நேரடி வங்கி பணப்பரிமாற்றம் (DBT) வழங்கும் ஸ்மார்ட் தளம்.',
    lang_select_title: 'மொழியைத் தேர்ந்தெடுக்கவும் / Choose Language',
    lang_select_desc: 'அனைத்து மண்டி சேவைகள், டோக்கன்கள் மற்றும் படிவங்களை தமிழில் காண மொழியை மாற்றவும்',
    
    stat_reduced_wait: 'காத்திருப்பு நேரம் குறைப்பு',
    stat_mandis: 'அரசு மண்டிகள்',
    stat_dbt: 'நேரடி வங்கி பரிமாற்றம்',
    btn_book_slot: 'கொள்முதல் நேரம் முன்பதிவு செய்க',
    btn_view_directory: '🏛️ அரசு மண்டிகள் பட்டியல்',
    btn_admin_portal: '⚙️ மண்டி நிர்வாக தளம்',
    
    phone_greeting: 'வணக்கம், விவசாயி 🙏',
    phone_today: 'இன்று',
    card_active_slot: '● நடப்பு முன்பதிவு',
    card_queue_eta: '2 விவசாயிகள் முன்னால் • ~15 நிமிடத்தில் உங்கள் முறை',
    card_completed_paid: '✓ கொள்முதல் & பணம் செலுத்தப்பட்டது',
    paid_badge: 'வங்கி கணக்கில் செலுத்தப்பட்டது (DBT)',
    scroll_label: 'கீழே உருட்டவும்',
    
    // Locator
    locator_label: 'அருகிலுள்ள மண்டி தேடுபொறி',
    locator_title: 'உங்களுக்கு அருகிலுள்ள அரசு மண்டிகளைக் கண்டறியவும்',
    locator_desc: 'அரசு ஒழுங்குமுறை விற்பனைக்கூடங்கள், முழு முகவரி, மண்டி செயலாளர் தொலைபேசி எண் மற்றும் இன்றைய காலி இடங்களை அறிய அஞ்சல் குறியீடு அல்லது மாவட்டத்தை உள்ளிடவும்.',
    pincode_label: 'அஞ்சல் குறியீடு / மாவட்டம் உள்ளிடவும்',
    pincode_placeholder: 'எ.கா: 642001, 638107, பொள்ளாச்சி, ஈரோடு, சேலம்...',
    btn_search_mandis: '🔍 மண்டிகளைத் தேடுக',
    btn_auto_detect: '🎯 இருப்பிடத்தைக் கண்டறி',
    quick_pins_label: 'மாதிரி பின்கோடுகள்:',
    found_mandis_text: 'அரசு மண்டிகள் கண்டறியப்பட்டன',
    live_dist_tag: '✓ தூரம் கணக்கிடப்பட்டது',
    
    // Directory
    dir_label: 'அனைத்திந்திய அரசு மண்டி அடைவு',
    dir_title: 'மாநிலம் & மாவட்டம் வாரியாக அரசு மண்டிகள்',
    dir_desc: 'தமிழ்நாடு மற்றும் பிற மாநிலங்களில் உள்ள அரசு ஒழுங்குமுறை விற்பனைக்கூடங்கள், கொள்முதல் விலை (MSP) மற்றும் தொடர்பு எண்களைக் காணவும்.',
    label_state: '1. மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    label_district: '2. மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    label_crop: '3. பயிர் வகை வடிகட்டி',
    label_search_name: 'மண்டி / ஒழுங்குமுறை விற்பனைக்கூடம் பெயர்',
    search_mandi_ph: 'மண்டி, ஊர் அல்லது சந்தை குழு பெயர் தட்டச்சு செய்க...',
    showing_centres: 'காட்டப்படும் அரசு கொள்முதல் மையங்கள்:',
    all_live_connected: 'அனைத்து மையங்களும் நேரலை இணைப்பில் உள்ளன',
    
    // Tracker
    tracker_label: 'விவசாயி நேரலை நிலை',
    tracker_title: 'உங்கள் கொள்முதல் பாஸ் & நேரலை வரிசையைக் கண்காணிக்கவும்',
    tracker_desc: 'வெயிலில் நிற்காமல் உங்கள் டோக்கன் எண், மதிப்பிடப்பட்ட வருகை நேரம், வாயில் எண் மற்றும் எடை சரிபார்ப்பு நிலையை உடனுக்குடன் காணுங்கள்.',
    track_token_ph: '4 இலக்க டோக்கனை உள்ளிடவும் (எ.கா: 2048, 1401, 38)...',
    btn_track_live: 'நேரலை நிலையைக் காண்க',
    pass_badge_text: 'டிஜிட்டல் மண்டி நுழைவுச் சீட்டு',
    step_booked: 'நேரம் முன்பதிவு',
    step_gate: 'நுழைவாயில் சோதனை',
    step_quality: 'ஈரப்பதம் & தரம்',
    step_weigh: 'டிஜிட்டல் எடை',
    step_payment: 'வங்கி பரிமாற்றம் (DBT)',
    eta_gate: 'ஒதுக்கப்பட்ட வாயில்',
    eta_crop: 'பயிர் & அளவு',
    eta_pos: 'தற்போதைய நிலை',
    eta_turn: 'அடுத்த முறை',
    
    // Admin Gateway & Page
    admin_label: 'தனித்தனி மண்டி செயல்பாடுகள்',
    admin_title: 'அரசு மண்டி நிர்வாக கட்டுப்பாட்டு மையம்',
    admin_desc: 'ஒவ்வொரு அரசு மண்டியும் தனித்தனியாக இயங்குகிறது. ஏதேனும் ஒரு மண்டியைத் தேர்ந்தெடுத்து அதன் டோக்கன் வரிசை, IoT எடை மேடை மற்றும் வங்கி பரிவர்த்தனைகளை நிர்வகிக்கவும்.',
    admin_portal_box_title: 'அரசு மண்டி கண்காணிப்பாளர் மற்றும் எடை மேடை தளம்',
    admin_portal_box_desc: 'அங்கீகரிக்கப்பட்ட அதிகாரிகள் தங்கள் மண்டி நற்சான்றிதழ்களுடன் உள்நுழைந்து டோக்கன் அழைப்பு, IoT எடை பதிவு மற்றும் DBT கட்டணத்தை வழங்கலாம்.',
    btn_enter_admin_portal: '🔐 மண்டி அதிகாரி தளத்திற்குள் நுழைக',
    btn_book_farmer_slot: '👨‍🌾 விவசாயி நேர முன்பதிவு',
    admin_select_lbl: '🏛️ செயல்படும் மண்டியைத் தேர்ந்தெடுக்கவும்:',
    tab_overview: '📊 நேரலை கண்ணோட்டம்',
    tab_queue: '👨‍🌾 நேரலை டோக்கன் அழைப்பு',
    tab_weighbridge: '⚖️ IoT எடை மேடை முனையம்',
    tab_slots: '📅 நேர ஒதுக்கீடு & கொள்ளளவு',
    tab_msp: '🌾 தினசரி அரசு கொள்முதல் விலை (MSP)',
    tab_reports: '💳 வங்கி பரிவர்த்தனை அறிக்கைகள்',
    
    stat_today_bookings: 'இன்றைய மொத்த முன்பதிவுகள்',
    stat_procured: 'எடை போடப்பட்டு முடிந்தது',
    stat_in_queue: 'தற்போது வரிசையில் உள்ளவர்கள்',
    stat_dbt_payouts: 'வங்கிக்கு அனுப்பப்பட்ட தொகை',
    
    now_serving_title: '📢 எடை மேடை எண் #1-ல் அழைக்கப்படுகிறது',
    btn_call_next: '🔊 அடுத்த விவசாயியை அழைக்கவும்',
    today_queue_title: 'இன்றைய மண்டி டோக்கன் வரிசை',
    live_sync_tag: 'நேரலை புதுப்பிப்பு',
    
    th_token: 'டோக்கன் #',
    th_farmer: 'விவசாயி பெயர்',
    th_mobile: 'மொபைல் எண்',
    th_crop: 'பயிர்',
    th_qty: 'அளவு (குவிண்டால்)',
    th_slot: 'நேரம்',
    th_status: 'நிலை',
    th_actions: 'செயல்பாடு',
    btn_advance: 'அடுத்த கட்டம் ➔',
    
    // Admin
    admin_auth_title: 'APMC அதிகாரி அங்கீகாரம்',
    admin_auth_subtitle: 'நேரலை செயல்பாட்டு தொகுப்பை அணுக உங்கள் மண்டி மைய சான்றுகளை உள்ளிடவும்.',
    admin_login_btn: '🔐 பாதுகாப்பான அதிகாரி உள்நுழைவு',

    // Problem Section
    problem_label: 'பிரச்சினை',
    problem_title: 'கிசான்மித்ரா ஏன்?',
    prob_wait_title: 'நீண்ட நேர காத்திருப்பு',
    prob_wait_desc: 'கொள்முதல் நிலையங்களில் விவசாயிகள் 6-8 மணி நேரம் வரிசையில் காத்திருந்து தங்கள் ஒரு நாள் உழைப்பை இழக்கின்றனர்.',
    prob_trans_title: 'வெளிப்படைத்தன்மை இன்மை',
    prob_trans_desc: 'காகித முறைமைகளால் டோக்கன் வரிசை, எடை பதிவுகள் அல்லது பணம் செலுத்தும் நேரங்கள் குறித்து விவசாயிகளுக்கு தகவல் தெரிவதில்லை.',
    prob_cong_title: 'மண்டிகளில் கடும் நெரிசல்',
    prob_cong_desc: 'ஒரே நேரத்தில் நூற்றுக்கணக்கான விவசாயிகள் வருவதால் வாகன நெரிசல் மற்றும் விளைபொருட்கள் சேதமடைகின்றன.',
    prob_pay_title: 'தாமதமான பணப்பரிமாற்றம்',
    prob_pay_desc: 'டிஜிட்டல் கண்காணிப்பு இல்லாததால் தங்களின் கொள்முதல் பணம் எப்போது வங்கி கணக்கில் வரும் என்பதை விவசாயிகள் அறிய முடிவதில்லை.',

    // How It Works
    how_label: 'தீர்வு',
    how_title: 'கிசான்மித்ரா எப்படி செயல்படுகிறது',
    how_desc: 'விவசாயிகளின் கொள்முதல் அனுபவத்தை மாற்றும் 9 எளிய டிஜிட்டல் படிகள்',
    step1_title: 'விவசாயி பதிவு',
    step1_desc: 'எளிய மொபைல்/ஆதார் அடிப்படையிலான பதிவு. ஓடிபி (OTP) மூலம் உறுதி செய்யப்படுகிறது.',
    step2_title: 'நேரம் முன்பதிவு',
    step2_desc: 'அருகிலுள்ள அரசு மண்டி, நாள் மற்றும் நேரத்தை தேர்வு செய்யவும். நெரிசலைத் தவிர்க்க நேரலை காலி இடங்கள் காட்டப்படும்.',
    step3_title: 'எஸ்.எம்.எஸ் / செயலி அறிவிப்பு',
    step3_desc: 'முன்பதிவு விவரங்கள், வழிகாட்டுதல் மற்றும் நினைவூட்டல் எஸ்.எம்.எஸ் மூலம் உடனடியாக அனுப்பப்படும்.',
    step4_title: 'நேரலை வரிசை மேலாண்மை',
    step4_desc: 'டிஜிட்டல் டோக்கன் அமைப்பு. தங்களுக்கு முன்னால் எத்தனை விவசாயிகள் உள்ளனர் என்பதை நேரடியாகக் காணலாம்.',
    step5_title: 'அடுத்த முறை அறிவிப்பு',
    step5_desc: 'தங்கள் முறை வரும்போது தானியங்கி ஒலி மற்றும் எஸ்.எம்.எஸ் எச்சரிக்கை வரும்.',
    step6_title: 'வருகை & தர பரிசோதனை',
    step6_desc: 'அதிகாரிகள் பயிர் தரம் மற்றும் ஈரப்பதத்தை பரிசோதித்து டிஜிட்டல் முறையில் பதிவு செய்வர்.',
    step7_title: 'IoT டிஜிட்டல் எடை',
    step7_desc: 'IoT எடை இயந்திரங்கள் மூலம் துல்லியமான எடை பதிவு செய்யப்பட்டு ரசீது வழங்கப்படும்.',
    step8_title: 'கொள்முதல் நிலை கண்காணிப்பு',
    step8_desc: 'தரம், எடை மற்றும் வங்கி பணப்பரிமாற்ற நிலையை செயலியில் உடனுக்குடன் அறியலாம்.',
    step9_title: 'நேரடி வங்கி பணப்பரிமாற்றம் (DBT)',
    step9_desc: 'மத்திய/மாநில அரசு MSP தொகை நேரடியாக விவசாயியின் ஆதார் வங்கிக் கணக்கில் (DBT) செலுத்தப்படும்.',
    outcome_title: 'முடிவு: நெரிசல் இல்லா விரைவான கொள்முதல்',
    outcome_desc: 'விவசாயிகளுக்கு நேரம் மிச்சமாகிறது, அரசு மண்டிகள் சிறப்பாக இயங்குகின்றன, கவுரவமான கொள்முதல் சாத்தியமாகிறது.',

    // Booking Page
    booking_page_title: '📅 விவசாயி கொள்முதல் நேர முன்பதிவு',
    booking_page_subtitle: 'நெரிசலைத் தவிர்க்கவும், விரைவான எடையிடல் மற்றும் அரசு MSP விலையைப் பெறவும் முன்கூட்டியே நேரத்தை பதிவு செய்யுங்கள்.',
    step1_mandi_header: 'அரசு ஒழுங்குமுறை விற்பனைக்கூடத்தைத் தேர்ந்தெடுக்கவும்',
    step2_farmer_header: 'விவசாயி & பயிர் விவரங்கள்',
    step3_schedule_header: 'தேதி & நேர இடைவெளியைத் தேர்வு செய்க',
    btn_confirm_generate_pass: '🎟️ முன்பதிவை உறுதி செய்து இ-பாஸ் பெறுக',
    summary_header: '📊 முன்பதிவு & விலை கணக்கீடு',
    
    // Buttons
    btn_book_here: '🎟️ நேரம் பதிவு செய்',
    btn_call_mandi: '📞 மண்டிக்கு அழை',
    btn_call_centre: '📞 மையத்திற்கு அழை'
  },
  
  hi: {
    nav_find_mandi: '📍 मंडी खोजें',
    nav_directory: '🏛️ राज्य डायरेक्टरी',
    nav_tracker: '🎟️ पास ट्रैकर',
    nav_book_slot: '📅 स्लॉट बुकिंग',
    nav_admin: '⚙️ मंडी एडमिन',
    nav_how_it_works: 'यह कैसे काम करता है',
    nav_about: 'हमारे बारे में',
    nav_officer_login: '⚙️ अधिकारी लॉगिन',
    nav_login: 'अधिकारी / किसान लॉगिन',
    nav_register: 'पंजीकरण करें',
    
    hero_badge: 'स्मार्ट डिजिटल मंडी और खरीद प्रणाली',
    hero_title: 'किसान खरीद में <span class="text-gradient">लंबी कतारों</span> और देरी से मुक्ति',
    hero_subtitle: 'भारतीय किसानों के लिए नजदीकी सरकारी एपीएमसी मंडियों की खोज, स्लॉट बुकिंग, लाइव कतार ट्रैकिंग और पारदर्शी डीबीटी एमएसपी भुगतान का डिजिटल मंच।',
    lang_select_title: 'अपनी भाषा चुनें / Choose Language',
    lang_select_desc: 'सभी सेवाओं और टोकन विवरण को अपनी भाषा में देखने के लिए भाषा चुनें',
    
    stat_reduced_wait: 'प्रतीक्षा समय में कमी',
    stat_mandis: 'सरकारी मंडियां',
    stat_dbt: 'डिजिटल डीबीटी भुगतान',
    btn_book_slot: 'खरीद स्लॉट बुक करें',
    btn_view_directory: '🏛️ राज्य मंडियां देखें',
    btn_admin_portal: '⚙️ मंडी एडमिन पोर्टल',
    
    phone_greeting: 'नमस्ते, रमेश 🙏',
    phone_today: 'आज',
    card_active_slot: '● सक्रिय स्लॉट',
    card_queue_eta: '2 किसान आगे • ~15 मिनट में आपकी बारी',
    card_completed_paid: '✓ पूर्ण और भुगतान हुआ',
    paid_badge: 'डीबीटी द्वारा हस्तांतरित',
    scroll_label: 'नीचे स्क्रॉल करें',
    
    // Locator
    locator_label: 'निकटता इंजन',
    locator_title: 'अपने नजदीकी सरकारी मंडियां खोजें',
    locator_desc: 'पिनकोड, जिला या मंडी का नाम दर्ज करके निकटतम सरकारी एपीएमसी मंडियों, पते, संपर्क नंबर और उपलब्ध स्लॉट की जानकारी पाएं।',
    pincode_label: 'पिनकोड / जिला दर्ज करें',
    pincode_placeholder: 'उदा: 422001, 141001, 462038, भोपाल, नासिक...',
    btn_search_mandis: '🔍 मंडी खोजें',
    btn_auto_detect: '🎯 स्थान का स्वतः पता लगाएं',
    quick_pins_label: 'पॉपुलर पिनकोड:',
    found_mandis_text: 'सरकारी मंडियां मिलीं',
    live_dist_tag: '✓ दूरी अनुसार क्रमबद्ध',
    
    // Directory
    dir_label: 'अखिल भारतीय एपीएमसी डायरेक्टरी',
    dir_title: 'राज्य और जिले के अनुसार सरकारी मंडियां',
    dir_desc: 'अपने राज्य और जिले का चयन करके सभी सत्यापित सरकारी एपीएमसी यार्ड, संपर्क अधिकारी और दैनिक एमएसपी खरीद दरें देखें।',
    label_state: '1. राज्य चुनें',
    label_district: '2. जिला चुनें',
    label_crop: '3. फसल किस्म के अनुसार फ़िल्टर करें',
    label_search_name: 'मंडी / एपीएमसी का नाम खोजें',
    search_mandi_ph: 'मंडी या समिति का नाम टाइप करें...',
    showing_centres: 'दिखाए जा रहे सरकारी खरीद केंद्र:',
    all_live_connected: 'सभी केंद्र लाइव कनेक्टेड हैं',
    
    // Tracker
    tracker_label: 'किसान लाइव स्टेटस',
    tracker_title: 'अपना खरीद पास और लाइव कतार ट्रैक करें',
    tracker_desc: 'धूप में खड़े हुए बिना वास्तविक समय में अपना टोकन नंबर, अनुमानित समय और वजन की स्थिति देखें।',
    track_token_ph: '4-अंकीय टोकन दर्ज करें (उदा: 2048, 1401, 2045)...',
    btn_track_live: 'लाइव स्थिति ट्रैक करें',
    pass_badge_text: 'डिजिटल मंडी पास',
    step_booked: 'स्लॉट बुक हुआ',
    step_gate: 'गेट चेक-इन',
    step_quality: 'गुणवत्ता और नमी',
    step_weigh: 'डिजिटल वजन',
    step_payment: 'डीबीटी भुगतान',
    eta_gate: 'आवंटित गेट',
    eta_crop: 'फसल और मात्रा',
    eta_pos: 'वर्तमान स्थिति',
    eta_turn: 'अनुमानित बारी',
    
    // Admin Gateway & Page
    admin_label: 'स्वतंत्र केंद्र संचालन',
    admin_title: 'सरकारी मंडी एडमिन नियंत्रण केंद्र',
    admin_desc: 'प्रत्येक सरकारी मंडी स्वतंत्र रूप से काम करती है। किसी भी मंडी का चयन करके उसके टोकन, वजन और भुगतान का प्रबंधन करें।',
    admin_portal_box_title: 'एपीएमसी अधीक्षक और वे-ब्रिज अधिकारी सूट',
    admin_portal_box_desc: 'अधिकृत मंडी कर्मचारी टोकन बुलाने, डिजिटल वजन रिकॉर्ड करने और डीबीटी भुगतान स्वीकृत करने के लिए लॉगिन करें।',
    btn_enter_admin_portal: '🔐 एपीएमसी अधिकारी पोर्टल में प्रवेश करें',
    btn_book_farmer_slot: '👨‍🌾 किसान स्लॉट बुकिंग',
    admin_select_lbl: '🏛️ ऑपरेटिंग मंडी केंद्र चुनें:',
    tab_overview: '📊 लाइव अवलोकन',
    tab_queue: '👨‍🌾 लाइव टोकन कॉलिंग',
    tab_weighbridge: '⚖️ आईओटी वजन कांटा टर्मिनल',
    tab_slots: '📅 स्लॉट और क्षमता नियंत्रण',
    tab_msp: '🌾 दैनिक एमएसपी दरें',
    tab_reports: '💳 डीबीटी भुगतान रिपोर्ट',
    
    stat_today_bookings: 'आज की कुल बुकिंग',
    stat_procured: 'वजन पूरा हुआ',
    stat_in_queue: 'वर्तमान में कतार में',
    stat_dbt_payouts: 'निपटाई गई डीबीटी राशि',
    
    now_serving_title: '📢 वे-ब्रिज #1 पर बुलावा',
    btn_call_next: '🔊 अगले किसान को बुलाएं',
    today_queue_title: 'आज की मंडी टोकन कतार',
    live_sync_tag: 'लाइव सिंक',
    
    th_token: 'टोकन #',
    th_farmer: 'किसान का नाम',
    th_mobile: 'मोबाइल नंबर',
    th_crop: 'फसल',
    th_qty: 'मात्रा (क्विंटल)',
    th_slot: 'स्लॉट समय',
    th_status: 'स्थिति',
    th_actions: 'कार्रवाई',
    btn_advance: 'अगला चरण ➔',
    
    // Admin
    admin_auth_title: 'APMC अधिकारी प्रमाणीकरण',
    admin_auth_subtitle: 'लाइव ऑपरेशंस सूट तक पहुंचने के लिए अपने मंडी केंद्र के क्रेडेंशियल दर्ज करें।',
    admin_login_btn: '🔐 सुरक्षित अधिकारी लॉगिन',

    // Problem Section
    problem_label: 'समस्या',
    problem_title: 'किसानमित्र क्यों?',
    prob_wait_title: 'घंटों का इंतजार',
    prob_wait_desc: 'खरीद केंद्रों पर किसान 6-8 घंटे अव्यवस्थित कतारों में बिताते हैं, जिससे उनका पूरा दिन बर्बाद होता है।',
    prob_trans_title: 'पारदर्शिता का अभाव',
    prob_trans_desc: 'कागजी प्रणाली से किसानों को कतार की स्थिति, वजन रिकॉर्ड या भुगतान समय की जानकारी नहीं मिलती।',
    prob_cong_title: 'मंडियों में भारी जाम',
    prob_cong_desc: 'एक साथ सैकड़ों किसान पहुंचने से वाहनों की भीड़ और फसल खराब होने का जोखिम रहता है।',
    prob_pay_title: 'भुगतान में देरी',
    prob_pay_desc: 'डिजिटल ट्रैकिंग के बिना किसानों को पता नहीं चलता कि उनका पैसा बैंक में कब जमा होगा।',

    // How It Works
    how_label: 'समाधान',
    how_title: 'किसानमित्र कैसे काम करता है',
    how_desc: 'खरीद अनुभव को बदलने वाली 9 चरणों की डिजिटल यात्रा',
    step1_title: 'किसान पंजीकरण',
    step1_desc: 'सरल मोबाइल/आधार लिंक साइन-अप प्रक्रिया। किसान फोन नंबर और ओटीपी से रजिस्टर करते हैं।',
    step2_title: 'स्लॉट बुकिंग',
    step2_desc: 'पसंदीदा केंद्र, तिथि और समय चुनें। भीड़ रोकने के लिए रियल-टाइम उपलब्धता दिखाई जाती है।',
    step3_title: 'एसएमएस / ऐप सूचना',
    step3_desc: 'स्लॉट विवरण और समय की जानकारी तुरंत एसएमएस द्वारा प्राप्त करें।',
    step4_title: 'रियल-टाइम कतार प्रबंधन',
    step4_desc: 'डिजिटल टोकन सिस्टम से लाइव ट्रैकिंग। देखें कतार में आगे कितने लोग हैं।',
    step5_title: 'बारी आने का अलर्ट',
    step5_desc: 'बारी आने पर स्वचालित अलर्ट, ताकि केंद्र पर लगातार खड़ा न रहना पड़े।',
    step6_title: 'आगमन और गुणवत्ता जांच',
    step6_desc: 'आगमन पर फसल गुणवत्ता और नमी की डिजिटल जांच।',
    step7_title: 'IoT वजन मापन',
    step7_desc: 'IoT सिस्टम द्वारा स्वचालित डिजिटल वजन और तत्काल पर्ची।',
    step8_title: 'खरीद स्थिति अपडेट',
    step8_desc: 'ऐप में जांच से लेकर वजन और भुगतान तक की लाइव ट्रैकिंग।',
    step9_title: 'प्रत्यक्ष डीबीटी भुगतान',
    step9_desc: 'सीधे बैंक खाते में डीबीटी द्वारा सरकारी एमएसपी भुगतान।',
    outcome_title: 'परिणाम: शून्य प्रतीक्षा समय और पारदर्शी खरीद',
    outcome_desc: 'किसानों का समय बचता है और पारदर्शी प्रक्रिया सुनिश्चित होती है।',

    // Booking Page
    booking_page_title: '📅 किसान खरीद स्लॉट बुकिंग',
    booking_page_subtitle: 'लंबी कतारों से बचने, तत्काल वजन और सरकारी एमएसपी दर सुनिश्चित करने के लिए पहले से समय बुक करें।',
    step1_mandi_header: 'सरकारी एपीएमसी मंडी केंद्र चुनें',
    step2_farmer_header: 'किसान और फसल की जानकारी',
    step3_schedule_header: 'तारीख और समय चुनें',
    btn_confirm_generate_pass: '🎟️ बुकिंग कन्फर्म करें और डिजिटल पास प्राप्त करें',
    summary_header: '📊 बुकिंग और एमएसपी गणना',
    
    // Buttons
    btn_book_here: '🎟️ स्लॉट बुक करें',
    btn_call_mandi: '📞 मंडी को कॉल करें',
    btn_call_centre: '📞 केंद्र को कॉल करें'
  }
};

// Function to apply translation across the entire DOM
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kisan_lang', lang);
  const t = I18N[lang] || I18N.en;

  // Update text for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update input placeholders
  const pincodeInp = document.getElementById('pincodeInput');
  if (pincodeInp && t.pincode_placeholder) pincodeInp.placeholder = t.pincode_placeholder;

  const trackInp = document.getElementById('trackTokenInput');
  if (trackInp && t.track_token_ph) trackInp.placeholder = t.track_token_ph;

  const mandiSearchInp = document.getElementById('mandiSearchName');
  if (mandiSearchInp && t.search_mandi_ph) mandiSearchInp.placeholder = t.search_mandi_ph;

  // Sync Dropdown in Navbar
  const globalLangSelect = document.getElementById('globalLangSelect');
  if (globalLangSelect) globalLangSelect.value = lang;

  // Re-render dynamic components with translated labels
  if (typeof renderPincodeResults === 'function' && document.getElementById('pincodeMandiGrid')) {
    const pin = document.getElementById('pincodeInput')?.value || '642001';
    renderPincodeResults(pin);
  }
  if (typeof renderDirectoryMandis === 'function' && document.getElementById('directoryMandiGrid')) {
    renderDirectoryMandis();
  }
  if (typeof loadAdminMandi === 'function' && document.getElementById('adminMandiSelect')) {
    loadAdminMandi(currentAdminMandiId);
  }
}

// =========================================================
// ===== REAL AUTHENTIC GOVERNMENT APMC MANDI DATASET ======
// =========================================================

const MANDI_DATABASE = [
  // --- TAMIL NADU MANDIS (From Real e-NAM / APMC Dataset) ---
  {
    id: 'tn_ammoor',
    name: 'Ammoor Market Committee',
    type: 'Regulated Market Committee Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'vellore',
    districtName: 'Vellore / Ranipet',
    pincode: '632501',
    address: 'Market Committee Yard, Ammoor, Ranipet / Vellore, Tamil Nadu 632501',
    phone: '04172-253321',
    secretaryName: 'Superintendent of Market',
    secretaryPhone: '+91 94861 70453',
    operatingHours: '08:00 AM – 05:30 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy / Ragi (நெல் / கேழ்வரகு)', msp: 2300, maxMoisture: 14 },
      { key: 'groundnut', name: 'Groundnut (நிலக்கடலை)', msp: 6783, maxMoisture: 9 },
      { key: 'bajra', name: 'Bajra / Millet (கம்பு)', msp: 2625, maxMoisture: 12 },
      { key: 'chillies', name: 'Chillies / Red Gram (மிளகாய்)', msp: 7550, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:30 AM', max: 35, booked: 20 }, { id: 's2', time: '12:00 PM - 03:00 PM', max: 35, booked: 18 }, { id: 's3', time: '03:30 PM - 05:30 PM', max: 25, booked: 10 }],
    queue: [
      { token: '#KM-101', farmerName: 'K. Subramani', phone: '+91 94861 70453', vehicleNo: 'TN-23-AX-1122', crop: 'Paddy', estQty: 25, grossWeight: 65.0, tareWeight: 40.0, netWeight: 25.0, moisture: 13.0, mspRate: 2300, totalPayout: 57500, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate 1' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-01', farmerName: 'K. Subramani', bank: 'Indian Bank (IDIB000A12)', crop: 'Paddy', netQty: 25.0, amount: 57500, utr: 'UTR94861704530', status: 'Settled' }]
  },
  {
    id: 'tn_anaimalai',
    name: 'Anaimalai Regulated Market',
    type: 'Regulated Market Committee (Grade-1)',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'coimbatore',
    districtName: 'Coimbatore',
    pincode: '642104',
    address: '84, Pollachi Main Road, Anaimalai, Coimbatore, Tamil Nadu 642104',
    phone: '04253-262223',
    secretaryName: 'Regulated Market Officer',
    secretaryPhone: '+91 99441 15918',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'copra', name: 'Copra Grade-1 (கொப்பரை தேங்காய்)', msp: 12000, maxMoisture: 6 },
      { key: 'coconut', name: 'Coconut (தேங்காய்)', msp: 3200, maxMoisture: 8 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 11:00 AM', max: 40, booked: 32 }, { id: 's2', time: '11:30 AM - 02:30 PM', max: 40, booked: 25 }],
    queue: [
      { token: '#KM-102', farmerName: 'M. Palanisamy', phone: '+91 99441 15918', vehicleNo: 'TN-41-E-9988', crop: 'Copra', estQty: 18, grossWeight: 56.0, tareWeight: 38.0, netWeight: 18.0, moisture: 5.8, mspRate: 12000, totalPayout: 216000, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate A' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-02', farmerName: 'M. Palanisamy', bank: 'Canara Bank (CNRB000109)', crop: 'Copra', netQty: 18.0, amount: 216000, utr: 'UTR99441159180', status: 'Settled' }]
  },
  {
    id: 'tn_annur',
    name: 'Annur Market Committee',
    type: 'Regulated Market Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'coimbatore',
    districtName: 'Coimbatore',
    pincode: '641653',
    address: 'Nagammapudur, Sathyamangalam Road, Annur, Coimbatore 641653',
    phone: '04254-262440',
    secretaryName: 'Superintendent',
    secretaryPhone: '+91 88836 39999',
    operatingHours: '08:00 AM – 05:30 PM',
    activeCrops: [
      { key: 'cotton', name: 'Cotton (பருத்தி)', msp: 7121, maxMoisture: 8 },
      { key: 'maize', name: 'Maize / Jowar (மக்காச்சோளம்)', msp: 2225, maxMoisture: 14 },
      { key: 'copra', name: 'Copra / Groundnut (கொப்பரை)', msp: 12000, maxMoisture: 6 },
      { key: 'banana', name: 'Banana (வாழைக்காய்)', msp: 2100, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:30 AM', max: 35, booked: 28 }, { id: 's2', time: '12:00 PM - 03:00 PM', max: 35, booked: 20 }],
    queue: [
      { token: '#KM-103', farmerName: 'R. Velusamy', phone: '+91 88836 39999', vehicleNo: 'TN-38-BZ-4412', crop: 'Cotton', estQty: 22, grossWeight: 60.0, tareWeight: 38.0, netWeight: 22.0, moisture: 7.5, mspRate: 7121, totalPayout: 156662, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate 1' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-03', farmerName: 'R. Velusamy', bank: 'State Bank of India (SBIN000412)', crop: 'Cotton', netQty: 22.0, amount: 156662, utr: 'UTR88836399990', status: 'Settled' }]
  },
  {
    id: 'tn_anthiyur',
    name: 'Anthiyur Regulated Market',
    type: 'Erode Market Committee Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'erode',
    districtName: 'Erode',
    pincode: '638501',
    address: 'Opposite to Weekly Market, Anthiyur, Erode District 638501',
    phone: '04256-260265',
    secretaryName: 'Market Committee Officer',
    secretaryPhone: '+91 90952 74110',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'turmeric', name: 'Turmeric / Bulb (மஞ்சள்)', msp: 8500, maxMoisture: 10 },
      { key: 'maize', name: 'Maize (மக்காச்சோளம்)', msp: 2225, maxMoisture: 14 },
      { key: 'groundnut', name: 'Groundnut / Copra (நிலக்கடலை)', msp: 6783, maxMoisture: 9 },
      { key: 'cotton', name: 'Cotton (பருத்தி)', msp: 7121, maxMoisture: 8 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:30 AM', max: 40, booked: 30 }, { id: 's2', time: '12:00 PM - 03:00 PM', max: 40, booked: 22 }],
    queue: [
      { token: '#KM-104', farmerName: 'S. Kandasamy', phone: '+91 90952 74110', vehicleNo: 'TN-36-P-8821', crop: 'Turmeric', estQty: 20, grossWeight: 58.0, tareWeight: 38.0, netWeight: 20.0, moisture: 9.2, mspRate: 8500, totalPayout: 170000, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate Main' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-04', farmerName: 'S. Kandasamy', bank: 'Indian Overseas Bank (IOBA0001)', crop: 'Turmeric', netQty: 20.0, amount: 170000, utr: 'UTR90952741100', status: 'Settled' }]
  },
  {
    id: 'tn_arani',
    name: 'Arani Regulated Market',
    type: 'Regulated Market Arni',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'tiruvannamalai',
    districtName: 'Tiruvannamalai',
    pincode: '632301',
    address: 'Millers Road, Arni, Tiruvannamalai District 632301',
    phone: '04173-222400',
    secretaryName: 'Superintendent',
    secretaryPhone: '+91 94438 00954',
    operatingHours: '08:00 AM – 05:30 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy Common / Arni Ponni (நெல்)', msp: 2320, maxMoisture: 14 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 11:00 AM', max: 45, booked: 38 }, { id: 's2', time: '11:30 AM - 02:30 PM', max: 45, booked: 30 }],
    queue: [{ token: '#KM-105', farmerName: 'N. Murugan', phone: '+91 94438 00954', vehicleNo: 'TN-25-Y-3312', crop: 'Paddy', estQty: 30, grossWeight: 70.0, tareWeight: 40.0, netWeight: 30.0, moisture: 13.5, mspRate: 2320, totalPayout: 69600, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate 1' }],
    dbtSettlements: [{ refNo: 'DBT-TN-05', farmerName: 'N. Murugan', bank: 'Indian Bank (IDIB000ARNI)', crop: 'Paddy', netQty: 30.0, amount: 69600, utr: 'UTR94438009541', status: 'Settled' }]
  },
  {
    id: 'tn_pollachi',
    name: 'Pollachi Regulated Market',
    type: 'Coimbatore Market Committee Central Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'coimbatore',
    districtName: 'Coimbatore',
    pincode: '642001',
    address: 'Meenkarai Road, Pollachi, Coimbatore, Tamil Nadu 642001',
    phone: '04259-223456',
    secretaryName: 'M. Senthil Kumar',
    secretaryPhone: '+91 96260 47530',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'copra', name: 'Copra (கொப்பரை தேங்காய்)', msp: 12000, maxMoisture: 6 },
      { key: 'coconut', name: 'Coconut (தேங்காய்)', msp: 3200, maxMoisture: 8 },
      { key: 'maize', name: 'Maize (மக்காச்சோளம்)', msp: 2225, maxMoisture: 14 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:30 AM', max: 50, booked: 42 }, { id: 's2', time: '12:00 PM - 03:00 PM', max: 50, booked: 35 }],
    queue: [
      { token: '#KM-2048', farmerName: 'Ramesh Patil', phone: '+91 96260 47530', vehicleNo: 'TN-41-EG-4412', crop: 'Copra', estQty: 25, grossWeight: 65.0, tareWeight: 40.0, netWeight: 25.0, moisture: 5.9, mspRate: 12000, totalPayout: 300000, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate 2' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-06', farmerName: 'Ramesh Patil', bank: 'State Bank of India (SBIN0000412)', crop: 'Copra', netQty: 25.0, amount: 300000, utr: 'UTR96260475301', status: 'Settled' }]
  },
  {
    id: 'tn_erode_turmeric',
    name: 'Erode Super Market Complex (Manjal Valagam)',
    type: 'State Central Turmeric Market',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'erode',
    districtName: 'Erode',
    pincode: '638107',
    address: '85 Manjal Valagam, Sembampalayam, Nasiyanur Road, Erode 638107',
    phone: '0424-212113',
    secretaryName: 'Superintendent Of Market',
    secretaryPhone: '+91 63909 67222',
    operatingHours: '07:30 AM – 06:30 PM',
    activeCrops: [
      { key: 'turmeric', name: 'Turmeric / Turmeric Bulb (மஞ்சள்)', msp: 8800, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '07:30 AM - 10:30 AM', max: 60, booked: 55 }, { id: 's2', time: '11:00 AM - 02:00 PM', max: 60, booked: 48 }],
    queue: [
      { token: '#KM-107', farmerName: 'K. Sadasivam', phone: '+91 63909 67222', vehicleNo: 'TN-33-AB-9912', crop: 'Turmeric', estQty: 35, grossWeight: 75.0, tareWeight: 40.0, netWeight: 35.0, moisture: 9.0, mspRate: 8800, totalPayout: 308000, slotTime: '07:30 AM', status: 'Weighing', gate: 'Gate Turmeric 1' }
    ],
    dbtSettlements: [{ refNo: 'DBT-TN-07', farmerName: 'K. Sadasivam', bank: 'HDFC Bank (HDFC000123)', crop: 'Turmeric', netQty: 35.0, amount: 308000, utr: 'UTR63909672220', status: 'Settled' }]
  },
  {
    id: 'tn_dindigul',
    name: 'Dindigul Market Committee',
    type: 'Regulated Market Committee Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'dindigul',
    districtName: 'Dindigul',
    pincode: '624002',
    address: 'Poonmandurai Road, Begampur, Dindigul 624002',
    phone: '0451-400959',
    secretaryName: 'Secretary',
    secretaryPhone: '+91 99946 21079',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy / Jowar (நெல் / சோளம்)', msp: 2300, maxMoisture: 14 },
      { key: 'cotton', name: 'Cotton (பருத்தி)', msp: 7121, maxMoisture: 8 },
      { key: 'groundnut', name: 'Groundnut / Copra (நிலக்கடலை)', msp: 6783, maxMoisture: 9 },
      { key: 'onion', name: 'Small Onion (சின்ன வெங்காயம்)', msp: 2400, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 11:00 AM', max: 40, booked: 32 }, { id: 's2', time: '11:30 AM - 02:30 PM', max: 40, booked: 26 }],
    queue: [{ token: '#KM-108', farmerName: 'A. Thangavel', phone: '+91 99946 21079', vehicleNo: 'TN-57-E-1199', crop: 'Cotton', estQty: 20, grossWeight: 58.0, tareWeight: 38.0, netWeight: 20.0, moisture: 7.8, mspRate: 7121, totalPayout: 142420, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate 1' }],
    dbtSettlements: [{ refNo: 'DBT-TN-08', farmerName: 'A. Thangavel', bank: 'Canara Bank (CNRB000221)', crop: 'Cotton', netQty: 20.0, amount: 142420, utr: 'UTR99946210790', status: 'Settled' }]
  },
  {
    id: 'tn_gobichettipalayam',
    name: 'Gobichettipalayam Market Committee',
    type: 'Regulated Market Yard',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'erode',
    districtName: 'Erode',
    pincode: '638452',
    address: 'No. 196, Sathy Road, Gobichettipalayam, Erode 638452',
    phone: '04285-222278',
    secretaryName: 'Market Supervisor',
    secretaryPhone: '+91 75024 02545',
    operatingHours: '08:00 AM – 05:30 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy / Ragi (நெல் / கேழ்வரகு)', msp: 2300, maxMoisture: 14 },
      { key: 'turmeric', name: 'Turmeric (மஞ்சள்)', msp: 8500, maxMoisture: 10 },
      { key: 'groundnut', name: 'Groundnut / Gingelly (நிலக்கடலை / எள்)', msp: 6783, maxMoisture: 9 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:30 AM', max: 35, booked: 25 }, { id: 's2', time: '12:00 PM - 03:00 PM', max: 35, booked: 19 }],
    queue: [{ token: '#KM-109', farmerName: 'P. Arumugam', phone: '+91 75024 02545', vehicleNo: 'TN-36-AA-5566', crop: 'Paddy', estQty: 22, grossWeight: 60.0, tareWeight: 38.0, netWeight: 22.0, moisture: 13.0, mspRate: 2300, totalPayout: 50600, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate 1' }],
    dbtSettlements: [{ refNo: 'DBT-TN-09', farmerName: 'P. Arumugam', bank: 'Indian Bank (IDIB000GOBI)', crop: 'Paddy', netQty: 22.0, amount: 50600, utr: 'UTR75024025450', status: 'Settled' }]
  },
  {
    id: 'tn_madurai_mattuthavani',
    name: 'Madurai Mattuthavani Regulated Market',
    type: 'Central Paddy & Commodity Complex',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'madurai',
    districtName: 'Madurai',
    pincode: '625007',
    address: 'Paddy Complex, Flower Market Road, Mattuthavani-7, Madurai 625007',
    phone: '0452-2580379',
    secretaryName: 'Superintendent',
    secretaryPhone: '+91 99763 13418',
    operatingHours: '07:00 AM – 06:30 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy / Rice (நெல்)', msp: 2300, maxMoisture: 14 },
      { key: 'groundnut', name: 'Groundnut (நிலக்கடலை)', msp: 6783, maxMoisture: 9 },
      { key: 'urad', name: 'Urad / Green Gram (உளுந்து / பாசிப்பயறு)', msp: 7400, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '07:30 AM - 10:30 AM', max: 50, booked: 42 }, { id: 's2', time: '11:00 AM - 02:00 PM', max: 50, booked: 38 }],
    queue: [{ token: '#KM-110', farmerName: 'M. Karuppasamy', phone: '+91 99763 13418', vehicleNo: 'TN-58-Q-4455', crop: 'Paddy', estQty: 28, grossWeight: 68.0, tareWeight: 40.0, netWeight: 28.0, moisture: 13.2, mspRate: 2300, totalPayout: 64400, slotTime: '07:30 AM', status: 'Weighing', gate: 'Gate Paddy 1' }],
    dbtSettlements: [{ refNo: 'DBT-TN-10', farmerName: 'M. Karuppasamy', bank: 'State Bank of India (SBIN000124)', crop: 'Paddy', netQty: 28.0, amount: 64400, utr: 'UTR99763134180', status: 'Settled' }]
  },
  {
    id: 'tn_thiruppur',
    name: 'Tiruppur Market Committee',
    type: 'Regulated Cotton & Agri Market',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'tiruppur',
    districtName: 'Tiruppur',
    pincode: '641604',
    address: 'Palladam Road, Cotton Market Post, Tirupur 641604',
    phone: '04212-212141',
    secretaryName: 'Superintendent',
    secretaryPhone: '+91 88256 01614',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'cotton', name: 'Cotton (பருத்தி)', msp: 7121, maxMoisture: 8 },
      { key: 'copra', name: 'Coconut / Copra (கொப்பரை)', msp: 12000, maxMoisture: 6 },
      { key: 'bajra', name: 'Bajra / Chillies (கம்பு / மிளகாய்)', msp: 2625, maxMoisture: 12 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 11:00 AM', max: 40, booked: 34 }, { id: 's2', time: '11:30 AM - 02:30 PM', max: 40, booked: 28 }],
    queue: [{ token: '#KM-111', farmerName: 'S. Nallathambi', phone: '+91 88256 01614', vehicleNo: 'TN-39-AC-7788', crop: 'Cotton', estQty: 25, grossWeight: 65.0, tareWeight: 40.0, netWeight: 25.0, moisture: 7.6, mspRate: 7121, totalPayout: 178025, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate A' }],
    dbtSettlements: [{ refNo: 'DBT-TN-11', farmerName: 'S. Nallathambi', bank: 'Canara Bank (CNRB000331)', crop: 'Cotton', netQty: 25.0, amount: 178025, utr: 'UTR88256016140', status: 'Settled' }]
  },
  {
    id: 'tn_villupuram',
    name: 'Villupuram Regulated Market',
    type: 'Regulated Market Yard (e-NAM)',
    state: 'tamil_nadu',
    stateName: 'Tamil Nadu',
    district: 'villupuram',
    districtName: 'Villupuram',
    pincode: '605602',
    address: 'Nehruji Road, Villupuram, Tamil Nadu 605602',
    phone: '04146-222450',
    secretaryName: 'Superintendent',
    secretaryPhone: '+91 88256 01614',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'paddy', name: 'Paddy / Maize (நெல் / மக்காச்சோளம்)', msp: 2300, maxMoisture: 14 },
      { key: 'groundnut', name: 'Groundnut / Sesame (நிலக்கடலை / எள்)', msp: 6783, maxMoisture: 9 },
      { key: 'urad', name: 'Urad Black Gram (உளுந்து)', msp: 7400, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 11:00 AM', max: 45, booked: 39 }, { id: 's2', time: '11:30 AM - 02:30 PM', max: 45, booked: 31 }],
    queue: [{ token: '#KM-112', farmerName: 'V. Ramanathan', phone: '+91 88256 01614', vehicleNo: 'TN-32-N-1234', crop: 'Paddy', estQty: 30, grossWeight: 70.0, tareWeight: 40.0, netWeight: 30.0, moisture: 13.4, mspRate: 2300, totalPayout: 69000, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate 1' }],
    dbtSettlements: [{ refNo: 'DBT-TN-12', farmerName: 'V. Ramanathan', bank: 'Indian Bank (IDIB000VILP)', crop: 'Paddy', netQty: 30.0, amount: 69000, utr: 'UTR88256016141', status: 'Settled' }]
  },

  // --- MAHARASHTRA MANDIS ---
  {
    id: 'mh_nashik_main',
    name: 'Nashik APMC Main Market Yard',
    type: 'Govt. APMC Principal Market Yard (Grade A)',
    state: 'maharashtra',
    stateName: 'Maharashtra',
    district: 'nashik',
    districtName: 'Nashik',
    pincode: '422001',
    address: 'Panchavati Krishi Bazar, Dindori Road, Nashik, Maharashtra 422001',
    phone: '+91 253 257 8890',
    secretaryName: 'Suresh Kulkarni',
    secretaryPhone: '+91 94222 10982',
    operatingHours: '08:00 AM – 06:30 PM',
    activeCrops: [
      { key: 'wheat', name: 'Wheat (गेहूं)', msp: 2275, maxMoisture: 12 },
      { key: 'soybean', name: 'Soybean (सोयाबीन)', msp: 4892, maxMoisture: 12 },
      { key: 'onion', name: 'Onion (कांदा)', msp: 1850, maxMoisture: 10 }
    ],
    slots: [{ id: 's1', time: '09:00 AM - 11:00 AM', max: 35, booked: 28 }, { id: 's2', time: '11:30 AM - 01:30 PM', max: 35, booked: 31 }],
    queue: [{ token: '#KM-2045', farmerName: 'Ramesh Patil', phone: '+91 98765 43210', vehicleNo: 'MH-15-EG-4412', crop: 'Wheat', estQty: 12, grossWeight: 52.4, tareWeight: 38.0, netWeight: 14.4, moisture: 11.8, mspRate: 2275, totalPayout: 32760, slotTime: '09:00 AM', status: 'Weighing', gate: 'Gate 2' }],
    dbtSettlements: [{ refNo: 'DBT-2026-8819', farmerName: 'Ramesh Patil', bank: 'State Bank of India (SBIN0001234)', crop: 'Wheat', netQty: 14.4, amount: 32760, utr: 'UTR98210948291', status: 'Settled' }]
  },

  // --- MADHYA PRADESH MANDIS (From Real Government Mandi Dataset) ---
  {
    id: 'mp_bhopal_karond',
    name: 'Bhopal Karond Krishi Upaj Mandi',
    type: 'Govt. Krishi Upaj Mandi Samiti (Grade A)',
    state: 'madhya_pradesh',
    stateName: 'Madhya Pradesh',
    district: 'bhopal',
    districtName: 'Bhopal',
    pincode: '462038',
    address: 'Karond Bypass, Berasia Road, Bhopal, MP 462038',
    phone: '0755-2743320',
    secretaryName: 'Dinesh Sharma',
    secretaryPhone: '+91 94075 54741',
    operatingHours: '08:00 AM – 06:00 PM',
    activeCrops: [
      { key: 'wheat', name: 'Wheat (गेहूं - Sharbati)', msp: 2400, maxMoisture: 12 },
      { key: 'soybean', name: 'Soybean (सोयाबीन)', msp: 4892, maxMoisture: 12 },
      { key: 'mustard', name: 'Mustard (सरसों)', msp: 5650, maxMoisture: 8 }
    ],
    slots: [{ id: 's1', time: '08:30 AM - 11:00 AM', max: 40, booked: 32 }, { id: 's2', time: '11:30 AM - 02:00 PM', max: 40, booked: 30 }],
    queue: [{ token: '#KM-7019', farmerName: 'Shivraj Singh Meena', phone: '+91 94075 54741', vehicleNo: 'MP-04-HE-7711', crop: 'Wheat', estQty: 22, grossWeight: 62.0, tareWeight: 40.0, netWeight: 22.0, moisture: 10.9, mspRate: 2400, totalPayout: 52800, slotTime: '08:30 AM', status: 'Weighing', gate: 'Gate 2' }],
    dbtSettlements: [{ refNo: 'DBT-MP-01', farmerName: 'Shivraj Singh Meena', bank: 'Madhya Pradesh Gramin Bank (MPGB0001)', crop: 'Wheat', netQty: 22.0, amount: 52800, utr: 'UTR33192019283', status: 'Settled' }]
  },
  {
    id: 'mp_indore_laxmibai',
    name: 'Indore Laxmibai Nagar Krishi Mandi',
    type: 'Govt. Central APMC Yard (Grade A+)',
    state: 'madhya_pradesh',
    stateName: 'Madhya Pradesh',
    district: 'indore',
    districtName: 'Indore',
    pincode: '452006',
    address: 'Sanwer Road, Laxmibai Nagar, Indore, MP 452006',
    phone: '0731-2415500',
    secretaryName: 'Dr. R.K. Chouhan',
    secretaryPhone: '+91 99260 22900',
    operatingHours: '07:30 AM – 06:30 PM',
    activeCrops: [
      { key: 'soybean', name: 'Soybean (सोयाबीन)', msp: 4892, maxMoisture: 12 },
      { key: 'wheat', name: 'Wheat (गेहूं)', msp: 2275, maxMoisture: 12 },
      { key: 'mustard', name: 'Mustard (सरसों)', msp: 5650, maxMoisture: 8 }
    ],
    slots: [{ id: 's1', time: '08:00 AM - 10:30 AM', max: 45, booked: 39 }, { id: 's2', time: '11:00 AM - 01:30 PM', max: 45, booked: 37 }],
    queue: [{ token: '#KM-8001', farmerName: 'Kishore Patidar', phone: '+91 99260 22900', vehicleNo: 'MP-09-AB-4455', crop: 'Soybean', estQty: 25, grossWeight: 67.0, tareWeight: 42.0, netWeight: 25.0, moisture: 11.0, mspRate: 4892, totalPayout: 122300, slotTime: '08:00 AM', status: 'Weighing', gate: 'Gate 1' }],
    dbtSettlements: [{ refNo: 'DBT-MP-02', farmerName: 'Kishore Patidar', bank: 'Canara Bank (CNRB0001234)', crop: 'Soybean', netQty: 25.0, amount: 122300, utr: 'UTR22192019283', status: 'Settled' }]
  },

  // --- PUNJAB MANDIS ---
  {
    id: 'pb_ludhiana_main',
    name: 'Ludhiana Grain Market APMC',
    type: 'Govt. APMC Principal Yard',
    state: 'punjab',
    stateName: 'Punjab',
    district: 'ludhiana',
    districtName: 'Ludhiana',
    pincode: '141001',
    address: 'New Grain Market, Gill Road, Ludhiana, Punjab 141001',
    phone: '0161-2401567',
    secretaryName: 'Harpreet Singh Sandhu',
    secretaryPhone: '+91 98140 22334',
    operatingHours: '07:00 AM – 07:00 PM',
    activeCrops: [
      { key: 'wheat', name: 'Wheat (ਕਣਕ / गेहूं)', msp: 2275, maxMoisture: 12 },
      { key: 'rice', name: 'Paddy / Basmati (ਝੋਨਾ / धान)', msp: 2320, maxMoisture: 14 }
    ],
    slots: [{ id: 's1', time: '07:30 AM - 10:30 AM', max: 50, booked: 44 }, { id: 's2', time: '11:00 AM - 02:00 PM', max: 50, booked: 41 }],
    queue: [{ token: '#KM-5011', farmerName: 'Gurpreet Singh', phone: '+91 98150 11223', vehicleNo: 'PB-10-CX-8890', crop: 'Wheat', estQty: 35, grossWeight: 75.0, tareWeight: 40.0, netWeight: 35.0, moisture: 11.2, mspRate: 2275, totalPayout: 79625, slotTime: '07:30 AM', status: 'Weighing', gate: 'Gate North 1' }],
    dbtSettlements: [{ refNo: 'DBT-PB-01', farmerName: 'Gurpreet Singh', bank: 'Punjab & Sind Bank (PSIB00001)', crop: 'Wheat', netQty: 35.0, amount: 79625, utr: 'UTR55192019283', status: 'Settled' }]
  }
];

// District Mapping by State
const DISTRICTS_BY_STATE = {
  tamil_nadu: [
    { key: 'all', name: 'All Districts (Tamil Nadu / அனைத்து மாவட்டங்கள்)' },
    { key: 'coimbatore', name: 'Coimbatore (கோயம்புத்தூர்)' },
    { key: 'erode', name: 'Erode (ஈரோடு)' },
    { key: 'tiruppur', name: 'Tiruppur (திருப்பூர்)' },
    { key: 'dindigul', name: 'Dindigul (திண்டுக்கல்)' },
    { key: 'vellore', name: 'Vellore / Ranipet / Tirupathur' },
    { key: 'tiruvannamalai', name: 'Tiruvannamalai (திருவண்ணாமலை)' },
    { key: 'villupuram', name: 'Villupuram / Kallakurichi' },
    { key: 'madurai', name: 'Madurai (மதுரை)' },
    { key: 'theni', name: 'Theni (தேனி)' },
    { key: 'cuddalore', name: 'Cuddalore (கடலூர்)' },
    { key: 'nagapattinam', name: 'Nagapattinam / Mayiladuthurai' },
    { key: 'ramanathapuram', name: 'Ramanathapuram (ராமநாதபுரம்)' },
    { key: 'virudhunagar', name: 'Virudhunagar (விருதுநகர்)' },
    { key: 'namakkal', name: 'Namakkal (நாமக்கல்)' },
    { key: 'kancheepuram', name: 'Kancheepuram (காஞ்சிபுரம்)' }
  ],
  maharashtra: [
    { key: 'all', name: 'All Districts (Maharashtra)' },
    { key: 'nashik', name: 'Nashik (नाशिक)' },
    { key: 'pune', name: 'Pune (पुणे)' },
    { key: 'nagpur', name: 'Nagpur (नागपूर)' }
  ],
  madhya_pradesh: [
    { key: 'all', name: 'All Districts (Madhya Pradesh)' },
    { key: 'bhopal', name: 'Bhopal (भोपाल)' },
    { key: 'indore', name: 'Indore (इंदौर)' },
    { key: 'jabalpur', name: 'Jabalpur (जबलपुर)' },
    { key: 'gwalior', name: 'Gwalior (ग्वालियर)' },
    { key: 'ujjain', name: 'Ujjain (उज्जैन)' }
  ],
  punjab: [
    { key: 'all', name: 'All Districts (Punjab)' },
    { key: 'ludhiana', name: 'Ludhiana (ਲੁਧਿਆਣਾ)' },
    { key: 'amritsar', name: 'Amritsar (ਅੰਮ੍ਰਿਤਸਰ)' }
  ]
};

let currentAdminMandiId = 'tn_pollachi';
let selectedMandiForBooking = 'tn_pollachi';

// =========================================================
// ===== INITIALIZATION & DOM EVENTS =======================
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  });

  // --- Mobile menu toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
      mobileToggle?.classList.toggle('active');
    });
  }

  // --- Language Selector Handlers ---
  const globalLangSelect = document.getElementById('globalLangSelect');
  globalLangSelect?.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });

  document.querySelectorAll('.hero-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1 && !link.id) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks?.classList.remove('open');
          mobileToggle?.classList.remove('active');
        }
      }
    });
  });

  // --- Stat counters animation ---
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count')) || 0;
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * ease);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let statsAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(el => animateCount(el));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);


  // =========================================================
  // ===== 1. MANDI LOCATOR (PINCODE & KEYWORD SEARCH) =======
  // =========================================================

  const pincodeInput = document.getElementById('pincodeInput');
  const searchPincodeBtn = document.getElementById('searchPincodeBtn');
  const detectLocationBtn = document.getElementById('detectLocationBtn');
  const pincodeMandiGrid = document.getElementById('pincodeMandiGrid');
  const searchedPinDisplay = document.getElementById('searchedPinDisplay');
  const pincodeResultCount = document.getElementById('pincodeResultCount');

  function calculatePincodeDistance(targetVal, mandi) {
    const t = String(targetVal).toLowerCase().trim();
    if (!t || t.length < 3) return 45.0; // Avoid random numbers for short inputs like "1"

    // Exact Pincode Match
    if (t === mandi.pincode) return 2.2;
    if (mandi.pincode.startsWith(t.slice(0, 3))) return 14.5;
    if (mandi.districtName.toLowerCase().includes(t) || mandi.name.toLowerCase().includes(t)) return 4.8;
    if (mandi.stateName.toLowerCase().includes(t)) return 25.0;
    
    // Default deterministic distance based on string length to avoid random fluctuation
    return (30.0 + (t.length * 2)).toFixed(1);
  }

  function renderPincodeResults(query) {
    const t = I18N[currentLang] || I18N.en;
    const cleaned = String(query || '642001').trim();
    if (searchedPinDisplay) searchedPinDisplay.textContent = cleaned;

    const results = MANDI_DATABASE.map(mandi => {
      const dist = parseFloat(calculatePincodeDistance(cleaned, mandi));
      return { ...mandi, computedDistance: dist };
    }).sort((a, b) => a.computedDistance - b.computedDistance);

    const topResults = results.slice(0, 4);
    if (pincodeResultCount) pincodeResultCount.textContent = topResults.length;

    if (!pincodeMandiGrid) return;
    pincodeMandiGrid.innerHTML = '';

    topResults.forEach(mandi => {
      const totalAvailableSlots = mandi.slots.reduce((acc, s) => acc + (s.max - s.booked), 0);
      const cropsList = mandi.activeCrops.map(c => `<span class="msp-chip">${c.name.split(' ')[0]}: ₹${c.msp}</span>`).join('');

      const card = document.createElement('div');
      card.className = 'mandi-card';
      card.innerHTML = `
        <div>
          <span class="mandi-card-badge-top">PIN: ${mandi.pincode}</span>
          <div class="mandi-distance-tag">📍 ~${mandi.computedDistance} km</div>
          <h3 class="mandi-title">${mandi.name}</h3>
          <span class="mandi-type-tag">🏛️ ${mandi.type} • ${mandi.districtName}</span>
          
          <div class="mandi-address-box">
            <strong>📮 Full Address:</strong>
            ${mandi.address}
          </div>

          <div class="mandi-contact-list">
            <div class="mandi-contact-item">
              <span class="contact-label">Secretary:</span>
              <a href="tel:${mandi.secretaryPhone}">📞 ${mandi.secretaryPhone}</a>
            </div>
            <div class="mandi-contact-item">
              <span class="contact-label">Helpdesk:</span>
              <a href="tel:${mandi.phone}">☎️ ${mandi.phone}</a>
            </div>
            <div class="mandi-contact-item">
              <span class="contact-label">Available Slots:</span>
              <strong class="text-green">${totalAvailableSlots} slots open</strong>
            </div>
          </div>

          <div class="mandi-msp-chips">
            ${cropsList}
          </div>
        </div>

        <div class="mandi-card-actions">
          <button class="btn btn-gold btn-block book-this-mandi-btn" data-mandi-id="${mandi.id}">
            <span>${t.btn_book_here || '🎟️ Book Slot'}</span>
          </button>
          <a href="tel:${mandi.phone}" class="btn btn-outline btn-block">
            <span>${t.btn_call_mandi || '📞 Call Mandi'}</span>
          </a>
        </div>
      `;
      pincodeMandiGrid.appendChild(card);
    });

    document.querySelectorAll('.book-this-mandi-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mId = btn.getAttribute('data-mandi-id');
        openBookingModalForMandi(mId);
      });
    });
  }

  searchPincodeBtn?.addEventListener('click', () => {
    const val = pincodeInput?.value.trim() || '642001';
    renderPincodeResults(val);
  });

  pincodeInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      renderPincodeResults(pincodeInput.value.trim() || '642001');
    }
  });

  document.querySelectorAll('.pin-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const pin = chip.getAttribute('data-pin');
      document.querySelectorAll('.pin-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (pincodeInput) pincodeInput.value = pin;
      renderPincodeResults(pin);
    });
  });

  detectLocationBtn?.addEventListener('click', () => {
    detectLocationBtn.innerHTML = '<span>⏳ Detecting GPS...</span>';
    setTimeout(() => {
      if (pincodeInput) pincodeInput.value = '642001';
      renderPincodeResults('642001');
      detectLocationBtn.innerHTML = '<span>🎯 Located (642001 - Pollachi)</span>';
      setTimeout(() => {
        const t = I18N[currentLang] || I18N.en;
        detectLocationBtn.innerHTML = `<span>${t.btn_auto_detect || '🎯 Auto Detect Location'}</span>`;
      }, 3000);
    }, 600);
  });


  // =========================================================
  // ===== 2. STATE & DISTRICT DIRECTORY CONTROLLER ==========
  // =========================================================

  const stateSelect = document.getElementById('stateSelect');
  const districtSelect = document.getElementById('districtSelect');
  const cropFilterSelect = document.getElementById('cropFilterSelect');
  const mandiSearchName = document.getElementById('mandiSearchName');
  const directoryMandiGrid = document.getElementById('directoryMandiGrid');
  const directoryCountDisplay = document.getElementById('directoryCountDisplay');
  const directoryRegionDisplay = document.getElementById('directoryRegionDisplay');

  function populateDistrictsForState(stateKey) {
    if (!districtSelect) return;
    districtSelect.innerHTML = '';
    const districts = DISTRICTS_BY_STATE[stateKey] || [{ key: 'all', name: 'All Districts' }];
    districts.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.key;
      opt.textContent = d.name;
      districtSelect.appendChild(opt);
    });
  }

  function renderDirectoryMandis() {
    const t = I18N[currentLang] || I18N.en;
    const selectedState = stateSelect?.value || 'all';
    const selectedDistrict = districtSelect?.value || 'all';
    const selectedCrop = cropFilterSelect?.value || 'all';
    const searchKeyword = mandiSearchName?.value.toLowerCase().trim() || '';

    let filtered = MANDI_DATABASE.filter(mandi => {
      const matchState = selectedState === 'all' || mandi.state === selectedState;
      const matchDistrict = selectedDistrict === 'all' || mandi.district.toLowerCase().includes(selectedDistrict);
      const matchCrop = selectedCrop === 'all' || mandi.activeCrops.some(c => c.key === selectedCrop || c.name.toLowerCase().includes(selectedCrop));
      const matchName = !searchKeyword || 
        mandi.name.toLowerCase().includes(searchKeyword) || 
        mandi.address.toLowerCase().includes(searchKeyword) || 
        mandi.districtName.toLowerCase().includes(searchKeyword) ||
        mandi.pincode.includes(searchKeyword);
      return matchState && matchDistrict && matchCrop && matchName;
    });

    if (directoryCountDisplay) directoryCountDisplay.textContent = filtered.length;
    if (directoryRegionDisplay) {
      directoryRegionDisplay.textContent = selectedState === 'all' ? 'All India' : (stateSelect?.options[stateSelect.selectedIndex]?.text || 'Tamil Nadu');
    }

    if (!directoryMandiGrid) return;
    directoryMandiGrid.innerHTML = '';

    if (filtered.length === 0) {
      directoryMandiGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #ffffff; border-radius: var(--radius-lg); border: 1px dashed var(--green-300);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">🌾</span>
          <h3>No Government Mandis matching this filter</h3>
          <p style="color: var(--text-muted);">Try selecting "All Districts" or clearing the search keyword.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(mandi => {
      const totalAvailableSlots = mandi.slots.reduce((acc, s) => acc + (s.max - s.booked), 0);
      const cropsList = mandi.activeCrops.map(c => `<span class="msp-chip">${c.name}: ₹${c.msp}/Qtl</span>`).join('');

      const card = document.createElement('div');
      card.className = 'mandi-card';
      card.innerHTML = `
        <div>
          <span class="mandi-card-badge-top">PIN: ${mandi.pincode}</span>
          <h3 class="mandi-title">${mandi.name}</h3>
          <span class="mandi-type-tag">🏛️ ${mandi.type} • ${mandi.districtName}, ${mandi.stateName}</span>
          
          <div class="mandi-address-box">
            <strong>📍 Address:</strong>
            ${mandi.address}
            <div style="margin-top: 4px; font-size: 0.75rem; color: var(--green-800);"><strong>⏰ Timings:</strong> ${mandi.operatingHours}</div>
          </div>

          <div class="mandi-contact-list">
            <div class="mandi-contact-item">
              <span class="contact-label">Secretary:</span>
              <a href="tel:${mandi.secretaryPhone}">📞 ${mandi.secretaryPhone}</a>
            </div>
            <div class="mandi-contact-item">
              <span class="contact-label">Helpline:</span>
              <a href="tel:${mandi.phone}">☎️ ${mandi.phone}</a>
            </div>
            <div class="mandi-contact-item">
              <span class="contact-label">Open Slots:</span>
              <strong class="text-green">${totalAvailableSlots} slots available</strong>
            </div>
          </div>

          <div class="mandi-msp-chips">
            ${cropsList}
          </div>
        </div>

        <div class="mandi-card-actions">
          <button class="btn btn-gold btn-block book-this-mandi-btn" data-mandi-id="${mandi.id}">
            <span>${t.btn_book_here || '🎟️ Book Slot'}</span>
          </button>
          <a href="tel:${mandi.phone}" class="btn btn-outline btn-block">
            <span>${t.btn_call_centre || '📞 Call Centre'}</span>
          </a>
        </div>
      `;
      directoryMandiGrid.appendChild(card);
    });

    document.querySelectorAll('.book-this-mandi-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mId = btn.getAttribute('data-mandi-id');
        openBookingModalForMandi(mId);
      });
    });
  }

  stateSelect?.addEventListener('change', () => {
    populateDistrictsForState(stateSelect.value);
    renderDirectoryMandis();
  });

  districtSelect?.addEventListener('change', renderDirectoryMandis);
  cropFilterSelect?.addEventListener('change', renderDirectoryMandis);
  mandiSearchName?.addEventListener('input', renderDirectoryMandis);

  // Set default state to Tamil Nadu
  if (stateSelect) stateSelect.value = 'tamil_nadu';
  populateDistrictsForState('tamil_nadu');
  renderDirectoryMandis();


  // =========================================================
  // ===== 3. FARMER LIVE TOKEN TRACKER ======================
  // =========================================================

  const trackTokenInput = document.getElementById('trackTokenInput');
  const trackTokenBtn = document.getElementById('trackTokenBtn');
  const trackMandiName = document.getElementById('trackMandiName');
  const trackFarmerInfo = document.getElementById('trackFarmerInfo');
  const trackTokenBadge = document.getElementById('trackTokenBadge');
  const trackStatusPill = document.getElementById('trackStatusPill');
  const trackGate = document.getElementById('trackGate');
  const trackCropQty = document.getElementById('trackCropQty');
  const trackQueuePos = document.getElementById('trackQueuePos');
  const trackEta = document.getElementById('trackEta');

  const stepPassIssued = document.getElementById('stepPassIssued');
  const stepGateIn = document.getElementById('stepGateIn');
  const stepQualityCheck = document.getElementById('stepQualityCheck');
  const stepWeighing = document.getElementById('stepWeighing');
  const stepPayment = document.getElementById('stepPayment');

  async function updateTokenTracker(tokenNum) {
    const cleaned = tokenNum.replace('#KM-', '').replace('KM-', '').replace('#', '').trim();
    const fullToken = `#KM-${cleaned}`;

    const tokenTrackerResult = document.getElementById('tokenTrackerResult');
    const tokenTrackerError = document.getElementById('tokenTrackerError');
    const tokenTrackerErrorMsg = document.getElementById('tokenTrackerErrorMsg');

    let foundRecord = null;
    let foundMandi = null;

    try {
      const res = await fetch(`/api/track?token=${encodeURIComponent(fullToken)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.record) {
          foundRecord = data.record;
          foundMandi = MANDI_DATABASE.find(m => m.id === data.mandiId) || { name: data.record.mandiName || 'APMC Mandi Centre', id: data.mandiId };
        }
      }
    } catch (e) {
      console.log('Local tracker search:', e);
    }

    if (!foundRecord) {
      for (const m of MANDI_DATABASE) {
        const q = m.queue.find(item => item.token === fullToken || item.token.replace(/[^0-9]/g, '') === cleaned);
        if (q) {
          foundRecord = q;
          foundMandi = m;
          break;
        }
      }
    }

    // STRICT VALIDATION: If token is NOT in database, do not show any fake data!
    if (!foundRecord) {
      if (tokenTrackerResult) tokenTrackerResult.style.display = 'none';
      if (tokenTrackerError) {
        tokenTrackerError.style.display = 'flex';
        if (tokenTrackerErrorMsg) {
          tokenTrackerErrorMsg.textContent = `No tracker ID found for Token ${fullToken}. This pass ID is not registered in our APMC Mandi database. Please check your token number or book a new slot.`;
        }
      }
      return;
    }

    // Authentic record found
    if (tokenTrackerError) tokenTrackerError.style.display = 'none';
    if (tokenTrackerResult) tokenTrackerResult.style.display = 'block';

    if (trackMandiName) trackMandiName.textContent = foundMandi.name;
    if (trackFarmerInfo) trackFarmerInfo.innerHTML = `Farmer: <strong>${foundRecord.farmerName}</strong> | Vehicle: <strong>${foundRecord.vehicleNo}</strong>`;
    if (trackTokenBadge) trackTokenBadge.textContent = foundRecord.token;
    if (trackGate) trackGate.textContent = foundRecord.gate || 'Gate #1';
    if (trackCropQty) trackCropQty.textContent = `${foundRecord.crop} (${foundRecord.netWeight ? foundRecord.netWeight + ' Qtl Certified' : (foundRecord.estQty || 25) + ' Quintals Est.'})`;

    const steps = [stepPassIssued, stepGateIn, stepQualityCheck, stepWeighing, stepPayment];
    steps.forEach(s => s?.classList.remove('completed', 'current'));

    const status = foundRecord.status;
    if (status === 'Scheduled') {
      stepPassIssued?.classList.add('completed');
      stepGateIn?.classList.add('current');
      if (trackStatusPill) { trackStatusPill.textContent = 'Scheduled for Today'; trackStatusPill.className = 'status-pill status-active'; }
      if (trackQueuePos) trackQueuePos.textContent = `#${foundRecord.position || 4} in Yard Queue`;
      if (trackEta) trackEta.textContent = '~35 Minutes';
    } else if (status === 'Gate In') {
      stepPassIssued?.classList.add('completed');
      stepGateIn?.classList.add('completed');
      stepQualityCheck?.classList.add('current');
      if (trackStatusPill) { trackStatusPill.textContent = 'Vehicle Checked-In at Gate'; trackStatusPill.className = 'status-pill status-active'; }
      if (trackQueuePos) trackQueuePos.textContent = `#${foundRecord.position || 3} in Quality Queue`;
      if (trackEta) trackEta.textContent = '~20 Minutes';
    } else if (status === 'Quality Check') {
      stepPassIssued?.classList.add('completed');
      stepGateIn?.classList.add('completed');
      stepQualityCheck?.classList.add('completed');
      stepWeighing?.classList.add('current');
      if (trackStatusPill) { trackStatusPill.textContent = 'Quality Tested • Move to Weighbridge'; trackStatusPill.className = 'status-pill status-active'; }
      if (trackQueuePos) trackQueuePos.textContent = `#${foundRecord.position || 2} at Weighbridge`;
      if (trackEta) trackEta.textContent = '~10 Minutes';
    } else if (status === 'Weighing') {
      stepPassIssued?.classList.add('completed');
      stepGateIn?.classList.add('completed');
      stepQualityCheck?.classList.add('completed');
      stepWeighing?.classList.add('completed');
      stepPayment?.classList.add('current');
      if (trackStatusPill) { trackStatusPill.textContent = 'Weighment in Progress'; trackStatusPill.className = 'status-pill status-active'; }
      if (trackQueuePos) trackQueuePos.textContent = 'Now on Scale #01';
      if (trackEta) trackEta.textContent = 'Now Serving!';
    } else if (status === 'Completed' || status === 'Payment Ready') {
      steps.forEach(s => s?.classList.add('completed'));
      if (trackStatusPill) { trackStatusPill.textContent = '✓ Procurement & Payment Completed'; trackStatusPill.className = 'status-pill status-done'; }
      if (trackQueuePos) trackQueuePos.textContent = 'Completed';
      if (trackEta) trackEta.textContent = 'Transferred via DBT';
    }

    const viewEmailBtn = document.getElementById('trackViewEmailBtn');
    if (viewEmailBtn) {
      viewEmailBtn.onclick = () => openGmailModal(foundRecord.token, foundMandi.id || 'tn_pollachi');
    }
  }

  trackTokenBtn?.addEventListener('click', () => {
    updateTokenTracker(trackTokenInput.value.trim() || '2048');
  });

  // Helper to route to dedicated booking page
  function openBookingModalForMandi(mandiId) {
    const targetMandi = mandiId || 'tn_pollachi';
    window.location.href = `book-slot.html?mandiId=${encodeURIComponent(targetMandi)}`;
  }

  // =========================================================
  // ===== 7. GLOBAL AUTHENTICATION & SESSION ENGINE =========
  // =========================================================

  function getFarmerSession() {
    try {
      const s = localStorage.getItem('kisan_farmer_session');
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  }

  function setFarmerSession(farmerData) {
    localStorage.setItem('kisan_farmer_session', JSON.stringify(farmerData));
  }

  function clearFarmerSession() {
    localStorage.removeItem('kisan_farmer_session');
  }

  function getAdminSession() {
    try {
      const s = sessionStorage.getItem('kisan_admin_session') || localStorage.getItem('kisan_admin_session');
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  }

  function setAdminSession(adminData) {
    sessionStorage.setItem('kisan_admin_session', JSON.stringify(adminData));
    localStorage.setItem('kisan_admin_session', JSON.stringify(adminData));
  }

  function clearAdminSession() {
    sessionStorage.removeItem('kisan_admin_session');
    localStorage.removeItem('kisan_admin_session');
  }

  function openUnifiedLoginModal(role = 'farmer') {
    const modal = document.getElementById('unifiedLoginModal') || document.getElementById('loginModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchAuthModalTab(role);
  }

  function closeUnifiedLoginModal() {
    const modal = document.getElementById('unifiedLoginModal') || document.getElementById('loginModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function switchAuthModalTab(role) {
    const farmerTabBtn = document.getElementById('tabFarmerLoginBtn');
    const adminTabBtn = document.getElementById('tabAdminLoginBtn');
    const farmerSec = document.getElementById('farmerLoginSection');
    const adminSec = document.getElementById('adminLoginSection');

    if (role === 'admin' || role === 'officer') {
      farmerTabBtn?.classList.remove('active');
      adminTabBtn?.classList.add('active');
      if (farmerSec) farmerSec.style.display = 'none';
      if (adminSec) adminSec.style.display = 'block';
    } else {
      adminTabBtn?.classList.remove('active');
      farmerTabBtn?.classList.add('active');
      if (adminSec) adminSec.style.display = 'none';
      if (farmerSec) farmerSec.style.display = 'block';
    }
  }

  function updateNavAuthUI() {
    const navAuthArea = document.getElementById('navAuthArea');
    if (!navAuthArea) return;

    const farmer = getFarmerSession();
    const admin = getAdminSession();

    if (farmer) {
      navAuthArea.innerHTML = `
        <div class="user-profile-badge">
          <span class="user-avatar">👨‍🌾</span>
          <span class="user-name">${farmer.name || 'Ramesh Kumar'}</span>
          <a href="book-slot.html" class="btn btn-sm btn-gold" style="padding: 4px 10px; font-size: 0.78rem;">Book Slot</a>
          <button class="btn btn-sm btn-outline-danger" id="navLogoutBtn" style="padding: 4px 8px; font-size: 0.78rem;">🚪 Exit</button>
        </div>
      `;
      document.getElementById('navLogoutBtn')?.addEventListener('click', () => {
        clearFarmerSession();
        updateNavAuthUI();
        if (window.location.pathname.includes('book-slot.html')) {
          window.location.reload();
        }
      });
    } else if (admin) {
      navAuthArea.innerHTML = `
        <div class="user-profile-badge officer">
          <span class="user-avatar">🏛️</span>
          <span class="user-name">${admin.officerId || 'Officer TN-101'}</span>
          <a href="admin.html" class="btn btn-sm btn-gold" style="padding: 4px 10px; font-size: 0.78rem;">Admin Suite</a>
          <button class="btn btn-sm btn-outline-danger" id="navLogoutBtn" style="padding: 4px 8px; font-size: 0.78rem;">🚪 Exit</button>
        </div>
      `;
      document.getElementById('navLogoutBtn')?.addEventListener('click', () => {
        clearAdminSession();
        updateNavAuthUI();
        if (window.location.pathname.includes('admin.html')) {
          window.location.reload();
        }
      });
    } else {
      navAuthArea.innerHTML = `
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-outline" id="navRegisterBtn" style="padding: 7px 14px; font-weight: 600; font-size: 0.85rem; border: 1.5px solid var(--primary); color: var(--primary);">
            📝 Register
          </button>
          <button class="btn btn-gold" id="navLoginBtn" style="padding: 7px 16px; font-weight: 600; font-size: 0.85rem;">
            🔑 Login
          </button>
        </div>
      `;
      document.getElementById('navLoginBtn')?.addEventListener('click', () => openUnifiedLoginModal('farmer'));
      document.getElementById('navRegisterBtn')?.addEventListener('click', () => openRegisterModal());
    }
  }

  function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (!modal) {
      window.location.href = 'index.html?action=register';
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initRegisterModalEvents() {
    const modal = document.getElementById('registerModal');
    if (!modal) return;

    document.getElementById('closeRegisterModal')?.addEventListener('click', closeRegisterModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeRegisterModal();
    });

    const regMandi = document.getElementById('regMandi');
    if (regMandi && regMandi.options.length <= 5) {
      regMandi.innerHTML = '<option value="">Select Mandi Centre</option>';
      MANDI_DATABASE.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.name} (${m.districtName}, ${m.stateName})`;
        regMandi.appendChild(opt);
      });
      regMandi.value = 'tn_pollachi';
    }

    const regNextBtn = document.getElementById('regNextBtn');
    const regBackBtn = document.getElementById('regBackBtn');
    const regVerifyBtn = document.getElementById('regVerifyBtn');
    const step1 = document.getElementById('registerStep1');
    const step2 = document.getElementById('registerStep2');
    const stepSuccess = document.getElementById('registerSuccessScreen');

    regNextBtn?.addEventListener('click', () => {
      const name = document.getElementById('regName')?.value.trim();
      const phone = document.getElementById('regPhone')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();

      if (!name || !phone || !email) {
        alert('Please fill in your Name, Mobile Number, and real Gmail address.');
        return;
      }

      if (step1 && step2) {
        step1.style.display = 'none';
        step2.style.display = 'block';
        const phoneDisp = document.getElementById('regPhoneDisplay');
        if (phoneDisp) phoneDisp.textContent = `+91 ${phone} & ${email}`;
        document.getElementById('stepDot1')?.classList.remove('active');
        document.getElementById('stepDot2')?.classList.add('active');
      }
    });

    regBackBtn?.addEventListener('click', () => {
      if (step1 && step2) {
        step2.style.display = 'none';
        step1.style.display = 'block';
        document.getElementById('stepDot2')?.classList.remove('active');
        document.getElementById('stepDot1')?.classList.add('active');
      }
    });

    regVerifyBtn?.addEventListener('click', async () => {
      const name = document.getElementById('regName')?.value.trim() || 'Aswin Nachi';
      const phone = document.getElementById('regPhone')?.value.trim() || '9443188921';
      const email = document.getElementById('regEmail')?.value.trim() || '';
      const aadhaar = document.getElementById('regAadhaar')?.value.trim() || '7841-9920-1123';
      const mandi = document.getElementById('regMandi')?.value || 'tn_pollachi';
      const crop = document.getElementById('regCrop')?.value || 'Copra';

      const regPayload = { name, phone, email, aadhaar, mandi, crop };

      try {
        await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload)
        });
      } catch (err) {}

      const sessionObj = {
        name,
        phone: phone.startsWith('+91') ? phone : '+91 ' + phone,
        email,
        aadhaar,
        vehicleNo: 'TN-38-ZZ-9999 (Tractor)'
      };
      setFarmerSession(sessionObj);
      updateNavAuthUI();

      if (step2 && stepSuccess) {
        step2.style.display = 'none';
        stepSuccess.style.display = 'block';
        const resCardName = document.getElementById('resCardName');
        if (resCardName) resCardName.textContent = name;
        document.getElementById('stepDot2')?.classList.remove('active');
        document.getElementById('stepDot3')?.classList.add('active');
      }
    });

    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeRegisterModal();
      openUnifiedLoginModal('farmer');
    });

    document.getElementById('closeRegSuccess')?.addEventListener('click', () => {
      closeRegisterModal();
      window.location.href = 'book-slot.html';
    });
  }

  function initUnifiedAuthModalEvents() {
    // Tab switching
    document.getElementById('tabFarmerLoginBtn')?.addEventListener('click', () => switchAuthModalTab('farmer'));
    document.getElementById('tabAdminLoginBtn')?.addEventListener('click', () => switchAuthModalTab('admin'));

    // Modal Close
    document.getElementById('closeUnifiedLoginModal')?.addEventListener('click', closeUnifiedLoginModal);
    document.getElementById('closeLoginModal')?.addEventListener('click', closeUnifiedLoginModal);

    const modalOverlay = document.getElementById('unifiedLoginModal') || document.getElementById('loginModal');
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeUnifiedLoginModal();
    });

    // Populate Modal Admin Mandi dropdown
    const modalAdminMandiSelect = document.getElementById('modalAdminMandiSelect');
    if (modalAdminMandiSelect) {
      modalAdminMandiSelect.innerHTML = '';
      MANDI_DATABASE.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.name} (${m.districtName}, ${m.stateName})`;
        modalAdminMandiSelect.appendChild(opt);
      });
      modalAdminMandiSelect.value = 'tn_pollachi';
    }

    // Farmer Form Login
    document.getElementById('farmerLoginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('farmerLoginPhone')?.value || '9876543210';
      setFarmerSession({
        name: 'Ramesh Kumar',
        phone: phone,
        email: 'farmer@kisanmitra.gov.in',
        aadhaar: '7841-9920-1123',
        vehicleNo: 'TN-37-BX-4091'
      });
      closeUnifiedLoginModal();
      updateNavAuthUI();
      if (window.location.pathname.includes('book-slot.html')) {
        initDedicatedBookingPage();
      } else {
        window.location.href = 'book-slot.html';
      }
    });

    // Instant Demo Farmer Login
    document.getElementById('farmerQuickDemoBtn')?.addEventListener('click', () => {
      setFarmerSession({
        name: 'Aswin Nachi',
        phone: '9443188921',
        email: 'aswinnchi810@gmail.com',
        aadhaar: '7841-9920-1123',
        vehicleNo: 'TN-38-ZZ-9999 (Tractor)'
      });
      closeUnifiedLoginModal();
      updateNavAuthUI();
      if (window.location.pathname.includes('book-slot.html')) {
        initDedicatedBookingPage();
      } else {
        window.location.href = 'book-slot.html';
      }
    });

    // Modal Admin Login
    document.getElementById('modalAdminLoginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const officerId = document.getElementById('modalOfficerId')?.value || 'TN-MANDI-101';
      const mandiId = document.getElementById('modalAdminMandiSelect')?.value || 'tn_pollachi';
      setAdminSession({
        officerId: officerId,
        mandiId: mandiId,
        loginTime: new Date().toISOString()
      });
      closeUnifiedLoginModal();
      updateNavAuthUI();
      window.location.href = 'admin.html';
    });

    // Instant Demo Admin Login
    document.getElementById('adminQuickDemoBtn')?.addEventListener('click', () => {
      setAdminSession({
        officerId: 'TN-MANDI-101',
        mandiId: 'tn_pollachi',
        loginTime: new Date().toISOString()
      });
      closeUnifiedLoginModal();
      updateNavAuthUI();
      window.location.href = 'admin.html';
    });
  }

  // =========================================================
  // ===== 8. DEDICATED FARMER SLOT BOOKING PAGE ENGINE ======
  // =========================================================

  function initDedicatedBookingPage() {
    const slotForm = document.getElementById('dedicatedSlotForm');
    const bookingLoginGate = document.getElementById('bookingLoginGate');
    const bookingFormWrapper = document.getElementById('bookingFormWrapper');
    const bookingSuccessScreen = document.getElementById('bookingSuccessScreen');

    if (!slotForm && !bookingLoginGate) return;

    const farmer = getFarmerSession();

    // Gate Access: If farmer is not logged in, show login card
    if (!farmer) {
      if (bookingLoginGate) bookingLoginGate.style.display = 'block';
      if (bookingFormWrapper) bookingFormWrapper.style.display = 'none';
      if (bookingSuccessScreen) bookingSuccessScreen.style.display = 'none';

      // Gate Farmer Login Form
      document.getElementById('gateFarmerLoginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('gateFarmerPhone')?.value || '9876543210';
        setFarmerSession({
          name: 'Ramesh Kumar',
          phone: phone,
          aadhaar: '7841-9920-1123',
          vehicleNo: 'TN-37-BX-4091'
        });
        updateNavAuthUI();
        initDedicatedBookingPage();
      });

      document.getElementById('gateQuickFarmerBtn')?.addEventListener('click', () => {
        setFarmerSession({
          name: 'Ramesh Kumar',
          phone: '9876543210',
          aadhaar: '7841-9920-1123',
          vehicleNo: 'TN-37-BX-4091'
        });
        updateNavAuthUI();
        initDedicatedBookingPage();
      });

      return;
    }

    // Farmer is logged in: Show booking form
    if (bookingLoginGate) bookingLoginGate.style.display = 'none';
    if (bookingFormWrapper) bookingFormWrapper.style.display = 'grid';

    // Pre-populate Farmer credentials
    const farmerNameInput = document.getElementById('farmerNameInput');
    const farmerMobileInput = document.getElementById('farmerMobileInput');
    const farmerAadhaarInput = document.getElementById('farmerAadhaarInput');
    const farmerVehicleInput = document.getElementById('farmerVehicleInput');
    const farmerEmailInput = document.getElementById('farmerEmailInput');

    if (farmerNameInput) farmerNameInput.value = farmer.name || 'Ramesh Kumar';
    if (farmerMobileInput) farmerMobileInput.value = farmer.phone || '9876543210';
    if (farmerEmailInput) farmerEmailInput.value = farmer.email || '';
    if (farmerAadhaarInput && farmer.aadhaar) farmerAadhaarInput.value = farmer.aadhaar;
    if (farmerVehicleInput && farmer.vehicleNo) farmerVehicleInput.value = farmer.vehicleNo;

    const stateSelect = document.getElementById('bookStateSelect');
    const districtSelect = document.getElementById('bookDistrictSelect');
    const mandiSelect = document.getElementById('bookMandiSelect');
    const cropSelect = document.getElementById('bookCropSelect');
    const qtyInput = document.getElementById('bookQuantityInput');
    const dateInput = document.getElementById('bookDateInput');
    const windowSelect = document.getElementById('bookSlotWindowSelect');

    const previewMandiName = document.getElementById('previewMandiName');
    const previewMandiDetails = document.getElementById('previewMandiDetails');
    const summaryMandiName = document.getElementById('summaryMandiName');
    const summaryCropName = document.getElementById('summaryCropName');
    const summaryMspRate = document.getElementById('summaryMspRate');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryTotalPayout = document.getElementById('summaryTotalPayout');

    // Set default date to Tomorrow
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Populate Districts based on selected state
    function updateBookingDistricts() {
      const selectedState = stateSelect?.value || 'tamil_nadu';
      const mandisInState = MANDI_DATABASE.filter(m => m.state === selectedState);
      const districts = [...new Set(mandisInState.map(m => m.districtName))].sort();

      if (districtSelect) {
        districtSelect.innerHTML = '<option value="all">-- All Districts --</option>';
        districts.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.toLowerCase();
          opt.textContent = d;
          districtSelect.appendChild(opt);
        });
      }
      updateBookingMandis();
    }

    // Populate Mandis based on State & District
    function updateBookingMandis() {
      const selectedState = stateSelect?.value || 'tamil_nadu';
      const selectedDistrict = districtSelect?.value || 'all';

      const filtered = MANDI_DATABASE.filter(m => {
        const matchState = m.state === selectedState;
        const matchDistrict = selectedDistrict === 'all' || m.districtName.toLowerCase().includes(selectedDistrict);
        return matchState && matchDistrict;
      });

      if (mandiSelect) {
        mandiSelect.innerHTML = '';
        filtered.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.id;
          opt.textContent = `${m.name} (${m.districtName} - PIN: ${m.pincode})`;
          mandiSelect.appendChild(opt);
        });
      }

      // Check URL query param for pre-selected Mandi
      const urlParams = new URLSearchParams(window.location.search);
      const paramMandiId = urlParams.get('mandiId');
      if (paramMandiId && MANDI_DATABASE.some(m => m.id === paramMandiId)) {
        const targetM = MANDI_DATABASE.find(m => m.id === paramMandiId);
        if (targetM && targetM.state === selectedState && mandiSelect) {
          mandiSelect.value = paramMandiId;
        }
      }

      updateBookingMandiDetails();
    }

    // Update Crops & Summary details when Mandi changes
    function updateBookingMandiDetails() {
      const mId = mandiSelect?.value || 'tn_pollachi';
      const mandi = MANDI_DATABASE.find(m => m.id === mId) || MANDI_DATABASE[0];

      if (previewMandiName) previewMandiName.textContent = mandi.name;
      if (previewMandiDetails) {
        const openSlots = mandi.slots.reduce((acc, s) => acc + (s.max - s.booked), 0);
        previewMandiDetails.innerHTML = `
          📍 ${mandi.address} | 📞 Helpdesk: <a href="tel:${mandi.phone}">${mandi.phone}</a><br/>
          ⏰ Operating Hours: ${mandi.operatingHours} | 🟢 <strong>Today's Available Capacity: ${openSlots} Vehicles</strong>
        `;
      }
      if (summaryMandiName) summaryMandiName.textContent = mandi.name;

      if (cropSelect) {
        cropSelect.innerHTML = '';
        mandi.activeCrops.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.key;
          opt.dataset.msp = c.msp;
          opt.textContent = `${c.name} (MSP: ₹${c.msp.toLocaleString('en-IN')}/Qtl)`;
          cropSelect.appendChild(opt);
        });
      }

      updatePricingCalculation();
    }

    // Dynamic MSP price calculator — Payout is marked as PENDING Yard Inspection as per APMC rules
    function updatePricingCalculation() {
      const selectedOption = cropSelect?.options[cropSelect.selectedIndex];
      const msp = parseFloat(selectedOption?.dataset.msp) || 2300;
      const cropText = selectedOption?.textContent.split('(')[0].trim() || 'Paddy';
      const qty = parseFloat(qtyInput?.value) || 25;

      if (summaryCropName) summaryCropName.textContent = cropText;
      if (summaryMspRate) summaryMspRate.textContent = `₹${msp.toLocaleString('en-IN')} / Quintal`;
      if (summaryQuantity) summaryQuantity.textContent = `${qty} Quintals (Est.)`;
      if (summaryTotalPayout) {
        summaryTotalPayout.textContent = '⏳ Pending Yard Inspection';
        summaryTotalPayout.style.color = '#b45309';
      }
    }

    stateSelect?.addEventListener('change', updateBookingDistricts);
    districtSelect?.addEventListener('change', updateBookingMandis);
    mandiSelect?.addEventListener('change', updateBookingMandiDetails);
    cropSelect?.addEventListener('change', updatePricingCalculation);
    qtyInput?.addEventListener('input', updatePricingCalculation);

    // Initial load
    const urlParams = new URLSearchParams(window.location.search);
    const paramMandiId = urlParams.get('mandiId');
    if (paramMandiId) {
      const initialMandi = MANDI_DATABASE.find(m => m.id === paramMandiId);
      if (initialMandi && stateSelect) {
        stateSelect.value = initialMandi.state;
      }
    }
    updateBookingDistricts();

    // Form Submission: Send to central server for multi-device sync
    slotForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fName = farmerNameInput?.value || farmer.name || 'Ramesh Kumar';
      const fMobile = farmerMobileInput?.value || farmer.phone || '9876543210';
      const fVehicle = farmerVehicleInput?.value || farmer.vehicleNo || 'TN-37-BX-4091';
      const fAadhaar = farmerAadhaarInput?.value || farmer.aadhaar || '7841-9920-1123';
      const fEmail = farmerEmailInput?.value || farmer.email || '';
      const mandiId = mandiSelect?.value || 'tn_pollachi';
      const mandi = MANDI_DATABASE.find(m => m.id === mandiId) || MANDI_DATABASE[0];
      const cropText = cropSelect?.options[cropSelect.selectedIndex]?.textContent.split('(')[0].trim() || 'Copra';
      const qty = parseFloat(qtyInput?.value) || 25;
      const slotWindow = windowSelect?.options[windowSelect.selectedIndex]?.textContent.split('—')[0].trim() || '08:00 AM – 11:00 AM';
      const mspRate = parseFloat(cropSelect?.options[cropSelect.selectedIndex]?.dataset.msp) || 2300;

      const payload = {
        farmerName: fName,
        phone: fMobile.startsWith('+91') ? fMobile : '+91 ' + fMobile,
        aadhaar: fAadhaar,
        vehicleNo: fVehicle,
        email: fEmail,
        mandiId: mandiId,
        crop: cropText,
        estQty: qty,
        slotTime: (dateInput?.value || 'Tomorrow') + ', ' + slotWindow,
        mspRate: mspRate
      };

      let newToken = '#KM-' + Math.floor(2100 + Math.random() * 7800);

      // Multi-client persistent sync via Backend API
      try {
        const res = await fetch('/api/book-slot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            newToken = data.token.token;
            mandi.queue = data.queue || mandi.queue;
          }
        }
      } catch (err) {
        console.log('Using local queue buffer:', err);
        mandi.queue.push({
          token: newToken,
          farmerName: fName,
          phone: payload.phone,
          aadhaar: fAadhaar,
          vehicleNo: fVehicle,
          crop: cropText,
          estQty: qty,
          slotTime: payload.slotTime,
          status: 'Scheduled',
          gate: 'Gate #1',
          priceStatus: 'Pending Verification',
          mspRate: mspRate
        });
      }

      // Update success pass card
      document.getElementById('successTokenNumber').textContent = newToken;
      document.getElementById('successTokenBig').textContent = newToken;
      document.getElementById('successFarmerName').textContent = fName;
      document.getElementById('successFarmerMobile').textContent = fMobile;
      document.getElementById('successMandiName').textContent = mandi.name + ', ' + mandi.districtName;
      document.getElementById('successSlotTime').textContent = (dateInput?.value || 'Tomorrow') + ', ' + slotWindow;
      document.getElementById('successCropDetails').textContent = `${cropText} (${qty} Quintals Est.)`;
      document.getElementById('successVehicle').textContent = fVehicle;

      // Connect View Gmail button to the token
      const viewEmailBtn = document.getElementById('viewFarmerEmailBtn');
      if (viewEmailBtn) {
        viewEmailBtn.onclick = () => openGmailModal(newToken, mandiId);
      }

      if (bookingFormWrapper) bookingFormWrapper.style.display = 'none';
      if (bookingSuccessScreen) {
        bookingSuccessScreen.style.display = 'block';
        bookingSuccessScreen.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.getElementById('bookAnotherBtn')?.addEventListener('click', () => {
      if (bookingSuccessScreen) bookingSuccessScreen.style.display = 'none';
      if (bookingFormWrapper) {
        bookingFormWrapper.style.display = 'grid';
        bookingFormWrapper.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // =========================================================
  // ===== 9. DEDICATED APMC OFFICER ADMIN PORTAL ENGINE =====
  // =========================================================

  function renderAdminQueueTables(mandi) {
    const overviewBody = document.getElementById('overviewQueueTableBody');
    const manageBody = document.getElementById('manageQueueTableBody');

    if (overviewBody) {
      overviewBody.innerHTML = '';
      mandi.queue.slice(0, 8).forEach(item => {
        const tr = document.createElement('tr');
        const isVerified = item.status === 'Completed' || item.priceStatus === 'Verified';
        const statusClass = isVerified ? 'green' : item.status === 'Weighing' ? 'blue' : item.status === 'Gate In' ? 'amber' : 'purple';
        const priceLabel = isVerified && item.finalTotalPayout ? `₹${item.finalTotalPayout.toLocaleString('en-IN')}` : '⏳ Pending Check';
        
        tr.innerHTML = `
          <td><strong>${item.token}</strong></td>
          <td>${item.farmerName}</td>
          <td>${item.phone}</td>
          <td>${item.crop}</td>
          <td>${item.estQty} Qtl</td>
          <td><span class="badge-tag ${statusClass}">${item.status}</span></td>
          <td><strong style="color: ${isVerified ? '#15803d' : '#b45309'};">${priceLabel}</strong></td>
          <td>
            <button class="btn btn-sm btn-outline call-token-btn" data-token="${item.token}">📢 Call</button>
          </td>
        `;
        overviewBody.appendChild(tr);
      });
    }

    if (manageBody) {
      manageBody.innerHTML = '';
      mandi.queue.forEach(item => {
        const tr = document.createElement('tr');
        const isVerified = item.status === 'Completed' || item.priceStatus === 'Verified';
        const statusClass = isVerified ? 'green' : item.status === 'Weighing' ? 'blue' : item.status === 'Gate In' ? 'amber' : 'purple';
        tr.innerHTML = `
          <td><strong>${item.token}</strong></td>
          <td>${item.farmerName}</td>
          <td>${item.phone}</td>
          <td><code>${item.vehicleNo}</code></td>
          <td>${item.crop} (${item.estQty} Qtl)</td>
          <td><span class="badge-tag ${statusClass}">${item.status}</span></td>
          <td style="display: flex; gap: 6px;">
            <button class="btn btn-sm btn-outline call-token-btn" data-token="${item.token}">📢 Call</button>
            <button class="btn btn-sm btn-gold advance-token-btn" data-token="${item.token}">➔ Next</button>
            <button class="btn btn-sm btn-outline view-token-mail-btn" data-token="${item.token}">📬 Mail</button>
          </td>
        `;
        manageBody.appendChild(tr);
      });
    }

    // Attach call events (Calls farmer to scale for final quotation & weighment)
    document.querySelectorAll('.call-token-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const tokenStr = e.currentTarget.getAttribute('data-token');
        const item = mandi.queue.find(q => q.token === tokenStr);
        try {
          await fetch('/api/call-farmer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenStr, mandiId: currentAdminMandiId })
          });
        } catch (err) {}
        playMandiChime();
        const nowServingToken = document.getElementById('nowServingToken');
        const nowServingDetails = document.getElementById('nowServingDetails');
        if (nowServingToken) nowServingToken.textContent = `Token ${tokenStr}`;
        if (nowServingDetails) nowServingDetails.textContent = `Farmer: ${item?.farmerName || 'Farmer'} | Crop: ${item?.crop || 'Crop'} | Gate: ${item?.gate || 'Gate #1'}`;
        alert(`📢 Calling Token ${tokenStr}: ${item?.farmerName} to Weighbridge Scale #1 for Gross Weighment and Final Price Quotation!`);
        loadAdminMandi(currentAdminMandiId);
      });
    });

    // Attach advance stage events with backend sync
    document.querySelectorAll('.advance-token-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const tokenStr = e.currentTarget.getAttribute('data-token');
        try {
          const res = await fetch('/api/advance-stage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenStr, mandiId: currentAdminMandiId })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.queue) mandi.queue = data.queue;
            loadAdminMandi(currentAdminMandiId);
            return;
          }
        } catch (err) {
          // fallback
        }

        const item = mandi.queue.find(q => q.token === tokenStr);
        if (item) {
          if (item.status === 'Scheduled') item.status = 'Gate In';
          else if (item.status === 'Gate In') item.status = 'Quality Check';
          else if (item.status === 'Quality Check') item.status = 'Weighing';
          else if (item.status === 'Weighing') item.status = 'Payment Ready';
          else item.status = 'Completed';
          loadAdminMandi(currentAdminMandiId);
        }
      });
    });

    // Attach view mail events
    document.querySelectorAll('.view-token-mail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tokenStr = e.currentTarget.getAttribute('data-token');
        openGmailModal(tokenStr, currentAdminMandiId);
      });
    });
  }

  function populateWeighbridgeFields(mandi) {
    const wbTokenSelect = document.getElementById('wbTokenSelect');
    const wbCropSelect = document.getElementById('wbCropSelect');

    if (wbTokenSelect) {
      const prevVal = wbTokenSelect.value;
      wbTokenSelect.innerHTML = '';
      mandi.queue.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.token;
        const verifiedTag = item.status === 'Completed' ? ' [✓ WEIGHED]' : '';
        opt.textContent = `${item.token} — ${item.farmerName} (${item.crop})${verifiedTag}`;
        wbTokenSelect.appendChild(opt);
      });
      if (prevVal && mandi.queue.some(q => q.token === prevVal)) {
        wbTokenSelect.value = prevVal;
      }
    }

    if (wbCropSelect) {
      wbCropSelect.innerHTML = '';
      mandi.activeCrops.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.key;
        opt.dataset.msp = c.msp;
        opt.textContent = `${c.name} (MSP: ₹${c.msp.toLocaleString('en-IN')}/Qtl)`;
        wbCropSelect.appendChild(opt);
      });
    }
  }

  function renderSlotsConfigGrid(mandi) {
    const grid = document.getElementById('slotsConfigGrid');
    if (!grid) return;
    grid.innerHTML = '';

    mandi.slots.forEach(s => {
      const div = document.createElement('div');
      div.className = 'slot-config-item';
      div.innerHTML = `
        <h4>⏰ ${s.time}</h4>
        <div class="slot-input-row">
          <label>Max Truck Capacity:</label>
          <input type="number" value="${s.max}" min="5" max="100" class="slot-max-input" data-slot-id="${s.id}" />
        </div>
        <div class="slot-input-row">
          <label>Currently Booked:</label>
          <strong>${s.booked} Booked</strong>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  function renderMspMasterTable(mandi) {
    const tbody = document.getElementById('adminMspTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    mandi.activeCrops.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.name}</strong></td>
        <td><input type="number" class="msp-rate-input" value="${c.msp}" /></td>
        <td><input type="number" class="msp-moisture-input" value="${c.maxMoisture}" />%</td>
        <td>₹20 per 1% above norm</td>
        <td><span class="badge-tag green">Active Procurement</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderSettlementReportsTable(mandi) {
    const tbody = document.getElementById('settlementTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const totalQty = mandi.dbtSettlements.reduce((acc, d) => acc + d.netQty, 0);
    const totalAmt = mandi.dbtSettlements.reduce((acc, d) => acc + d.amount, 0);

    const reportTotalProcured = document.getElementById('reportTotalProcured');
    const reportFarmersPaid = document.getElementById('reportFarmersPaid');
    const reportTotalDisbursed = document.getElementById('reportTotalDisbursed');

    if (reportTotalProcured) reportTotalProcured.textContent = `${totalQty + 850} Quintals`;
    if (reportFarmersPaid) reportFarmersPaid.textContent = `${mandi.dbtSettlements.length + 65} Farmers`;
    if (reportTotalDisbursed) reportTotalDisbursed.textContent = `₹${((totalAmt + 1950000) / 100000).toFixed(2)} Lakhs`;

    mandi.dbtSettlements.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${d.refNo}</strong></td>
        <td>${d.farmerName}</td>
        <td>${d.bank}</td>
        <td>${d.crop} (${d.netQty} Qtl)</td>
        <td><strong>₹${d.amount.toLocaleString('en-IN')}</strong></td>
        <td><code>${d.utr}</code></td>
        <td><span class="badge-tag green">✓ Paid</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function loadAdminMandi(mandiId) {
    currentAdminMandiId = mandiId || 'tn_pollachi';
    const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId) || MANDI_DATABASE[0];

    // Header updates
    const adminOfficerName = document.getElementById('adminOfficerName');
    const adminMandiTag = document.getElementById('adminMandiTag');
    const mandiNameTableTitle = document.getElementById('mandiNameTableTitle');
    const adminMandiSelect = document.getElementById('adminMandiSelect');

    if (adminOfficerName) adminOfficerName.textContent = `Mandi Superintendent: ${mandi.secretaryName || 'Suresh Kulkarni'}`;
    if (adminMandiTag) adminMandiTag.textContent = `${mandi.name} | PIN: ${mandi.pincode} | APMC Grade A`;
    if (mandiNameTableTitle) mandiNameTableTitle.textContent = mandi.name;
    if (adminMandiSelect && adminMandiSelect.value !== currentAdminMandiId) {
      adminMandiSelect.value = currentAdminMandiId;
    }

    // Stats
    const waitingCount = mandi.queue.filter(q => q.status !== 'Completed').length;
    const completedCount = mandi.queue.filter(q => q.status === 'Completed').length + 18;
    const totalBookings = waitingCount + completedCount;
    const totalDisbursedLakhs = ((mandi.dbtSettlements.reduce((acc, d) => acc + d.amount, 0) + 1950000) / 100000).toFixed(1);

    const statTodayTotal = document.getElementById('statTodayTotal');
    const statProcessed = document.getElementById('statProcessed');
    const statInQueue = document.getElementById('statInQueue');
    const statDisbursed = document.getElementById('statDisbursed');
    const queueBadge = document.getElementById('adminQueueCountBadge');

    if (statTodayTotal) statTodayTotal.textContent = totalBookings;
    if (statProcessed) statProcessed.textContent = completedCount;
    if (statInQueue) statInQueue.textContent = waitingCount;
    if (statDisbursed) statDisbursed.textContent = `₹${totalDisbursedLakhs} Lakh`;
    if (queueBadge) queueBadge.textContent = waitingCount;

    // Serving display
    const activeToken = mandi.queue.find(q => q.status === 'Weighing' || q.status === 'Gate In') || mandi.queue[0];
    const nowServingToken = document.getElementById('nowServingToken');
    const nowServingDetails = document.getElementById('nowServingDetails');
    const boardActiveToken = document.getElementById('boardActiveToken');
    const boardActiveMeta = document.getElementById('boardActiveMeta');

    if (activeToken) {
      if (nowServingToken) nowServingToken.textContent = `Token ${activeToken.token}`;
      if (nowServingDetails) nowServingDetails.textContent = `Farmer: ${activeToken.farmerName} | Crop: ${activeToken.crop} (${activeToken.estQty} Qtl) | Gate: ${activeToken.gate || 'Gate 1'}`;
      if (boardActiveToken) boardActiveToken.textContent = activeToken.token;
      if (boardActiveMeta) boardActiveMeta.textContent = `Farmer: ${activeToken.farmerName} • Crop: ${activeToken.crop} • Slot: ${activeToken.slotTime}`;
    }

    // Sub sections
    renderAdminQueueTables(mandi);
    populateWeighbridgeFields(mandi);
    renderSlotsConfigGrid(mandi);
    renderMspMasterTable(mandi);
    renderSettlementReportsTable(mandi);
  }

  // Multi-client background polling function
  async function pollServerQueue() {
    if (!document.getElementById('adminMainSuite') || document.getElementById('adminMainSuite').style.display === 'none') return;
    try {
      const res = await fetch(`/api/queue?mandiId=${encodeURIComponent(currentAdminMandiId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.queue) {
          const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId);
          if (mandi) {
            // Check if count or tokens changed
            const existingTokens = mandi.queue ? mandi.queue.map(q => q.token).join(',') : '';
            const newTokens = data.queue.map(q => q.token).join(',');
            if (existingTokens !== newTokens) {
              mandi.queue = data.queue;
              loadAdminMandi(currentAdminMandiId);
            }
          }
        }
      }
    } catch (e) {
      // ignore network blips
    }
  }

  function initDedicatedAdminPage() {
    const adminLoginGate = document.getElementById('adminLoginGate');
    const adminMainSuite = document.getElementById('adminMainSuite');
    const adminAuthForm = document.getElementById('adminAuthForm');
    const loginMandiSelect = document.getElementById('loginMandiSelect');
    const adminMandiSelect = document.getElementById('adminMandiSelect');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const adminAuthError = document.getElementById('adminAuthError');

    if (!adminLoginGate && !adminMainSuite) return;

    // Populate login mandi select
    if (loginMandiSelect) {
      loginMandiSelect.innerHTML = '';
      MANDI_DATABASE.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.name} (${m.districtName}, ${m.stateName})`;
        loginMandiSelect.appendChild(opt);
      });
      loginMandiSelect.value = 'tn_pollachi';
    }

    // Populate operating mandi dropdown in header
    if (adminMandiSelect) {
      adminMandiSelect.innerHTML = '';
      MANDI_DATABASE.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.name} (${m.districtName})`;
        adminMandiSelect.appendChild(opt);
      });
    }

    // Check existing session
    const adminSession = getAdminSession();
    if (adminSession) {
      if (adminLoginGate) adminLoginGate.style.display = 'none';
      if (adminMainSuite) adminMainSuite.style.display = 'block';
      loadAdminMandi(adminSession.mandiId || 'tn_pollachi');
      // Start real-time polling every 2.5s for multi-PC updates
      setInterval(pollServerQueue, 2500);
    } else {
      if (adminLoginGate) adminLoginGate.style.display = 'flex';
      if (adminMainSuite) adminMainSuite.style.display = 'none';
    }

    // Admin Auth Form submission
    adminAuthForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const officerId = document.getElementById('loginOfficerId')?.value.trim() || 'TN-MANDI-101';
      const pin = document.getElementById('loginPin')?.value.trim() || '1234';
      const selectedMandi = loginMandiSelect?.value || 'tn_pollachi';

      if (officerId && pin) {
        if (adminAuthError) adminAuthError.style.display = 'none';
        setAdminSession({
          officerId: officerId,
          mandiId: selectedMandi,
          loginTime: new Date().toISOString()
        });
        updateNavAuthUI();
        if (adminLoginGate) adminLoginGate.style.display = 'none';
        if (adminMainSuite) {
          adminMainSuite.style.display = 'block';
          adminMainSuite.scrollIntoView({ behavior: 'smooth' });
        }
        pollServerQueue().then(() => {
          loadAdminMandi(selectedMandi);
        });
        setInterval(pollServerQueue, 2500);
      } else {
        if (adminAuthError) {
          adminAuthError.style.display = 'block';
          adminAuthError.textContent = 'Please enter valid Officer ID and PIN.';
        }
      }
    });

    // Admin Logout
    adminLogoutBtn?.addEventListener('click', () => {
      clearAdminSession();
      updateNavAuthUI();
      if (adminMainSuite) adminMainSuite.style.display = 'none';
      if (adminLoginGate) {
        adminLoginGate.style.display = 'flex';
        adminLoginGate.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Header Mandi Switcher
    adminMandiSelect?.addEventListener('change', () => {
      const newMId = adminMandiSelect.value;
      const s = getAdminSession() || {};
      s.mandiId = newMId;
      setAdminSession(s);
      loadAdminMandi(newMId);
    });

    // Tab Switching
    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const adminTabContents = document.querySelectorAll('.admin-tab-content');
    adminTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        adminTabBtns.forEach(b => b.classList.remove('active'));
        adminTabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
      });
    });

    // Overview buttons
    document.getElementById('overviewCallNextBtn')?.addEventListener('click', () => {
      playMandiChime();
      alert('📢 Calling Next Farmer from the waiting queue to Weighbridge Scale #1!');
    });
    document.getElementById('callNextTokenMainBtn')?.addEventListener('click', () => {
      playMandiChime();
      alert('📢 Calling Next Farmer to Weighbridge!');
    });
    document.getElementById('repeatCallSoundBtn')?.addEventListener('click', () => {
      playMandiChime();
    });
    document.getElementById('refreshQueueBtn')?.addEventListener('click', async () => {
      await pollServerQueue();
      alert('✓ Token queue refreshed from central APMC cloud server.');
    });

    // Weighment calculation live update
    const grossIn = document.getElementById('wbGrossWeight');
    const tareIn = document.getElementById('wbTareWeight');
    const moistureIn = document.getElementById('wbMoisture');
    const qualityGradeIn = document.getElementById('wbQualityGrade');
    const netDisplay = document.getElementById('wbNetWeightDisplay');
    const payoutDisplay = document.getElementById('wbTotalPayoutDisplay');
    const calcBreakdown = document.getElementById('wbCalculationBreakdown');
    const wbCropSelect = document.getElementById('wbCropSelect');
    const wbTokenSelect = document.getElementById('wbTokenSelect');

    const updateScaleCalc = () => {
      const g = parseFloat(grossIn?.value) || 0;
      const t = parseFloat(tareIn?.value) || 0;
      const net = Math.max(0, g - t);
      const msp = parseFloat(wbCropSelect?.options[wbCropSelect.selectedIndex]?.dataset.msp) || 11160;
      const moisture = parseFloat(moistureIn?.value) || 11.8;
      const grade = qualityGradeIn?.value || 'Grade-A';

      const deductionPerQtl = (moisture > 14 ? (moisture - 14) * 20 : 0) + (grade.includes('Grade-C') ? 50 : 0);
      const total = Math.round(Math.max(0, (net * msp) - (net * deductionPerQtl)));

      if (netDisplay) netDisplay.textContent = `${net.toFixed(2)} Qtl`;
      if (payoutDisplay) payoutDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
      if (calcBreakdown) calcBreakdown.textContent = `${net.toFixed(2)} Qtl × ₹${msp.toLocaleString('en-IN')}/Qtl (${grade.split(' (')[0]})`;
    };

    grossIn?.addEventListener('input', updateScaleCalc);
    tareIn?.addEventListener('input', updateScaleCalc);
    moistureIn?.addEventListener('input', updateScaleCalc);
    qualityGradeIn?.addEventListener('change', updateScaleCalc);
    wbCropSelect?.addEventListener('change', updateScaleCalc);

    // Auto-fill fields when selecting a token in weighbridge
    wbTokenSelect?.addEventListener('change', () => {
      const selectedTok = wbTokenSelect.value;
      const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId);
      const tokItem = mandi?.queue.find(q => q.token === selectedTok);
      if (tokItem) {
        if (tokItem.vehicleNo && document.getElementById('wbVehicleNo')) {
          document.getElementById('wbVehicleNo').value = tokItem.vehicleNo;
        }
        if (tokItem.grossWeight && grossIn) grossIn.value = tokItem.grossWeight;
        if (tokItem.tareWeight && tareIn) tareIn.value = tokItem.tareWeight;
        if (tokItem.moisture && moistureIn) moistureIn.value = tokItem.moisture;
        updateScaleCalc();
      }
    });

    // Issue Weighment, Quality Certificate & Dispatch Gmail Intimation
    const generateWeighSlipBtn = document.getElementById('generateWeighSlipBtn');
    generateWeighSlipBtn?.addEventListener('click', async () => {
      const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId) || MANDI_DATABASE[0];
      const selectedTokenStr = wbTokenSelect?.value || '#KM-2048';
      const tokenRecord = mandi.queue.find(q => q.token === selectedTokenStr) || mandi.queue[0];

      const cropName = wbCropSelect?.options[wbCropSelect.selectedIndex]?.text.split(' (')[0] || tokenRecord?.crop || 'Copra';
      const mspRate = parseFloat(wbCropSelect?.options[wbCropSelect.selectedIndex]?.dataset.msp) || tokenRecord?.mspRate || 11160;
      const gross = parseFloat(grossIn?.value) || 52.4;
      const tare = parseFloat(tareIn?.value) || 38.0;
      const moisture = parseFloat(moistureIn?.value) || 11.8;
      const grade = qualityGradeIn?.value || 'Grade-A (Premium APMC Standard)';
      const deductionPerQtl = (moisture > 14 ? (moisture - 14) * 20 : 0) + (grade.includes('Grade-C') ? 50 : 0);

      const payload = {
        token: selectedTokenStr,
        mandiId: currentAdminMandiId,
        mandiName: mandi.name,
        farmerName: tokenRecord?.farmerName || 'Ramesh Kumar',
        phone: tokenRecord?.phone || '9876543210',
        crop: cropName,
        grossWeight: gross,
        tareWeight: tare,
        moisture: moisture,
        qualityGrade: grade,
        mspRate: mspRate,
        deductions: deductionPerQtl
      };

      try {
        const res = await fetch('/api/certify-weighment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.queue) mandi.queue = data.queue;
        }
      } catch (err) {
        console.log('Certified locally:', err);
      }

      // Update local record
      tokenRecord.status = 'Completed';
      tokenRecord.priceStatus = 'Verified';
      tokenRecord.grossWeight = gross;
      tokenRecord.tareWeight = tare;
      tokenRecord.netWeight = Math.max(0, gross - tare);
      tokenRecord.moisture = moisture;
      tokenRecord.qualityGrade = grade;
      tokenRecord.finalTotalPayout = Math.round((tokenRecord.netWeight * mspRate) - (tokenRecord.netWeight * deductionPerQtl));
      tokenRecord.utr = `PFMS-DBT-2026-${Math.floor(10000 + Math.random() * 89999)}`;

      playMandiChime();
      loadAdminMandi(currentAdminMandiId);
      openGmailModal(selectedTokenStr, currentAdminMandiId);
    });

    // View Admin Gmail button
    document.getElementById('viewAdminEmailBtn')?.addEventListener('click', () => {
      const selectedTokenStr = wbTokenSelect?.value || '#KM-2048';
      openGmailModal(selectedTokenStr, currentAdminMandiId);
    });

    document.getElementById('saveSlotConfigBtn')?.addEventListener('click', () => {
      alert('✓ Mandi time-slot intake limits updated successfully!');
    });

    document.getElementById('addEmergencySlotBtn')?.addEventListener('click', () => {
      const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId);
      if (mandi) {
        mandi.slots.forEach(s => s.max += 5);
        renderSlotsConfigGrid(mandi);
        alert('🚨 Added +10 emergency overflow procurement slots for today!');
      }
    });

    document.getElementById('freezeBookingBtn')?.addEventListener('click', () => {
      alert('❄️ New farmer slot bookings have been temporarily paused for this centre.');
    });

    document.getElementById('saveMspRatesBtn')?.addEventListener('click', () => {
      alert('✓ Daily Mandi MSP & Moisture rules updated and broadcasted to portal!');
    });

    document.getElementById('exportReportBtn')?.addEventListener('click', () => {
      const mandi = MANDI_DATABASE.find(m => m.id === currentAdminMandiId);
      alert(`📥 Downloading Daily DBT Settlement Batch for ${mandi?.name} (CSV & PFMS Signed Format)...`);
    });
  }

  // =========================================================
  // ===== 10. GMAIL DIGITAL INTIMATION POPUP ENGINE =========
  // =========================================================

  async function openGmailModal(token, mandiId = 'tn_pollachi') {
    const modal = document.getElementById('gmailModal');
    if (!modal) return;

    let email = null;
    try {
      const res = await fetch(`/api/email?token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const data = await res.json();
        email = data.email;
      }
    } catch (e) {}

    const mandi = MANDI_DATABASE.find(m => m.id === mandiId) || MANDI_DATABASE[0];
    const tokItem = mandi?.queue.find(q => q.token === token) || {
      token: token,
      farmerName: 'Aswin Nachi',
      phone: '+91 9443188921',
      email: getFarmerSession()?.email || 'farmer@kisanmitra.gov.in',
      crop: 'Copra',
      estQty: 25.0,
      gate: 'Gate #1',
      status: 'Scheduled',
      grossWeight: 52.4,
      tareWeight: 38.0,
      netWeight: 14.4
    };

    const isBooking = email?.type === 'booking';
    const subj = document.getElementById('emailSubjectLine');
    const senderName = document.getElementById('emailSenderName');
    const senderEmail = document.getElementById('emailSenderAddress');
    const recip = document.getElementById('emailRecipient');
    const ts = document.getElementById('emailTimestamp');
    const tokenNum = document.getElementById('emailTokenNum');
    const mandiEl = document.getElementById('emailMandiName');
    const cropGradeEl = document.getElementById('emailCropGrade');
    const moistEl = document.getElementById('emailMoisture');
    const grossEl = document.getElementById('emailGrossWeight');
    const tareEl = document.getElementById('emailTareWeight');
    const netEl = document.getElementById('emailNetWeight');
    const mspEl = document.getElementById('emailMspRate');
    const payoutEl = document.getElementById('emailFinalPayout');
    const payoutLabel = document.getElementById('emailPayoutLabel');
    const dbtPill = document.getElementById('emailDbtPill');
    const utrEl = document.getElementById('emailUtr');
    const statusStamp = document.getElementById('emailStatusStamp');
    const adviceTitle = document.getElementById('adviceTitle');
    const adviceSubtitle = document.getElementById('adviceSubtitle');
    const footerNotice = document.getElementById('emailFooterNotice');

    const farmerEmail = email?.toEmail || tokItem.email || getFarmerSession()?.email || 'farmer@kisanmitra.gov.in';

    if (isBooking) {
      if (subj) subj.textContent = email?.subject || `📋 [${mandi.name}] Official Procurement Slot Confirmation — Token ${token}`;
      if (senderName) senderName.textContent = email?.fromName || `Government APMC Procurement Authority, ${mandi.name}`;
      if (senderEmail) senderEmail.textContent = `<apmc.procurement@kisanmitra.gov.in>`;
      if (recip) recip.textContent = `${email?.toName || tokItem.farmerName} (${farmerEmail})`;
      if (ts) ts.textContent = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      if (adviceTitle) adviceTitle.textContent = 'GOVERNMENT APMC MANDI PROCUREMENT CONFIRMATION';
      if (adviceSubtitle) adviceSubtitle.textContent = 'OFFICIAL SCHEDULED PROCUREMENT ENTRY PASS';
      if (statusStamp) statusStamp.textContent = '✓ SCHEDULED — AWAITING PHYSICAL WEIGHMENT';

      if (tokenNum) tokenNum.textContent = token;
      if (mandiEl) mandiEl.textContent = email?.place || mandi.name;
      if (cropGradeEl) cropGradeEl.textContent = `${email?.crop || tokItem.crop} (Variety Certified)`;
      if (moistEl) moistEl.textContent = 'Pending physical moisture & purity test at yard';
      if (grossEl) grossEl.textContent = `Reporting Date: ${email?.date || 'Scheduled Date'}`;
      if (tareEl) tareEl.textContent = `Time: ${email?.timeSlot || 'Morning Window (08:00 AM – 11:00 AM)'}`;
      if (netEl) netEl.textContent = `${email?.estQty || tokItem.estQty || 25} Quintals (Est.)`;
      if (mspEl) mspEl.textContent = `${tokItem.gate || 'Gate #1'} (Weighbridge Scale #1)`;

      if (payoutLabel) payoutLabel.textContent = 'PROCUREMENT PRICING STATUS';
      if (payoutEl) {
        payoutEl.textContent = '⏳ Pending Physical Yard Inspection';
        payoutEl.style.color = '#b45309';
      }
      if (dbtPill) dbtPill.textContent = 'Quotation issued post weighment & grading';
      if (utrEl) utrEl.textContent = 'Pending Inspection';
      if (footerNotice) footerNotice.textContent = email?.notice || 'IMPORTANT APMC NOTICE: As per Mandi Procurement Rules, the final quotation / purchase price is NOT opened or fixed at slot booking. The final product price will be officially certified on-site after physical weighbridge weighing (Gross - Tare) and moisture quality grading.';
      
      // Hide the payout final banner for booking preview
      const pfb = document.querySelector('.payout-final-banner');
      if (pfb) pfb.style.display = 'none';
    } else {
      // Verified final quotation & weighment advice
      const pfb = document.querySelector('.payout-final-banner');
      if (pfb) pfb.style.display = 'flex';
      
      const net = email?.netWeight || tokItem.netWeight || 14.40;
      const msp = email?.mspRate || tokItem.mspRate || 11160;
      const finalAmt = email?.finalTotalPayout || tokItem.finalTotalPayout || Math.round(net * msp);
      const utr = email?.utr || tokItem.utr || 'PFMS-DBT-2026-99412';
      const grade = email?.qualityGrade || tokItem.qualityGrade || 'Grade-A (Premium APMC Standard)';
      const moisture = email?.moisture || `${tokItem.moisture || 11.8}% (Approved within 14% ceiling)`;

      if (subj) subj.textContent = email?.subject || `📢 [${mandi.name}] Official Weighment & PFMS DBT Disbursement Intimation — Token ${token}`;
      if (senderName) senderName.textContent = email?.fromName || `Government APMC Procurement Cell, ${mandi.name}`;
      if (senderEmail) senderEmail.textContent = `<apmc.procurement@kisanmitra.gov.in>`;
      if (recip) recip.textContent = `${tokItem.farmerName} (${farmerEmail})`;
      if (ts) ts.textContent = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      if (adviceTitle) adviceTitle.textContent = 'GOVERNMENT APMC MANDI PROCUREMENT ADVICE';
      if (adviceSubtitle) adviceSubtitle.textContent = 'DIRECT BENEFIT TRANSFER (PFMS) DISBURSEMENT INTIMATION';
      if (statusStamp) statusStamp.textContent = '✓ CERTIFIED WEIGHMENT & GRADE';

      if (tokenNum) tokenNum.textContent = token;
      if (mandiEl) mandiEl.textContent = mandi.name;
      if (cropGradeEl) cropGradeEl.textContent = `${tokItem.crop} (${grade})`;
      if (moistEl) moistEl.textContent = moisture;
      if (grossEl) grossEl.textContent = `${(email?.grossWeight || tokItem.grossWeight || 52.4).toFixed(2)} Quintals`;
      if (tareEl) tareEl.textContent = `${(email?.tareWeight || tokItem.tareWeight || 38.0).toFixed(2)} Quintals`;
      if (netEl) netEl.textContent = `${parseFloat(net).toFixed(2)} Quintals`;
      if (mspEl) mspEl.textContent = `₹${parseFloat(msp).toLocaleString('en-IN')} / Quintal`;

      if (payoutLabel) payoutLabel.textContent = 'FINAL VERIFIED DBT AMOUNT TRANSFERRED';
      if (payoutEl) {
        payoutEl.textContent = `₹${parseFloat(finalAmt).toLocaleString('en-IN')}`;
        payoutEl.style.color = '#15803d';
      }
      if (dbtPill) dbtPill.textContent = '✓ Direct Bank Credit via PFMS';
      if (utrEl) utrEl.textContent = utr;
      if (footerNotice) footerNotice.textContent = 'This document is a digitally certified Electronic Mandi Receipt (e-WBR) generated by the Government Agriculture Marketing Board. The payment has been initiated directly to the registered bank account through PFMS.';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGmailModal() {
    const modal = document.getElementById('gmailModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('closeGmailModal')?.addEventListener('click', closeGmailModal);
  document.getElementById('closeGmailModalBtn')?.addEventListener('click', closeGmailModal);
  document.getElementById('gmailModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('gmailModal')) closeGmailModal();
  });

  // =========================================================
  // ===== 11. GLOBAL APP INITIALIZATION =====================
  // =========================================================

  // Global Language Dropdown Sync
  if (globalLangSelect) {
    globalLangSelect.value = currentLang;
  }

  // Initialize unified authentication, registration and nav UI
  initUnifiedAuthModalEvents();
  initRegisterModalEvents();
  updateNavAuthUI();

  const urlAct = new URLSearchParams(window.location.search).get('action');
  if (urlAct === 'register') {
    openRegisterModal();
  }

  // Initialize page engines
  initDedicatedBookingPage();
  initDedicatedAdminPage();

  // Apply default or persisted language
  applyLanguage(currentLang);
});



// =========================================================
// ===== AI CHATBOT LOGIC =====
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatBody = document.getElementById('chatBody');

  if (!chatToggleBtn || !chatBox) return;

  chatToggleBtn.addEventListener('click', () => {
    chatBox.classList.add('active');
  });

  chatCloseBtn.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });

  function addMessage(msg, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}-msg`;
    div.textContent = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      if (data.reply) {
        addMessage(data.reply, 'bot');
      } else {
        addMessage("Sorry, I encountered an error connecting to the server.", 'bot');
      }
    } catch (e) {
      console.error(e);
      addMessage("Sorry, I couldn't reach the backend API.", 'bot');
    }
  }

  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});
