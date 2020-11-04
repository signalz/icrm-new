import {
  GET_LIST_SALE,
  GET_LIST_SALE_ERROR,
  GET_LIST_SALE_CLEANUP,
  GET_LIST_SALE_SUCCESS,

  GET_LIST_SALE2,
  GET_LIST_SALE2_ERROR,
  GET_LIST_SALE2_CLEANUP,
  GET_LIST_SALE2_SUCCESS,

  GET_REMAIN_SALE,
  GET_REMAIN_SALE_SUCCESS,
  GET_REMAIN_SALE_ERROR,
  GET_REMAIN_SALE_CLEANUP,

  SWITCH_USER_SALE_FIND_DATA,
  SWITCH_USER_SALE_FIND_DATA_CLEANUP,
  SWITCH_USER_SALE_FIND_DATA_ERROR,
  SWITCH_USER_SALE_FIND_DATA_SUCCESS,
} from './constants';

// get list
export function getList(payload) {
  return {
    type: GET_LIST_SALE,
    payload,
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SALE_SUCCESS,
    payload,
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_SALE_ERROR,
    error,
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_SALE_CLEANUP,
  };
}

// get list 2
export function getList2(payload) {
  return {
    type: GET_LIST_SALE2,
    payload,
  };
}

export function getList2Success(payload) {
  return {
    type: GET_LIST_SALE2_SUCCESS,
    payload,
  };
}

export function getList2Error(error) {
  return {
    type: GET_LIST_SALE2_ERROR,
    error,
  };
}

export function getList2Cleanup() {
  return {
    type: GET_LIST_SALE2_CLEANUP,
  };
}

// get number remain process
export function getRemain(payload) {
  return {
    type: GET_REMAIN_SALE,
    payload,
  };
}

export function getRemainSuccess(payload) {
  return {
    type: GET_REMAIN_SALE_SUCCESS,
    payload,
  };
}

export function getRemainError(error) {
  return {
    type: GET_REMAIN_SALE_ERROR,
    error,
  };
}

export function getRemainCleanup() {
  return {
    type: GET_REMAIN_SALE_CLEANUP,
  };
}

// switch user find data
export function switchUserFindData(payload) {
  return {
    type: SWITCH_USER_SALE_FIND_DATA,
    payload,
  };
}

export function switchUserFindDataSuccess(payload) {
  return {
    type: SWITCH_USER_SALE_FIND_DATA_SUCCESS,
    payload,
  };
}

export function switchUserFindDataError(error) {
  return {
    type: SWITCH_USER_SALE_FIND_DATA_ERROR,
    error,
  };
}

export function switchUserFindDataCleanup() {
  return {
    type: SWITCH_USER_SALE_FIND_DATA_CLEANUP,
  };
}
