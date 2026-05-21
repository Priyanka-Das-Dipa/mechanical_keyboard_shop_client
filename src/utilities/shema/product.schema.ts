import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),

  brand: z.string().min(2, "Brand name is required"),

  price: z.coerce.number().min(0.01),

  currency: z.enum(["USD", "EUR", "GBP", "INR", "MYR"]),

  rating: z.coerce.number().min(0).max(5),

  reviewCount: z.coerce.number().min(0),

  quantity: z.coerce.number().min(0),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  features: z
    .array(z.string().min(1))
    .min(1, "At least one feature is required"),
});

/**
 * FORM INPUT TYPE
 */
export type ProductFormInput = z.input<typeof productSchema>;

/**
 * FINAL VALIDATED TYPE
 */
export type ProductFormData = z.output<typeof productSchema>;