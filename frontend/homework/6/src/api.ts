import type { Product, ProductsResponse } from './types'

const BASE_URL = 'https://dummyjson.com/products'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(BASE_URL)
  return handleResponse<ProductsResponse>(response)
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`)
  return handleResponse<Product>(response)
}
