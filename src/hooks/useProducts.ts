import { useState, useEffect } from 'react';
import { type Product } from '../types/product';
import { fetchAllProducts, fetchProductsByCategory } from '../api/products.api';
import { useDashboardStore } from '../store/dashboardStore';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedCategory = useDashboardStore((state) => state.selectedCategory);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (selectedCategory === 'All Categories') {
          data = await fetchAllProducts();
        } else {
          data = await fetchProductsByCategory(selectedCategory);
        }
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return { products, loading, error };
};
