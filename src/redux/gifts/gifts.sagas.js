import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";
import GiftsActionTypes from "./gifts.types";

import {
  getGiftsSuccess,
  getGiftsFailure,
  getImagesSuccess,
  getImagesFailure,
  newGiftSuccess,
  newGiftFailure,
  editGift,
} from "./gifts.actions";
import { getCurrentUser } from "../../rails-api/rails-api.utils";
export function* fetchGifts() {
  try {
    const userAuth = yield call(getCurrentUser);
    const gifts = yield call(axios, {
      method: "get",
      url: `http://localhost:3001/users/${userAuth.data.data.id}/gifts`,
      headers: { Authorization: userAuth.headers.authorization },
    });
    yield put(getGiftsSuccess(gifts.data));
  } catch (error) {
    yield put(getGiftsFailure(error));
  }
}
const selectImages = (gifts, user) => {
  return Promise.all(
    gifts.map(({ id }) =>
      axios({
        method: "get",
        url: `http://localhost:3001/users/${user.data.data.id}/gifts/${id}`,
        headers: { Authorization: user.headers.authorization },
      })
    )
  );
};
export function* fetchImages() {
  try {
    const userAuth = yield call(getCurrentUser);
    const gifts = yield select((store) => store.gifts.gifts);
    const images = yield call(selectImages, gifts, userAuth);
    yield put(getImagesSuccess(images.map((image) => image.data[0].image.url)));
  } catch (error) {
    yield put(getImagesFailure(error));
  }
}
export function* createGift({ payload: { title, description, image } }) {
  try {
    const userAuth = yield call(getCurrentUser);
    const gift = yield call(axios, {
      method: "post",
      url: `http://localhost:3001/users/${userAuth.data.data.id}/gifts`,
      data: { gift: { title, description, image } },
      headers: { Authorization: userAuth.headers.authorization },
    });
    yield put(newGiftSuccess(gift));
  } catch (error) {
    yield put(newGiftFailure(error));
  }
}
export function* onGetGiftsSuccess() {
  yield takeLatest(GiftsActionTypes.GET_GIFTS_SUCCESS, fetchImages);
}
export function* onGetGifts() {
  yield takeLatest(GiftsActionTypes.GET_GIFTS, fetchGifts);
}
export function* onNewGift() {
  yield takeLatest(GiftsActionTypes.NEW_GIFT, createGift);
}
export function* giftsSagas() {
  yield all([onGetGifts(), onGetGiftsSuccess(), onNewGift()]);
}
