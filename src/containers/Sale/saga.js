import {call, put, takeEvery} from 'redux-saga/effects';
import {RestfulEntityApi} from "../../restfulApi";

import {
  getListProcessSuccess,
  getListProcessError,
  storeCustomerProcessSuccess,
  storeCustomerProcessError,
} from "./actions";

import {
  GET_LIST_SALE_PROCESS,
  STORE_CUSTOMER_PROCESS,
} from "./constants";

const getListProcessApi = RestfulEntityApi('config/process/index');
const storeCustomerProcessApi = RestfulEntityApi('marketing/customer-process/store');

const getListProcess = function* ({payload}) {
  try {
    const response = yield call(getListProcessApi.GET, '', payload);
    yield put(getListProcessSuccess(response.data));
  } catch (err) {
    yield put(getListProcessError(err));
  }
};

const storeCustomerProcess = function*({ payload }) {
  try {
    const response = yield call(storeCustomerProcessApi.POST, payload);
    yield put(storeCustomerProcessSuccess(response.data));
  } catch (err) {
    yield put(storeCustomerProcessError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_SALE_PROCESS, getListProcess);
  yield takeEvery(STORE_CUSTOMER_PROCESS, storeCustomerProcess);
}
