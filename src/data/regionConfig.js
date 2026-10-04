// BOUND OS Multi-Region Configuration & Data Dictionary
export const REGIONS = {
  en: {
    code: 'EN',
    country: 'Global (English)',
    city: 'Worldwide',
    area: 'Demo Store',
    lang: 'en',
    flag: 'linear-gradient(135deg,#012169 0 33%,#FFFFFF 33% 66%,#C8102E 66%)',
    acc: '#2563EB',
    acc2: '#059669',
    accSoft: 'rgba(37,99,235,.13)',
    font: "'IBM Plex Sans',system-ui,sans-serif",
    curr: '$',
    sep: ',',
    pre: true,
    bn: false,
    langs: 'English · French · Bengali',
    langLabel: 'English (French, Bengali supported)',
    currLabel: 'US Dollar · $ (USD)',
    rails: [
      { n: 'Card (Visa/MC)', c: '#1A56DB' },
      { n: 'Mobile Money', c: '#059669' },
      { n: 'Bank Transfer', c: '#7C3AED' },
      { n: 'Cash', c: '#8A9099' }
    ],
    railShort: 'Card · MoMo · Bank',
    ussd: 'Tap-to-pay NFC · QR Code',
    store: 'Apex Retail Demo Store',
    owner: 'Frank Louis Ohachosim',
    clerk: 'Demo Clerk',
    clerkInit: 'DC',
    phone: '+1 555 000 1234',
    admin: { name: 'BengalBound Admin', role: 'Platform Administrator' },
    mission: 'Empower every merchant worldwide with a voice-first, AI-powered POS — no training, no keyboard, no hidden fees.',
    words: ['I', 'sold', '3', 'oil', 'filters,', '$12.50', 'each,', 'customer', 'paid', 'by', 'card'],
    heard: 'oil filter (generic)',
    real: 'Premium Oil Filter',
    item: 'Premium Oil Filter',
    qty: '3 units',
    unitPrice: 1250,
    total: 3750,
    rail: 'Card (Visa/MC)',
    today: 184500,
    salesToday: 23,
    pending: 4,
    sales: [
      { item: 'Bosch Brake Pads', rail: 'Card', time: '11:42', amount: 4500, sync: 'sync', buyer: { name: 'James Carter', phone: '+1 555 123 4567' } },
      { item: 'NGK Spark Plugs ×4', rail: 'Mobile Money', time: '11:20', amount: 1200, sync: 'wait', buyer: { name: 'Sarah Johnson', phone: '+1 555 987 6543' } },
      { item: 'Air Filter Set', rail: 'Cash', time: '10:58', amount: 800, sync: 'sync', buyer: { name: 'Mike Davis', phone: '+1 555 246 8135' } }
    ],
    ocr: [
      { name: 'Premium Oil Filter', sku: 'OIL-FLT-EN', delta: '+24', stock: 24, price: 1250 },
      { name: 'Bosch Brake Pads', sku: 'BRK-BSH-EN', delta: '+8', stock: 8, price: 4500 },
      { name: 'Wiper Blade Set', sku: 'WPR-BLD-EN', delta: '-3', stock: 5, price: 650 }
    ],
    queue: [
      { label: 'Sale · Premium Oil Filter × 3', meta: '12:04 · $37.50', state: 'pending' },
      { label: 'Shelf Photo · 1.2 MB', meta: '11:58 · Local OCR pending', state: 'pending' },
      { label: 'Sale · NGK Spark Plugs × 10', meta: '11:47 · $125.00', state: 'pending' }
    ]
  },
  ci: {
    code: 'CI',
    country: "Côte d'Ivoire",
    city: 'Abidjan',
    area: 'Adjamé',
    lang: 'fr',
    flag: 'linear-gradient(90deg,#FF7A18 0 33.3%,#F3EEE4 33.3% 66.6%,#00A550 66.6%)',
    acc: '#FF6A13',
    acc2: '#0A7B4F',
    accSoft: 'rgba(255,106,19,.13)',
    font: "'IBM Plex Sans',system-ui,sans-serif",
    curr: 'FCFA',
    sep: ' ',
    pre: false,
    bn: false,
    langs: 'Français · Nouchi · Dioula',
    langLabel: 'Français (Nouchi, Dioula reconnus)',
    currLabel: 'Franc CFA · FCFA (XOF)',
    rails: [
      { n: 'Wave', c: '#1DC8FF' },
      { n: 'Orange Money', c: '#FF7900' },
      { n: 'MTN MoMo', c: '#FFCC00' },
      { n: 'Moov Money', c: '#0A7B4F' }
    ],
    railShort: 'Wave · OM · MoMo',
    ussd: 'Push USSD #144*82# · Wave QR',
    store: 'Auto Pièces Kouassi',
    owner: 'Awa Kouassi',
    clerk: 'Yao Brou',
    clerkInit: 'YB',
    phone: '+225 07 48 21 90',
    admin: { name: "Kouadio N'Guessan", role: 'Directeur Régional — Abidjan' },
    mission: "Donner à chaque commerçant d'Adjamé les moyens d'une grande enseigne : sans clavier, sans formation, sans frais cachés.",
    words: ["J'ai", "vendu", "3", "filtres", "à", "huile", "Toyota,", "2 500", "le", "filtre,", "le", "client", "a", "versé", "sur", "Wave"],
    heard: 'Filtre à huile Hyundai',
    real: 'Filtre à huile Toyota',
    item: 'Filtre à huile Toyota',
    qty: '3 filtres',
    unitPrice: 2500,
    total: 7500,
    rail: 'Wave',
    today: 184500,
    salesToday: 23,
    pending: 4,
    sales: [
      { item: 'Plaquettes de frein Bosch', rail: 'Wave', time: '11:42', amount: 16500, sync: 'sync', buyer: { name: 'Adama Koné', phone: '+225 05 61 23 47' } },
      { item: 'Bougies NGK × 4 jeux', rail: 'Orange Money', time: '11:20', amount: 6000, sync: 'wait', buyer: { name: 'Fatoumata Diaby', phone: '+225 07 92 40 18' } },
      { item: 'Bougies NGK × 4', rail: 'Espèces', time: '10:58', amount: 2500, sync: 'sync', buyer: { name: 'Ibrahim Coulibaly', phone: '+225 01 33 87 22' } },
      { item: 'Amortisseur avant × 2', rail: 'MTN MoMo', time: '10:31', amount: 9600, sync: 'sync', buyer: { name: 'Mariam Bakayoko', phone: '+225 09 14 56 70' } }
    ],
    ocr: [
      { name: 'Filtre à huile Toyota', sku: 'FLH-TOY-CI', delta: '+24', stock: 24, price: 2500 },
      { name: 'Plaquettes de frein Bosch', sku: 'PLQ-BSH-CI', delta: '+8', stock: 8, price: 16500 },
      { name: "Balais d'essuie-glace", sku: 'BLE-EG-CI', delta: '−3', stock: 5, price: 1800 }
    ],
    queue: [
      { label: 'Vente · Filtre à huile Toyota × 3', meta: '12:04 · 7 500 FCFA', state: 'attente' },
      { label: 'Photo rayon · 1,2 Mo', meta: '11:58 · OCR local en attente', state: 'attente' },
      { label: 'Vente · Bougies NGK × 10', meta: '11:47 · 3 000 FCFA', state: 'attente' }
    ]
  },
  sn: {
    code: 'SN',
    country: 'Sénégal',
    city: 'Dakar',
    area: 'Sandaga',
    lang: 'fr',
    flag: 'linear-gradient(90deg,#00853F 0 33.3%,#FDEF42 33.3% 66.6%,#E31B23 66.6%)',
    acc: '#E9B000',
    acc2: '#00853F',
    accSoft: 'rgba(233,176,0,.14)',
    font: "'IBM Plex Sans',system-ui,sans-serif",
    curr: 'FCFA',
    sep: ' ',
    pre: false,
    bn: false,
    langs: 'Français · Wolof · Pulaar',
    langLabel: 'Français (Wolof, Pulaar reconnus)',
    currLabel: 'Franc CFA · FCFA (XOF)',
    rails: [
      { n: 'Wave', c: '#1DC8FF' },
      { n: 'Orange Money', c: '#FF7900' },
      { n: 'Free Money', c: '#E9B000' },
      { n: 'Espèces', c: '#8A9099' }
    ],
    railShort: 'Wave · OM · Free',
    ussd: 'Push USSD #144# · Wave QR',
    store: 'Auto Pièces Ndiaye',
    owner: 'Fatou Ndiaye',
    clerk: 'Modou Fall',
    clerkInit: 'MF',
    phone: '+221 77 512 40 08',
    admin: { name: 'Aïssatou Diallo', role: 'Directrice Régionale — Dakar' },
    mission: 'De Sandaga à Pikine, chaque boutique mérite un assistant qui parle wolof et qui compte juste.',
    words: ["Maa", "ngi", "jaay", "4", "kits", "embrayage", "Valeo,", "18 000", "kit", "bi,", "client", "bi", "fey", "na", "ci", "Wave"],
    heard: 'Kit embrayage Sachs',
    real: 'Kit embrayage Valeo',
    item: 'Kit embrayage Valeo',
    qty: '4 kits',
    unitPrice: 18000,
    total: 72000,
    rail: 'Wave',
    today: 412000,
    salesToday: 31,
    pending: 3,
    sales: [
      { item: 'Filtre à air Mann × 6', rail: 'Wave', time: '11:51', amount: 18000, sync: 'sync', buyer: { name: 'Cheikh Diop', phone: '+221 77 214 30 09' } },
      { item: 'Huile moteur 5W-40 5 L', rail: 'Orange Money', time: '11:22', amount: 9500, sync: 'wait', buyer: { name: 'Aminata Sarr', phone: '+221 76 508 12 44' } },
      { item: 'Courroie alternateur', rail: 'Espèces', time: '10:47', amount: 3000, sync: 'sync', buyer: { name: 'Moussa Diallo', phone: '+221 70 392 61 18' } }
    ],
    ocr: [
      { name: 'Kit embrayage Valeo', sku: 'EMB-VAL-SN', delta: '+12', stock: 12, price: 18000 },
      { name: 'Filtre à air Mann', sku: 'FLA-MAN-SN', delta: '+30', stock: 30, price: 3000 }
    ],
    queue: [
      { label: 'Vente · Kit embrayage Valeo × 4', meta: '12:04 · 72 000 FCFA', state: 'attente' },
      { label: 'Photo rayon · 0,9 Mo', meta: '11:59 · OCR local en attente', state: 'attente' }
    ]
  },
  bd: {
    code: 'BD',
    country: 'বাংলাদেশ',
    city: 'ঢাকা',
    area: 'কারওয়ান বাজার',
    lang: 'bn',
    flag: 'radial-gradient(circle at 44% 50%,#F42A41 0 30%,#006A4E 30%)',
    acc: '#00A884',
    acc2: '#E63946',
    accSoft: 'rgba(0,168,132,.14)',
    font: "'Noto Sans Bengali','IBM Plex Sans',system-ui,sans-serif",
    curr: '৳',
    sep: ',',
    pre: true,
    bn: true,
    langs: 'বাংলা · সিলেটি · চাটগাঁইয়া',
    langLabel: 'বাংলা (সিলেটি, চাটগাঁইয়া শনাক্ত হয়)',
    currLabel: 'বাংলাদেশি টাকা · ৳ (BDT)',
    rails: [
      { n: 'বিকাশ', c: '#E2136E' },
      { n: 'নগদ', c: '#F5911E' },
      { n: 'রকেট', c: '#8C3494' },
      { n: 'নগদ টাকা', c: '#8A9099' }
    ],
    railShort: 'বিকাশ · নগদ · রকেট',
    ussd: 'USSD *247# · বিকাশ QR',
    store: 'রহমান অটো পার্টস',
    owner: 'সাবিনা রহমান',
    clerk: 'ইমরান আলী',
    clerkInit: 'ইআ',
    phone: '+880 1711 204 855',
    admin: { name: 'ইমরান হোসেন', role: 'আঞ্চলিক পরিচালক — ঢাকা' },
    mission: 'কারওয়ান বাজারের প্রতিটি দোকানে বাংলায় কথা বলা একজন সহকারী — কোনো কিবোর্ড নয়, কোনো প্রশিক্ষণ নয়।',
    words: ["আমি", "তিন", "সেট", "ব্রেক", "প্যাড", "বিক্রি", "করেছি,", "সেট", "৩,২০০", "টাকা,", "কাস্টমার", "বিকাশে", "দিয়েছে"],
    heard: 'ব্রেক প্যাড (কপি)',
    real: 'ব্রেক প্যাড সেট',
    item: 'ব্রেক প্যাড সেট',
    qty: '৩ সেট',
    unitPrice: 3200,
    total: 9600,
    rail: 'বিকাশ',
    today: 38500,
    salesToday: 19,
    pending: 5,
    sales: [
      { item: 'ইঞ্জিন অয়েল ৫ লিটার', rail: 'বিকাশ', time: '১১:৪২', amount: 8900, sync: 'sync', buyer: { name: 'রফিকুল ইসলাম', phone: '+880 1819 220 145' } },
      { item: 'এয়ার ফিল্টার', rail: 'নগদ', time: '১১:১৫', amount: 640, sync: 'wait', buyer: { name: 'শারমিন আক্তার', phone: '+880 1922 771 003' } }
    ],
    ocr: [
      { name: 'ব্রেক প্যাড সেট', sku: 'BRK-PAD-BD', delta: '+১৪', stock: 14, price: 3200 },
      { name: 'ইঞ্জিন অয়েল ৫ লিটার', sku: 'ENG-5L-BD', delta: '+৯', stock: 9, price: 8900 }
    ],
    queue: [
      { label: 'বিক্রয় · ব্রেক প্যাড সেট × ৩', meta: '১২:০৪ · ৳ ৯,৬০০', state: 'অপেক্ষমাণ' },
      { label: 'তাকের ছবি · ১.১ MB', meta: '১১:৫৮ · লোকাল OCR বাকি', state: 'অপেক্ষমাণ' }
    ]
  }
};

