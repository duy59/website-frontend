// components/AllGame.js
import React from 'react';
import Link from 'next/link';
import styles from '../../Games/styles.module.css'; 
export default function AllGame({ data, pageActive, pageQuantity, onClickPage, onPreviousPage, onNextPage }) {
    const getVisiblePages = () => {
        const visiblePages = [];
        const startPage = Math.max(0, pageActive - 2);
        const endPage = Math.min(pageQuantity - 1, pageActive + 2);
    
        for (let i = startPage; i <= endPage; i++) {
          visiblePages.push(i);
        }
    
        return visiblePages;
      };
    
      const visiblePages = getVisiblePages();
    
  return (
    <>
      <div className={styles.grid}>
        {data.map((item, index) => (
          <div key={index} className={styles.product_list}>
            <Link href={`games/${item.slug}/${item.game_id}`}>
              <div className={styles.product_item}>
                <div className={styles.product_image}>
                  {item.assets.length > 0 && (
                    <img src={`${item.img_path}${item.assets[0].name}`} alt="" />
                  )}
                </div>
                <h3 className={styles.product_title}>{item.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.Pagination}>
        <ul className={styles.paginationList}>
          <li
            onClick={onPreviousPage}
            className={`${pageActive === 0 ? styles.disabled : ''} ${styles.paginationItem}`}
          >
            <button className={styles.prevButton}>«</button>
          </li>
          {visiblePages.map((index) => (
            <li
              key={index}
              onClick={() => onClickPage(index)}
              className={`${index === pageActive ? styles.active : ''} ${styles.paginationItem}`}
            >
              <button>{index + 1}</button>
            </li>
          ))}
          <li
            onClick={onNextPage}
            className={`${pageActive === pageQuantity - 1 ? styles.disabled : ''} ${styles.paginationItem}`}
          >
            <button className={styles.nextButton}>»</button>
          </li>
        </ul>
      </div>
    </>
  );
}
