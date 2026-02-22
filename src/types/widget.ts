export type WidgetType = 'stat' | 'chart' | 'table';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  colSpan?: number;
  rowSpan?: number;
}

export type DashboardLayout = WidgetConfig[];
