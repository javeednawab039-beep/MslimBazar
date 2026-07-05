export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    landmark: string;
  };
  payment: {
    method: 'jazzcash' | 'easypaisa';
    payerNumber: string;
    transactionId: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending_verification' | 'confirmed' | 'shipped' | 'delivered';
}

const STORAGE_KEY = 'northwell_orders';

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const orders = getOrders().map((o) => (o.id === orderId ? { ...o, status } : o));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function generateOrderId() {
  return `NW-${Math.floor(100000 + Math.random() * 900000)}`;
}