export const GLOBAL_COUNTRIES = [
  { code: 'EN', country: 'Global (English)', city: 'Worldwide', live: true, flag: REGIONS.en.flag, langs: REGIONS.en.langs, curr: 'USD · $', rails: 'Card · MoMo · Bank · Cash' },
  { code: 'CI', country: "Côte d'Ivoire", city: 'Abidjan', live: true, flag: REGIONS.ci.flag, langs: REGIONS.ci.langs, curr: 'XOF · FCFA', rails: 'Wave · Orange · MTN · Moov' },
  { code: 'SN', country: 'Sénégal', city: 'Dakar', live: true, flag: REGIONS.sn.flag, langs: REGIONS.sn.langs, curr: 'XOF · FCFA', rails: 'Wave · Orange · Free · Cash' },
  { code: 'BD', country: 'বাংলাদেশ (Bangladesh)', city: 'ঢাকা (Dhaka)', live: true, flag: REGIONS.bd.flag, langs: REGIONS.bd.langs, curr: 'BDT · ৳', rails: 'bKash · Nagad · Rocket' },
  { code: 'ET', country: 'Ethiopia', city: 'Addis Ababa', live: false, flag: 'linear-gradient(180deg,#078930 0 33.3%,#FCDD09 33.3% 66.6%,#DA121A 66.6%)', langs: 'Amharic · Oromo · Tigrinya', curr: 'ETB · Br', rails: 'Telebirr · CBE Birr · Cash' },
  { code: 'NG', country: 'Nigeria', city: 'Lagos', live: false, flag: 'linear-gradient(90deg,#008751 0 33.3%,#F3EEE4 33.3% 66.6%,#008751 66.6%)', langs: 'English · Hausa · Yoruba · Igbo', curr: 'NGN · ₦', rails: 'OPay · PalmPay · Bank' },
  { code: 'IN', country: 'India', city: 'Delhi NCR', live: false, flag: 'linear-gradient(180deg,#FF9933 0 33.3%,#F3EEE4 33.3% 66.6%,#138808 66.6%)', langs: 'Hindi · English · Tamil · Bengali', curr: 'INR · ₹', rails: 'UPI · PhonePe · Paytm' }
];

export const BN_DIGITS = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
