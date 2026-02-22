import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useDashboard } from '../hooks/useDashboard';
import { FilterBar } from './FilterBar';
import { DraggableWidget } from './Widget';
import { StatWidget } from './StatWidget';
import { ChartWidget } from './ChartWidget';
import { TableWidget } from './TableWidget';
import '../Style/Dashboard.css';

export const Dashboard: React.FC = () => {
  const {
    products,
    loading,
    error,
    totalValue,
    categoryStock,
    topProducts,
    layout,
    setLayout,
  } = useDashboard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = layout.findIndex((items) => items.id === active.id);
      const newIndex = layout.findIndex((items) => items.id === over?.id);
      setLayout(arrayMove(layout, oldIndex, newIndex));
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard Data...</p>
      </div>
    );
  }

  if (error) {
    throw new Error(error);
  }

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'stat':
        return (
          <StatWidget
            id="total-inventory"
            title="TOTAL INVENTORY VALUE"
            value={totalValue}
            itemCount={products.length}
            categoryCount={Object.keys(categoryStock).length}
          />
        );
      case 'chart':
        return (
          <ChartWidget
            id="category-distribution"
            title="Category Distribution"
            data={categoryStock}
          />
        );
      case 'table':
        return (
          <TableWidget
            id="top-expensive-products"
            title="Top 5 Expensive Products"
            data={topProducts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Product Analytics</h1>
      </header>

      <FilterBar />

      <main className="dashboard-main">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="dashboard-grid">
            {Array.isArray(layout) ? (
              <SortableContext items={layout.map(w => w.id)} strategy={rectSortingStrategy}>
                {layout.map((widget) => (
                  <DraggableWidget
                    key={widget.id}
                    id={widget.id}
                    title={widget.title}
                    colSpan={widget.colSpan}
                    rowSpan={widget.rowSpan}
                  >
                    {renderWidgetContent(widget.type)}
                  </DraggableWidget>
                ))}
              </SortableContext>
            ) : (
              <div className="layout-error">
                <p>Unable to load dashboard layout. Please try refreshing or resetting the layout.</p>
              </div>
            )}
          </div>
        </DndContext>
      </main>
    </div>
  );
};
