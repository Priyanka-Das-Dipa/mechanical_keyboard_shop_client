export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'MYR';

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
}

export interface ImageFile extends File {
  preview: string;
}