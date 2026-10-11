// Comprehensive Sales & Product Analytics Data Engine
// Supports dynamic multi-dimensional filtering by Vendor, Product, Time Range, and Role.

export const EXTENDED_TRANSACTIONS = [
  // ── TODAY'S SALES (2026-10-12) ───────────────────────────────────────────
  {
    id: "TXN-9120",
    clerkName: "Amara Okonkwo",
    customerName: "Chief Obinna Eze",
    customerPhone: "+234 803 111 2233",
    itemsCount: 3,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "Premium Oil Filter", qty: 1, price: 12.50, costPrice: 6.00, category: "Auto Parts" }
    ],
    total: 102.50,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Approved",
    timestamp: "12 mins ago",
    date: "2026-10-12",
    time: "17:48",
    hour: "17:00"
  },
  {
    id: "TXN-9119",
    clerkName: "Kwame Mensah",
    customerName: "Amina Yusuf",
    customerPhone: "+234 809 333 4455",
    itemsCount: 4,
    items: [
      { name: "NGK Spark Plugs ×4", qty: 2, price: 12.00, costPrice: 6.50, category: "Auto Parts" },
      { name: "Synthetic Engine Oil 5L", qty: 2, price: 35.00, costPrice: 22.00, category: "Auto Parts" }
    ],
    total: 94.00,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "28 mins ago",
    date: "2026-10-12",
    time: "17:32",
    hour: "17:00"
  },
  {
    id: "TXN-9118",
    clerkName: "Zainab Bello",
    customerName: "Dr. Samuel Adeyemi",
    customerPhone: "+234 812 555 7788",
    itemsCount: 1,
    items: [
      { name: "iPhone 15 Pro Max 256GB", qty: 1, price: 999.00, costPrice: 820.00, category: "Electronics" }
    ],
    total: 999.00,
    paymentMethod: "Card (Visa Debit)",
    status: "Completed",
    timestamp: "45 mins ago",
    date: "2026-10-12",
    time: "17:15",
    hour: "17:00"
  },
  {
    id: "TXN-9117",
    clerkName: "Amara Okonkwo",
    customerName: "Kofi Boateng",
    customerPhone: "+233 24 999 8877",
    itemsCount: 3,
    items: [
      { name: "BengalBound Premium Cotton T-Shirt", qty: 2, price: 25.00, costPrice: 10.00, category: "Clothing" },
      { name: "Water-resistant Trail Cap", qty: 1, price: 22.00, costPrice: 8.50, category: "Clothing" }
    ],
    total: 72.00,
    paymentMethod: "Mobile Money (Wave)",
    status: "Approved",
    timestamp: "1.2 hours ago",
    date: "2026-10-12",
    time: "16:40",
    hour: "16:00"
  },
  {
    id: "TXN-9116",
    clerkName: "Fatima Al-Hassan",
    customerName: "Ngozi Chukwu",
    customerPhone: "+234 705 444 3322",
    itemsCount: 2,
    items: [
      { name: "Bosch Brake Pads", qty: 1, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "Air Filter Set", qty: 1, price: 8.00, costPrice: 4.00, category: "Auto Parts" }
    ],
    total: 53.00,
    paymentMethod: "Card (Mastercard)",
    status: "Completed",
    timestamp: "2 hours ago",
    date: "2026-10-12",
    time: "16:00",
    hour: "16:00"
  },
  {
    id: "TXN-9115",
    clerkName: "Emmanuel Acheampong",
    customerName: "Tariq Mansoor",
    customerPhone: "+234 810 222 9988",
    itemsCount: 5,
    items: [
      { name: "Specialty Caramel Macchiato Latte", qty: 3, price: 4.50, costPrice: 1.80, category: "Food & Bakery" },
      { name: "Artisan Sourdough Loaf", qty: 2, price: 6.50, costPrice: 2.20, category: "Food & Bakery" }
    ],
    total: 26.50,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "2.5 hours ago",
    date: "2026-10-12",
    time: "15:30",
    hour: "15:00"
  },
  {
    id: "TXN-9114",
    clerkName: "Blessing Nwosu",
    customerName: "Grace Danladi",
    customerPhone: "+234 803 777 6655",
    itemsCount: 2,
    items: [
      { name: "Sony WH-1000XM5 Wireless Headphones", qty: 1, price: 349.99, costPrice: 260.00, category: "Electronics" },
      { name: "Logitech MX Master 3S Mouse", qty: 1, price: 99.99, costPrice: 65.00, category: "Electronics" }
    ],
    total: 449.98,
    paymentMethod: "Mobile Money (Orange Money)",
    status: "Approved",
    timestamp: "3 hours ago",
    date: "2026-10-12",
    time: "15:00",
    hour: "15:00"
  },
  {
    id: "TXN-9113",
    clerkName: "Kwame Mensah",
    customerName: "Folake Balogun",
    customerPhone: "+234 802 888 1122",
    itemsCount: 3,
    items: [
      { name: "Premium Oil Filter", qty: 2, price: 12.50, costPrice: 6.00, category: "Auto Parts" },
      { name: "Wiper Blade Set", qty: 1, price: 13.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 38.00,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Approved",
    timestamp: "4 hours ago",
    date: "2026-10-12",
    time: "14:15",
    hour: "14:00"
  },
  {
    id: "TXN-9112",
    clerkName: "Amara Okonkwo",
    customerName: "Ibrahim Touré",
    customerPhone: "+225 07 44 33 22",
    itemsCount: 4,
    items: [
      { name: "NGK Spark Plugs ×4", qty: 3, price: 12.00, costPrice: 6.50, category: "Auto Parts" },
      { name: "Air Filter Set", qty: 1, price: 8.00, costPrice: 4.00, category: "Auto Parts" }
    ],
    total: 44.00,
    paymentMethod: "Mobile Money (Wave)",
    status: "Approved",
    timestamp: "5 hours ago",
    date: "2026-10-12",
    time: "13:10",
    hour: "13:00"
  },
  {
    id: "TXN-9111",
    clerkName: "Zainab Bello",
    customerName: "Sariha Akter",
    customerPhone: "+880 1711 223344",
    itemsCount: 2,
    items: [
      { name: "Heritage Denim Jacket", qty: 1, price: 89.50, costPrice: 45.00, category: "Clothing" },
      { name: "Athletic Flex Performance Hoodie", qty: 1, price: 65.00, costPrice: 32.00, category: "Clothing" }
    ],
    total: 154.50,
    paymentMethod: "Card (Visa)",
    status: "Completed",
    timestamp: "6 hours ago",
    date: "2026-10-12",
    time: "12:00",
    hour: "12:00"
  },
  {
    id: "TXN-9110",
    clerkName: "Fatima Al-Hassan",
    customerName: "Mohamed Cissé",
    customerPhone: "+221 77 123 4567",
    itemsCount: 2,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" }
    ],
    total: 90.00,
    paymentMethod: "Mobile Money (Orange)",
    status: "Completed",
    timestamp: "7 hours ago",
    date: "2026-10-12",
    time: "11:20",
    hour: "11:00"
  },
  {
    id: "TXN-9109",
    clerkName: "Kwame Mensah",
    customerName: "Abdoulaye Diallo",
    customerPhone: "+225 05 99 88 77",
    itemsCount: 3,
    items: [
      { name: "Anker 737 PowerBank 24,000mAh", qty: 1, price: 129.99, costPrice: 85.00, category: "Electronics" },
      { name: "Premium Oil Filter", qty: 2, price: 12.50, costPrice: 6.00, category: "Auto Parts" }
    ],
    total: 154.99,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Approved",
    timestamp: "8 hours ago",
    date: "2026-10-12",
    time: "10:30",
    hour: "10:00"
  },
  {
    id: "TXN-9108",
    clerkName: "Emmanuel Acheampong",
    customerName: "Mariam Traoré",
    customerPhone: "+225 01 22 33 44",
    itemsCount: 3,
    items: [
      { name: "Smoked Turkey Club Sandwich", qty: 2, price: 8.50, costPrice: 3.50, category: "Food & Bakery" },
      { name: "Cold Pressed Orange & Ginger Juice 330ml", qty: 1, price: 3.95, costPrice: 1.50, category: "Food & Bakery" }
    ],
    total: 20.95,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "9 hours ago",
    date: "2026-10-12",
    time: "09:40",
    hour: "09:00"
  },

  // ── YESTERDAY (2026-10-11) ────────────────────────────────────────────────
  {
    id: "TXN-9107",
    clerkName: "Amara Okonkwo",
    customerName: "Ousmane Sonko",
    customerPhone: "+221 78 555 4433",
    itemsCount: 4,
    items: [
      { name: "Premium Oil Filter", qty: 3, price: 12.50, costPrice: 6.00, category: "Auto Parts" },
      { name: "NGK Spark Plugs ×4", qty: 1, price: 12.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 49.50,
    paymentMethod: "Mobile Money (Wave)",
    status: "Completed",
    timestamp: "1 day ago",
    date: "2026-10-11",
    time: "16:20",
    hour: "16:00"
  },
  {
    id: "TXN-9106",
    clerkName: "Kwame Mensah",
    customerName: "Khadija Ba",
    customerPhone: "+221 70 888 9900",
    itemsCount: 2,
    items: [
      { name: "Samsung Galaxy S24 Ultra", qty: 1, price: 1199.00, costPrice: 950.00, category: "Electronics" }
    ],
    total: 1199.00,
    paymentMethod: "Card (Visa)",
    status: "Completed",
    timestamp: "1 day ago",
    date: "2026-10-11",
    time: "15:45",
    hour: "15:00"
  },
  {
    id: "TXN-9105",
    clerkName: "Blessing Nwosu",
    customerName: "Alhaji Danjuma",
    customerPhone: "+234 803 444 1111",
    itemsCount: 3,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "Wiper Blade Set", qty: 1, price: 13.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 103.00,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Completed",
    timestamp: "1 day ago",
    date: "2026-10-11",
    time: "14:10",
    hour: "14:00"
  },
  {
    id: "TXN-9104",
    clerkName: "Zainab Bello",
    customerName: "Femi Kuti",
    customerPhone: "+234 802 123 9876",
    itemsCount: 3,
    items: [
      { name: "BengalBound Premium Cotton T-Shirt", qty: 3, price: 25.00, costPrice: 10.00, category: "Clothing" }
    ],
    total: 75.00,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "1 day ago",
    date: "2026-10-11",
    time: "12:30",
    hour: "12:00"
  },
  {
    id: "TXN-9103",
    clerkName: "Fatima Al-Hassan",
    customerName: "Salma Ndiaye",
    customerPhone: "+221 77 654 3210",
    itemsCount: 4,
    items: [
      { name: "Synthetic Engine Oil 5L", qty: 2, price: 35.00, costPrice: 22.00, category: "Auto Parts" },
      { name: "Air Filter Set", qty: 2, price: 8.00, costPrice: 4.00, category: "Auto Parts" }
    ],
    total: 86.00,
    paymentMethod: "Mobile Money (Orange)",
    status: "Completed",
    timestamp: "1 day ago",
    date: "2026-10-11",
    time: "11:00",
    hour: "11:00"
  },

  // ── 2 DAYS AGO (2026-10-10) ───────────────────────────────────────────────
  {
    id: "TXN-9102",
    clerkName: "Amara Okonkwo",
    customerName: "Babacar Diop",
    customerPhone: "+221 76 111 2233",
    itemsCount: 3,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "Premium Oil Filter", qty: 1, price: 12.50, costPrice: 6.00, category: "Auto Parts" }
    ],
    total: 102.50,
    paymentMethod: "Mobile Money (Wave)",
    status: "Completed",
    timestamp: "2 days ago",
    date: "2026-10-10",
    time: "17:15",
    hour: "17:00"
  },
  {
    id: "TXN-9101",
    clerkName: "Kwame Mensah",
    customerName: "Aissatou Barry",
    customerPhone: "+224 622 112233",
    itemsCount: 5,
    items: [
      { name: "NGK Spark Plugs ×4", qty: 4, price: 12.00, costPrice: 6.50, category: "Auto Parts" },
      { name: "Wiper Blade Set", qty: 1, price: 13.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 61.00,
    paymentMethod: "Mobile Money (Orange)",
    status: "Completed",
    timestamp: "2 days ago",
    date: "2026-10-10",
    time: "15:50",
    hour: "15:00"
  },
  {
    id: "TXN-9100",
    clerkName: "Emmanuel Acheampong",
    customerName: "Chidi Mokeme",
    customerPhone: "+234 818 990 0112",
    itemsCount: 2,
    items: [
      { name: "Apple Watch Series 9 GPS", qty: 1, price: 399.00, costPrice: 310.00, category: "Electronics" },
      { name: "Water-resistant Trail Cap", qty: 1, price: 22.00, costPrice: 8.50, category: "Clothing" }
    ],
    total: 421.00,
    paymentMethod: "Card (Mastercard)",
    status: "Completed",
    timestamp: "2 days ago",
    date: "2026-10-10",
    time: "14:20",
    hour: "14:00"
  },
  {
    id: "TXN-9099",
    clerkName: "Blessing Nwosu",
    customerName: "Habiba Camara",
    customerPhone: "+225 07 11 22 33",
    itemsCount: 4,
    items: [
      { name: "BengalBound Premium Cotton T-Shirt", qty: 2, price: 25.00, costPrice: 10.00, category: "Clothing" },
      { name: "Heritage Denim Jacket", qty: 1, price: 89.50, costPrice: 45.00, category: "Clothing" },
      { name: "Urban Chino Trousers - Khaki", qty: 1, price: 49.00, costPrice: 22.00, category: "Clothing" }
    ],
    total: 188.50,
    paymentMethod: "Mobile Money (Wave)",
    status: "Completed",
    timestamp: "2 days ago",
    date: "2026-10-10",
    time: "11:45",
    hour: "11:00"
  },

  // ── 3 DAYS AGO (2026-10-09) ───────────────────────────────────────────────
  {
    id: "TXN-9098",
    clerkName: "Kwame Mensah",
    customerName: "Mamadou Ba",
    customerPhone: "+221 77 999 8811",
    itemsCount: 4,
    items: [
      { name: "Synthetic Engine Oil 5L", qty: 3, price: 35.00, costPrice: 22.00, category: "Auto Parts" },
      { name: "Premium Oil Filter", qty: 1, price: 12.50, costPrice: 6.00, category: "Auto Parts" }
    ],
    total: 117.50,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "3 days ago",
    date: "2026-10-09",
    time: "16:10",
    hour: "16:00"
  },
  {
    id: "TXN-9097",
    clerkName: "Zainab Bello",
    customerName: "Adama Barrow",
    customerPhone: "+220 70 123 456",
    itemsCount: 3,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "NGK Spark Plugs ×4", qty: 2, price: 12.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 114.00,
    paymentMethod: "Mobile Money (Wave)",
    status: "Completed",
    timestamp: "3 days ago",
    date: "2026-10-09",
    time: "14:30",
    hour: "14:00"
  },
  {
    id: "TXN-9096",
    clerkName: "Amara Okonkwo",
    customerName: "Seydou Doumbia",
    customerPhone: "+225 05 33 44 55",
    itemsCount: 2,
    items: [
      { name: "Sony WH-1000XM5 Wireless Headphones", qty: 1, price: 349.99, costPrice: 260.00, category: "Electronics" },
      { name: "Anker 737 PowerBank 24,000mAh", qty: 1, price: 129.99, costPrice: 85.00, category: "Electronics" }
    ],
    total: 479.98,
    paymentMethod: "Card (Visa)",
    status: "Completed",
    timestamp: "3 days ago",
    date: "2026-10-09",
    time: "12:15",
    hour: "12:00"
  },

  // ── 4 DAYS AGO (2026-10-08) ───────────────────────────────────────────────
  {
    id: "TXN-9095",
    clerkName: "Fatima Al-Hassan",
    customerName: "Ifeanyi Okafor",
    customerPhone: "+234 803 234 5678",
    itemsCount: 6,
    items: [
      { name: "Premium Oil Filter", qty: 4, price: 12.50, costPrice: 6.00, category: "Auto Parts" },
      { name: "Air Filter Set", qty: 2, price: 8.00, costPrice: 4.00, category: "Auto Parts" }
    ],
    total: 66.00,
    paymentMethod: "Mobile Money (MTN MoMo)",
    status: "Completed",
    timestamp: "4 days ago",
    date: "2026-10-08",
    time: "16:40",
    hour: "16:00"
  },
  {
    id: "TXN-9094",
    clerkName: "Blessing Nwosu",
    customerName: "Koffi Annan",
    customerPhone: "+233 20 888 7766",
    itemsCount: 2,
    items: [
      { name: "iPhone 15 Pro Max 256GB", qty: 1, price: 999.00, costPrice: 820.00, category: "Electronics" }
    ],
    total: 999.00,
    paymentMethod: "Mobile Money (AirtelTigo)",
    status: "Completed",
    timestamp: "4 days ago",
    date: "2026-10-08",
    time: "15:20",
    hour: "15:00"
  },
  {
    id: "TXN-9093",
    clerkName: "Amara Okonkwo",
    customerName: "Fatou Cham",
    customerPhone: "+220 99 88 776",
    itemsCount: 4,
    items: [
      { name: "NGK Spark Plugs ×4", qty: 4, price: 12.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 48.00,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "4 days ago",
    date: "2026-10-08",
    time: "11:10",
    hour: "11:00"
  },

  // ── 5 DAYS AGO (2026-10-07) ───────────────────────────────────────────────
  {
    id: "TXN-9092",
    clerkName: "Kwame Mensah",
    customerName: "Cheick Tiote",
    customerPhone: "+225 01 99 88 77",
    itemsCount: 3,
    items: [
      { name: "Bosch Brake Pads", qty: 2, price: 45.00, costPrice: 28.00, category: "Auto Parts" },
      { name: "Synthetic Engine Oil 5L", qty: 1, price: 35.00, costPrice: 22.00, category: "Auto Parts" }
    ],
    total: 125.00,
    paymentMethod: "Mobile Money (Wave)",
    status: "Completed",
    timestamp: "5 days ago",
    date: "2026-10-07",
    time: "17:00",
    hour: "17:00"
  },
  {
    id: "TXN-9091",
    clerkName: "Emmanuel Acheampong",
    customerName: "Mariama Bâ",
    customerPhone: "+221 77 444 3322",
    itemsCount: 3,
    items: [
      { name: "BengalBound Premium Cotton T-Shirt", qty: 3, price: 25.00, costPrice: 10.00, category: "Clothing" }
    ],
    total: 75.00,
    paymentMethod: "Cash",
    status: "Completed",
    timestamp: "5 days ago",
    date: "2026-10-07",
    time: "13:30",
    hour: "13:00"
  },

  // ── 6 DAYS AGO (2026-10-06) ───────────────────────────────────────────────
  {
    id: "TXN-9090",
    clerkName: "Zainab Bello",
    customerName: "Salif Keita",
    customerPhone: "+223 76 54 32 10",
    itemsCount: 4,
    items: [
      { name: "Premium Oil Filter", qty: 3, price: 12.50, costPrice: 6.00, category: "Auto Parts" },
      { name: "Wiper Blade Set", qty: 1, price: 13.00, costPrice: 6.50, category: "Auto Parts" }
    ],
    total: 50.50,
    paymentMethod: "Mobile Money (Orange)",
    status: "Completed",
    timestamp: "6 days ago",
    date: "2026-10-06",
    time: "16:20",
    hour: "16:00"
  },
  {
    id: "TXN-9089",
    clerkName: "Amara Okonkwo",
    customerName: "Yaya Touré",
    customerPhone: "+225 07 55 44 33",
    itemsCount: 2,
    items: [
      { name: "Samsung Galaxy S24 Ultra", qty: 1, price: 1199.00, costPrice: 950.00, category: "Electronics" }
    ],
    total: 1199.00,
    paymentMethod: "Card (Visa)",
    status: "Completed",
    timestamp: "6 days ago",
    date: "2026-10-06",
    time: "14:50",
    hour: "14:00"
  }
];

// Color palette for charts
export const CHART_COLORS = [
  '#FF6A13', // Brand Orange
  '#2563EB', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#14B8A6', // Teal
];

// Calculation & Aggregation Utility
export function calculateProductSalesAnalytics(allTransactions, {
  vendor = 'all',
  product = 'all',
  timeRange = '7d',
  managerTeam = null
} = {}) {
  const transactions = allTransactions && allTransactions.length > 0 ? allTransactions : EXTENDED_TRANSACTIONS;

  // Filter by time range
  const now = new Date('2026-10-12T23:59:59'); // Anchored prototype current time
  const filteredByDate = transactions.filter(t => {
    if (timeRange === 'all') return true;
    const tDate = t.date ? new Date(t.date) : new Date('2026-10-12');
    const diffDays = Math.floor((now - tDate) / (1000 * 60 * 60 * 24));
    if (timeRange === 'today') return diffDays <= 0 || t.date === '2026-10-12';
    if (timeRange === '7d') return diffDays <= 7;
    if (timeRange === '30d') return diffDays <= 30;
    return true;
  });

  // Filter by Vendor (with regional clerk alias support)
  const filteredByVendor = filteredByDate.filter(t => {
    if (vendor === 'all') return true;
    if (t.clerkName === vendor) return true;
    // Regional clerk aliases so every active demo clerk gets their personal sales data
    const demoAliases = ['Demo Clerk', 'Yao Brou', 'Modou Fall', 'রহিম শেখ'];
    if (demoAliases.includes(vendor) && t.clerkName === 'Amara Okonkwo') {
      return true;
    }
    return false;
  });

  // Filter by Manager Team (if applicable)
  const alphaClerks = ['Amara Okonkwo', 'Kwame Mensah', 'Zainab Bello'];
  const betaClerks = ['Fatima Al-Hassan', 'Emmanuel Acheampong', 'Blessing Nwosu'];
  const filteredByTeam = filteredByVendor.filter(t => {
    if (!managerTeam) return true;
    if (managerTeam === 'Team Alpha') return alphaClerks.includes(t.clerkName);
    if (managerTeam === 'Team Beta') return betaClerks.includes(t.clerkName);
    return true;
  });

  // Aggregate by Product & calculate line item filters
  const productMap = new Map();
  let totalRevenue = 0;
  let totalUnitsSold = 0;
  let totalProfit = 0;
  let matchingOrdersCount = 0;

  // Timeline buckets map
  const timelineMap = new Map();

  // Vendor buckets map
  const vendorMap = new Map();

  // Category buckets map
  const categoryMap = new Map();

  filteredByTeam.forEach(txn => {
    let orderMatched = false;
    const items = txn.items || [];

    items.forEach(item => {
      // Check product filter
      if (product !== 'all' && item.name !== product) {
        return; // Skip non-matching products
      }

      orderMatched = true;
      const qty = Number(item.qty || 1);
      const price = Number(item.price || (txn.total / (items.length || 1)));
      const costPrice = Number(item.costPrice || (price * 0.65));
      const lineRevenue = qty * price;
      const lineCost = qty * costPrice;
      const lineProfit = lineRevenue - lineCost;
      const category = item.category || 'Retail Goods';

      totalRevenue += lineRevenue;
      totalUnitsSold += qty;
      totalProfit += lineProfit;

      // Update Product Map
      if (!productMap.has(item.name)) {
        productMap.set(item.name, {
          name: item.name,
          category,
          unitsSold: 0,
          totalRevenue: 0,
          costPrice,
          totalProfit: 0,
          avgPrice: price,
          vendors: {},
          transactionsCount: 0
        });
      }
      const prodStats = productMap.get(item.name);
      prodStats.unitsSold += qty;
      prodStats.totalRevenue += lineRevenue;
      prodStats.totalProfit += lineProfit;
      prodStats.transactionsCount += 1;
      prodStats.vendors[txn.clerkName] = (prodStats.vendors[txn.clerkName] || 0) + qty;

      // Update Vendor Map
      if (!vendorMap.has(txn.clerkName)) {
        vendorMap.set(txn.clerkName, {
          name: txn.clerkName,
          revenue: 0,
          units: 0,
          orders: 0,
          productsSold: {},
          commission: 0
        });
      }
      const vStats = vendorMap.get(txn.clerkName);
      vStats.revenue += lineRevenue;
      vStats.units += qty;
      vStats.productsSold[item.name] = (vStats.productsSold[item.name] || 0) + qty;
      vStats.commission += lineProfit * 0.10; // 10% commission on gross profit

      // Update Category Map
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          revenue: 0,
          units: 0
        });
      }
      const catStats = categoryMap.get(category);
      catStats.revenue += lineRevenue;
      catStats.units += qty;

      // Update Timeline Map
      const timeKey = timeRange === 'today'
        ? (txn.hour || '12:00')
        : (txn.date || '2026-10-12');

      if (!timelineMap.has(timeKey)) {
        timelineMap.set(timeKey, {
          period: timeKey,
          revenue: 0,
          units: 0,
          orders: 0
        });
      }
      const tPoint = timelineMap.get(timeKey);
      tPoint.revenue += lineRevenue;
      tPoint.units += qty;
    });

    if (orderMatched) {
      matchingOrdersCount += 1;
      const timeKey = timeRange === 'today' ? (txn.hour || '12:00') : (txn.date || '2026-10-12');
      if (timelineMap.has(timeKey)) {
        timelineMap.get(timeKey).orders += 1;
      }
      if (vendorMap.has(txn.clerkName)) {
        vendorMap.get(txn.clerkName).orders += 1;
      }
    }
  });

  // Convert Product Map to sorted array
  const productList = Array.from(productMap.values()).map(p => {
    // Find top vendor for this product
    let topVendorName = 'N/A';
    let topVendorUnits = 0;
    Object.entries(p.vendors).forEach(([vName, vUnits]) => {
      if (vUnits > topVendorUnits) {
        topVendorUnits = vUnits;
        topVendorName = vName;
      }
    });

    const marginPercent = p.totalRevenue > 0
      ? Math.round((p.totalProfit / p.totalRevenue) * 100)
      : 30;

    return {
      ...p,
      avgPrice: p.unitsSold > 0 ? (p.totalRevenue / p.unitsSold) : p.avgPrice,
      marginPercent,
      topVendor: topVendorName,
      topVendorUnits,
      shareOfTotal: totalRevenue > 0 ? Math.round((p.totalRevenue / totalRevenue) * 100) : 0,
      shareOfUnits: totalUnitsSold > 0 ? Math.round((p.unitsSold / totalUnitsSold) * 100) : 0
    };
  });

  // Sort by units sold descending
  const productsByUnits = [...productList].sort((a, b) => b.unitsSold - a.unitsSold);

  // Sort by revenue descending
  const productsByRevenue = [...productList].sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Convert Timeline Map to chronological array
  const timeline = Array.from(timelineMap.values()).sort((a, b) => {
    return a.period.localeCompare(b.period);
  });

  // Format Timeline Labels for nicer charts
  const formattedTimeline = timeline.map(point => {
    let label = point.period;
    if (point.period.includes('-')) {
      const parts = point.period.split('-');
      label = `${parts[1]}/${parts[2]}`; // MM/DD
    }
    return {
      ...point,
      displayLabel: label,
      revenueRounded: Math.round(point.revenue),
      revenue: Math.round(point.revenue * 100) / 100
    };
  });

  // Convert Category Map to array with percentages and colors
  const categoryBreakdown = Array.from(categoryMap.values()).map((cat, idx) => ({
    name: cat.name,
    revenue: Math.round(cat.revenue * 100) / 100,
    units: cat.units,
    percentage: totalRevenue > 0 ? Math.round((cat.revenue / totalRevenue) * 100) : 0,
    color: CHART_COLORS[idx % CHART_COLORS.length]
  })).sort((a, b) => b.revenue - a.revenue);

  // Convert Vendor Map to array
  const vendorBreakdown = Array.from(vendorMap.values()).map(v => {
    let topProduct = 'None';
    let topProdUnits = 0;
    Object.entries(v.productsSold).forEach(([pName, pUnits]) => {
      if (pUnits > topProdUnits) {
        topProdUnits = pUnits;
        topProduct = pName;
      }
    });

    return {
      name: v.name,
      revenue: Math.round(v.revenue * 100) / 100,
      units: v.units,
      orders: v.orders,
      topProduct,
      commission: Math.round(v.commission * 100) / 100
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const topProductByUnits = productsByUnits[0] || null;
  const topProductByRevenue = productsByRevenue[0] || null;
  const topVendor = vendorBreakdown[0] || null;

  return {
    kpis: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalUnitsSold,
      totalOrders: matchingOrdersCount,
      avgBasketValue: matchingOrdersCount > 0 ? Math.round((totalRevenue / matchingOrdersCount) * 100) / 100 : 0,
      totalProfit: Math.round(totalProfit * 100) / 100,
      profitMargin: totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0,
      topProductByUnits,
      topProductByRevenue,
      topVendor
    },
    productsByUnits,
    productsByRevenue,
    timeline: formattedTimeline,
    categoryBreakdown,
    vendorBreakdown,
    allProductsList: productList
  };
}
