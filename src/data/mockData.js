export const INITIAL_PRODUCTS = [
  // Electronics
  {
    id: "prod-1",
    name: "iPhone 15 Pro Max 256GB",
    category: "Electronics",
    price: 999.00,
    costPrice: 820.00,
    stock: 14,
    minStock: 5,
    barcode: "8806091234561",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    description: "Titanium design, A17 Pro chip, customizable Action button."
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    price: 1199.00,
    costPrice: 950.00,
    stock: 8,
    minStock: 4,
    barcode: "8806091234562",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    description: "Galaxy AI powered flagship smartphone with S-Pen."
  },
  {
    id: "prod-3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    price: 349.99,
    costPrice: 260.00,
    stock: 19,
    minStock: 6,
    barcode: "8806091234563",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading noise cancellation with auto NC optimizer."
  },
  {
    id: "prod-4",
    name: "Apple Watch Series 9 GPS",
    category: "Electronics",
    price: 399.00,
    costPrice: 310.00,
    stock: 12,
    minStock: 5,
    barcode: "8806091234564",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    description: "S9 SiP chip, double tap gesture, brighter display."
  },
  {
    id: "prod-5",
    name: "Logitech MX Master 3S Mouse",
    category: "Electronics",
    price: 99.99,
    costPrice: 65.00,
    stock: 28,
    minStock: 10,
    barcode: "8806091234565",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    description: "Ergonomic wireless mouse with 8K DPI track-on-glass sensor."
  },
  {
    id: "prod-6",
    name: "Anker 737 PowerBank 24,000mAh",
    category: "Electronics",
    price: 129.99,
    costPrice: 85.00,
    stock: 22,
    minStock: 8,
    barcode: "8806091234566",
    image: "https://images.unsplash.com/photo-1609592426504-4c407c6f0923?w=600&auto=format&fit=crop&q=80",
    description: "140W fast charging portable battery with smart display."
  },

  // Clothing & Apparel
  {
    id: "prod-7",
    name: "BengalBound Premium Cotton T-Shirt",
    category: "Clothing",
    price: 25.00,
    costPrice: 10.00,
    stock: 45,
    minStock: 15,
    barcode: "8806091234567",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description: "100% organic heavyweight cotton tee with tailored fit."
  },
  {
    id: "prod-8",
    name: "Heritage Denim Jacket",
    category: "Clothing",
    price: 89.50,
    costPrice: 45.00,
    stock: 16,
    minStock: 5,
    barcode: "8806091234568",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
    description: "Classic vintage wash denim with copper rivet hardware."
  },
  {
    id: "prod-9",
    name: "Athletic Flex Performance Hoodie",
    category: "Clothing",
    price: 65.00,
    costPrice: 32.00,
    stock: 24,
    minStock: 8,
    barcode: "8806091234569",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    description: "Thermal fleece lined athletic wear with kangaroo pouch."
  },
  {
    id: "prod-10",
    name: "Urban Chino Trousers - Khaki",
    category: "Clothing",
    price: 49.00,
    costPrice: 22.00,
    stock: 18,
    minStock: 6,
    barcode: "8806091234570",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    description: "Stretch twill casual trousers for all-day comfort."
  },
  {
    id: "prod-11",
    name: "Water-resistant Trail Cap",
    category: "Clothing",
    price: 22.00,
    costPrice: 8.50,
    stock: 35,
    minStock: 10,
    barcode: "8806091234571",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
    description: "Quick-dry nylon cap with adjustable back closure."
  },

  // Food & Fresh Bakery
  {
    id: "prod-12",
    name: "Artisan Sourdough Loaf",
    category: "Food",
    price: 6.50,
    costPrice: 2.80,
    stock: 15,
    minStock: 5,
    barcode: "8806091234572",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop&q=80",
    description: "Slow-fermented 36hr artisanal bakery loaf."
  },
  {
    id: "prod-13",
    name: "Organic Belgian Chocolate Bar 85%",
    category: "Food",
    price: 4.80,
    costPrice: 2.10,
    stock: 52,
    minStock: 15,
    barcode: "8806091234573",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
    description: "Single-origin dark cocoa with sea salt crystals."
  },
  {
    id: "prod-14",
    name: "Smoked Turkey Club Sandwich",
    category: "Food",
    price: 8.50,
    costPrice: 3.90,
    stock: 9,
    minStock: 10, // low stock flag!
    barcode: "8806091234574",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
    description: "Freshly made daily with avocado, turkey breast & garlic aioli."
  },
  {
    id: "prod-15",
    name: "Mediterranean Olive Oil 750ml",
    category: "Food",
    price: 18.00,
    costPrice: 11.50,
    stock: 25,
    minStock: 8,
    barcode: "8806091234575",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    description: "Cold-pressed extra virgin olive oil from Crete."
  },
  {
    id: "prod-16",
    name: "Roasted Almonds & Dried Berries 200g",
    category: "Food",
    price: 5.50,
    costPrice: 2.50,
    stock: 40,
    minStock: 12,
    barcode: "8806091234576",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    description: "Energy trail mix with whole California almonds and cranberries."
  },

  // Beverages
  {
    id: "prod-17",
    name: "Specialty Caramel Macchiato Latte",
    category: "Beverages",
    price: 4.50,
    costPrice: 1.40,
    stock: 65,
    minStock: 20,
    barcode: "8806091234577",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80",
    description: "Espresso shot layered with velvety steamed milk and vanilla caramel."
  },
  {
    id: "prod-18",
    name: "Matcha Green Tea Latte",
    category: "Beverages",
    price: 5.25,
    costPrice: 1.80,
    stock: 38,
    minStock: 10,
    barcode: "8806091234578",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80",
    description: "Ceremonial grade Uji Japanese matcha whisked with oat milk."
  },
  {
    id: "prod-19",
    name: "Cold Pressed Orange & Ginger Juice 330ml",
    category: "Beverages",
    price: 3.95,
    costPrice: 1.20,
    stock: 4, // low stock flag!
    minStock: 10,
    barcode: "8806091234579",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
    description: "Raw vitamin booster juice with zero added sugar."
  },
  {
    id: "prod-20",
    name: "Sparkling Mineral Water 500ml",
    category: "Beverages",
    price: 2.20,
    costPrice: 0.60,
    stock: 80,
    minStock: 25,
    barcode: "8806091234580",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80",
    description: "Naturally effervescent alpine spring water in glass bottle."
  },
  {
    id: "prod-21",
    name: "Iced Hibiscus Berry Tea",
    category: "Beverages",
    price: 3.50,
    costPrice: 0.90,
    stock: 3, // low stock flag!
    minStock: 8,
    barcode: "8806091234581",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
    description: "Tart herbal hibiscus steeped with sweet blackberries and mint."
  },
  {
    id: "prod-22",
    name: "Cold Brew Nitro Coffee Can",
    category: "Beverages",
    price: 4.00,
    costPrice: 1.50,
    stock: 2, // low stock flag!
    minStock: 10,
    barcode: "8806091234582",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    description: "Smooth 20-hour steeped Ethiopian beans infused with micro-nitrogen."
  }
];

