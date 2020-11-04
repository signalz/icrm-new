import {
    GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,
    GET_LIST_CLEANUP,

    GET_DATA_FOR_CREATE_CUSTOMER,
    GET_DATA_FOR_CREATE_CUSTOMER_SUCCESS,
    GET_DATA_FOR_CREATE_CUSTOMER_ERROR,
    GET_DATA_FOR_CREATE_CUSTOMER_CLEANUP,

    GET_DETAIL_CUSTOMER,
    GET_DETAIL_CUSTOMER_SUCCESS,
    GET_DETAIL_CUSTOMER_ERROR,
    GET_DETAIL_CUSTOMER_CLEANUP,

    UPDATE_DETAIL_CUSTOMER,
    UPDATE_DETAIL_CUSTOMER_SUCCESS,
    UPDATE_DETAIL_CUSTOMER_ERROR,
    UPDATE_DETAIL_CUSTOMER_CLEANUP,

    DELETE_CUSTOMER,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,
    DELETE_CUSTOMER_CLEANUP,

    CREATE_CUSTOMER,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,
    CREATE_CUSTOMER_CLEANUP,

    UPLOAD_CUSTOMER,
    UPLOAD_CUSTOMER_SUCCESS,
    UPLOAD_CUSTOMER_ERROR,
    UPLOAD_CUSTOMER_CLEANUP,

    DOWNLOAD_CUSTOMER_EXCEL,
    DOWNLOAD_CUSTOMER_EXCEL_SUCCESS,
    DOWNLOAD_CUSTOMER_EXCEL_ERROR,
    DOWNLOAD_CUSTOMER_EXCEL_CLEANUP,

    SAVE_CUSTOMER_EXCEL,
    SAVE_CUSTOMER_EXCEL_SUCCESS,
    SAVE_CUSTOMER_EXCEL_ERROR,
    SAVE_CUSTOMER_EXCEL_CLEANUP,

    CREATE_CUSTOMER_LOG,
    CREATE_CUSTOMER_LOG_SUCCESS,
    CREATE_CUSTOMER_LOG_ERROR,
    CREATE_CUSTOMER_LOG_CLEANUP,

    CREATE_CUSTOMER_SCHEDULE,
    CREATE_CUSTOMER_SCHEDULE_SUCCESS,
    CREATE_CUSTOMER_SCHEDULE_ERROR,
    CREATE_CUSTOMER_SCHEDULE_CLEANUP,
} from './constants';

// get list
export function getList(payload) {
    return {
        type: GET_LIST,
        payload,
    };
}

export function getListSuccess(payload) {
    return {
        type: GET_LIST_SUCCESS,
        payload,
    };
}

export function getListError(error) {
    return {
        type: GET_LIST_ERROR,
        error,
    };
}

export function getListCleanup() {
    return {
        type: GET_LIST_CLEANUP,
    };
}

// get data for create customer
export function getDataForCreateCustomer(payload, param) {
    return {
        type: GET_DATA_FOR_CREATE_CUSTOMER,
        payload,
        param
    };
}

export function getDataForCreateCustomerSuccess(payload) {
    return {
        type: GET_DATA_FOR_CREATE_CUSTOMER_SUCCESS,
        payload,
    };
}

export function getDataForCreateCustomerError(payload) {
    return {
        type: GET_DATA_FOR_CREATE_CUSTOMER_ERROR,
        payload,
    };
}

export function getDataForCreateCustomerCleanup() {
    return {
        type: GET_DATA_FOR_CREATE_CUSTOMER_CLEANUP,
    };
}

// create customer
export function createCustomer(payload) {
    return {
        type: CREATE_CUSTOMER,
        payload,
    };
}

export function createCustomerSuccess(payload) {
    return {
        type: CREATE_CUSTOMER_SUCCESS,
        payload,
    };
}

export function createCustomerError(payload) {
    return {
        type: CREATE_CUSTOMER_ERROR,
        payload,
    };
}

export function createCustomerCleanup(payload) {
    return {
        type: CREATE_CUSTOMER_CLEANUP,
        payload,
    };
}

// get detail
export function getDetailCustomer(payload, param) {
    return {
        type: GET_DETAIL_CUSTOMER,
        payload,
        param
    };
}

export function getDetailCustomerSuccess(payload) {
    return {
        type: GET_DETAIL_CUSTOMER_SUCCESS,
        payload,
    };
}

