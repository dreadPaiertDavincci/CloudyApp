import React from 'react';
import { useWidget } from './Widget';

interface WidgetHeaderProps {
  children?: React.ReactNode;
  showDragHandle?: boolean;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({ children, showDragHandle = true }) => {
  const { title } = useWidget();

  return (
    <div className="widget-header">
      <div className="widget-header-left">
        {showDragHandle && (
          <div className="drag-handle">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="2" r="1" fill="#D1D5DB"/>
              <circle cx="8" cy="2" r="1" fill="#D1D5DB"/>
              <circle cx="4" cy="6" r="1" fill="#D1D5DB"/>
              <circle cx="8" cy="6" r="1" fill="#D1D5DB"/>
              <circle cx="4" cy="10" r="1" fill="#D1D5DB"/>
              <circle cx="8" cy="10" r="1" fill="#D1D5DB"/>
            </svg>
          </div>
        )}
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-actions">
        {children}
      </div>
    </div>
  );
};
