import React from 'react';
import { type Product } from '../types/product';
import { Widget, WidgetHeader, WidgetBody } from './Widget';
import { getStatusLabel } from '../utils/aggregation';
import '../Style/TableWidget.css';

interface TableWidgetProps {
  id: string;
  title: string;
  data: Product[];
}

export const TableWidget: React.FC<TableWidgetProps> = ({ id, title, data }) => {
  const exportCSV = () => {
    const headers = ['ID', 'Product Name', 'Brand', 'Price', 'Stock', 'Status'];
    const rows = data.map(p => [
      `#${p.id.toString().padStart(3, '0')}`,
      p.title,
      p.brand,
      `$${p.price.toFixed(2)}`,
      p.stock,
      getStatusLabel(p.stock)
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'top_products.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Widget id={id} title={title}>
      <WidgetHeader>
        <button className="export-button" onClick={exportCSV}>Export CSV</button>
      </WidgetHeader>
      <WidgetBody>
        <p className="table-subtitle">Highest value items in current inventory</p>
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT NAME</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td className="col-id">#{p.id.toString().padStart(3, '0')}</td>
                  <td className="col-name">
                    <div className="product-info">
                      <img src={p.thumbnail} alt={p.title} className="product-thumb" />
                      <span>{p.title}</span>
                    </div>
                  </td>
                  <td>{p.brand}</td>
                  <td className="col-price">${p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span className={`status-badge ${getStatusLabel(p.stock).toLowerCase().replace(' ', '-')}`}>
                      {getStatusLabel(p.stock)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetBody>
    </Widget>
  );
};
