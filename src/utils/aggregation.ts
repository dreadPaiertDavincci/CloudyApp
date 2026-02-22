import { type Product } from '../types/product';

export const getTotalInventoryValue = (products: Product[]) => {
  return products.reduce((acc, p) => acc + (p.price * p.stock), 0);
};

export const getStockByCategory = (products: Product[]) => {
  return products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock;
    return acc;
  }, {} as Record<string, number>);
};

export const getTopExpensiveProducts = (products: Product[], limit = 5) => {
  return [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
};

export const getStatusLabel = (stock: number) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 20) return 'Low Stock';
  return 'In Stock';
};
