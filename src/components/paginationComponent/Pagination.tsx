import React, { useState } from "react";
import { useRecoilState } from "recoil";
import "./Pagination.css";
import ReactJsPagination from "react-js-pagination";
import { MemberDataState } from "../../datas/recoilData";
import { Member } from "../../typeModel/member";

const Pagination: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <ReactJsPagination
      activePage={page}
      itemsCountPerPage={4}
      totalItemsCount={memberData.accountList.length}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};

export default Pagination;
