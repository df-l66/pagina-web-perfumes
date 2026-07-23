export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  family: string;
  rating: number;
  isNew: boolean;
  outOfStock: boolean;
  type: string;
  linea?: string;
  image: string;
}
