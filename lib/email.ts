import { Order } from './orders';

const WEB3FORMS_ACCESS_KEY = '283c2a3f-514c-4fee-9a6b-03c4f299969f';

export async function sendOrderNotification(order: Order): Promise<boolean> {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Order Received - ${order.id}`,
        order_id: order.id,
        customer_name: order.customer.fullName,
        customer_email: order.customer.email,
        customer_phone: order.customer.phone,
        customer_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.postalCode}, ${order.customer.country}${order.customer.landmark ? ` (Landmark: ${order.customer.landmark})` : ''}`,
        payment_method: order.payment.method,
        payer_number: order.payment.payerNumber,
        transaction_id: order.payment.transactionId,
        items: order.items.map((i) => `${i.name} x${i.quantity} - $${i.price.toFixed(2)}`).join('\n'),
        total: `$${order.total.toFixed(2)}`,
      }),
    });
    return response.ok;
  } catch (err) {
    console.error('[NorthWell] Failed to send order email:', err);
    return false;
  }
}
