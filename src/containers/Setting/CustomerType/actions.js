import {
  GET_LIST_CUSTOMER_TYPE,
  GET_LIST_SUCCESS_CUSTOMER_TYPE,
  GET_LIST_ERROR_CUSTOMER_TYPE,
  GET_LIST_CLEANUP_CUSTOMER_TYPE,
  CREATE_CUSTOMER_TYPE,
  CREATE_CUSTOMER_TYPE_ERROR,
  CREATE_CUSTOMER_TYPE_SUCCESS,
  CREATE_CUSTOMER_TYPE_CLEANUP
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_CUSTOMER_TYPE,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS_CUSTOMER_TYPE,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR_CUSTOMER_TYPE,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CLEANUP_CUSTOMER_TYPE
  };
}

export function createCustomerType(payload) {
  return {
    type: CREATE_CUSTOMER_TYPE,
    payload
  };
}

export function createCustomerTypeSuccess(payload) {
  return {
    type: CREATE_CUSTOMER_TYPE_SUCCESS,
    payload
  };
}

export function createCustomerTypeError(payload) {
  return {
    type: CREATE_CUSTOMER_TYPE_ERROR,
    payload
  };
}

export function createCustomerTypeCleanUp(payload) {
  return {
    type: CREATE_CUSTOMER_TYPE_CLEANUP,
    payload
  };
}
// // get detail
// export function getDetailCustomer(payload, param) {
//     return {
//         type: GET_DETAIL_CUSTOMER,
//         payload,
//         param
//     };
// }
//
// export function getDetailCustomerSuccess(payload) {
//     return {
//         type: GET_DETAIL_CUSTOMER_SUCCESS,
//         payload,
//     };
// }
//
// export function getDetailCustomerError(payload) {
//     return {
//         type: GET_DETAIL_CUSTOMER_ERROR,
//         payload,
//     };
// }
//
// export function getDetailCustomerCleanup() {
//     return {
//         type: GET_DETAIL_CUSTOMER_CLEANUP,
//     };
// }
//
// // delete customer
// export function deleteCustomer(payload, param) {
//     return {
//         type: DELETE_CUSTOMER,
//         payload,
//         param
//     };
// }
//
// export function deleteCustomerSuccess(payload) {
//     return {
//         type: DELETE_CUSTOMER_SUCCESS,
//         payload,
//     };
// }
//
// export function deleteCustomerError(error) {
//     return {
//         type: DELETE_CUSTOMER_ERROR,
//         error,
//     };
// }
//
// export function deleteCustomerCleanUp(error) {
//     return {
//         type: DELETE_CUSTOMER_CLEANUP,
//         error,
//     };
// }
