import React from "react";
import "./Marker.css";

const Marker = props => {
  const { className, style, lat, lng, onClick } = props;

  return (
    <div
      className={`marker ${className}`}
      lat={lat}
      lng={lng}
      style={style}
      onClick={onClick}
    />
  );
};

export default Marker;
