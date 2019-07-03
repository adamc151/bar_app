import React from "react";
import "./Marker.css";

const Marker = props => {
  const { className, style, lat, lng, onClick, category } = props;

  return (
    <div
      className={`marker ${className} marker${category}`}
      lat={lat}
      lng={lng}
      style={style}
      onClick={onClick}
    />
  );
};

export default Marker;
