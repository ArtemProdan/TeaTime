import React, {useState} from "react";
import styles from './Paginator.module.css'

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 8}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let p = 1; p <= pagesCount; p++) {
        pages.push(p);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button className={styles.paginatorButton} onClick={() => {setPortionNumber(portionNumber - 1)}}>{" < "}</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <=rightPortionPageNumber)
            .map(p => {
            return (
                <span key={p} className={currentPage === p
                    ? styles.activePageNumber
                    : styles.pageNumber}
                      onClick={(e) => {
                          onPageChanged(p)
                      }}
                >{p}</span>)})
        }
        {portionCount > portionNumber && <button className={styles.paginatorButton} onClick={() => {setPortionNumber(portionNumber + 1)}}>{" > "}</button>}
    </div>
}

export default Paginator;