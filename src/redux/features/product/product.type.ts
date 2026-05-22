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

export interface ProductsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };

  data: Product[];
}

export interface GetProductsQuery {
  searchTerm?: string;
   
  rating?: number;

  brand?: string;

  minPrice?: number;

  maxPrice?: number;

  page?: number;

  limit?: number;

  sortBy?: "createdAt" | "price" | "rating";

  order?: "asc" | "desc";
  
  applyFilter?: boolean;
}
