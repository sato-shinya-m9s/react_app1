import React, { useState } from 'react';
import './DocumentCatalog.css';

const DocumentCatalog = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const data = [
    { year: '令和5年度', number: '総総第XXX号', department: '〇〇局〇〇部〇〇課', title: '令和5年度 XXX執行に係るXXXXXXXXXX', date: '2023/09/14', duration: '5年' },
    { year: '令和5年度', number: '市総第XXX号', department: '〇〇局〇〇部〇〇課', title: 'XXXXXの適用に係る定期報告', date: '2023/11/27', duration: '3年' },
  ];

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="document-catalog">
      <h1 className="main-title">行政文書目録</h1>
      <p className="main-description">行政文書目録をこちらで確認することができます。</p>
      <div className="filter-container">
        <button className="search-button">検索条件選択</button>
        <div className="filter-section">
          <label htmlFor="filter-input" className="filter-label">絞り込み:</label>
          <input id="filter-input" className="filter-input" />
        </div>
        <div className="dropdown-section">
          <label htmlFor="entries-dropdown" className="entries-label">表示:</label>
          <select id="entries-dropdown" className="entries-dropdown">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
      <table className="document-table">
        <thead>
          <tr>
            <th>
              作成年度
              <button onClick={() => requestSort('year')}>⇅</button>
            </th>
            <th>
              文書番号
              <button onClick={() => requestSort('number')}>⇅</button>
            </th>
            <th>
              文書有課
              <button onClick={() => requestSort('department')}>⇅</button>
            </th>
            <th>
              文書件名
              <button onClick={() => requestSort('title')}>⇅</button>
            </th>
            <th>
              提供・決裁完了年月日
              <button onClick={() => requestSort('date')}>⇅</button>
            </th>
            <th>
              保存期間
              <button onClick={() => requestSort('duration')}>⇅</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.number}</td>
              <td>{item.department}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentCatalog;