import { fetchJSON } from './client';
import { type ProductsResponse, type Category } from '../types/product';

export const fetchAllProducts = async (limit = 100, skip = 0) => {
  return fetchJSON<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
};

export const fetchProductsByCategory = async (category: string) => {
  return fetchJSON<ProductsResponse>(`/products/category/${category}`);
};

export const fetchCategories = async () => {
  return fetchJSON<Category[]>(`/products/categories`);
};
