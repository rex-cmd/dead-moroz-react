import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { giftsSagas } from "./gifts/gifts.sagas";
export default function* rootSaga() {
  yield all([call(userSagas), call(giftsSagas)]);
}
