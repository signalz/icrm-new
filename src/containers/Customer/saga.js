import { call, put, takeEvery } from 'redux-saga/effects';
import { RestfulEntityApi } from "../../restfulApi";

import {
    getListSuccess,
    getListError,
    getDetailCustomerSuccess,
    getDetailCustomerError,
    updateDetailCustomerSuccess,
    updateDetailCustomerError,
    deleteCustomerSuccess,
    deleteCustomerError,
    getDataForCreateCustomerSuccess,
    getDataForCreateCustomerError,
    createCustomerSuccess,
    createCustomerError,
    uploadCustomerSuccess,
    uploadCustomerError,
    downloadCustomerExcelSuccess,
    downloadCustomerExcelError,
    saveCustomerExcelSuccess,
    saveCustomerExcelError,
    createCustomerLogSuccess,
    createCustomerLogError,
    createCustomerScheduleSuccess,
    createCustomerScheduleError,
} from "./actions";

import {
    GET_LIST,
    GET_DETAIL_CUSTOMER,
    UPDATE_DETAIL_CUSTOMER,
    DELETE_CUSTOMER,
    GET_DATA_FOR_CREATE_CUSTOMER,
    CREATE_CUSTOMER,
    UPLOAD_CUSTOMER,
    DOWNLOAD_CUSTOMER_EXCEL,
    SAVE_CUSTOMER_EXCEL,
    CREATE_CUSTOMER_LOG,
    CREATE_CUSTOMER_SCHEDULE,
} from "./constants";

const getListCustomerApi = RestfulEntityApi('marketing/customer/index');
const getDetailCustomerApi = RestfulEntityApi('marketing/customer/edit');
const updateDetailCustomerApi = RestfulEntityApi('marketing/customer/update');
const deleteCustomerApi = RestfulEntityApi('marketing/customer');
const prepareCustomerApi = RestfulEntityApi('marketing/customer/create');
const createCustomerApi = RestfulEntityApi('marketing/customer/store');
const uploadCustomerApi = RestfulEntityApi('marketing/customer/upload/excel');
const downloadCustomerExcelApi = RestfulEntityApi('marketing/customer/download/excel');
const saveCustomerExcelApi = RestfulEntityApi('marketing/customer/save/excel');
const createCustomerLogApi = RestfulEntityApi('marketing/customer_log/store');
const createCustomerScheduleApi = RestfulEntityApi('marketing/customer_schedule/store');

const getListCustomer = function* ({payload}) {
    try {
        const response = yield call(getListCustomerApi.GET, '', payload);
        yield put(getListSuccess(response.data));
    } catch (err) {
        yield put(getListError(err));
    }
};

const getDetailCustomer = function* ({payload, param}) {
    try {
        const response = yield call(getDetailCustomerApi.GET, param, payload);
        yield put(getDetailCustomerSuccess(response.data));
    } catch (err) {
        yield put(getDetailCustomerError(err));
    }
};

const getDataForCreateCustomer = function* ({payload}) {
    try {
        const response = yield call(prepareCustomerApi.GET, '', payload);
        yield put(getDataForCreateCustomerSuccess(response.data));
    } catch (err) {
        yield put(getDataForCreateCustomerError(err));
    }
};

const updateDetailCustomer = function* ({payload, param}) {
    try {
        const response = yield call(updateDetailCustomerApi.PUT, param, payload);
        yield put(updateDetailCustomerSuccess(response.data));
    } catch (err) {
        yield put(updateDetailCustomerError(err));
    }
};

const deleteCustomer = function* ({payload, param}) {
    try {
        const response = yield call(deleteCustomerApi.DELETE, param, payload);
        yield put(deleteCustomerSuccess(response.data));
    } catch (err) {
        yield put(deleteCustomerError(err));
    }
};

const createCustomer = function*({ payload }) {
    try {
        const response = yield call(createCustomerApi.POST, payload);
        yield put(createCustomerSuccess(response.data));
    } catch (err) {
        yield put(createCustomerError(err));
    }
};

const uploadCustomer = function*({ payload }) {
    try {
        const response = yield call(uploadCustomerApi.POST, payload);
        yield put(uploadCustomerSuccess(response.data));
    } catch (err) {
        yield put(uploadCustomerError(err));
    }
};

const downloadCustomerExcel = function*({ payload }) {
    try {
        const response = yield call(downloadCustomerExcelApi.POST, payload);
        yield put(downloadCustomerExcelSuccess(response.data));
    } catch (err) {
        yield put(downloadCustomerExcelError(err));
    }
};

const saveCustomerExcel = function*({ payload }) {
    try {
        const response = yield call(saveCustomerExcelApi.POST, payload);
        yield put(saveCustomerExcelSuccess(response.data));
    } catch (err) {
        yield put(saveCustomerExcelError(err));
    }
};

const createCustomerLog = function*({ payload }) {
    try {
        const response = yield call(createCustomerLogApi.POST, payload);
        yield put(createCustomerLogSuccess(response.data));
    } catch (err) {
        yield put(createCustomerLogError(err));
    }
};

const createCustomerSchedule = function*({ payload }) {
    try {
        const response = yield call(createCustomerScheduleApi.POST, payload);
        yield put(createCustomerScheduleSuccess(response.data));
    } catch (err) {
        yield put(createCustomerScheduleError(err));
    }
};

export default function* saga() {
    yield takeEvery(GET_LIST, getListCustomer);
    yield takeEvery(GET_DETAIL_CUSTOMER, getDetailCustomer);
    yield takeEvery(UPDATE_DETAIL_CUSTOMER, updateDetailCustomer);
    yield takeEvery(DELETE_CUSTOMER, deleteCustomer);
    yield takeEvery(GET_DATA_FOR_CREATE_CUSTOMER, getDataForCreateCustomer);
    yield takeEvery(CREATE_CUSTOMER, createCustomer);
    yield takeEvery(UPLOAD_CUSTOMER, uploadCustomer);
    yield takeEvery(DOWNLOAD_CUSTOMER_EXCEL, downloadCustomerExcel);
    yield takeEvery(SAVE_CUSTOMER_EXCEL, saveCustomerExcel);
    yield takeEvery(CREATE_CUSTOMER_LOG, createCustomerLog);
    yield takeEvery(CREATE_CUSTOMER_SCHEDULE, createCustomerSchedule);
}
