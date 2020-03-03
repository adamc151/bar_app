import React from "react";
import ListItem from "./ListItem";
import "./List.css";

const getList = (data, setSingleBar, onHover, carouselSlide, setCarouselSlide) => {
  if (data.length > 0) {

    return data.map((data, i) => {
      return <ListItem
        key={i}
        index={i}
        carouselSlide={carouselSlide}
        setCarouselSlide={setCarouselSlide}
        data={data}
        className="carouselCard"
        onClick={() => setSingleBar(data)}
        onHover={onHover}
      />
    });
  } else {
    return <ListItem data="" className="carouselCard" />;
  }
}

export default getList;