export const INITIAL_CLERKS = [
  {
    id: "clk-101",
    name: "Amara Okonkwo",
    phone: "+234 802 345 6789",
    email: "amara.o@apexretail.ng",
    pin: "123456",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    status: "Active",
    shift: "Morning (08:00 - 16:00)",
    salesToday: 840.50,
    ordersToday: 18,
    permissions: {
      accView: true,
      accApprove: false,
      accPrice: true,
      accTeam: false,
      accExport: false
    }
  },
  {
    id: "clk-102",
    name: "Kwame Mensah",
    phone: "+233 24 567 8901",
    email: "kwame.m@apexretail.ng",
    pin: "123456",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    status: "Active",
    shift: "Evening (14:00 - 22:00)",
    salesToday: 955.00,
    ordersToday: 21,
    permissions: {
      accView: true,
      accApprove: true,
      accPrice: false,
      accTeam: false,
      accExport: true
    }
  },
  {
    id: "clk-103",
    name: "Zainab Bello",
    phone: "+234 813 456 7890",
    email: "zainab.b@apexretail.ng",
    pin: "123456",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    status: "Active",
    shift: "Morning (08:00 - 16:00)",
    salesToday: 654.50,
    ordersToday: 14,
    permissions: {
      accView: true,
      accApprove: false,
      accPrice: false,
      accTeam: false,
      accExport: false
    }
  },
  {
    id: "clk-104",
    name: "David Kiprono",
    phone: "+254 712 345 678",
    email: "david.k@apexretail.ng",
    pin: "123456",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    status: "Inactive",
    shift: "Weekend Shift",
    salesToday: 0.00,
    ordersToday: 0,
    permissions: {
      accView: true,
      accApprove: false,
      accPrice: false,
      accTeam: false,
      accExport: false
    }
  },
  {
    id: "clk-105",
    name: "Fatima Al-Hassan",
    phone: "+234 809 112 2334",
    email: "fatima.h@apexretail.ng",
    pin: "123456",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    status: "Active",
    shift: "Supervisor (Full Day)",
    salesToday: 420.00,
    ordersToday: 9,
    permissions: {
      accView: true,
      accApprove: true,
      accPrice: true,
      accTeam: true,
      accExport: true
    }
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9082",
    clerkName: "Amara Okonkwo",
    customerName: "Chief Obinna Eze",
    customerPhone: "+234 803 111 2233",
    itemsCount: 2,
    items: [
      { name: "iPhone 15 Pro Max 256GB", qty: 1, price: 999.00 },
      { name: "Anker 737 PowerBank 24,000mAh", qty: 1, price: 129.99 }
    ],
    total: 1128.99,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Approved",
    timestamp: "10 mins ago",
    date: "2026-10-03 17:54"
  },
  {
    id: "TXN-9081",
    clerkName: "Kwame Mensah",
    customerName: "Amina Yusuf",
    customerPhone: "+234 809 333 4455",
    itemsCount: 3,
    items: [
      { name: "Specialty Caramel Macchiato Latte", qty: 2, price: 4.50 },
      { name: "Artisan Sourdough Loaf", qty: 1, price: 6.50 }
    ],
    total: 15.50,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "24 mins ago",
    date: "2026-10-03 17:40"
  },
  {
    id: "TXN-9080",
    clerkName: "Kwame Mensah",
    customerName: "Dr. Samuel Adeyemi",
    customerPhone: "+234 812 555 7788",
    itemsCount: 1,
    items: [
      { name: "Samsung Galaxy S24 Ultra", qty: 1, price: 1199.00 }
    ],
    total: 1199.00,
    paymentMethod: "Card (Visa Debit)",
    status: "Pending", // Needs CEO approval!
    requiresApproval: true,
    approvalReason: "High-value transaction > $1,000",
    timestamp: "38 mins ago",
    date: "2026-10-03 17:26"
  },
  {
    id: "TXN-9079",
    clerkName: "Zainab Bello",
    customerName: "Kofi Boateng",
    customerPhone: "+233 24 999 8877",
    itemsCount: 2,
    items: [
      { name: "Sony WH-1000XM5 Wireless Headphones", qty: 1, price: 349.99 },
      { name: "Logitech MX Master 3S Mouse", qty: 1, price: 99.99 }
    ],
    total: 449.98,
    paymentMethod: "Mobile Money (AirtelTigo)",
    status: "Approved",
    timestamp: "1 hour ago",
    date: "2026-10-03 17:01"
  },
  {
    id: "TXN-9078",
    clerkName: "Fatima Al-Hassan",
    customerName: "Ngozi Chukwu",
    customerPhone: "+234 705 444 3322",
    itemsCount: 4,
    items: [
      { name: "Heritage Denim Jacket", qty: 1, price: 89.50 },
      { name: "BengalBound Premium Cotton T-Shirt", qty: 2, price: 25.00 },
      { name: "Water-resistant Trail Cap", qty: 1, price: 22.00 }
    ],
    total: 161.50,
    paymentMethod: "Card (Mastercard)",
    status: "Completed",
    timestamp: "1.5 hours ago",
    date: "2026-10-03 16:32"
  },
  {
    id: "TXN-9077",
    clerkName: "Amara Okonkwo",
    customerName: "Tariq Mansoor",
    customerPhone: "+234 810 222 9988",
    itemsCount: 2,
    items: [
      { name: "Apple Watch Series 9 GPS", qty: 2, price: 399.00 }
    ],
    total: 798.00,
    paymentMethod: "Mobile Money (Vodafone Cash)",
    status: "Pending", // Needs CEO approval!
    requiresApproval: true,
    approvalReason: "Bulk tech hardware discount override applied",
    timestamp: "2 hours ago",
    date: "2026-10-03 16:04"
  },
  {
    id: "TXN-9076",
    clerkName: "Zainab Bello",
    customerName: "Grace Danladi",
    customerPhone: "+234 803 777 6655",
    itemsCount: 3,
    items: [
      { name: "Smoked Turkey Club Sandwich", qty: 2, price: 8.50 },
      { name: "Cold Pressed Orange & Ginger Juice 330ml", qty: 1, price: 3.95 }
    ],
    total: 20.95,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "2.5 hours ago",
    date: "2026-10-03 15:35"
  },
  {
    id: "TXN-9075",
    clerkName: "Amara Okonkwo",
    customerName: "Folake Balogun",
    customerPhone: "+234 802 888 1122",
    itemsCount: 1,
    items: [
      { name: "Mediterranean Olive Oil 750ml", qty: 2, price: 18.00 }
    ],
    total: 36.00,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Approved",
    timestamp: "3 hours ago",
    date: "2026-10-03 15:02"
  }
];

