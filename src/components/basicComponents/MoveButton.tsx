import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface OwnProps {
  page: string;
  to: string;
}

const Button = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  background-color: #7966e4;

  border-radius: 7px;

  margin-top: 59px;
  margin-left: calc((400px - 200px) / 2);
`;

const MoveButton: React.FC<OwnProps> = (props) => {
  return (
    <div>
      <Link to={props.to}>
        <Button>{props.page}</Button>
      </Link>
    </div>
  );
};

export default MoveButton;
