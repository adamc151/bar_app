import axios from "axios";

//ACTION TYPES - used to label each action
export const DATA_FETCH_REQUEST = "DATA_FETCH_REQUEST";
export const DATA_FETCH_SUCCESS = "DATA_FETCH_SUCCESS";
export const DATA_POST_REQUEST = "DATA_POST_REQUEST";
export const DATA_POST_SUCCESS = "DATA_POST_SUCCESS";
export const SET_CENTER_COORDINATES = "SET_CENTER_COORDINATES";
export const SET_MILES = "SET_MILES";
export const SET_TIME_FILTER = "SET_TIME_FILTER";
export const SET_USER_COORDINATES = "SET_USER_COORDINATES";
export const SET_HOVER_COORDINATES = "SET_HOVER_COORDINATES";
export const SET_CAROUSEL_SLIDE = "SET_CAROUSEL_SLIDE";

//ACTIONSSSS - these basically label the input argument
//Then the reducers can be like ...if(action.type == ADD_TRANSACTIONS){ do this }...else if(action.type == GET_TRANSACTIONS_IN_RANGE){ do this instead }...etc
export function fetchData(obj) {
  const { lat, long, miles, timeFilter } = obj;

  return async (dispatch, getState) => {
    dispatch({ type: DATA_FETCH_REQUEST });
    const values = await axios.get("/api/locations", {
      params: { long: long, lat: lat, miles: miles }
    });
    const filteredValues = await categoriseData(values.data);
    return dispatch({ type: DATA_FETCH_SUCCESS, payload: filteredValues });
  };
}

export function postData(obj) {
  return async (dispatch, getState) => {
    dispatch({ type: DATA_POST_REQUEST });
    const response = await axios.post("/api/bar", obj);
    return dispatch({ type: DATA_POST_SUCCESS });
  };
}

export function setCenterCoordinates(coordinates) {
  return { type: SET_CENTER_COORDINATES, payload: coordinates };
}

export function setCarouselSlide(index) {
  return { type: SET_CAROUSEL_SLIDE, payload: index };
}

export function setHoverCoordinates(coordinates) {
  return { type: SET_HOVER_COORDINATES, payload: coordinates };
}

export function setMiles(miles) {
  return { type: SET_MILES, payload: { miles } };
}

export function setTimeFilter(timeFilter) {
  return { type: SET_TIME_FILTER, payload: { timeFilter } };
}


function categoriseData(data) {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var day = d.getDay();
  m < 10 ? (m = `${0}${m}`) : null;

  var time = parseInt(`${h}${m}`);

  var categorisedBlob = data.filter(item => {
    var final = [];

    item.deals.map(deal => {

      if(deal.weekDays.includes(day)){

          var st = deal.startTime.replace(":", "");
          var et = deal.endTime.replace(":", "");

          if (st <= time && et > time && deal.weekDays.includes(day)) {
            deal.category = 'Now';
          }
          else if (st > time && et > time && deal.weekDays.includes(day)) {
            deal.category = 'Upcoming';
          }
          else{
            deal.category = 'Inactive';
          }
          final.push(deal);
        }
    });

    item.deals = final;

    if (item.deals[0]) {
      return item;
    }
  });

  return categorisedBlob;
}

export function setUserCoordinates(coordinates) {
  return { type: SET_USER_COORDINATES, payload: coordinates };
}
