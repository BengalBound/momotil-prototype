export const INITIAL_PRODUCTS = [
  // Brakes & Rotors
  {
    id: "prod-1",
    name: "Bosch Brake Pads (Front Set)",
    category: "Auto Parts",
    price: 45.00,
    costPrice: 28.00,
    stock: 34,
    minStock: 10,
    barcode: "8806091234561",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    description: "OEM-spec ceramic brake pads for passenger and commercial vehicles."
  },
  {
    id: "prod-2",
    name: "Brembo Heavy Duty Brake Discs",
    category: "Auto Parts",
    price: 68.00,
    costPrice: 42.00,
    stock: 22,
    minStock: 8,
    barcode: "8806091234562",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    description: "Vented front brake discs pair for commercial and passenger vehicles."
  },

  // Engine & Fluids
  {
    id: "prod-3",
    name: "Synthetic Engine Oil 5L (5W-30)",
    category: "Auto Parts",
    price: 35.00,
    costPrice: 22.00,
    stock: 48,
    minStock: 15,
    barcode: "8806091234563",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    description: "Full-synthetic motor oil for extended drain intervals and engine protection."
  },
  {
    id: "prod-4",
    name: "Premium Oil Filter (Universal)",
    category: "Auto Parts",
    price: 12.50,
    costPrice: 6.00,
    stock: 60,
    minStock: 20,
    barcode: "8806091234564",
    image: "https://images.unsplash.com/photo-1601984840798-44da9ccb3be8?w=600&auto=format&fit=crop&q=80",
    description: "High-flow oil filter with anti-drainback valve for most engine types."
  },
  {
    id: "prod-5",
    name: "Radiator Coolant Antifreeze 1L",
    category: "Auto Parts",
    price: 9.00,
    costPrice: 4.50,
    stock: 55,
    minStock: 20,
    barcode: "8806091234565",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80",
    description: "OAT coolant concentrate for aluminium and cast-iron engine blocks."
  },

  // Ignition & Electrical
  {
    id: "prod-6",
    name: "NGK Spark Plugs ×4",
    category: "Auto Parts",
    price: 12.00,
    costPrice: 6.50,
    stock: 80,
    minStock: 25,
    barcode: "8806091234566",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
    description: "Iridium tip spark plugs for improved ignitability and fuel efficiency."
  },
  {
    id: "prod-7",
    name: "Optima RedTop 12V Car Battery",
    category: "Auto Parts",
    price: 189.00,
    costPrice: 128.00,
    stock: 12,
    minStock: 4,
    barcode: "8806091234567",
    image: "https://images.unsplash.com/photo-1609592806074-d1a1eb7bdf29?w=600&auto=format&fit=crop&q=80",
    description: "AGM spiral-cell battery with 800 CCA for powerful engine cranking."
  },
  {
    id: "prod-8",
    name: "Alternator 90A (Rebuilt)",
    category: "Auto Parts",
    price: 95.00,
    costPrice: 58.00,
    stock: 9,
    minStock: 3,
    barcode: "8806091234568",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    description: "Remanufactured alternator for reliable charging system output."
  },

  // Filters & Intake
  {
    id: "prod-9",
    name: "Air Filter Set (OEM Fit)",
    category: "Auto Parts",
    price: 8.00,
    costPrice: 4.00,
    stock: 45,
    minStock: 15,
    barcode: "8806091234569",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&auto=format&fit=crop&q=80",
    description: "High-efficiency panel air filter for improved airflow and engine longevity."
  },
  {
    id: "prod-10",
    name: "Fuel Filter (In-Line)",
    category: "Auto Parts",
    price: 14.00,
    costPrice: 7.00,
    stock: 38,
    minStock: 12,
    barcode: "8806091234570",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7bdc8de?w=600&auto=format&fit=crop&q=80",
    description: "Micron-rated inline fuel filter to protect injectors and carburettors."
  },

  // Suspension & Steering
  {
    id: "prod-11",
    name: "Monroe Gas-Matic Shock Absorbers (Pair)",
    category: "Auto Parts",
    price: 120.00,
    costPrice: 78.00,
    stock: 16,
    minStock: 5,
    barcode: "8806091234571",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80",
    description: "Gas-charged shock absorbers for improved ride comfort and handling."
  },
  {
    id: "prod-12",
    name: "Tie Rod End (Inner & Outer Kit)",
    category: "Auto Parts",
    price: 38.00,
    costPrice: 20.00,
    stock: 20,
    minStock: 6,
    barcode: "8806091234572",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    description: "Complete tie rod end replacement kit for precise steering geometry."
  },

  // Tyres & Wheels
  {
    id: "prod-13",
    name: "Michelin Primacy 4 Tyre 205/55R16",
    category: "Auto Parts",
    price: 115.00,
    costPrice: 82.00,
    stock: 24,
    minStock: 8,
    barcode: "8806091234573",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80",
    description: "Premium touring tyre with excellent wet grip and long tread life."
  },
  {
    id: "prod-14",
    name: "Alloy Wheel Lug Nuts M12×1.5 (Set of 20)",
    category: "Auto Parts",
    price: 22.00,
    costPrice: 10.00,
    stock: 7,
    minStock: 10, // low stock flag!
    barcode: "8806091234574",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80",
    description: "Hex-head chrome lug nuts compatible with most alloy wheel fitments."
  },

  // Wipers & Exterior
  {
    id: "prod-15",
    name: "Wiper Blade Set (Front Pair)",
    category: "Auto Parts",
    price: 13.00,
    costPrice: 6.50,
    stock: 42,
    minStock: 15,
    barcode: "8806091234575",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    description: "Beam wiper blades with all-season rubber compound for clear visibility."
  },
  {
    id: "prod-16",
    name: "Headlight Bulb H4 (Pair) 60/55W",
    category: "Auto Parts",
    price: 18.00,
    costPrice: 8.00,
    stock: 50,
    minStock: 15,
    barcode: "8806091234576",
    image: "https://images.unsplash.com/photo-1504222490345-c075b7bdc8de?w=600&auto=format&fit=crop&q=80",
    description: "Halogen H4 replacement bulbs for high and low beam headlights."
  },

  // Transmission & Drivetrain
  {
    id: "prod-17",
    name: "ATF Automatic Transmission Fluid 1L",
    category: "Auto Parts",
    price: 11.00,
    costPrice: 5.50,
    stock: 30,
    minStock: 10,
    barcode: "8806091234577",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    description: "Multi-vehicle ATF for smooth gear shifts and transmission protection."
  },
  {
    id: "prod-18",
    name: "CV Axle Shaft (Driver Side)",
    category: "Auto Parts",
    price: 88.00,
    costPrice: 55.00,
    stock: 8,
    minStock: 3,
    barcode: "8806091234578",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    description: "Remanufactured constant velocity axle shaft with new boots and clips."
  },

  // Tools & Accessories
  {
    id: "prod-19",
    name: "12V DC Portable Tyre Inflator",
    category: "Auto Parts",
    price: 32.00,
    costPrice: 18.00,
    stock: 4, // low stock flag!
    minStock: 8,
    barcode: "8806091234579",
    image: "https://images.unsplash.com/photo-1609592806074-d1a1eb7bdf29?w=600&auto=format&fit=crop&q=80",
    description: "Compact 12V compressor with pressure gauge and auto shut-off for cars and bikes."
  },
  {
    id: "prod-20",
    name: "OBD2 Diagnostic Scanner",
    category: "Auto Parts",
    price: 55.00,
    costPrice: 30.00,
    stock: 18,
    minStock: 5,
    barcode: "8806091234580",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
    description: "Bluetooth OBD2 scanner reads and clears engine fault codes on all vehicles."
  },
  {
    id: "prod-21",
    name: "Jumper / Booster Cables 400A 4m",
    category: "Auto Parts",
    price: 24.00,
    costPrice: 11.00,
    stock: 3, // low stock flag!
    minStock: 8,
    barcode: "8806091234581",
    image: "https://images.unsplash.com/photo-1609592806074-d1a1eb7bdf29?w=600&auto=format&fit=crop&q=80",
    description: "Heavy-gauge copper clamp booster cables for quick-start emergencies."
  },
  {
    id: "prod-22",
    name: "Torque Wrench 1/2\" Drive 20-200Nm",
    category: "Auto Parts",
    price: 42.00,
    costPrice: 22.00,
    stock: 2, // low stock flag!
    minStock: 5,
    barcode: "8806091234582",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    description: "Click-type torque wrench with 72-tooth ratchet for precise fastener tightening."
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
      { name: "Optima RedTop 12V Car Battery", qty: 1, price: 189.00 },
      { name: "Premium Oil Filter (Universal)", qty: 2, price: 12.50 }
    ],
    total: 214.00,
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
      { name: "NGK Spark Plugs ×4", qty: 2, price: 12.00 },
      { name: "Air Filter Set (OEM Fit)", qty: 1, price: 8.00 }
    ],
    total: 32.00,
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
    itemsCount: 2,
    items: [
      { name: "Monroe Gas-Matic Shock Absorbers (Pair)", qty: 2, price: 120.00 }
    ],
    total: 240.00,
    paymentMethod: "Card (Visa Debit)",
    status: "Pending", // Needs CEO approval!
    requiresApproval: true,
    approvalReason: "High-value transaction > $200",
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
      { name: "Bosch Brake Pads (Front Set)", qty: 2, price: 45.00 },
      { name: "Wiper Blade Set (Front Pair)", qty: 1, price: 13.00 }
    ],
    total: 103.00,
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
    itemsCount: 3,
    items: [
      { name: "Brembo Heavy Duty Brake Discs", qty: 2, price: 68.00 },
      { name: "Radiator Coolant Antifreeze 1L", qty: 2, price: 9.00 }
    ],
    total: 154.00,
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
      { name: "Michelin Primacy 4 Tyre 205/55R16", qty: 2, price: 115.00 }
    ],
    total: 230.00,
    paymentMethod: "Mobile Money (Vodafone Cash)",
    status: "Pending", // Needs CEO approval!
    requiresApproval: true,
    approvalReason: "Bulk tyre order discount override applied",
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
      { name: "Synthetic Engine Oil 5L (5W-30)", qty: 2, price: 35.00 },
      { name: "Fuel Filter (In-Line)", qty: 1, price: 14.00 }
    ],
    total: 84.00,
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
    itemsCount: 2,
    items: [
      { name: "CV Axle Shaft (Driver Side)", qty: 1, price: 88.00 },
      { name: "ATF Automatic Transmission Fluid 1L", qty: 2, price: 11.00 }
    ],
    total: 110.00,
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
  { name: "Brakes & Rotors", value: 32, amount: "$9,120", color: "#FF6A13" },
  { name: "Engine & Fluids", value: 28, amount: "$7,980", color: "#2563eb" },
  { name: "Tyres & Wheels", value: 22, amount: "$6,270", color: "#10B981" },
  { name: "Ignition & Electrical", value: 18, amount: "$5,130", color: "#8B5CF6" }
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
