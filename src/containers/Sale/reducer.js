import produce from 'immer';
import {
  GET_LIST_SALE_PROCESS_SUCCESS,
  GET_LIST_SALE_PROCESS,
  GET_LIST_SALE_PROCESS_ERROR,
  GET_LIST_SALE_PROCESS_CLEANUP,

  STORE_CUSTOMER_PROCESS,
  STORE_CUSTOMER_PROCESS_SUCCESS,
  STORE_CUSTOMER_PROCESS_ERROR,
  STORE_CUSTOMER_PROCESS_CLEANUP,
} from './constants';

export const initialState = {};

const saleConsultantReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SALE_PROCESS:
        draft.loadingProcess = true;
        draft.errorProcess = false;
        draft.dataProcessFetch = {};
        break;
      case GET_LIST_SALE_PROCESS_SUCCESS:
        draft.loadingProcess = false;
        draft.errorProcess = false;
        draft.dataProcessFetch = action.payload;
        break;
      case GET_LIST_SALE_PROCESS_ERROR:
        draft.loadingProcess = false;
        draft.errorProcess = action.payload;
        break;
      case GET_LIST_SALE_PROCESS_CLEANUP:
        draft.loadingProcess = false;
        draft.errorProcess = false;
        draft.dataProcessFetch = {};
        break;

      case STORE_CUSTOMER_PROCESS:
        draft.customerProcessSaving = true;
        draft.customerProcessSavedError = false;
        draft.dataCustomerProcessSaveFetch = {};
        break;
      case STORE_CUSTOMER_PROCESS_SUCCESS:
        draft.customerProcessSaving = false;
        draft.customerProcessSavedError = false;
        draft.dataCustomerProcessSaveFetch = action.payload.data;
        break;
      case STORE_CUSTOMER_PROCESS_ERROR:
        draft.customerProcessSaving = false;
        draft.dataCustomerProcessSaveFetch = action.payload;
        break;
      case STORE_CUSTOMER_PROCESS_CLEANUP:
        draft.customerProcessSaving = false;
        draft.customerProcessSavedError = false;
        draft.dataCustomerProcessSaveFetch = {};
        break;
    }
  });

export default saleConsultantReducer;
