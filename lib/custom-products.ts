import { Product } from '@/lib/types';

const STORAGE_KEY = 'northwell_custom_products';

export interface CustomProductInput {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  supplierLink: string;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getCustomProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCustomProduct(input: CustomProductInput): Product {
  const products = getCustomProducts();
  const discountPercent =
    input.originalPrice > input.price
      ? Math.round(((input.originalPrice - input.price) / input.originalPrice) * 100)
      : 0;

  const product: Product = {
    id: `custom-${Date.now()}`,
    slug: `${slugify(input.name)}-${Date.now().toString(36)}`,
    name: input.name,
    description: input.description,
    longDescription: input.description,
    image: input.image,
    images: [input.image],
    category: input.category,
    price: input.price,
    originalPrice: input.originalPrice,
    rating: 5,
    reviewCount: 0,
    stock: 'in-stock',
    discountPercent,
  };

  products.unshift(product);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  // Store the supplier link separately, keyed by product id, so it's never
  // shown to customers but is available to you when placing supplier orders.
  const supplierLinks = JSON.parse(window.localStorage.getItem('northwell_supplier_links') || '{}');
  supplierLinks[product.id] = input.supplierLink;
  window.localStorage.setItem('northwell_supplier_links', JSON.stringify(supplierLinks));

  return product;
}

export function deleteCustomProduct(id: string) {
  const products = getCustomProducts().filter((p) => p.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getCustomProductBySlug(slug: string): Product | undefined {
  return getCustomProducts().find((p) => p.slug === slug);
}

export function getSupplierLink(productId: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const supplierLinks = JSON.parse(window.localStorage.getItem('northwell_supplier_links') || '{}');
    return supplierLinks[productId];
  } catch {
    return undefined;
  }
}
