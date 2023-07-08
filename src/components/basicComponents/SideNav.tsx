import styled from "styled-components";

// styled-components
const WhiteButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: white;
  border-radius: 10px;

  font-size: 20px;
  font-weight: 700;
  color: #7966e4;

  user-select: none;
`;

const GrayButton = styled(WhiteButton)`
  background-color: #e8e8e8;

  color: white;
`;
// styled-components

const SideNav: React.FC = () => {
  return (
    <div>
      <p className="text-4xl font-bold text-re-color-002 mb-6">미리 보기</p>
      <div className="flex flex-col gap-y-6">
        <WhiteButton disabled>계좌</WhiteButton>
        <GrayButton disabled>가계부</GrayButton>
        <GrayButton disabled>지출차트</GrayButton>
      </div>
    </div>
  );
};

export default SideNav;
