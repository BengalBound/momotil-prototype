// Store Team & Organizational Structure Data
// 1 Patron (Owner), 2 Managers, and up to 6 Clerks in 2 Teams (Alpha & Beta)

export const STORE_MANAGERS = [
  {
    id: 'mgr-1',
    name: 'Marc Traoré',
    role: 'Manager 1',
    team: 'Team Alpha',
    shift: 'Morning & Inventory Shift (08:00 - 16:00)',
    phone: '+1 555 234 5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    assignedClerkIds: ['clk-101', 'clk-102', 'clk-103'],
    approvalsToday: 8,
    pendingApprovals: 2
  },
  {
    id: 'mgr-2',
    name: 'Fatou Sarr',
    role: 'Manager 2',
    team: 'Team Beta',
    shift: 'Evening & Operations Shift (14:00 - 22:00)',
    phone: '+1 555 876 5432',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    assignedClerkIds: ['clk-104', 'clk-105', 'clk-106'],
    approvalsToday: 6,
    pendingApprovals: 1
  }
];

export const INITIAL_TEAM_CLERKS = [
  {
    id: 'clk-101',
    name: 'Amara Okonkwo',
    team: 'Team Alpha',
    managerId: 'mgr-1',
    managerName: 'Marc Traoré',
    phone: '+1 555 010 1111',
    status: 'Active',
    shift: 'Morning (08:00 - 16:00)',
    salesToday: 840.50,
    ordersToday: 18,
    commissionRate: 3.5,
    commissionEarned: 29.42,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'Premium Oil Filter', qty: 6, amount: 75.00 },
      { name: 'Bosch Brake Pads', qty: 4, amount: 180.00 },
      { name: 'Air Filter Set', qty: 8, amount: 64.00 }
    ]
  },
  {
    id: 'clk-102',
    name: 'Kwame Mensah',
    team: 'Team Alpha',
    managerId: 'mgr-1',
    managerName: 'Marc Traoré',
    phone: '+1 555 010 2222',
    status: 'Active',
    shift: 'Morning (08:00 - 16:00)',
    salesToday: 955.00,
    ordersToday: 21,
    commissionRate: 3.5,
    commissionEarned: 33.43,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'NGK Spark Plugs ×4', qty: 12, amount: 144.00 },
      { name: 'Synthetic Engine Oil 5L', qty: 7, amount: 245.00 },
      { name: 'Wiper Blade Set', qty: 6, amount: 39.00 }
    ]
  },
  {
    id: 'clk-103',
    name: 'Zainab Bello',
    team: 'Team Alpha',
    managerId: 'mgr-1',
    managerName: 'Marc Traoré',
    phone: '+1 555 010 3333',
    status: 'Active',
    shift: 'Morning (08:00 - 16:00)',
    salesToday: 654.50,
    ordersToday: 14,
    commissionRate: 3.5,
    commissionEarned: 22.91,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'Transmission Fluid 1L', qty: 8, amount: 96.00 },
      { name: 'Air Filter Set', qty: 5, amount: 40.00 },
      { name: 'Coolant 4L', qty: 4, amount: 72.00 }
    ]
  },
  {
    id: 'clk-104',
    name: 'Modou Fall',
    team: 'Team Beta',
    managerId: 'mgr-2',
    managerName: 'Fatou Sarr',
    phone: '+1 555 010 4444',
    status: 'Active',
    shift: 'Evening (14:00 - 22:00)',
    salesToday: 720.00,
    ordersToday: 16,
    commissionRate: 3.5,
    commissionEarned: 25.20,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'Bosch Brake Pads', qty: 5, amount: 225.00 },
      { name: 'Premium Oil Filter', qty: 8, amount: 100.00 },
      { name: 'Battery 12V 65Ah', qty: 2, amount: 190.00 }
    ]
  },
  {
    id: 'clk-105',
    name: 'David Kiprono',
    team: 'Team Beta',
    managerId: 'mgr-2',
    managerName: 'Fatou Sarr',
    phone: '+1 555 010 5555',
    status: 'Active',
    shift: 'Evening (14:00 - 22:00)',
    salesToday: 480.00,
    ordersToday: 11,
    commissionRate: 3.5,
    commissionEarned: 16.80,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'NGK Spark Plugs ×4', qty: 6, amount: 72.00 },
      { name: 'Wiper Blade Set', qty: 4, amount: 26.00 },
      { name: 'Brake Fluid DOT4', qty: 6, amount: 54.00 }
    ]
  },
  {
    id: 'clk-106',
    name: 'Fatima Al-Hassan',
    team: 'Team Beta',
    managerId: 'mgr-2',
    managerName: 'Fatou Sarr',
    phone: '+1 555 010 6666',
    status: 'Active',
    shift: 'Evening (14:00 - 22:00)',
    salesToday: 590.00,
    ordersToday: 13,
    commissionRate: 3.5,
    commissionEarned: 20.65,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    itemsSold: [
      { name: 'Synthetic Engine Oil 5L', qty: 5, amount: 175.00 },
      { name: 'Air Filter Set', qty: 6, amount: 48.00 },
      { name: 'Halogen Headlight Bulb H4', qty: 8, amount: 64.00 }
    ]
  }
];

