import { call, put, takeEvery } from "redux-saga/effects";
import { RestfulEntityApi } from "../../restfulApi";

import {
  getListSuccess,
  getListError,
  createProcessSuccess,
  createProcessError,
  editProcessSuccess,
  editProcessError,
  deleteProcessSuccess,
  deleteProcessError,

  getListMarketSuccess,
  getListMarketError,
  createMarketSuccess,
  createMarketError,
  editMarketSuccess,
  editMarketError,
  deleteMarketSuccess,
  deleteMarketError,
} from "./actions";

import {
  GET_LIST_PROCESS,
  CREATE_PROCESS,
  EDIT_PROCESS,
  DELETE_PROCESS,

  GET_LIST_MARKET,
  CREATE_MARKET,
  DELETE_MARKET,
  EDIT_MARKET,
} from "./constants";

const getListProcessApi = RestfulEntityApi("config/process/index");
const createProcessApi = RestfulEntityApi("config/process/store");
const updateProcessApi = RestfulEntityApi("config/process/update");
const deleteProcessApi = RestfulEntityApi("config/process");

const getListMarketApi = RestfulEntityApi("config/market/index");
const deleteMarketApi = RestfulEntityApi("config/market/delete");
const createMarketApi = RestfulEntityApi("config/market/store");
const updateMarketApi = RestfulEntityApi("config/market/update");

const getListProcess = function*({ payload }) {
  try {
    const response = yield call(getListProcessApi.GET, "", payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const createProcess = function*({ payload }) {
  try {
    const response = yield call(createProcessApi.POST, payload);
    yield put(createProcessSuccess(response.data));
  } catch (err) {
    yield put(createProcessError(err));
  }
};

const updateProcess = function* ({payload, param}) {
  try {
    const response = yield call(updateProcessApi.PUT, param, payload);
    yield put(editProcessSuccess(response.data));
  } catch (err) {
    yield put(editProcessError(err));
  }
};

const deleteProcess = function* ({payload, param}) {
  try {
    const response = yield call(deleteProcessApi.DELETE, param, payload);
    yield put(deleteProcessSuccess(response.data));
  } catch (err) {
    yield put(deleteProcessError(err));
  }
};

const getListMarket = function*({ payload }) {
  try {
    const response = yield call(getListMarketApi.GET, "", payload);
    yield put(getListMarketSuccess(response.data));
  } catch (err) {
    yield put(getListMarketError(err));
  }
};

const deleteMarket = function* ({payload, param}) {
  try {
    const response = yield call(deleteMarketApi.DELETE, param, payload);
    yield put(deleteMarketSuccess(response.data));
  } catch (err) {
    yield put(deleteMarketError(err));
  }
};

const updateMarket = function* ({payload, param}) {
  try {
    const response = yield call(updateMarketApi.PUT, param, payload);
    yield put(editMarketSuccess(response.data));
  } catch (err) {
    yield put(editMarketError(err));
  }
};

const createMarket = function*({ payload }) {
  try {
    const response = yield call(createMarketApi.POST, payload);
    yield put(createMarketSuccess(response.data));
  } catch (err) {
    yield put(createMarketError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_PROCESS, getListProcess);
  yield takeEvery(CREATE_PROCESS, createProcess);
  yield takeEvery(EDIT_PROCESS, updateProcess);
  yield takeEvery(DELETE_PROCESS, deleteProcess);
  yield takeEvery(GET_LIST_MARKET, getListMarket);
  yield takeEvery(DELETE_MARKET, deleteMarket);
  yield takeEvery(EDIT_MARKET, updateMarket);
  yield takeEvery(CREATE_MARKET, createMarket);
}
