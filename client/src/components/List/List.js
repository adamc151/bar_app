import React from "react";
import ListItem from "./ListItem";
import "./List.css";
import ViewportObserver from '../ViewportObserver/ViewportObserver';

const getList = (
  data,
  setSingleBar,
  onHover,
  carouselSlide,
  setCarouselSlide
) => {
  if (data.length > 0) {
    return data.map((data, i) => {
      return (
        <ViewportObserver>
          {intersected => {
            return (
              <ListItem
                key={i}
                index={i}
                carouselSlide={carouselSlide}
                setCarouselSlide={setCarouselSlide}
                data={data}
                className="carouselCard"
                onClick={() => setSingleBar(data)}
                onHover={onHover}
                isInViewport={intersected}
              />
            );
          }}
        </ViewportObserver>
      );
    });
  } else {
    return <ListItem data="" className="carouselCard" />;
  }
};

export default getList;
