export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  quantity: number;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  quantity: number;
  features: string[];
}