export const INITIAL_TENANTS = [
  {
    id: "tnt-001",
    name: "Apex Electronics & Retail Ltd",
    subdomain: "apex",
    fullDomain: "apex.momotill.io",
    owner: "Frank Louis Ohachosim",
    email: "frank@apexretail.ng",
    plan: "Pro",
    status: "Active",
    clerksCount: 5,
    todaySales: "$2,450.00",
    monthlyRevenue: "$28,490.00",
    region: "Lagos, Nigeria",
    createdDate: "2026-01-15"
  },
  {
    id: "tnt-002",
    name: "Savannah Gourmet Supermarket",
    subdomain: "savannah",
    fullDomain: "savannah.momotill.io",
    owner: "Amina Al-Mansur",
    email: "amina@savannah.ke",
    plan: "Pro",
    status: "Active",
    clerksCount: 8,
    todaySales: "$4,120.00",
    monthlyRevenue: "$45,200.00",
    region: "Nairobi, Kenya",
    createdDate: "2026-02-01"
  },
  {
    id: "tnt-003",
    name: "AfroGrocers Express",
    subdomain: "afrogrocers",
    fullDomain: "afrogrocers.momotill.io",
    owner: "Kwame Addo",
    email: "kwame@afrogrocers.gh",
    plan: "Basic",
    status: "Active",
    clerksCount: 3,
    todaySales: "$1,380.00",
    monthlyRevenue: "$14,500.00",
    region: "Accra, Ghana",
    createdDate: "2026-03-10"
  },
  {
    id: "tnt-004",
    name: "Lagos Tech & Gadgets Store",
    subdomain: "lagostech",
    fullDomain: "lagostech.momotill.io",
    owner: "Chinedu Okafor",
    email: "chinedu@lagostech.ng",
    plan: "Pro",
    status: "Active",
    clerksCount: 6,
    todaySales: "$3,890.00",
    monthlyRevenue: "$39,100.00",
    region: "Lagos, Nigeria",
    createdDate: "2026-04-05"
  },
  {
    id: "tnt-005",
    name: "Kigali Artisan Cafe & Roastery",
    subdomain: "kigalicafe",
    fullDomain: "kigalicafe.momotill.io",
    owner: "Gisele Umutoni",
    email: "gisele@kigalicafe.rw",
    plan: "Basic",
    status: "Active",
    clerksCount: 2,
    todaySales: "$640.00",
    monthlyRevenue: "$7,800.00",
    region: "Kigali, Rwanda",
    createdDate: "2026-05-18"
  },
  {
    id: "tnt-006",
    name: "Addis Traditional Fabrics",
    subdomain: "addisfabrics",
    fullDomain: "addisfabrics.momotill.io",
    owner: "Dawit Haile",
    email: "dawit@addisfabrics.et",
    plan: "Free",
    status: "Active",
    clerksCount: 1,
    todaySales: "$210.00",
    monthlyRevenue: "$2,400.00",
    region: "Addis Ababa, Ethiopia",
    createdDate: "2026-06-22"
  },
  {
    id: "tnt-007",
    name: "Osu Designer Boutiques",
    subdomain: "osudesign",
    fullDomain: "osudesign.momotill.io",
    owner: "Akosua Mensah",
    email: "akosua@osudesign.gh",
    plan: "Basic",
    status: "Suspended",
    clerksCount: 2,
    todaySales: "$0.00",
    monthlyRevenue: "$5,100.00",
    region: "Accra, Ghana",
    createdDate: "2026-07-04"
  },
  {
    id: "tnt-008",
    name: "Kampala Urban Mart",
    subdomain: "kampalamart",
    fullDomain: "kampalamart.momotill.io",
    owner: "Ronald Mukasa",
    email: "ronald@kampalamart.ug",
    plan: "Free",
    status: "Active",
    clerksCount: 1,
    todaySales: "$180.00",
    monthlyRevenue: "$1,850.00",
    region: "Kampala, Uganda",
    createdDate: "2026-08-11"
  }
];

