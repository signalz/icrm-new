import produce from 'immer';
import {
  GET_LIST_SALE,
  GET_LIST_SALE_SUCCESS,
  GET_LIST_SALE_ERROR,
  GET_LIST_SALE_CLEANUP,

  GET_REMAIN_SALE,
  GET_REMAIN_SALE_SUCCESS,
  GET_REMAIN_SALE_ERROR,
  GET_REMAIN_SALE_CLEANUP,

  SWITCH_USER_SALE_FIND_DATA,
  SWITCH_USER_SALE_FIND_DATA_SUCCESS,
  SWITCH_USER_SALE_FIND_DATA_ERROR,
  SWITCH_USER_SALE_FIND_DATA_CLEANUP,

  GET_LIST_SALE2,
  GET_LIST_SALE2_CLEANUP,
  GET_LIST_SALE2_ERROR,
  GET_LIST_SALE2_SUCCESS,
} from './constants';

export const initialState = {};

const saleSaleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SALE:
        draft.loading = true;
        draft.error = false;
        draft.dataSaleFetch = {};
        break;
      case GET_LIST_SALE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataSaleFetch = action.payload.data;
        break;
      case GET_LIST_SALE_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_SALE_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataSaleFetch = {};
        break;

      case GET_LIST_SALE2:
        draft.loading = true;
        draft.error = false;
        draft.dataSale2Fetch = {};
        break;
      case GET_LIST_SALE2_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataSale2Fetch = action.payload.data;
        break;
      case GET_LIST_SALE2_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_SALE2_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataSale2Fetch = {};
        break;

      case GET_REMAIN_SALE:
        draft.loadingSaleRemain = true;
        draft.errorSaleRemain = false;
        draft.dataSaleFetchRemain = {};
        break;
      case GET_REMAIN_SALE_SUCCESS:
        draft.loadingSaleRemain = false;
        draft.errorSaleRemain = false;
        draft.dataSaleFetchRemain = action.payload.data;
        break;
      case GET_REMAIN_SALE_ERROR:
        draft.loadingSaleRemain = false;
        draft.errorSaleRemain = action.payload;
        break;
      case GET_REMAIN_SALE_CLEANUP:
        draft.loadingSaleRemain = false;
        draft.errorSaleRemain = false;
        draft.dataSaleFetchRemain = {};
        break;

      case SWITCH_USER_SALE_FIND_DATA:
        draft.switching = true;
        draft.switchError = false;
        draft.dataSwitchSaleFetch = {};
        break;
      case SWITCH_USER_SALE_FIND_DATA_SUCCESS:
        draft.switching = false;
        draft.switchError = false;
        draft.dataSwitchSaleFetch = action.payload.data;
        break;
      case SWITCH_USER_SALE_FIND_DATA_ERROR:
        draft.switching = false;
        draft.switchError = action.payload;
        break;
      case SWITCH_USER_SALE_FIND_DATA_CLEANUP:
        draft.switching = false;
        draft.switchError = false;
        draft.dataSwitchSaleFetch = {};
        break;
    }
  });

export default saleSaleReducer;
