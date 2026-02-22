import { useState, useEffect, useMemo } from 'react';
import { type Product } from '../types/product';
import { fetchAllProducts } from '../api/products.api';
import { useDashboardStore } from '../store/dashboardStore';

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllProducts();
        setAllProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  const products = useMemo(() => {
    if (selectedCategory === 'All Categories') {
      return allProducts;
    }
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  return { products, loading, error };
};
