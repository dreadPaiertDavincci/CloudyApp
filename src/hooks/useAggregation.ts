import { useMemo } from 'react';
import { type Product } from '../types/product';
import { 
  getTotalInventoryValue, 
  getStockByCategory, 
  getTopExpensiveProducts 
} from '../utils/aggregation';

export const useAggregation = (products: Product[]) => {
  const totalValue = useMemo(() => getTotalInventoryValue(products), [products]);
  const categoryStock = useMemo(() => getStockByCategory(products), [products]);
  const topProducts = useMemo(() => getTopExpensiveProducts(products), [products]);

  return {
    totalValue,
    categoryStock,
    topProducts,
  };
};
