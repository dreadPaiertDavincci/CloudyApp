import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Widget, WidgetHeader, WidgetBody } from './Widget';
import '../Style/ChartWidget.css';

interface ChartWidgetProps {
  id: string;
  title: string;
  data: Record<string, number>;
}

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="end"
        fill="#6b7280"
        fontSize={10}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const ChartWidget: React.FC<ChartWidgetProps> = ({ id, title, data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

  const minWidth = Math.max(100, chartData.length * 60);

  return (
    <Widget id={id} title={title}>
      <WidgetHeader />
      <WidgetBody>
        <p className="chart-subtitle">Current stock levels per category</p>
        <div className="chart-container">
          <div className="chart-scroll-wrapper">
            <div style={{ width: '100%', minWidth: `${minWidth}px`, height: '100%' }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 65 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={<CustomTick />}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                    {chartData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </WidgetBody>
    </Widget>
  );
};
