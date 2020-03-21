import React from "react";
import ListItem from "./ListItem";
import "./List.css";
import ViewportObserver from '../ViewportObserver/ViewportObserver';

const getList = (
  data,
  setSingleBar,
  onHover,
  carouselSlide,
  setCarouselSlide,
  hoverCoordinates
) => {
  if (data.length > 0) {
    return data.map((data, i) => {

      const { location } = data;
      const { coordinates } = location;
      const isSelected = hoverCoordinates && hoverCoordinates[0] === coordinates[0] && hoverCoordinates[1] === coordinates[1];

      return (
        <ViewportObserver>
          {intersected => {
            return (
              <ListItem
                key={i}
                index={i}
                carouselSlide={carouselSlide}
                data={data}
                className="carouselCard"
                onClick={() => setSingleBar(data)}
                onHover={onHover}
                isInViewport={intersected}
                isSelected={isSelected}
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
