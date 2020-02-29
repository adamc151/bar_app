import React from "react";
import ListItem from "./ListItem";
import "./List.css";

const getList = (data, setSingleBar, onHover) => {

  if (data.length > 0) {

    let tmpInactiveData =[];
    let tmpActiveData =[];

    data.map((item, i) =>{
      item.deals[0] && item.deals[0].category=='Inactive' ? tmpInactiveData.push(item) : tmpActiveData.push(item);
    });

    const tmpFinalData = tmpActiveData.concat(tmpInactiveData);

    return tmpFinalData.map((data, i) => {
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
