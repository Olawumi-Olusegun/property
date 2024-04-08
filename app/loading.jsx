"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "flex",
  alingItems: "center",
  justifyContent: "center",
  zIndex: 10,
  margin: "50px auto",
  height: "50px",
  width: "50px"
};


const LoadingPage = ({loading}) => {

  return (
    <>
    <div className="sweet-loading">
      <ClipLoader
        color={"#3b82f6"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    
    </>
  )
}

export default LoadingPage