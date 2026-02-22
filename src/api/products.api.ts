import { fetchJSON } from './client';
import { type ProductsResponse, type Category } from '../types/product';

export const fetchAllProducts = async () => {
  return fetchJSON<ProductsResponse>(`/products?limit=0`);
};

export const fetchCategories = async () => {
  return fetchJSON<Category[]>(`/products/categories`);
};
