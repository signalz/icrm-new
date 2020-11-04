import { call, put, takeEvery } from 'redux-saga/effects';
import { RestfulEntityApi } from "../../restfulApi";

import {
  getListSuccess,
  getListError,
  createBranchSuccess,
  createBranchError
} from "./actions";

import {
    GET_LIST_BRANCH, CREATE_BRANCH,
} from "./constants";

const getListBranchApi = RestfulEntityApi('config/branch/index');
const createBranchApi = RestfulEntityApi("config/branch/store");

const getListBranch = function* ({payload}) {
    try {
        const response = yield call(getListBranchApi.GET, '', payload);
        yield put(getListSuccess(response.data));
    } catch (err) {
        yield put(getListError(err));
    }
};

const createBranch = function*({ payload }) {
  try {
    const response = yield call(createBranchApi.POST, payload);
    yield put(createBranchSuccess(response.data));
  } catch (err) {
    yield put(createBranchError(err));
  }
};


export default function* saga() {
    yield takeEvery(GET_LIST_BRANCH, getListBranch);
    yield takeEvery(CREATE_BRANCH, createBranch);
}
