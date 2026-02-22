import React, { createContext, useContext } from 'react';
import '../../Style/Widget.css';

interface WidgetContextProps {
  id: string;
  title: string;
}

const WidgetContext = createContext<WidgetContextProps | undefined>(undefined);

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) throw new Error('useWidget must be used within a Widget');
  return context;
};

interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Widget: React.FC<WidgetProps> = ({ id, title, children, className = '', style }) => {
  return (
    <WidgetContext.Provider value={{ id, title }}>
      <div className={`widget-container ${className}`} style={style} id={id}>
        {children}
      </div>
    </WidgetContext.Provider>
  );
};
