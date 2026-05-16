export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'MYR';

export interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  currency: Currency;
  quantity: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  image: string;           // URL or base64
  createdAt?: string;
  updatedAt?: string;
}
export interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  currency: Currency;
  rating: number;
  reviewCount: number;
  quantity: number;
  description: string;
  features: string[];
  image?: File | null;
}

export interface ImageFile extends File {
  preview: string;
}