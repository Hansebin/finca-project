import React from "react";
import { nonmember } from "../../datas/nonmemberData";

const { expenditureDetails } = nonmember;

const StartPageAccountDetails: React.FC = () => {
  return (
    <div className="mt-12">
      <p className="mb-6 text-sm font-bold text-gray-002">내역 확인</p>
      <div className="flex flex-col gap-y-5">
        {expenditureDetails.map((expenditureDetail) => (
          <div
            key={expenditureDetail.memo}
            className="p-3.5 flex flex-row justify-between bg-re-color-001 rounded-md items-center"
          >
            <div className="flex flex-row items-center justify-center gap-x-2.5">
              <div className="flex flex-row w-10 h-10 items-center justify-center bg-re-color-003 rounded-full">
                <p className="text-white text-base font-bold">
                  {expenditureDetail.category[0]}
                </p>
              </div>
              <p className="font-bold text-xs text-gray-003">
                {expenditureDetail.category}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-5">
              <p className="text-base font-bold text-re-color-003">
                {expenditureDetail.memo}
              </p>
              <p className="font-bold text-xl text-re-color-004">
                -{expenditureDetail.amount.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartPageAccountDetails;
