import axios from 'axios';

//ACTION TYPES - used to label each action
export const DATA_FETCH_REQUEST = 'DATA_FETCH_REQUEST';
export const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const DATA_POST_REQUEST = 'DATA_POST_REQUEST';
export const DATA_POST_SUCCESS = 'DATA_POST_SUCCESS';
export const CENTER_MAP = 'CENTER_MAP';
export const SET_MILES = 'SET_MILES';
export const SET_TIME_FILTER = 'SET_TIME_FILTER';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_HOVER_COORDINATES = 'SET_HOVER_COORDINATES';


//ACTIONSSSS - these basically label the input argument
//Then the reducers can be like ...if(action.type == ADD_TRANSACTIONS){ do this }...else if(action.type == GET_TRANSACTIONS_IN_RANGE){ do this instead }...etc
export function fetchData(obj) {

  const { lat, long, miles, timeFilter } = obj

  return async (dispatch, getState) => {
    dispatch({type: DATA_FETCH_REQUEST});
    const values = await axios.get('/api/locations', { params: { long: long, lat: lat, miles: miles } });
    const filteredValues = await fetchAndFilter(timeFilter, values);
    return dispatch({type: DATA_FETCH_SUCCESS, payload: filteredValues});
  }

}

function fetchAndFilter(timeFilter, values){

    console.log(`time filter ${timeFilter}`);

    switch(timeFilter){
        case 'Now':
            return nowFilter(values.data);
        case 'Upcoming':
            return upcomingFilter(values.data);
        case 'All':
            return values.data;
        default:
            return values.data;
    }
}

export function postData(obj) {

  return async (dispatch, getState) => {
    dispatch({type: DATA_POST_REQUEST});

    const response = await axios.post('/api/bar', obj);

    console.log('response', response);
    return dispatch({type: DATA_POST_SUCCESS });
  }

}

export function centerMap(lat, lng) {
  return {type: CENTER_MAP, payload: { lat, lng }};
}

export function setHoverCoordinates(lat, lng) {
  return {type: SET_HOVER_COORDINATES, payload: { lat, lng }};
}

export function setMiles(miles) {
  return {type: SET_MILES, payload: { miles }};
}

export function setTimeFilter(timeFilter) {
  return {type: SET_TIME_FILTER, payload: { timeFilter }};
}

function nowFilter(data) {

  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var day = d.getDay();
  m < 10 ? m = `${0}${m}` : null ;

  var time = parseInt(`${h}${m}`);

  var nowBlob = data.filter( (item) => {

    var dealsFiltered = [];

    item.deals.map((deal) => {

      var st = deal.startTime.replace(':','');
      var et = deal.endTime.replace(':','');

      if( st <= time && et > time && deal.weekDays.includes(day) ) {
        dealsFiltered.push(deal);
      }
    });

    item.deals = dealsFiltered;

    if(item.deals[0]){
      return item;
    }

  });

  return nowBlob;
}

function upcomingFilter(data) {

  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var day = d.getDay();
  m < 10 ? m = `${0}${m}` : null ;

  var time = parseInt(`${h}${m}`);

  var upcomingBlob = data.filter( (item) => {

    var dealsFiltered = [];

    item.deals.map((deal) => {

      var st = deal.startTime.replace(':','');
      var et = deal.endTime.replace(':','');

      if( st > time && et > time && deal.weekDays.includes(day) ) {
        dealsFiltered.push(deal);
      }
    });

    item.deals = dealsFiltered;

    if(item.deals[0]){
      return item;
    }

  });

  return upcomingBlob;
}


export function setCurrentLocation(lat, lng) {
  return {type: SET_CURRENT_LOCATION, payload: { lat, lng }};
}
