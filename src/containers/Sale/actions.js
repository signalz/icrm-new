import {
  GET_LIST_SALE_PROCESS,
  GET_LIST_SALE_PROCESS_SUCCESS,
  GET_LIST_SALE_PROCESS_ERROR,
  GET_LIST_SALE_PROCESS_CLEANUP,

  STORE_CUSTOMER_PROCESS,
  STORE_CUSTOMER_PROCESS_SUCCESS,
  STORE_CUSTOMER_PROCESS_ERROR,
  STORE_CUSTOMER_PROCESS_CLEANUP,
} from './constants';

// get list
export function getListProcess(payload) {
  return {
    type: GET_LIST_SALE_PROCESS,
    payload,
  };
}

export function getListProcessSuccess(payload) {
  return {
    type: GET_LIST_SALE_PROCESS_SUCCESS,
    payload,
  };
}

export function getListProcessError(error) {
  return {
    type: GET_LIST_SALE_PROCESS_ERROR,
    error,
  };
}

export function getListProcessCleanup() {
  return {
    type: GET_LIST_SALE_PROCESS_CLEANUP,
  };
}

// store customer process
export function storeCustomerProcess(payload) {
  return {
    type: STORE_CUSTOMER_PROCESS,
    payload
  };
}

export function storeCustomerProcessSuccess(payload) {
  return {
    type: STORE_CUSTOMER_PROCESS_SUCCESS,
    payload,
  };
}

export function storeCustomerProcessError(payload) {
  return {
    type: STORE_CUSTOMER_PROCESS_ERROR,
    payload,
  };
}

export function storeCustomerProcessCleanup() {
  return {
    type: STORE_CUSTOMER_PROCESS_CLEANUP,
  };
}
