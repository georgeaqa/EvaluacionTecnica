export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  created_at: string;
  order_detail: Product[];
  total: number;
  status: string;
}

export interface User {
  id: number;
  name: string;
  password: string;
  created_at: string;
  type: string;
}
