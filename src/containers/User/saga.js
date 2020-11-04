import { call, put, takeEvery, all } from "redux-saga/effects";
import { RestfulEntityApi } from "../../restfulApi";

import {
  getListSuccess,
  getListError,
  getDetailUserSuccess,
  getDetailUserError,
  updateDetailUserSuccess,
  updateDetailUserError,
  deleteUserSuccess,
  deleteUserError,
  getDataForCreateUserSuccess,
  getDataForCreateUserError,
  createUserSuccess,
  createUserError
} from "./actions";

import {
  GET_LIST_USER,
  GET_DETAIL_USER,
  UPDATE_DETAIL_USER,
  DELETE_USER,
  GET_DATA_FOR_CREATE_USER,
  CREATE_USER
} from "./constants";

const getListUserApi = RestfulEntityApi("user/index");
const getDetailUserApi = RestfulEntityApi("user/edit");
const updateDetailUserApi = RestfulEntityApi("user/update");
const deleteUserApi = RestfulEntityApi("user");

// prepare Campaign Api
const listBranchApi = RestfulEntityApi("config/branch/index");

const createUserApi = RestfulEntityApi("user/store");

const getListUser = function*({ payload }) {
  try {
    const response = yield call(getListUserApi.GET, '', payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const getDetailUser = function*({ payload, param }) {
  try {
    const response = yield call(getDetailUserApi.GET, param, payload);
    yield put(getDetailUserSuccess(response.data));
  } catch (err) {
    yield put(getDetailUserError(err));
  }
};

const getDataForCreateUser = function*({ payload }) {
  try {
    const response = yield call(listBranchApi.GET, "", payload);
    yield put(getDataForCreateUserSuccess(response.data));
  } catch (err) {
    yield put(getDataForCreateUserError(err));
  }
};

const updateDetailUser = function*({ payload, param }) {
  try {
    const response = yield call(updateDetailUserApi.PUT, param, payload);
    yield put(updateDetailUserSuccess(response.data));
  } catch (err) {
    yield put(updateDetailUserError(err));
  }
};

const deleteUser = function*({ payload, param }) {
  try {
    const response = yield call(deleteUserApi.DELETE, param, payload);
    yield put(deleteUserSuccess(response.data));
  } catch (err) {
    yield put(deleteUserError(err));
  }
};

const createUser = function*({ payload }) {
  try {
    const response = yield call(createUserApi.POST, payload);
    yield put(createUserSuccess(response.data));
  } catch (err) {
    yield put(createUserError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_USER, getListUser);
  yield takeEvery(GET_DETAIL_USER, getDetailUser);
  yield takeEvery(UPDATE_DETAIL_USER, updateDetailUser);
  yield takeEvery(DELETE_USER, deleteUser);
  yield takeEvery(GET_DATA_FOR_CREATE_USER, getDataForCreateUser);
  yield takeEvery(CREATE_USER, createUser);
}
