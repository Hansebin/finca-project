import React from "react";
import { useRecoilState } from "recoil";
import { MemberDataState } from "../../../datas/recoilData";
import { Member } from "../../../entities/member.entity";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChartComponent: React.FC = () => {
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

  const getCategoryData = (category: string) => {
    let totalPrice = 0;
    const monthArr = memberData.accountList.filter(
      (data) =>
        data.category.includes(category) && String(data.price).includes("-")
    );

    monthArr.forEach(
      (data) => (totalPrice += Math.abs(Number(String(data.price).slice(1))))
    );

    return totalPrice * perOnePercent;
  };

  const data = {
    labels: ["식사", "여가", "쇼핑", "기타"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          getCategoryData("식사"),
          getCategoryData("여가"),
          getCategoryData("쇼핑"),
          getCategoryData("기타") + getCategoryData("충전"),
        ],
        backgroundColor: ["#3790F3", "#B4DD7F", "#EC5564", "#FFCA75"],
        borderColor: ["white"],
        borderWidth: 5,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CategoryChartComponent;