export const SALES_7DAYS = [
  { day: "Mon", sales: 1840, orders: 32, profit: 580 },
  { day: "Tue", sales: 2120, orders: 38, profit: 690 },
  { day: "Wed", sales: 1950, orders: 35, profit: 610 },
  { day: "Thu", sales: 2310, orders: 41, profit: 740 },
  { day: "Fri", sales: 2890, orders: 52, profit: 920 },
  { day: "Sat", sales: 3420, orders: 63, profit: 1100 },
  { day: "Sun (Today)", sales: 2450, orders: 42, profit: 780 }
];

export const CATEGORY_REVENUE = [
  { name: "Electronics", value: 48, amount: "$13,675", color: "#2563eb" },
  { name: "Food & Bakery", value: 24, amount: "$6,837", color: "#16a34a" },
  { name: "Beverages", value: 16, amount: "$4,558", color: "#ea580c" },
  { name: "Clothing", value: 12, amount: "$3,418", color: "#7c3aed" }
];

export const PAYMENT_METHODS_DATA = [
  { name: "Mobile Money (MoMo)", percentage: 56, count: "542 txns", color: "#eab308" },
  { name: "Card / POS Terminal", percentage: 28, count: "271 txns", color: "#3b82f6" },
  { name: "Cash", percentage: 16, count: "155 txns", color: "#22c55e" }
];

