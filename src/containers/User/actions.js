import {
  GET_LIST_USER,
  GET_LIST_SUCCESS,
  GET_LIST_ERROR,
  GET_LIST_CLEANUP,

  GET_DATA_FOR_CREATE_USER,
  GET_DATA_FOR_CREATE_USER_SUCCESS,
  GET_DATA_FOR_CREATE_USER_ERROR,
  GET_DATA_FOR_CREATE_USER_CLEANUP,
  
  GET_DETAIL_USER,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_ERROR,
  GET_DETAIL_USER_CLEANUP,
  UPDATE_DETAIL_USER,
  UPDATE_DETAIL_USER_SUCCESS,
  UPDATE_DETAIL_USER_ERROR,
  UPDATE_DETAIL_USER_CLEANUP,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_CLEANUP,

  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_CLEANUP
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_USER,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CLEANUP
  };
}

// get data for create customer
export function getDataForCreateUser(payload, param) {
  return {
    type: GET_DATA_FOR_CREATE_USER,
    payload,
    param
  };
}

export function getDataForCreateUserSuccess(payload) {
  return {
    type: GET_DATA_FOR_CREATE_USER_SUCCESS,
    payload
  };
}

export function getDataForCreateUserError(payload) {
  return {
    type: GET_DATA_FOR_CREATE_USER_ERROR,
    payload
  };
}

export function getDataForCreateUserCleanup() {
  return {
    type: GET_DATA_FOR_CREATE_USER_CLEANUP
  };
}

// create User
export function createUser(payload) {
  return {
    type: CREATE_USER,
    payload
  };
}

export function createUserSuccess(payload) {
  return {
    type: CREATE_USER_SUCCESS,
    payload
  };
}

export function createUserError(payload) {
  return {
    type: CREATE_USER_ERROR,
    payload
  };
}

export function createUserCleanup(payload) {
  return {
    type: CREATE_USER_CLEANUP,
    payload
  };
}

// get detail
export function getDetailUser(payload, param) {
  return {
    type: GET_DETAIL_USER,
    payload,
    param
  };
}

export function getDetailUserSuccess(payload) {
  return {
    type: GET_DETAIL_USER_SUCCESS,
    payload
  };
}

export function getDetailUserError(payload) {
  return {
    type: GET_DETAIL_USER_ERROR,
    payload
  };
}

export function getDetailUserCleanup() {
  return {
    type: GET_DETAIL_USER_CLEANUP
  };
}

//update User
export function updateDetailUser(payload, param) {
  return {
    type: UPDATE_DETAIL_USER,
    payload,
    param
  };
}

export function updateDetailUserSuccess(payload) {
  return {
    type: UPDATE_DETAIL_USER_SUCCESS,
    payload
  };
}

export function updateDetailUserError(payload) {
  return {
    type: UPDATE_DETAIL_USER_ERROR,
    payload
  };
}

export function updateDetailUserCleanup() {
  return {
    type: UPDATE_DETAIL_USER_CLEANUP
  };
}

// delete User
export function deleteUser(payload, param) {
  return {
    type: DELETE_USER,
    payload,
    param
  };
}

export function deleteUserSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload
  };
}

export function deleteUserError(error) {
  return {
    type: DELETE_USER_ERROR,
    error
  };
}

export function deleteUserCleanUp(error) {
  return {
    type: DELETE_USER_CLEANUP,
    error
  };
}
