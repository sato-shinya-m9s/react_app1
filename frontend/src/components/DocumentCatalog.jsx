import React, { useState } from 'react';
import './DocumentCatalog.css';

const DocumentCatalog = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const data = [
    { year: '令和5年度', number: '総総第XXX号', department: '〇〇局〇〇部〇〇課', title: '令和5年度 XXX執行に係るXXXXXXXXXX', date: '2023/09/14', duration: '5年' },
    { year: '令和5年度', number: '市総第XXX号', department: '〇〇局〇〇部〇〇課', title: 'XXXXXの適用に係る定期報告', date: '2023/11/27', duration: '3年' },
    // Additional dummy data entries
    { year: '令和4年度', number: '総総第001号', department: '〇〇局〇〇部〇〇課', title: '令和4年度 予算執行に係る報告', date: '2022/04/01', duration: '2年' },
    { year: '令和4年度', number: '市総第002号', department: '〇〇局〇〇部〇〇課', title: '新規事業の開始に関する通知', date: '2022/05/15', duration: '1年' },
    { year: '令和3年度', number: '総総第003号', department: '〇〇局〇〇部〇〇課', title: '令和3年度 決算報告', date: '2021/06/20', duration: '4年' },
    { year: '令和3年度', number: '市総第004号', department: '〇〇局〇〇部〇〇課', title: '事業計画の変更について', date: '2021/07/30', duration: '3年' },
    { year: '令和2年度', number: '総総第005号', department: '〇〇局〇〇部〇〇課', title: '令和2年度 事業報告', date: '2020/08/10', duration: '5年' },
    { year: '令和2年度', number: '市総第006号', department: '〇〇局〇〇部〇〇課', title: '新規プロジェクトの提案', date: '2020/09/25', duration: '2年' },
    { year: '令和1年度', number: '総総第007号', department: '〇〇局〇〇部〇〇課', title: '令和1年度 予算案', date: '2019/10/05', duration: '1年' },
    { year: '令和1年度', number: '市総第008号', department: '〇〇局〇〇部〇〇課', title: '事業計画の承認', date: '2019/11/15', duration: '3年' },
    { year: '平成31年度', number: '総総第009号', department: '〇〇局〇〇部〇〇課', title: '平成31年度 決算報告', date: '2018/12/20', duration: '4年' },
    { year: '平成31年度', number: '市総第010号', department: '〇〇局〇〇部〇〇課', title: '新規事業の開始に関する通知', date: '2018/01/30', duration: '2年' },
    { year: '平成30年度', number: '総総第011号', department: '〇〇局〇〇部〇〇課', title: '平成30年度 事業報告', date: '2017/02/10', duration: '5年' },
    { year: '平成30年度', number: '市総第012号', department: '〇〇局〇〇部〇〇課', title: '新規プロジェクトの提案', date: '2017/03/25', duration: '1年' },
    { year: '平成29年度', number: '総総第013号', department: '〇〇局〇〇部〇〇課', title: '平成29年度 予算案', date: '2016/04/05', duration: '3年' },
    { year: '平成29年度', number: '市総第014号', department: '〇〇局〇〇部〇〇課', title: '事業計画の承認', date: '2016/05/15', duration: '4年' },
    { year: '平成28年度', number: '総総第015号', department: '〇〇局〇〇部〇〇課', title: '平成28年度 決算報告', date: '2015/06/20', duration: '2年' },
    { year: '平成28年度', number: '市総第016号', department: '〇〇局〇〇部〇〇課', title: '新規事業の開始に関する通知', date: '2015/07/30', duration: '5年' },
    { year: '平成27年度', number: '総総第017号', department: '〇〇局〇〇部〇〇課', title: '平成27年度 事業報告', date: '2014/08/10', duration: '1年' },
    { year: '平成27年度', number: '市総第018号', department: '〇〇局〇〇部〇〇課', title: '新規プロジェクトの提案', date: '2014/09/25', duration: '3年' },
    { year: '平成26年度', number: '総総第019号', department: '〇〇局〇〇部〇〇課', title: '平成26年度 予算案', date: '2013/10/05', duration: '4年' },
    { year: '平成26年度', number: '市総第020号', department: '〇〇局〇〇部〇〇課', title: '事業計画の承認', date: '2013/11/15', duration: '2年' },
    { year: '平成25年度', number: '総総第021号', department: '〇〇局〇〇部〇〇課', title: '平成25年度 決算報告', date: '2012/12/20', duration: '5年' },
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
      <div className="control-panel">
        <button className="search-button">検索条件選択</button>
        <div className="right-controls">
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