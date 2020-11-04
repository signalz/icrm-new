import {
  GET_LIST_BRANCH,
  GET_LIST_SUCCESS_BRANCH,
  GET_LIST_ERROR_BRANCH,
  GET_LIST_CLEANUP_BRANCH,
  CREATE_BRANCH,
  CREATE_BRANCH_ERROR,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_CLEANUP
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_BRANCH,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS_BRANCH,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR_BRANCH,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CLEANUP_BRANCH
  };
}

export function createBranch(payload) {
  return {
    type: CREATE_BRANCH,
    payload
  };
}

export function createBranchSuccess(payload) {
  return {
    type: CREATE_BRANCH_SUCCESS,
    payload
  };
}

export function createBranchError(payload) {
  return {
    type: CREATE_BRANCH_ERROR,
    payload
  };
}

export function createBranchCleanup(payload) {
  return {
    type: CREATE_BRANCH_CLEANUP,
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
