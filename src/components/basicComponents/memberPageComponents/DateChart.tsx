import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ClickNavState } from "../../../datas/recoilData";
import { ClickNav } from "../../../typeModel/member";
import DateChartComponent from "./DateChartComponent";

interface ActiveBtn {
  active: boolean;
}

const ChartBtn = styled.button<ActiveBtn>`
  width: 100px;
  height: 40px;

  font-size: 15px;
  color: white;
  font-weight: 700;

  background-color: ${(props) => (props.active ? "#7966e4" : "#E3DEFE")};
  border-radius: 7px;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #7966e4;
  }
`;

const DateChart: React.FC = () => {
  const [clickNav, setClickNav] = useRecoilState<ClickNav>(ClickNavState);

  return (
    <>
      <div className="flex flex-row gap-x-3.5">
        <ChartBtn
          onClick={() => {
            setClickNav("chart");
          }}
          active={clickNav === "chart"}
        >
          기간별
        </ChartBtn>
        <ChartBtn
          onClick={() => {
            setClickNav("categoryChart");
          }}
          active={clickNav === "category"}
        >
          카테고리별
        </ChartBtn>
      </div>
      <p className="text-3xl font-bold text-re-color-002 mt-10">
        {new Date().getFullYear()}년 지출 차트
      </p>
      <div className="w-full mt-10">
        <DateChartComponent />
      </div>
    </>
  );
};

export default DateChart;
