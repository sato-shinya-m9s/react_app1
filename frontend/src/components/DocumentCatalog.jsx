import React, { useState } from 'react';
import './DocumentCatalog.css';

const DocumentCatalog = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const data = Array.from({ length: 100 }, (_, index) => ({
    year: `令和${5 - Math.floor(index / 20)}年度`,
    number: `総総第${String(index + 1).padStart(3, '0')}号`,
    department: '〇〇局〇〇部〇〇課',
    title: `ダミータイトル${index + 1}`,
    date: `2023/${String((index % 12) + 1).padStart(2, '0')}/14`,
    duration: `${(index % 5) + 1}年`
  }));

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

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // エントリー数変更時に最初のページにリセット
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="document-catalog">
      <header className="header">
        <div className="header-logo">
          <span className="header-logo-icon"></span>
          <span className="header-logo-text">行政文書目録検索システム</span>
        </div>
        <nav className="header-nav">
          <span className="header-nav-item">行政文書情報提供システム</span>
        </nav>
      </header>
      <h1 className="main-title">行政文書目録</h1>
      <p className="main-description">行政文書目録をこちらで確認することができます。</p>
      <div className="control-panel">
        <button className="search-button">検索条件選択</button>
        <div className="right-controls">
          <div className="filter-section">
            <label htmlFor="filter-input" className="filter-label">絞り込み:</label>
            <input id="filter-input" className="filter-input" />
          </div>
          <div className="dropdown-section">
            <select id="entries-dropdown" className="entries-dropdown" onChange={handleEntriesChange} value={entriesPerPage}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <label htmlFor="entries-dropdown" className="entries-label">件表示</label>
          </div>
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
          {currentEntries.map((item, index) => (
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
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          前
        </button>
        {[...Array(Math.ceil(sortedData.length / entriesPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
            {number + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(sortedData.length / entriesPerPage)}>
          次
        </button>
      </div>
      <footer className="footer">
        <span>©2024 NS Solutions Corporation</span>
      </footer>
    </div>
  );
};

export default DocumentCatalog;