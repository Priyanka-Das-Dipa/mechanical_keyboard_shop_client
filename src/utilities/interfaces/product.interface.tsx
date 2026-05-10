import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: StaticImageData;
  quantity: number;
  rating: number;
}
