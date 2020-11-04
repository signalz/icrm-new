import {
  GET_LIST_PROCESS,
  GET_LIST_SUCCESS_PROCESS,
  GET_LIST_ERROR_PROCESS,
  GET_LIST_CLEANUP_PROCESS,

  CREATE_PROCESS,
  CREATE_PROCESS_ERROR,
  CREATE_PROCESS_SUCCESS,
  CREATE_PROCESS_CLEANUP,

  EDIT_PROCESS,
  EDIT_PROCESS_CLEANUP,
  EDIT_PROCESS_ERROR,
  EDIT_PROCESS_SUCCESS,

  DELETE_PROCESS,
  DELETE_PROCESS_CLEANUP,
  DELETE_PROCESS_ERROR,
  DELETE_PROCESS_SUCCESS,

  GET_LIST_MARKET,
  GET_LIST_MARKET_CLEANUP,
  GET_LIST_MARKET_ERROR,
  GET_LIST_MARKET_SUCCESS,

  CREATE_MARKET,
  CREATE_MARKET_CLEANUP,
  CREATE_MARKET_ERROR,
  CREATE_MARKET_SUCCESS,

  EDIT_MARKET,
  EDIT_MARKET_CLEANUP,
  EDIT_MARKET_ERROR,
  EDIT_MARKET_SUCCESS,

  DELETE_MARKET,
  DELETE_MARKET_CLEANUP,
  DELETE_MARKET_ERROR,
  DELETE_MARKET_SUCCESS,
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_PROCESS,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS_PROCESS,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR_PROCESS,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CLEANUP_PROCESS
  };
}

//
export function createProcess(payload) {
  return {
    type: CREATE_PROCESS,
    payload
  };
}

export function createProcessSuccess(payload) {
  return {
    type: CREATE_PROCESS_SUCCESS,
    payload
  };
}

export function createProcessError(payload) {
  return {
    type: CREATE_PROCESS_ERROR,
    payload
  };
}

export function createProcessCleanUp(payload) {
  return {
    type: CREATE_PROCESS_CLEANUP,
    payload
  };
}

// edit process
export function editProcess(payload, param) {
  return {
    type: EDIT_PROCESS,
    payload,
    param
  };
}

export function editProcessSuccess(payload) {
  return {
    type: EDIT_PROCESS_SUCCESS,
    payload
  };
}

export function editProcessError(payload) {
  return {
    type: EDIT_PROCESS_ERROR,
    payload
  };
}

export function editProcessCleanUp(payload) {
  return {
    type: EDIT_PROCESS_CLEANUP,
    payload
  };
}

// delete process
export function deleteProcess(payload, param) {
  return {
    type: DELETE_PROCESS,
    payload,
    param
  };
}

export function deleteProcessSuccess(payload) {
  return {
    type: DELETE_PROCESS_SUCCESS,
    payload,
  };
}

export function deleteProcessError(error) {
  return {
    type: DELETE_PROCESS_ERROR,
    error,
  };
}

export function deleteProcessCleanUp(error) {
  return {
    type: DELETE_PROCESS_CLEANUP,
    error,
  };
}

// get list market
export function getListMarket(payload) {
  return {
    type: GET_LIST_MARKET,
    payload
  };
}

export function getListMarketSuccess(payload) {
  return {
    type: GET_LIST_MARKET_SUCCESS,
    payload
  };
}

export function getListMarketError(error) {
  return {
    type: GET_LIST_MARKET_ERROR,
    error
  };
}

export function getListMarketCleanup() {
  return {
    type: GET_LIST_MARKET_CLEANUP
  };
}

// Create market
export function createMarket(payload) {
  return {
    type: CREATE_MARKET,
    payload
  };
}

export function createMarketSuccess(payload) {
  return {
    type: CREATE_MARKET_SUCCESS,
    payload
  };
}

export function createMarketError(payload) {
  return {
    type: CREATE_MARKET_ERROR,
    payload
  };
}

export function createMarketCleanUp(payload) {
  return {
    type: CREATE_MARKET_CLEANUP,
    payload
  };
}

// edit market
export function editMarket(payload, param) {
  return {
    type: EDIT_MARKET,
    payload,
    param
  };
}

export function editMarketSuccess(payload) {
  return {
    type: EDIT_MARKET_SUCCESS,
    payload
  };
}

export function editMarketError(payload) {
  return {
    type: EDIT_MARKET_ERROR,
    payload
  };
}

export function editMarketCleanUp(payload) {
  return {
    type: EDIT_MARKET_CLEANUP,
    payload
  };
}

// delete market
export function deleteMarket(payload, param) {
  return {
    type: DELETE_MARKET,
    payload,
    param
  };
}

export function deleteMarketSuccess(payload) {
  return {
    type: DELETE_MARKET_SUCCESS,
    payload,
  };
}

export function deleteMarketError(error) {
  return {
    type: DELETE_MARKET_ERROR,
    error,
  };
}

export function deleteMarketCleanUp(error) {
  return {
    type: DELETE_MARKET_CLEANUP,
    error,
  };
}
