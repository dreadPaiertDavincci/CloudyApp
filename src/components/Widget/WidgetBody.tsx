import React from 'react';

interface WidgetBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const WidgetBody: React.FC<WidgetBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`widget-body ${className}`}>
      {children}
    </div>
  );
};
