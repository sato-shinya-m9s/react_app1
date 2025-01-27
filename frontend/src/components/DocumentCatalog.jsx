// /frontend/src/components/DocumentCatalog.jsx
import React from 'react';
import './DocumentCatalog.css';

const DocumentCatalog = () => {
  return (
    <div className="document-catalog">
      <h1 className="main-title">行政文書目録</h1>
      <p className="main-description">行政文書目録をこちらで確認することができます。</p>
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
      <table className="document-table">
        <thead>
          <tr>
            <th>作成年度</th>
            <th>文書番号</th>
            <th>文書有課</th>
            <th>文書件名</th>
            <th>提供・決裁完了年月日</th>
            <th>保存期間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>令和5年度</td>
            <td>総総第XXX号</td>
            <td>〇〇局〇〇部〇〇課</td>
            <td>令和5年度 XXX執行に係るXXXXXXXXXX</td>
            <td>2023/09/14</td>
            <td>5年</td>
          </tr>
          <tr>
            <td>令和5年度</td>
            <td>市総第XXX号</td>
            <td>〇〇局〇〇部〇〇課</td>
            <td>XXXXXの適用に係る定期報告</td>
            <td>2023/11/27</td>
            <td>3年</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DocumentCatalog;