export const INITIAL_TASKS = [
  {
    id: 'tsk-1',
    title: 'Count Bosch brake pads stock before 5pm',
    description: 'Physical inventory audit on Shelf A2. Check batch expiry and box seals.',
    assignedTo: 'Amara Okonkwo',
    team: 'Team Alpha',
    assignedBy: 'Marc Traoré (Manager 1)',
    status: 'In Progress',
    priority: 'High',
    dueDate: 'Today 17:00',
    createdAt: '10:15 AM'
  },
  {
    id: 'tsk-2',
    title: 'Verify invoice #INV-4421 with wholesale client',
    description: 'Call customer to confirm delivery address & sales tax exemption certificate.',
    assignedTo: 'Kwame Mensah',
    team: 'Team Alpha',
    assignedBy: 'Marc Traoré (Manager 1)',
    status: 'Completed',
    priority: 'Normal',
    dueDate: 'Today 12:00',
    createdAt: '09:30 AM',
    completedAt: '11:45 AM'
  },
  {
    id: 'tsk-3',
    title: 'Restock front display with 10W-40 Synthetic Oil',
    description: 'Bring 12 bottles from warehouse shelf W-14 to retail counter display.',
    assignedTo: 'Modou Fall',
    team: 'Team Beta',
    assignedBy: 'Fatou Sarr (Manager 2)',
    status: 'To Do',
    priority: 'Normal',
    dueDate: 'Today 18:00',
    createdAt: '11:00 AM'
  },
  {
    id: 'tsk-4',
    title: 'Photograph incoming delivery of NGK spark plugs',
    description: 'Upload invoice photo and box seals into Bound OS inventory scan tool.',
    assignedTo: 'David Kiprono',
    team: 'Team Beta',
    assignedBy: 'Fatou Sarr (Manager 2)',
    status: 'To Do',
    priority: 'High',
    dueDate: 'Today 19:30',
    createdAt: '11:20 AM'
  },
  {
    id: 'tsk-5',
    title: 'Clean and test barcode laser scanner terminal 3',
    description: 'Wipe camera lens with microfiber cloth and run 5 test scans.',
    assignedTo: 'Zainab Bello',
    team: 'Team Alpha',
    assignedBy: 'Marc Traoré (Manager 1)',
    status: 'Completed',
    priority: 'Low',
    dueDate: 'Yesterday 16:00',
    createdAt: 'Yesterday 14:00',
    completedAt: 'Yesterday 15:30'
  }
];

export const INITIAL_INVENTORY_REQUESTS = [
  {
    id: 'REQ-INV-101',
    clerkName: 'Amara Okonkwo',
    team: 'Team Alpha',
    productName: 'Premium Oil Filter',
    sku: 'OIL-FLT-EN',
    currentStock: 24,
    requestedStock: 30,
    reason: 'Physical count found 6 additional unboxed units in storage rack B',
    status: 'Pending',
    timestamp: '15m ago',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
  },
  {
    id: 'REQ-INV-102',
    clerkName: 'Modou Fall',
    team: 'Team Beta',
    productName: 'NGK Spark Plugs',
    sku: 'NGK-SPK-01',
    currentStock: 42,
    requestedStock: 38,
    reason: '4 units damaged during unboxing (cracked ceramic insulator)',
    status: 'Pending',
    timestamp: '35m ago',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop'
  },
  {
    id: 'REQ-INV-103',
    clerkName: 'Kwame Mensah',
    team: 'Team Alpha',
    productName: 'Bosch Brake Pads',
    sku: 'BRK-BSH-EN',
    currentStock: 8,
    requestedStock: 14,
    reason: 'Direct delivery received from distributor courier',
    status: 'Approved',
    timestamp: '2h ago',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=200&auto=format&fit=crop'
  }
];

export const INITIAL_FIELD_REQUESTS = [
  {
    id: 'FLD-1',
    from: 'Amara Okonkwo (Clerk · Team Alpha)',
    type: 'Stock Restock Demand',
    text: '3 commercial taxi fleet drivers requested bulk 5L synthetic oil this morning. We need 20 additional jugs urgently.',
    urgency: 'High',
    status: 'Pending',
    time: '25m ago'
  },
  {
    id: 'FLD-2',
    from: 'Fatou Sarr (Manager 2)',
    type: 'POS Hardware',
    text: 'Backup thermal printer battery needs replacement on Terminal 2.',
    urgency: 'Medium',
    status: 'Approved',
    time: '2h ago'
  },
  {
    id: 'FLD-3',
    from: 'Kwame Mensah (Clerk · Team Alpha)',
    type: 'Damaged Stock Write-off',
    text: '1 wiper blade assembly bent during customer handling in aisle 4. Proposing write-off.',
    urgency: 'Low',
    status: 'Pending',
    time: '3h ago'
  }
];

export const INITIAL_AI_TICKETS = [
  {
    id: 'AI-TKT-201',
    title: 'High Stockout Risk: Premium Oil Filter',
    severity: 'Critical',
    scope: 'Storewide',
    impact: 'Estimated loss of $380/week if stock depleted',
    recommendation: 'Auto-reorder 36 units from primary distributor. Average lead time: 48h.',
    status: 'Open'
  },
  {
    id: 'AI-TKT-202',
    title: 'Team Alpha vs Team Beta MoMo Adoption Gap',
    severity: 'Warning',
    scope: 'Team Beta',
    impact: 'Team Beta has 24% higher cash transactions, increasing end-of-day register recount time.',
    recommendation: 'Incentivize MoMo tap-to-pay QR presentation for Evening Shift.',
    status: 'Investigating'
  },
  {
    id: 'AI-TKT-203',
    title: 'Price Elasticity Opportunity: Brake Pads',
    severity: 'Opportunity',
    scope: 'Storewide',
    impact: 'Demand rose 34% with zero customer price friction.',
    recommendation: 'Recommended markup increase from 28% to 33% (+$2.50 margin per unit).',
    status: 'Resolved'
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Marc Traoré',
    role: 'Manager 1',
    team: 'Team Alpha',
    text: 'Morning Team Alpha! Please focus on checking brake pad inventory before noon rush.',
    time: '08:15',
    self: false
  },
  {
    id: 'msg-2',
    sender: 'Amara Okonkwo',
    role: 'Clerk',
    team: 'Team Alpha',
    text: 'Understood Manager Marc! Already started counting Shelf A2.',
    time: '08:20',
    self: true
  },
  {
    id: 'msg-3',
    sender: 'Kwame Mensah',
    role: 'Clerk',
    team: 'Team Alpha',
    text: 'Customer here wants to know if we have Toyota Corolla 2018 oil filters.',
    time: '09:05',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop',
    self: false
  },
  {
    id: 'msg-4',
    sender: 'Marc Traoré',
    role: 'Manager 1',
    team: 'Team Alpha',
    isVoice: true,
    audioDuration: '0:14',
    text: 'Voice note (0:14): Yes, 24 units in stock on Shelf A-3. Standard price $12.50.',
    time: '09:07',
    self: false
  }
];

export const INITIAL_PRICING_SETTINGS = {
  defaultMarkupPercent: 30,
  clerkCommissionRate: 3.5,
  approvalThreshold: 800
};
