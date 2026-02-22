import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const usePersistence = () => {
  const loadLayout = useDashboardStore((state) => state.loadLayout);
  
  useEffect(() => {
    loadLayout();
  }, [loadLayout]);
};
