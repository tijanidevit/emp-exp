import React from "react";

const Spinner = () => {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm text-light"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </span>{" "}
      &nbsp;
    </>
  );
};

export default Spinner;
