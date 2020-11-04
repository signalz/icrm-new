import produce from 'immer';
import {
  GET_LIST_CONSULTANT,
  GET_LIST_CONSULTANT_SUCCESS,
  GET_LIST_CONSULTANT_ERROR,
  GET_LIST_CONSULTANT_CLEANUP,

  GET_REMAIN_CONSULTANT,
  GET_REMAIN_CONSULTANT_SUCCESS,
  GET_REMAIN_CONSULTANT_ERROR,
  GET_REMAIN_CONSULTANT_CLEANUP,

  SWITCH_USER_FIND_DATA_CLEANUP,
  SWITCH_USER_FIND_DATA_ERROR,
  SWITCH_USER_FIND_DATA_SUCCESS,
  SWITCH_USER_FIND_DATA,

  GET_CONSULTANT_CALENDAR,
  GET_CONSULTANT_CALENDAR_SUCCESS,
  GET_CONSULTANT_CALENDAR_ERROR,
  GET_CONSULTANT_CALENDAR_CLEANUP,
} from './constants';

export const initialState = {};

const saleConsultantReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_CONSULTANT:
        draft.loading = true;
        draft.error = false;
        draft.dataConsultantFetch = {};
        break;
      case GET_LIST_CONSULTANT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataConsultantFetch = action.payload.data;
        break;
      case GET_LIST_CONSULTANT_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CONSULTANT_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataConsultantFetch = {};
        break;

      case GET_REMAIN_CONSULTANT:
        draft.loadingConsultantRemain = true;
        draft.errorConsultantRemain = false;
        draft.dataConsultantFetchRemain = {};
        break;
      case GET_REMAIN_CONSULTANT_SUCCESS:
        draft.loadingConsultantRemain = false;
        draft.errorConsultantRemain = false;
        draft.dataConsultantFetchRemain = action.payload.data;
        break;
      case GET_REMAIN_CONSULTANT_ERROR:
        draft.loadingConsultantRemain = false;
        draft.errorConsultantRemain = action.payload;
        break;
      case GET_REMAIN_CONSULTANT_CLEANUP:
        draft.loadingConsultantRemain = false;
        draft.errorConsultantRemain = false;
        draft.dataConsultantFetchRemain = {};
        break;

      case SWITCH_USER_FIND_DATA:
        draft.switching = true;
        draft.switchError = false;
        draft.dataSwitchFetch = {};
        break;
      case SWITCH_USER_FIND_DATA_SUCCESS:
        draft.switching = false;
        draft.switchError = false;
        draft.dataSwitchFetch = action.payload.data;
        break;
      case SWITCH_USER_FIND_DATA_ERROR:
        draft.switching = false;
        draft.switchError = action.payload;
        break;
      case SWITCH_USER_FIND_DATA_CLEANUP:
        draft.switching = false;
        draft.switchError = false;
        draft.dataSwitchFetch = {};
        break;

      case GET_CONSULTANT_CALENDAR:
        draft.loadingConsultantCalendar = true;
        draft.errorConsultantCalendar = false;
        draft.dataConsultantCalendar = {};
        break;
      case GET_CONSULTANT_CALENDAR_SUCCESS:
        draft.loadingConsultantCalendar = false;
        draft.errorConsultantCalendar = false;
        draft.dataConsultantCalendar = action.payload.data;
        break;
      case GET_CONSULTANT_CALENDAR_ERROR:
        draft.loadingConsultantCalendar = false;
        draft.errorConsultantCalendar = action.payload;
        break;
      case GET_CONSULTANT_CALENDAR_CLEANUP:
        draft.loadingConsultantCalendar = false;
        draft.errorConsultantCalendar = false;
        draft.dataConsultantCalendar = {};
        break;
    }
  });

export default saleConsultantReducer;
