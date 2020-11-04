import {
  GET_LIST_CONSULTANT,
  GET_LIST_CONSULTANT_SUCCESS,
  GET_LIST_CONSULTANT_ERROR,
  GET_LIST_CONSULTANT_CLEANUP,

  GET_REMAIN_CONSULTANT,
  GET_REMAIN_CONSULTANT_SUCCESS,
  GET_REMAIN_CONSULTANT_ERROR,
  GET_REMAIN_CONSULTANT_CLEANUP,

  SWITCH_USER_FIND_DATA,
  SWITCH_USER_FIND_DATA_CLEANUP,
  SWITCH_USER_FIND_DATA_ERROR,
  SWITCH_USER_FIND_DATA_SUCCESS,

  GET_CONSULTANT_CALENDAR,
  GET_CONSULTANT_CALENDAR_SUCCESS,
  GET_CONSULTANT_CALENDAR_ERROR,
  GET_CONSULTANT_CALENDAR_CLEANUP,
} from './constants';

// get list
export function getList(payload) {
  return {
    type: GET_LIST_CONSULTANT,
    payload,
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_CONSULTANT_SUCCESS,
    payload,
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_CONSULTANT_ERROR,
    error,
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CONSULTANT_CLEANUP,
  };
}

// get number remain process
export function getRemain(payload) {
  return {
    type: GET_REMAIN_CONSULTANT,
    payload,
  };
}

export function getRemainSuccess(payload) {
  return {
    type: GET_REMAIN_CONSULTANT_SUCCESS,
    payload,
  };
}

export function getRemainError(error) {
  return {
    type: GET_REMAIN_CONSULTANT_ERROR,
    error,
  };
}

export function getRemainCleanup() {
  return {
    type: GET_REMAIN_CONSULTANT_CLEANUP,
  };
}

// switch user find data
export function switchUserFindData(payload) {
  return {
    type: SWITCH_USER_FIND_DATA,
    payload,
  };
}

export function switchUserFindDataSuccess(payload) {
  return {
    type: SWITCH_USER_FIND_DATA_SUCCESS,
    payload,
  };
}

export function switchUserFindDataError(error) {
  return {
    type: SWITCH_USER_FIND_DATA_ERROR,
    error,
  };
}

export function switchUserFindDataCleanup() {
  return {
    type: SWITCH_USER_FIND_DATA_CLEANUP,
  };
}

// get calendar
export function getCalendar(payload) {
  return {
    type: GET_CONSULTANT_CALENDAR,
    payload,
  };
}

export function getCalendarSuccess(payload) {
  return {
    type: GET_CONSULTANT_CALENDAR_SUCCESS,
    payload,
  };
}

export function getCalendarError(error) {
  return {
    type: GET_CONSULTANT_CALENDAR_ERROR,
    error,
  };
}

export function getCalendarCleanup() {
  return {
    type: GET_CONSULTANT_CALENDAR_CLEANUP,
  };
}
