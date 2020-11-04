import {
  GET_LIST_ROLE,
  GET_LIST_SUCCESS_ROLE,
  GET_LIST_ERROR_ROLE,
  GET_LIST_CLEANUP_ROLE,
  CREATE_ROLE,
  CREATE_ROLE_ERROR,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_CLEANUP
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_ROLE,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS_ROLE,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR_ROLE,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CLEANUP_ROLE
  };
}

export function createRole(payload) {
  return {
    type: CREATE_ROLE,
    payload
  };
}

export function createRoleSuccess(payload) {
  return {
    type: CREATE_ROLE_SUCCESS,
    payload
  };
}

export function createRoleError(payload) {
  return {
    type: CREATE_ROLE_ERROR,
    payload
  };
}

export function createRoleCleanUp(payload) {
  return {
    type: CREATE_ROLE_CLEANUP,
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
