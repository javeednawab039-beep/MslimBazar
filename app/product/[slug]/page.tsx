import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'NorthWell Store' };
  return {
    title: `${product.name} | NorthWell Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const related = product ? getRelatedProducts(product) : [];

  // If not found in the static catalog, the client component will check
  // this browser's locally-added products (see lib/custom-products.ts)
  // before showing a final "not found" state.
  return <ProductDetailClient product={product ?? null} related={related} slug={slug} />;
}
