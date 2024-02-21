import React from "react";
import { LoadingShape } from "react-rainbow-components";

const style = {
  maxWidth: "400px",
  minWidth: "300px",
  display: "flex",
  padding: "20px",
};

const imageStyle = {
  width: "100px",
};

function LoaderComp() {
  return (
    <div>
      <LoadingShape />
    </div>
  );
}

export default LoaderComp;
