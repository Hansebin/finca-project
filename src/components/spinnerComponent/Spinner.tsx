import React from "react";
import { FadeLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center z-100 bg-bg-color">
      <FadeLoader color="#7966E4" />
    </div>
  );
};

export default Spinner;
