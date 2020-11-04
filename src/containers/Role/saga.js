import { call, put, takeEvery } from "redux-saga/effects";
import { RestfulEntityApi } from "../../restfulApi";

import {
  getListSuccess,
  getListError,
  createRoleSuccess,
  createRoleError
} from "./actions";

import { GET_LIST_ROLE, CREATE_ROLE } from "./constants";

const getListRoleApi = RestfulEntityApi("config/role/index");
const createRoleApi = RestfulEntityApi("config/role/store");

const getListRole = function*({ payload }) {
  try {
    const response = yield call(getListRoleApi.GET, "", payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const createRole = function*({ payload }) {
  try {
    const response = yield call(createRoleApi.POST, payload);
    yield put(createRoleSuccess(response.data));
  } catch (err) {
    yield put(createRoleError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_ROLE, getListRole);
  yield takeEvery(CREATE_ROLE, createRole);
}
