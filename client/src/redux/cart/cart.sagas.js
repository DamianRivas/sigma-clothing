import { all, call, put, takeLatest } from "@redux-saga/core/effects";

import { UserActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnSignout() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignout);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
