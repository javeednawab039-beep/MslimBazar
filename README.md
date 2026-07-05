# NorthWell Store — Frontend (Manual Payment Edition)

A Next.js 15 storefront for NorthWell Store with a manual JazzCash/EasyPaisa checkout flow,
an easy supplier-product-adding tool, and one-click social sharing.

## How the payment flow works

1. Customer adds products to cart and goes to Checkout.
2. Customer fills in their shipping info and picks **JazzCash** or **EasyPaisa**.
3. The site shows your account number and name:
   - JazzCash: `03225202822` — Nawab Khan
   - EasyPaisa: `03326310309` — Nawab Khan
4. Customer sends the payment manually in their own JazzCash/EasyPaisa app.
5. Customer enters the phone number they paid from + the transaction ID, and submits.
6. The order (customer info + payment info) is emailed to **javeednawab039@gmail.com**
   once you connect EmailJS (see below) — until then it's saved in the browser only.
7. You open your JazzCash/EasyPaisa app, match the sender number + amount from the
   email against what actually arrived, and confirm the order is genuine.
8. You then place the order with your supplier using the customer's shipping address.

**Why this can't be fully automatic:** JazzCash and EasyPaisa personal numbers don't expose
a public API for verifying incoming payments — that only exists for registered merchant/business
accounts. So matching payment-to-order will always need this one manual step (checking your wallet
app against the email you receive), unless you later register a JazzCash/EasyPaisa **business**
account and apply for their merchant API.

## Connecting real email notifications (5 minutes, free)

Right now, submitted orders are saved in the browser but no real email is sent yet — the app
tells you this in the browser console until you connect it. To make it real:

1. Create a free account at https://www.emailjs.com
2. Add an Email Service → choose Gmail → connect `javeednawab039@gmail.com`
3. Create an Email Template with these variables: `order_id`, `customer_name`, `customer_email`,
   `customer_phone`, `customer_address`, `payment_method`, `payer_number`, `transaction_id`,
   `items`, `total`
4. Open `lib/email.ts` and paste your Service ID, Template ID, and Public Key into the three
   constants at the top of the file
5. Done — orders will now email themselves to your Gmail automatically.

## How to add a new product (step by step, no backend needed)

1. Run the site (`npm run dev`) and go to **`/admin/products`**
2. Paste your supplier's product link (e.g. from CJ Dropshipping)
3. Fill in: product name, description, sale price, original price, an image URL, and category
4. Click **Add Product** — you instantly get a NorthWell Store link like
   `https://yourdomain.com/product/product-name-xxxxx`
5. Use the **Share buttons** right there to post it to Facebook, LinkedIn, or WhatsApp with one
   click, or copy the link to paste into your Instagram bio/story or YouTube description
6. When a customer opens that link, they land on your site, view the product, and can buy it
   the same way as any other product

**Current limitation:** products added this way are saved in your browser's local storage, so
right now they only show up on the device where you added them — a customer on a different phone
won't see it yet. To make products visible to everyone from any device (true "add once, share
anywhere"), you need one small shared database. The easiest free options:

- **Supabase** (https://supabase.com) — free tier, a few lines of code to swap `lib/custom-products.ts`
  from `localStorage` to a `products` table
- **Firebase Firestore** (https://firebase.google.com) — similar free tier, same idea

I can wire either of these in for you whenever you're ready — just say the word.

## What's real and fully working right now

- Cart & wishlist, persisted per-browser
- Shop search/filter/sort across both built-in and admin-added products
- Product detail pages with gallery, ratings, related products, and share buttons
- Manual JazzCash/EasyPaisa checkout with your real account details
- Every footer/nav link resolves — no dead links or placeholder pages

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Deploying to GitHub + Vercel

```bash
git init
git add .
git commit -m "Initial commit - NorthWell Store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/northwell-store.git
git push -u origin main
```

Then go to https://vercel.com, log in with GitHub, click **Add New Project**, select this repo,
and click **Deploy**. No extra configuration is needed — Vercel auto-detects Next.js.
