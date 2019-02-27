import axios from 'axios';

//ACTION TYPES - used to label each action
export const DATA_FETCH_REQUEST = 'DATA_FETCH_REQUEST';
export const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const DATA_POST_REQUEST = 'DATA_POST_REQUEST';
export const DATA_POST_SUCCESS = 'DATA_POST_SUCCESS';

export const CENTER_MAP = 'CENTER_MAP';
export const SET_MILES = 'SET_MILES';


//ACTIONSSSS - these basically label the input argument
//Then the reducers can be like ...if(action.type == ADD_TRANSACTIONS){ do this }...else if(action.type == GET_TRANSACTIONS_IN_RANGE){ do this instead }...etc
export function fetchData(obj) {

  const { lat, long, miles } = obj

  return async (dispatch, getState) => {
    dispatch({type: DATA_FETCH_REQUEST});
    const values = await axios.get('/api/locations', { params: { long: long, lat: lat, miles: miles } });
    return dispatch({type: DATA_FETCH_SUCCESS, payload: values.data});
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

export function setMiles(miles) {
  return {type: SET_MILES, payload: { miles }};
}