export const GLOBAL_ANALYTICS = {
  totalTenants: 8,
  activeTenants: 7,
  totalPlatformUsers: 1420,
  activeTerminals: 68,
  totalGMV: "$144,340.00",
  monthlyRecurringRevenue: "$18,950.00",
  growthRate: "+28.4%",
  growthData: [
    { month: "May", tenants: 3, revenue: 8200 },
    { month: "Jun", tenants: 4, revenue: 10400 },
    { month: "Jul", tenants: 5, revenue: 12800 },
    { month: "Aug", tenants: 6, revenue: 15300 },
    { month: "Sep", tenants: 7, revenue: 17100 },
    { month: "Oct", tenants: 8, revenue: 18950 }
  ],
  geoDistribution: [
    { country: "Nigeria", flag: "🇳🇬", tenants: 3, gmv: "$67,590", share: "46.8%" },
    { country: "Kenya", flag: "🇰🇪", tenants: 1, gmv: "$45,200", share: "31.3%" },
    { country: "Ghana", flag: "🇬🇭", tenants: 2, gmv: "$19,600", share: "13.6%" },
    { country: "Rwanda", flag: "🇷🇼", tenants: 1, gmv: "$7,800", share: "5.4%" },
    { country: "Others", flag: "🌍", tenants: 1, gmv: "$4,150", share: "2.9%" }
  ]
};

export const INITIAL_FEATURE_FLAGS = {
  voiceOrderEntry: true,
  visionBarcodeScan: true,
  offlineSqliteSync: true,
  momoWebhookAutoReconcile: true,
  instantThermalReceipts: true,
  aiDemandForecasting: false,
  multiCurrencySwitching: true,
  maintenanceMode: false
};
