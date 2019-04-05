import {
  DATA_FETCH_REQUEST,
  DATA_FETCH_SUCCESS,
  DATA_POST_REQUEST,
  DATA_POST_SUCCESS,
  SET_CENTER_COORDINATES,
  SET_MILES,
  SET_TIME_FILTER,
  SET_CURRENT_LOCATION,
  SET_HOVER_COORDINATES,
  SET_CAROUSEL_SLIDE
} from "../actions/actions";

//the initial store (global app state)
let initialState = {
  data: [],
  loading: false,
  toggle: false,
  miles: 5,
  timeFilter: "Now",
  currentLocation: {
    lat: null,
    lng: null
  },
  centerCoordinates: [null, null],
  hoverCoordinates: {
    lat: null,
    lng: null
  },
  carouselSlide: 0
};

//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function transactions(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCH_REQUEST:
      console.log("DATA_FETCH_REQUEST Action");
      return { ...state, loading: true };
    case DATA_FETCH_SUCCESS:
      console.log("DATA_FETCH_SUCCESS Action");
      return { ...state, data: action.payload, loading: false };
    case DATA_POST_REQUEST:
      console.log("DATA_POST_REQUEST Action");
      return { ...state };
    case DATA_POST_SUCCESS:
      console.log("DATA_POST_SUCCESS Action");
      return { ...state };
    case SET_CENTER_COORDINATES:
      console.log("SET_CENTER_COORDINATES Action");
      return {
        ...state,
        centerCoordinates: action.payload,
        toggle: !state.toggle
      };
    case SET_MILES:
      console.log("SET_MILES Action: " + action.payload.miles);
      return { ...state, miles: action.payload.miles };
    case SET_TIME_FILTER:
      console.log("SET_TIME_FILTER Action: " + action.payload.timeFilter);
      return { ...state, timeFilter: action.payload.timeFilter };
    case SET_CURRENT_LOCATION:
      console.log("SET_CURRENT_LOCATION Action");
      return {
        ...state,
        currentLocation: { lat: action.payload.lat, lng: action.payload.lng }
      };
    case SET_HOVER_COORDINATES:
      console.log("SET_HOVER_COORDINATES Action");
      return {
        ...state,
        hoverCoordinates: { lat: action.payload.lat, lng: action.payload.lng }
      };
    case SET_CAROUSEL_SLIDE:
      console.log("SET_CAROUSEL_SLIDE Action");
      return { ...state, carouselSlide: action.payload };
    default:
      return state;
  }
}
