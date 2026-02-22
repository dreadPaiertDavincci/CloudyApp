import { create } from 'zustand';
import { type WidgetConfig } from '../types/widget';

interface DashboardState {
  selectedCategory: string;
  layout: WidgetConfig[];
  setSelectedCategory: (category: string) => void;
  setLayout: (layout: WidgetConfig[]) => void;
  saveLayout: () => void;
  loadLayout: () => void;
}

const DEFAULT_LAYOUT: WidgetConfig[] = [
  { id: 'total-value', type: 'stat', title: 'Total Inventory Value', colSpan: 1 },
  { id: 'category-dist', type: 'chart', title: 'Category Distribution', colSpan: 2 },
  { id: 'top-expensive', type: 'table', title: 'Top 5 Expensive Products', colSpan: 3 },
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  selectedCategory: 'All Categories',
  layout: DEFAULT_LAYOUT,

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setLayout: (layout) => set({ layout }),

  saveLayout: () => {
    localStorage.setItem('dashboard-layout', JSON.stringify(get().layout));
  },

  loadLayout: () => {
    const saved = localStorage.getItem('dashboard-layout');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          set({ layout: parsed });
        } else {
          console.warn('Saved layout is not an array, falling back to default');
          set({ layout: DEFAULT_LAYOUT });
        }
      } catch (e) {
        console.error('Failed to load layout from localStorage', e);
        set({ layout: DEFAULT_LAYOUT });
      }
    } else {
      set({ layout: DEFAULT_LAYOUT });
    }
  },
}));
