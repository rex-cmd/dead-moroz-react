import GiftsActionTypes from "./gifts.types";

const INITIAL_STATE = {
  gifts: [],
  images: [],
  error: null,
};
const giftsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GiftsActionTypes.GET_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: action.payload,
        error: null,
      };
    case GiftsActionTypes.GET_GIFTS:
      return {
        ...state,
        error: null,
      };
    case GiftsActionTypes.GET_IMAGES:
      return {
        ...state,
        error: null,
      };
    case GiftsActionTypes.GET_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
        error: null,
      };
    case GiftsActionTypes.NEW_GIFT: {
      return {
        ...state,
        error: null,
      };
    }
    case GiftsActionTypes.NEW_GIFT_SUCCESS: {
      return {
        ...state,
        gifts: [...state.gifts, action.payload],
        error: null,
      };
    }
    case GiftsActionTypes.NEW_GIFT_FAILURE:
    case GiftsActionTypes.GET_IMAGES_FAILURE:
    case GiftsActionTypes.GET_GIFTS_FAILURE:
    case GiftsActionTypes.EDIT_GIFT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default giftsReducer;