export function getDetailCustomerError(payload) {
    return {
        type: GET_DETAIL_CUSTOMER_ERROR,
        payload,
    };
}

export function getDetailCustomerCleanup() {
    return {
        type: GET_DETAIL_CUSTOMER_CLEANUP,
    };
}

//update customer
export function updateDetailCustomer(payload, param) {
    return {
        type: UPDATE_DETAIL_CUSTOMER,
        payload,
        param
    }
}

export function updateDetailCustomerSuccess(payload) {
    return {
        type: UPDATE_DETAIL_CUSTOMER_SUCCESS,
        payload,
    };
}

export function updateDetailCustomerError(payload) {
    return {
        type: UPDATE_DETAIL_CUSTOMER_ERROR,
        payload,
    };
}

export function updateDetailCustomerCleanup() {
    return {
        type: UPDATE_DETAIL_CUSTOMER_CLEANUP,
    };
}

// delete customer
export function deleteCustomer(payload, param) {
    return {
        type: DELETE_CUSTOMER,
        payload,
        param
    };
}

export function deleteCustomerSuccess(payload) {
    return {
        type: DELETE_CUSTOMER_SUCCESS,
        payload,
    };
}

export function deleteCustomerError(error) {
    return {
        type: DELETE_CUSTOMER_ERROR,
        error,
    };
}

export function deleteCustomerCleanUp(error) {
    return {
        type: DELETE_CUSTOMER_CLEANUP,
        error,
    };
}

// upload customer
export function uploadCustomer(payload) {
    return {
        type: UPLOAD_CUSTOMER,
        payload,
    };
}

export function uploadCustomerSuccess(payload) {
    return {
        type: UPLOAD_CUSTOMER_SUCCESS,
        payload,
    };
}

export function uploadCustomerError(payload) {
    return {
        type: UPLOAD_CUSTOMER_ERROR,
        payload,
    };
}

export function uploadCustomerCleanup(payload) {
    return {
        type: UPLOAD_CUSTOMER_CLEANUP,
        payload,
    };
}

// download excel
export function downloadCustomerExcel(payload) {
    return {
        type: DOWNLOAD_CUSTOMER_EXCEL,
        payload
    };
}

export function downloadCustomerExcelSuccess(payload) {
    return {
        type: DOWNLOAD_CUSTOMER_EXCEL_SUCCESS,
        payload,
    };
}

export function downloadCustomerExcelError(payload) {
    return {
        type: DOWNLOAD_CUSTOMER_EXCEL_ERROR,
        payload,
    };
}

export function downloadCustomerExcelCleanup() {
    return {
        type: DOWNLOAD_CUSTOMER_EXCEL_CLEANUP,
    };
}

// save excel
export function saveCustomerExcel(payload) {
    return {
        type: SAVE_CUSTOMER_EXCEL,
        payload
    };
}

export function saveCustomerExcelSuccess(payload) {
    return {
        type: SAVE_CUSTOMER_EXCEL_SUCCESS,
        payload,
    };
}

export function saveCustomerExcelError(payload) {
    return {
        type: SAVE_CUSTOMER_EXCEL_ERROR,
        payload,
    };
}

export function saveCustomerExcelCleanup() {
    return {
        type: SAVE_CUSTOMER_EXCEL_CLEANUP,
    };
}

// create log
export function createCustomerLog(payload) {
    return {
        type: CREATE_CUSTOMER_LOG,
        payload
    };
}

export function createCustomerLogSuccess(payload) {
    return {
        type: CREATE_CUSTOMER_LOG_SUCCESS,
        payload,
    };
}

export function createCustomerLogError(payload) {
    return {
        type: CREATE_CUSTOMER_LOG_ERROR,
        payload,
    };
}

export function createCustomerLogCleanup() {
    return {
        type: CREATE_CUSTOMER_LOG_CLEANUP,
    };
}

// create schedule
export function createCustomerSchedule(payload) {
    return {
        type: CREATE_CUSTOMER_SCHEDULE,
        payload
    };
}

export function createCustomerScheduleSuccess(payload) {
    return {
        type: CREATE_CUSTOMER_SCHEDULE_SUCCESS,
        payload,
    };
}

export function createCustomerScheduleError(payload) {
    return {
        type: CREATE_CUSTOMER_SCHEDULE_ERROR,
        payload,
    };
}

export function createCustomerScheduleCleanup() {
    return {
        type: CREATE_CUSTOMER_SCHEDULE_CLEANUP,
    };
}
