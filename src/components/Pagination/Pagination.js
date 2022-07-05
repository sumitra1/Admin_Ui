import { getTotalNumberOfPages } from "../../utilities/Paging";
import PropTypes from "prop-types";

import styles from "./Pagination.module.css";


//define pagination
const PaginationOfPage = (props) => {
  const { pageNumber, deleteSelectedRows ,usersListLength, setNumberOfPage} = props;

 
 
  const navigateToPage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalNumberOfPages) {
      index = totalNumberOfPages;
    }
    setNumberOfPage(index);
  };
  const totalNumberOfPages = getTotalNumberOfPages(usersListLength);
  const changeThePage = (index) => {
    setNumberOfPage(index);
  };

  

  let pagesList = [];
  pagesList.push(
    <div
      key={-3}
      className={`${styles.page} ${pageNumber === 1 ? styles.disabled : ""}`}
      onClick={() => changeThePage(1)}
    >
      <i className="fas fa-angle-double-left"></i>
    </div>
  );
  pagesList.push(
    <div
      key={-2}
      className={`${styles.page} ${pageNumber === 1 ? styles.disabled : ""}`}
      onClick={() => navigateToPage(pageNumber - 1)}
    >
      <i className="fas fa-angle-left"></i>
    </div>
  );
  for (let i = 1; i <= totalNumberOfPages; i++) {
    pagesList.push(
      <div
        key={i}
        onClick={() => changeThePage(i)}
        className={`${styles.page} ${pageNumber=== i ? styles.selected : ""}`}
      >
        {i}
      </div>
    );
  }
  pagesList.push(
    <div
      key={-1}
      className={`${styles.page} ${pageNumber === totalNumberOfPages ? styles.disabled : ""}`}
      onClick={() => navigateToPage(pageNumber + 1)}
    >
      <i className="fas fa-angle-right"></i>
    </div>
  );
  pagesList.push(
    <div
      key={0}
      className={`${styles.page} ${pageNumber === totalNumberOfPages ? styles.disabled : ""}`}
      onClick={() => changeThePage(totalNumberOfPages)}
    >
      <i className="fas fa-angle-double-right"></i>
    </div>
  );

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.delete} onClick={() => deleteSelectedRows()}>
        Delete Selected
      </button>
      <div className={styles.pagination}>{pagesList}</div>
    </div>
  );
};

PaginationOfPage.propTypes = {
  usersListLength: PropTypes.number,
  setNumberOfPage: PropTypes.func,
  pageNumber: PropTypes.number,
  deleteSelectedRows: PropTypes.func,
};

export default PaginationOfPage;
