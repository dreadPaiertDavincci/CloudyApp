import React from 'react';
import { Widget, WidgetHeader, WidgetBody } from './Widget';
import '../Style/StatWidget.css';

interface StatWidgetProps {
  id: string;
  title: string;
  value: number;
  itemCount: number;
  categoryCount: number;
  trend?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({ 
  id, 
  title, 
  value, 
  itemCount, 
  categoryCount,
  trend = '+5.2%' 
}) => {
  return (
    <Widget id={id} title={title}>
      <WidgetHeader />
      <WidgetBody>
        <div className="stat-content">
          <div className="stat-value-container">
            <div className="stat-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <h2 className="stat-value">${value.toLocaleString()}</h2>
          </div>
          
          <div className="stat-footer">
            <div className="stat-trend-badge">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 9L5 5L7 7L11 3" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 3H11V7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {trend}
            </div>
            <div className="stat-meta">
              <span>{itemCount.toLocaleString()} Items</span>
              <span className="meta-separator">•</span>
              <span>Across {categoryCount} categories</span>
            </div>
          </div>
          <p className="stat-comparison">vs. last month</p>
        </div>
      </WidgetBody>
    </Widget>
  );
};
