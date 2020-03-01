import React from "react";
import ListItem from "./ListItem";
import "./List.css";

const getList = (data, setSingleBar, onHover) => {

  if (data.length > 0) {

    return data.map((data, i) => {
      return <ListItem
        key={i}
        index={i}
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
