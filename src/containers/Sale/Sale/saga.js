import { call, put, takeEvery } from 'redux-saga/effects';
import { RestfulEntityApi } from "../../../restfulApi";

import {
  getListSuccess,
  getListError,
  getList2Success,
  getList2Error,
  getRemainSuccess,
  getRemainError,
  switchUserFindDataSuccess,
  switchUserFindDataError,
} from "./actions";

import {
  GET_REMAIN_SALE,
  GET_LIST_SALE,
  GET_LIST_SALE2,
  SWITCH_USER_SALE_FIND_DATA,
} from "./constants";

const getListSaleApi = RestfulEntityApi('sale/sale/index');
const getRemainApi = RestfulEntityApi('sale/sale/number-remain');
const switchUserFindDataApi = RestfulEntityApi('sale/sale/switch-user-find-data');

const getListSale = function* ({payload}) {
  try {
    const response = yield call(getListSaleApi.GET, '', payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const getListSale2 = function* ({payload}) {
  try {
    const response = yield call(getListSaleApi.GET, '', payload);
    yield put(getList2Success(response.data));
  } catch (err) {
    yield put(getList2Error(err));
  }
};

const getRemainSale = function* ({payload}) {
  try {
    const response = yield call(getRemainApi.GET, '', payload);
    yield put(getRemainSuccess(response.data));
  } catch (err) {
    yield put(getRemainError(err));
  }
};

const switchUserSaleFindData = function*({ payload }) {
  try {
    const response = yield call(switchUserFindDataApi.POST, payload);
    yield put(switchUserFindDataSuccess(response.data));
  } catch (err) {
    yield put(switchUserFindDataError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_SALE, getListSale);
  yield takeEvery(GET_REMAIN_SALE, getRemainSale);
  yield takeEvery(SWITCH_USER_SALE_FIND_DATA, switchUserSaleFindData);
  yield takeEvery(GET_LIST_SALE2, getListSale2);
}
