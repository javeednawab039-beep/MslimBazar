export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
  discountPercent: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  bg: string;
  iconColor: string;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  quote: string;
  rating: number;
}
