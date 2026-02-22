import { useEffect, useRef } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const usePersistence = () => {
  const { layout, loadLayout, saveLayout, selectedCategory } = useDashboardStore();
  const isInitialMount = useRef(true);

  // Load layout on mount
  useEffect(() => {
    loadLayout();

    // Check if there's a saved category
    const savedCategory = localStorage.getItem('dashboard-selected-category');
    if (savedCategory) {
      useDashboardStore.getState().setSelectedCategory(savedCategory);
    }
  }, [loadLayout]);

  // Auto-save on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    saveLayout();
    localStorage.setItem('dashboard-selected-category', selectedCategory);
  }, [layout, saveLayout, selectedCategory]);
};
