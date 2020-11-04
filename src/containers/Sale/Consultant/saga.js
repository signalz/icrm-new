import { call, put, takeEvery } from 'redux-saga/effects';
import { RestfulEntityApi } from "../../../restfulApi";

import {
  getListSuccess,
  getListError,
  getRemainSuccess,
  getRemainError,
  switchUserFindDataSuccess,
  switchUserFindDataError,
  getCalendarSuccess,
  getCalendarError,
} from "./actions";

import {
  GET_LIST_CONSULTANT,
  GET_REMAIN_CONSULTANT,
  SWITCH_USER_FIND_DATA,
  GET_CONSULTANT_CALENDAR,
} from "./constants";

const getListConsultantApi = RestfulEntityApi('sale/consultant/index');
const getRemainApi = RestfulEntityApi('sale/consultant/number-remain');
const switchUserFindDataApi = RestfulEntityApi('sale/consultant/switch-user-find-data');
const calendarApi = RestfulEntityApi('sale/consultant/calendar');

const getListConsultant = function* ({payload}) {
  try {
    const response = yield call(getListConsultantApi.GET, '', payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const getCalendar = function* ({payload}) {
  try {
    const response = yield call(calendarApi.GET, '', payload);
    yield put(getCalendarSuccess(response.data));
  } catch (err) {
    yield put(getCalendarError(err));
  }
};

const getRemainConsultant = function* ({payload}) {
  try {
    const response = yield call(getRemainApi.GET, '', payload);
    yield put(getRemainSuccess(response.data));
  } catch (err) {
    yield put(getRemainError(err));
  }
};

const switchUserFindData = function*({ payload }) {
  try {
    const response = yield call(switchUserFindDataApi.POST, payload);
    yield put(switchUserFindDataSuccess(response.data));
  } catch (err) {
    yield put(switchUserFindDataError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_CONSULTANT, getListConsultant);
  yield takeEvery(GET_REMAIN_CONSULTANT, getRemainConsultant);
  yield takeEvery(SWITCH_USER_FIND_DATA, switchUserFindData);
  yield takeEvery(GET_CONSULTANT_CALENDAR, getCalendar);
}
