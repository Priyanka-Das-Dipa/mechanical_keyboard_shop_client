import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  brand: z.string().min(2, 'Brand name is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'INR', 'MYR']),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;