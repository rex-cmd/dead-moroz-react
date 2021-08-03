import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";
import InvitationsActionTypes from "./invitations.types";

import {
  getInvitationsSuccess,
  getInvitationsFailure,
  newInvitationSuccess,
  newInvitationFailure,
} from "./invitations.actions";
export function* fetchInvitations() {
  try {
    const currentUser = yield select((store) => store.user.currentUser);
    const invitations = yield call(axios, {
      method: "get",
      url: "http://localhost:3001/invitations",
      headers: { Authorization: currentUser.authorization },
    });
    yield put(getInvitationsSuccess(invitations.data));
  } catch (error) {
    yield put(getInvitationsFailure(error));
  }
}
export function* createInvitation({ payload: { email } }) {
  try {
    const currentUser = yield select((store) => store.user.currentUser);
    const response = yield call(axios, {
      method: "post",
      url: "http://localhost:3001/invitations",
      data: { invitation: { email } },
      headers: { Authorization: currentUser.authorization },
    });
    console.log(response.data);
    yield put(newInvitationSuccess(response.data));
  } catch (error) {
    yield put(newInvitationFailure(error));
  }
}
export function* onGetInvitations() {
  yield takeLatest(InvitationsActionTypes.GET_INVITATIONS, fetchInvitations);
}
export function* onNewInvitation() {
  yield takeLatest(InvitationsActionTypes.NEW_INVITATION, createInvitation);
}
export function* invitationsSagas() {
  yield all([onGetInvitations(), onNewInvitation()]);
}
