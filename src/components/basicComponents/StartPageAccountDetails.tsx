import React from "react";
import { nonmember } from "../../datas/nonmemberData";

const { expenditureDetails } = nonmember;

const StartPageAccountDetails: React.FC = () => {
  return (
    <div className="mt-10">
      <p className="mb-5 text-sm font-bold text-gray-002">내역 확인</p>
      <div className="flex flex-col gap-y-3">
        {expenditureDetails.map((expenditureDetail) => (
          <div
            key={expenditureDetail.memo}
            className="p-3 flex flex-row justify-between bg-color-001 rounded-md items-center"
          >
            <div className="flex flex-row items-center justify-center gap-x-2">
              <div className="flex flex-row w-8 h-8 items-center justify-center bg-color-003 rounded-full">
                <p className="text-white text-base font-bold">
                  {expenditureDetail.category[0]}
                </p>
              </div>
              <p className="font-bold text-xs text-gray-003">
                {expenditureDetail.category}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-4">
              <p className="text-base font-bold text-color-003">
                {expenditureDetail.memo}
              </p>
              <p className="font-bold text-xl text-color-004">
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
