import {
  DATA_FETCH_REQUEST,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_SINGLE_REQUEST,
  DATA_FETCH_SINGLE_SUCCESS,
  GOOGLE_PHOTOS_FETCH_REQUEST,
  GOOGLE_PHOTOS_FETCH_SUCCESS,
  GOOGLE_PLACE_FETCH_REQUEST,
  GOOGLE_PLACE_FETCH_SUCCESS,
  DATA_POST_REQUEST,
  DATA_POST_SUCCESS,
  DATA_POST_FAILURE,
  SET_CENTER_COORDINATES,
  SET_MILES,
  SET_TIME_FILTER,
  SET_USER_COORDINATES,
  SET_HOVER_COORDINATES,
  SET_CAROUSEL_SLIDE,
  SET_LOADING,
  CLEAR_PHOTOS,
  SET_JWT,
  RESET,
  SET_BOUNDS
} from "../actions/actions";

//the initial store (global app state)
let initialState = {
  data: [],
  loading: true,
  loadingBar: false,
  miles: 10,
  timeFilter: "All",
  jwt: '',
  userCoordinates: [null, null],
  centerCoordinates: [1, 1],
  hoverCoordinates: [null, null],
  carouselSlide: null,
  singleBar: null,
  showMap: false,
  loadingPhotos: false,
  toggle: false
};

//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function transactions(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCH_REQUEST:
      // console.log("DATA_FETCH_REQUEST Action");
      return { ...state, carouselSlide: null, loadingBars: true };
    case DATA_FETCH_SUCCESS:
      // console.log("DATA_FETCH_SUCCESS Action");
      return { ...state, data: action.payload, loadingBars: false };
    case DATA_FETCH_SINGLE_REQUEST:
      // console.log("DATA_FETCH_SINGLE_REQUEST Action");
      return { ...state, photos: null, loadingBar: true };
    case DATA_FETCH_SINGLE_SUCCESS:
      // console.log("DATA_FETCH_SINGLE_SUCCESS Action");
      return { ...state, singleBar: action.payload, loadingBar: false };
    case GOOGLE_PHOTOS_FETCH_REQUEST:
      return { ...state, photos: null, loadingPhotos: true }
    case GOOGLE_PHOTOS_FETCH_SUCCESS:
      return { ...state, photos: action.payload, loadingPhotos: false }
    case GOOGLE_PLACE_FETCH_REQUEST:
      return { ...state, place: null }
    case GOOGLE_PLACE_FETCH_SUCCESS:
      return { ...state, place: action.payload }
    case DATA_POST_REQUEST:
      // console.log("DATA_POST_REQUEST Action");
      return { ...state };
    case DATA_POST_SUCCESS:
      // console.log("DATA_POST_SUCCESS Action");
      return { ...state };
    case DATA_POST_FAILURE:
      // console.log("DATA_POST_FAILURE Action");
      alert("This hapihour could not be added at this time. Possible reasons include:\n\n• The bar already exists in our records\n• The server had a wobble\n• You lost connection\n\nPlease try again later or get in contact with us directly.");
      return { ...state };
    case SET_CENTER_COORDINATES:
      // console.log("SET_CENTER_COORDINATES Action");
      return { ...state, centerCoordinates: action.payload, loading: false };
    case SET_MILES:
      // console.log("SET_MILES Action: " + action.payload.miles);
      return { ...state, miles: action.payload.miles };
    case SET_TIME_FILTER:
      // console.log("SET_TIME_FILTER Action: " + action.payload.timeFilter);
      return { ...state, timeFilter: action.payload.timeFilter };
    case SET_USER_COORDINATES:
      // console.log("SET_USER_COORDINATES Action");
      return { ...state, userCoordinates: action.payload };
    case SET_HOVER_COORDINATES:
      // console.log("SET_HOVER_COORDINATES Action");
      return { ...state, hoverCoordinates: action.payload };
    case SET_CAROUSEL_SLIDE:
      // console.log("SET_CAROUSEL_SLIDE Action");
      return { ...state, carouselSlide: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case CLEAR_PHOTOS:
      return { ...state, photos: null, loadingPhotos: false }
    case SET_JWT:
      return { ...state, jwt: action.payload }
    case SET_BOUNDS:
      return { ...state, mapBounds: action.payload }
    case RESET:
      return { ...state, carouselSlide: 0, singleBar: null, data: [], loading: true }
    default:
      return state;
  }
}
