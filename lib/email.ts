import { Order } from './orders';

// ============================================================================
// EMAIL SETUP REQUIRED — read this before going live
// ============================================================================
// This site cannot send real emails without an email service connected to it.
// EmailJS (https://www.emailjs.com) is the easiest free option because it
// sends email straight from the browser — no backend server needed.
//
// Steps to connect it to javeednawab039@gmail.com:
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service → choose Gmail → connect javeednawab039@gmail.com
// 3. Create an Email Template with variables matching the ones sent below
//    (order_id, customer_name, customer_phone, customer_address, payment_method,
//    payer_number, transaction_id, items, total)
// 4. Copy your Service ID, Template ID, and Public Key into the constants below
// 5. Run: npm install @emailjs/browser
// ============================================================================

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const STORE_OWNER_EMAIL = 'javeednawab039@gmail.com';

export async function sendOrderNotification(order: Order): Promise<boolean> {
  const isConfigured =
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  if (!isConfigured) {
    console.warn(
      '[NorthWell] Email is not configured yet. See lib/email.ts for setup steps. ' +
        'Order details were saved locally but no email was sent to ' +
        STORE_OWNER_EMAIL
    );
    return false;
  }

  try {
    // Dynamically imported so the app still builds even before the package is installed.
    const emailjs = await import('@emailjs/browser');
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: STORE_OWNER_EMAIL,
      order_id: order.id,
      customer_name: order.customer.fullName,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      customer_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.postalCode}, ${order.customer.country}${order.customer.landmark ? ` (Landmark: ${order.customer.landmark})` : ''}`,
      payment_method: order.payment.method,
      payer_number: order.payment.payerNumber,
      transaction_id: order.payment.transactionId,
      items: order.items.map((i) => `${i.name} x${i.quantity} - $${i.price.toFixed(2)}`).join('\n'),
      total: order.total.toFixed(2),
    }, { publicKey: EMAILJS_PUBLIC_KEY });
    return true;
  } catch (err) {
    console.error('[NorthWell] Failed to send order email:', err);
    return false;
  }
}
