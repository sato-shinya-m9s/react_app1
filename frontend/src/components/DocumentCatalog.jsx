import React, { useState, useMemo } from 'react';
import './DocumentCatalog.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const yearOptions = [
    { era: '平成', year: 1 },
    { era: '平成', year: 2 },
    { era: '平成', year: 3 },
    { era: '平成', year: 4 },
    { era: '平成', year: 5 },
    { era: '平成', year: 6 },
    { era: '平成', year: 7 },
    { era: '平成', year: 8 },
    { era: '平成', year: 9 },
    { era: '平成', year: 10 },
    { era: '平成', year: 11 },
    { era: '平成', year: 12 },
    { era: '平成', year: 13 },
    { era: '平成', year: 14 },
    { era: '平成', year: 15 },
    { era: '平成', year: 16 },
    { era: '平成', year: 17 },
    { era: '平成', year: 18 },
    { era: '平成', year: 19 },
    { era: '平成', year: 20 },
    { era: '平成', year: 21 },
    { era: '平成', year: 22 },
    { era: '平成', year: 23 },
    { era: '平成', year: 24 },
    { era: '平成', year: 25 },
    { era: '平成', year: 26 },
    { era: '平成', year: 27 },
    { era: '平成', year: 28 },
    { era: '平成', year: 29 },
    { era: '平成', year: 30 },
    { era: '平成', year: 31 },
    { era: '令和', year: 1 },
    { era: '令和', year: 2 },
    { era: '令和', year: 3 },
    { era: '令和', year: 4 },
    { era: '令和', year: 5 },
    { era: '令和', year: 6 },
    { era: '令和', year: 7 },
  ].reverse();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">検索条件選択</h2>
        <form className="search-form">
          <div className="form-group">
            <label>キーワード（AND条件）</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>キーワード（OR条件）</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>作成年度</label>
            <select>
              <option value=""></option>
              {yearOptions.map((option, index) => (
                <option key={index} value={`${option.era}${option.year}`}>
                  {option.era}{option.year}年
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>文書保有課</label>
            <div className="sub-group">
              <label>局</label>
              <select></select>
              <label>部</label>
              <select></select>
              <label>課</label>
              <select></select>
            </div>
          </div>
          <div className="form-group">
            <label>文書分類</label>
            <div className="sub-group">
              <label>大分類</label>
              <select></select>
              <label>中分類</label>
              <select></select>
              <label>小分類</label>
              <select></select>
            </div>
          </div>
          <div className="form-group">
            <label>供覧・決裁完了年月</label>
            <div className="sub-group">
              <input type="text" />
              <span>年</span>
              <input type="text" />
              <span>月</span>
              <span>から</span>
              <input type="text" />
              <span>年</span>
              <input type="text" />
              <span>月</span>
              <span>まで</span>
            </div>
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>閉じる</button>
            <button type="submit">検索</button>
            <button type="reset">クリア</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DocumentCatalogPresentational = ({
  toggleModal,
  isModalOpen,
  filterText,
  handleFilterChange,
  entriesPerPage,
  handleEntriesChange,
  currentEntries,
  requestSort,
  currentPage,
  handlePageChange,
  pageNumbers,
  totalPages
}) => {
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
        <button className="search-button" onClick={toggleModal}>検索条件選択</button>
        <div className="right-controls">
          <div className="filter-section">
            <label htmlFor="filter-input" className="filter-label">絞り込み:</label>
            <input 
              id="filter-input" 
              className="filter-input" 
              value={filterText} 
              onChange={handleFilterChange} 
            />
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
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && handlePageChange(number)}
            className={currentPage === number ? 'active' : (number === '...' ? 'ellipsis' : '')}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          次
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
      <footer className="footer">
        <span>©2024 NS Solutions Corporation</span>
      </footer>
    </div>
  );
};

const DocumentCatalog = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const data = Array.from({ length: 100 }, (_, index) => ({
    year: `令和${5 - Math.floor(index / 20)}年度`,
    number: `総総第${String(index + 1).padStart(3, '0')}号`,
    department: '〇〇局〇〇部〇〇課',
    title: `ダミータイトル${index + 1}`,
    date: `2023/${String((index % 12) + 1).padStart(2, '0')}/14`,
    duration: `${(index % 5) + 1}年`
  }));

  const sortedData = useMemo(() => {
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

  const filteredData = useMemo(() => {
    return sortedData.filter(item => item.title.includes(filterText));
  }, [sortedData, filterText]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <DocumentCatalogPresentational
      toggleModal={toggleModal}
      isModalOpen={isModalOpen}
      filterText={filterText}
      handleFilterChange={handleFilterChange}
      entriesPerPage={entriesPerPage}
      handleEntriesChange={handleEntriesChange}
      currentEntries={currentEntries}
      requestSort={requestSort}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      pageNumbers={pageNumbers}
      totalPages={totalPages}
    />
  );
};

export default DocumentCatalog;