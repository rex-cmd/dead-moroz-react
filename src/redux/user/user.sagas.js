import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";
import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import { createUserProfileDocument } from "../../rails-api/rails-api.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    console.log("userRef", userRef);
    yield put(
      signInSuccess({
        id: userRef.id,
        email: userRef.email,
        authorization: userRef.authorization,
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const user = yield call(axios, {
      method: "post",
      url: "http://localhost:3001/users/sign_in ",
      data: { user: { email, password } },
    });
    // localStorage.setItem("current_user", JSON.stringify(user));
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    const authorization = yield select(
      (store) => store.user.currentUser.authorization
    );
    yield call(axios, {
      method: "delete",
      url: "http://localhost:3001/users/sign_out ",
      headers: { Authorization: authorization },
    });
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password } }) {
  try {
    const user = yield call(axios, {
      method: "post",
      url: "http://localhost:3001/users/",
      data: { user: { email, password } },
    });
    if (user.exists) console.log("user");
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// export function* onCheckUserSession() {
//   yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
// }

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    onEmailSignInStart(),
    // onCheckUserSession(),
    onSignOutStart(),
    onSignUpStart(),
    onSignUpSuccess(),
  ]);
}
