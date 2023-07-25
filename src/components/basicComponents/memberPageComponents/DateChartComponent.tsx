import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../typeModel/member";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DateChartComponent: React.FC = () => {
  const [memberData] = useRecoilState<Member>(MemberDataState);

  const setData = () => {
    const currentYear = new Date().getFullYear().toString();
    let totalPrice = 0;

    const currentYearArr = memberData.accountList.filter(
      (data) =>
        String(data.price).includes("-") && data.date.includes(currentYear)
    );

    currentYearArr.forEach((data) => (totalPrice += Math.abs(data.price)));

    return 100 / totalPrice;
  };

  const perOnePercent = setData();

  const getMonthData = (month: string) => {
    let totalPrice = 0;
    const monthArr = memberData.accountList.filter(
      (data) => data.date.includes(month) && String(data.price).includes("-")
    );

    monthArr.forEach(
      (data) => (totalPrice += Math.abs(Number(String(data.price).slice(1))))
    );

    return totalPrice * perOnePercent;
  };

  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "2023년 기간별 지출 비율",
        data: [
          getMonthData("Jan"),
          getMonthData("Feb"),
          getMonthData("Mar"),
          getMonthData("Apr"),
          getMonthData("May"),
          getMonthData("Jun"),
          getMonthData("Jul"),
          getMonthData("Aug"),
          getMonthData("Sep"),
          getMonthData("Oct"),
          getMonthData("Nov"),
          getMonthData("Dec"),
        ],
        backgroundColor: "#E3DEFE",
      },
    ],
  };

  return (
    <Bar
      options={{ maintainAspectRatio: false }}
      data={data}
      style={{ width: "700px", height: "350px" }}
    />
  );
};

export default DateChartComponent;
