import UserActionTypes from "../user/user.types";
import GiftsActionTypes from "./gifts.types";
export const getGifts = () => ({
  type: GiftsActionTypes.GET_GIFTS,
});

export const getGiftsFailure = (error) => ({
  type: GiftsActionTypes.GET_GIFTS_FAILURE,
  payload: error,
});
export const getGiftsSuccess = (gifts) => ({
  type: GiftsActionTypes.GET_GIFTS_SUCCESS,
  payload: gifts,
});
export const getImages = () => ({
  type: GiftsActionTypes.GET_IMAGES,
});
export const getImagesSuccess = (images) => ({
  type: GiftsActionTypes.GET_IMAGES_SUCCESS,
  payload: images,
});
export const getImagesFailure = (error) => ({
  type: GiftsActionTypes.GET_GIFTS_FAILURE,
  payload: error,
});
export const newGift = (title, description, image) => ({
  type: GiftsActionTypes.NEW_GIFT,
  payload: { title, description },
});
export const newGiftSuccess = (gift) => ({
  type: GiftsActionTypes.NEW_GIFT_SUCCESS,
  payload: gift,
});
export const newGiftFailure = (error) => ({
  type: GiftsActionTypes.NEW_GIFT_FAILURE,
  payload: error,
});
export const editGift = (gift) => ({
  type: GiftsActionTypes.EDIT_GIFT,
  payload: gift,
});
