import produce from 'immer';
import {
    GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,
    GET_LIST_CLEANUP,

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

    GET_DATA_FOR_CREATE_CUSTOMER,
    GET_DATA_FOR_CREATE_CUSTOMER_SUCCESS,
    GET_DATA_FOR_CREATE_CUSTOMER_ERROR,
    GET_DATA_FOR_CREATE_CUSTOMER_CLEANUP,

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
    CREATE_CUSTOMER_LOG_CLEANUP,
    CREATE_CUSTOMER_LOG_SUCCESS,
    CREATE_CUSTOMER_LOG_ERROR,

    CREATE_CUSTOMER_SCHEDULE,
    CREATE_CUSTOMER_SCHEDULE_SUCCESS,
    CREATE_CUSTOMER_SCHEDULE_ERROR,
    CREATE_CUSTOMER_SCHEDULE_CLEANUP,
} from './constants';


import {
    createData,
    createDataSuccess,
    createDataError,
    createDataCleanUp,
} from '../ReduxShared/reducer';

export const initialState = {};

const customerReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case GET_LIST:
                draft.loading = true;
                draft.error = false;
                draft.dataCustomerFetch = {};
                break;
            case GET_LIST_SUCCESS:
                draft.loading = false;
                draft.error = false;
                draft.dataCustomerFetch = action.payload.data;
                break;
            case GET_LIST_ERROR:
                draft.loading = false;
                draft.error = action.payload;
                break;
            case GET_LIST_CLEANUP:
                draft.loading = false;
                draft.error = false;
                draft.dataCustomerFetch = {};
                break;
            case GET_DETAIL_CUSTOMER:
                draft.loading = true;
                draft.error = false;
                draft.dataCustomerDetailFetch = {};
                break;
            case GET_DETAIL_CUSTOMER_SUCCESS:
                draft.loading = false;
                draft.error = false;
                draft.dataCustomerDetailFetch = action.payload.data;
                break;
            case GET_DETAIL_CUSTOMER_ERROR:
                draft.loading = false;
                draft.error = action.payload;
                break;
            case GET_DETAIL_CUSTOMER_CLEANUP:
                draft.loading = false;
                draft.error = false;
                draft.dataCustomerDetailFetch = {};
                break;
            case UPDATE_DETAIL_CUSTOMER:
                draft.changingCustomer = true;
                draft.changedCustomer = false;
                draft.changCustomerError = false;
                break;
            case UPDATE_DETAIL_CUSTOMER_SUCCESS:
                draft.changingCustomer = false;
                draft.changedCustomer = true;
                draft.changCustomerError = false;
                draft.response = action.payload;
                break;
            case UPDATE_DETAIL_CUSTOMER_ERROR:
                draft.changingCustomer = false;
                draft.changedCustomer = false;
                draft.changCustomerError = action.payload;
                break;
            case UPDATE_DETAIL_CUSTOMER_CLEANUP:
                draft.changingCustomer = false;
                draft.changedCustomer = false;
                draft.changCustomerError = false;
                break;
            case DELETE_CUSTOMER:
                draft.deletingCustomer = true;
                draft.deletedCustomer = false;
                draft.deleteCustomerError = false;
                break;
            case DELETE_CUSTOMER_SUCCESS:
                draft.deletingCustomer = false;
                draft.deletedCustomer = true;
                draft.deleteCustomerError = false;
                draft.response = action.payload;
                break;
            case DELETE_CUSTOMER_ERROR:
                draft.deletingCustomer = false;
                draft.deletedCustomer = false;
                draft.deleteCustomerError = action.error.response;
                break;
            case DELETE_CUSTOMER_CLEANUP:
                draft.deletingCustomer = false;
                draft.deletedCustomer = false;
                draft.deleteCustomerError = false;
                break;
            case GET_DATA_FOR_CREATE_CUSTOMER:
                draft.loading = true;
                draft.error = false;
                draft.prepareCustomerData = {};
                break;
            case GET_DATA_FOR_CREATE_CUSTOMER_SUCCESS:
                draft.loading = false;
                draft.error = false;
                draft.prepareCustomerData = action.payload.data;
                break;
            case GET_DATA_FOR_CREATE_CUSTOMER_ERROR:
                draft.loading = false;
                draft.error = action.payload;
                break;
            case GET_DATA_FOR_CREATE_CUSTOMER_CLEANUP:
                draft.loading = false;
                draft.error = false;
                draft.prepareCustomerData = {};
                break;
            case CREATE_CUSTOMER:
                createData(draft, action);
                break;
            case CREATE_CUSTOMER_SUCCESS:
                createDataSuccess(draft, action);
                break;
            case CREATE_CUSTOMER_ERROR:
                createDataError(draft, action);
                break;
            case CREATE_CUSTOMER_CLEANUP:
                createDataCleanUp(draft, action);
                break;
            case UPLOAD_CUSTOMER:
                draft.uploadingData = true;
                draft.uploadedData = false;
                draft.uploadDataError = false;
                break;
            case UPLOAD_CUSTOMER_SUCCESS:
                draft.uploadingData = false;
                draft.uploadedData = true;
                draft.uploadDataError = false;
                draft.uploadResponse = action.payload.data;
                break;
            case UPLOAD_CUSTOMER_ERROR:
                draft.uploadingData = false;
                draft.uploadedData = false;
                draft.uploadDataError = action.error.response;
                break;
            case UPLOAD_CUSTOMER_CLEANUP:
                draft.uploadingData = false;
                draft.uploadedData = false;
                draft.uploadDataError = false;
                draft.uploadResponse = {};
                break;
            case DOWNLOAD_CUSTOMER_EXCEL:
                draft.downloading = true;
                draft.downloadError = false;
                draft.dataDownloadFetch = {};
                break;
            case DOWNLOAD_CUSTOMER_EXCEL_SUCCESS:
                draft.downloading = false;
                draft.downloadError = false;
                draft.dataDownloadFetch = action.payload.data;
                break;
            case DOWNLOAD_CUSTOMER_EXCEL_ERROR:
                draft.downloading = false;
                draft.downloadError = action.payload;
                break;
            case DOWNLOAD_CUSTOMER_EXCEL_CLEANUP:
                draft.downloading = false;
                draft.downloadError = false;
                draft.dataDownloadFetch = {};
                break;
            case SAVE_CUSTOMER_EXCEL:
                draft.saving = true;
                draft.savedError = false;
                draft.dataSaveFetch = {};
                break;
            case SAVE_CUSTOMER_EXCEL_SUCCESS:
                draft.saving = false;
                draft.savedError = false;
                draft.dataSaveFetch = action.payload.data;
                break;
            case SAVE_CUSTOMER_EXCEL_ERROR:
                draft.saving = false;
                draft.savedError = action.payload;
                break;
            case SAVE_CUSTOMER_EXCEL_CLEANUP:
                draft.saving = false;
                draft.savedError = false;
                draft.dataSaveFetch = {};
                break;
            case CREATE_CUSTOMER_LOG:
                draft.logSaving = true;
                draft.logSavedError = false;
                draft.dataLogSaveFetch = {};
                break;
            case CREATE_CUSTOMER_LOG_SUCCESS:
                draft.logSaving = false;
                draft.logSavedError = false;
                draft.dataLogSaveFetch = action.payload.data;
                break;
            case CREATE_CUSTOMER_LOG_ERROR:
                draft.logSaving = false;
                draft.logSavedError = action.payload;
                break;
            case CREATE_CUSTOMER_LOG_CLEANUP:
                draft.logSaving = false;
                draft.logSavedError = false;
                draft.dataLogSaveFetch = {};
                break;
            case CREATE_CUSTOMER_SCHEDULE:
                draft.scheduleSaving = true;
                draft.scheduleSavedError = false;
                draft.dataScheduleSaveFetch = {};
                break;
            case CREATE_CUSTOMER_SCHEDULE_SUCCESS:
                draft.scheduleSaving = false;
                draft.scheduleSavedError = false;
                draft.dataScheduleSaveFetch = action.payload.data;
                break;
            case CREATE_CUSTOMER_SCHEDULE_ERROR:
                draft.scheduleSaving = false;
                draft.scheduleSavedError = action.payload;
                break;
            case CREATE_CUSTOMER_SCHEDULE_CLEANUP:
                draft.scheduleSaving = false;
                draft.scheduleSavedError = false;
                draft.dataScheduleSaveFetch = {};
                break;
        }
    });

export default customerReducer;
