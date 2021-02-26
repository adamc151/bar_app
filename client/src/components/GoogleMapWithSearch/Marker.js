import React from "react";
import "./Marker.css";

const Marker = (props) => {
  const { className, onClick, category } = props;

  return (
    <div className={`marker ${className} marker${category}`} onClick={onClick} />
  );
};

export default Marker;
