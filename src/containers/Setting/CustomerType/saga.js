import { call, put, takeEvery } from "redux-saga/effects";
import { RestfulEntityApi } from "../../../restfulApi";

import {
  getListSuccess,
  getListError,
  createCustomerTypeSuccess,
  createCustomerTypeError
} from "./actions";

import { GET_LIST_CUSTOMER_TYPE, CREATE_CUSTOMER_TYPE } from "./constants";

const getListCustomerTypeApi = RestfulEntityApi("config/customer-type/index");
const createCustomerTypeApi = RestfulEntityApi("config/customer-type/store");

const getListCustomerType = function*({ payload }) {
  try {
    const response = yield call(getListCustomerTypeApi.GET, "", payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const createCustomerType = function*({ payload }) {
  try {
    const response = yield call(createCustomerTypeApi.POST, payload);
    yield put(createCustomerTypeSuccess(response.data));
  } catch (err) {
    yield put(createCustomerTypeError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_CUSTOMER_TYPE, getListCustomerType);
  yield takeEvery(CREATE_CUSTOMER_TYPE, createCustomerType);
}
