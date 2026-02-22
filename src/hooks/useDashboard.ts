import { useProducts } from './useProducts';
import { useAggregation } from './useAggregation';
import { usePersistence } from './usePersistence';
import { useDashboardStore } from '../store/dashboardStore';

export const useDashboard = () => {
  usePersistence();
  const { products, loading, error } = useProducts();
  const aggregations = useAggregation(products);
  const { layout, setLayout, saveLayout, selectedCategory, setSelectedCategory } = useDashboardStore();

  return {
    products,
    loading,
    error,
    ...aggregations,
    layout,
    setLayout,
    saveLayout,
    selectedCategory,
    setSelectedCategory,
  };
};
