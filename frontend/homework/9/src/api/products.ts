import type { Product } from "../types/product";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE_URL:", import.meta.env.VITE_API_BASE_URL);


export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};


export const searchProductsAPi= async (query : string): Promise<Product[]> => {
  const res= await fetch(`${BASE_URL}/search?q=${query}`);
  if(!res.ok) throw new Error("Search failed");
  const data=await res.json();
  return data.products;

}