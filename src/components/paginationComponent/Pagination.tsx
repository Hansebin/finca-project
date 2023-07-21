import React from "react";
import ReactJsPagination from "react-js-pagination";
import "../../pagination.css";

interface PaginationProps {
  activePage: number;
  totalItemsCount: number;
  itemsCountPerPage: number;
  pageRangeDisplayed: number;
  onChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  activePage,
  totalItemsCount,
  itemsCountPerPage,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <div className="paginationBox">
      <ReactJsPagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        prevPageText="‹"
        nextPageText="›"
        onChange={onChange}
      />
    </div>
  );
};

export default Pagination;
