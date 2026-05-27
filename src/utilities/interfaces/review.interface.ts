import { StaticImageData } from "next/image";

export interface Review {
  id: number;
  name: string;
  handle: string;
  avatar: StaticImageData | string;
  rating: number;
  title: string;
  review: string;
  product: string;
  verified: boolean;
  date: string;
}

export interface Brand {
  name: string;
  img: StaticImageData | string;
}