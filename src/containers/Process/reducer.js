import produce from "immer";
import {
  GET_LIST_PROCESS,
  GET_LIST_SUCCESS_PROCESS,
  GET_LIST_ERROR_PROCESS,
  GET_LIST_CLEANUP_PROCESS,

  CREATE_PROCESS_SUCCESS,
  CREATE_PROCESS_ERROR,
  CREATE_PROCESS,
  CREATE_PROCESS_CLEANUP,

  EDIT_PROCESS_CLEANUP,
  EDIT_PROCESS_ERROR,
  EDIT_PROCESS_SUCCESS,
  EDIT_PROCESS,

  DELETE_PROCESS,
  DELETE_PROCESS_CLEANUP,
  DELETE_PROCESS_ERROR,
  DELETE_PROCESS_SUCCESS,

  GET_LIST_MARKET_ERROR,
  GET_LIST_MARKET_CLEANUP,
  GET_LIST_MARKET_SUCCESS,
  GET_LIST_MARKET,

  DELETE_MARKET,
  DELETE_MARKET_CLEANUP,
  DELETE_MARKET_ERROR,
  DELETE_MARKET_SUCCESS,

  CREATE_MARKET_CLEANUP,
  CREATE_MARKET_ERROR,
  CREATE_MARKET_SUCCESS,
  CREATE_MARKET,

  EDIT_MARKET_CLEANUP,
  EDIT_MARKET_ERROR,
  EDIT_MARKET_SUCCESS,
  EDIT_MARKET,
} from "./constants";
import {
  createDataError,
  createDataSuccess,
  createData,
  createDataCleanUp
} from "../ReduxShared/reducer";

export const initialState = {
  process_name: ""
};

const processReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PROCESS:
        draft.loading = true;
        draft.error = false;
        draft.dataProcessFetch = {};
        break;
      case GET_LIST_SUCCESS_PROCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataProcessFetch = action.payload;
        break;
      case GET_LIST_ERROR_PROCESS:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CLEANUP_PROCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataProcessFetch = {};
        break;
      case CREATE_PROCESS:
        createData(draft, action);
        break;
      case CREATE_PROCESS_SUCCESS:
        draft.dataProcessFetch.data.unshift(action.payload.data);
        createDataSuccess(draft, action);
        break;
      case CREATE_PROCESS_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_PROCESS_CLEANUP:
        createDataCleanUp(draft, action);
        break;

      case EDIT_PROCESS:
        draft.changingProcess = true;
        draft.changedProcess = false;
        draft.changProcessError = false;
        break;
      case EDIT_PROCESS_SUCCESS:
        draft.changingProcess = false;
        draft.changedProcess = true;
        draft.changProcessError = false;
        draft.processResponse = action.payload.data;
        break;
      case EDIT_PROCESS_ERROR:
        draft.changingProcess = false;
        draft.changProcessError = false;
        draft.changCustomerError = action.payload;
        break;
      case EDIT_PROCESS_CLEANUP:
        draft.changingProcess = false;
        draft.changedProcess = false;
        draft.changProcessError = false;
        break;

      case DELETE_PROCESS:
        draft.deletingProcess = true;
        draft.deletedProcess = false;
        draft.deleteProcessError = false;
        break;
      case DELETE_PROCESS_SUCCESS:
        draft.deletingProcess = false;
        draft.deletedProcess = true;
        draft.deleteProcessError = false;
        draft.responseDeleteProcess = action.payload.data;
        break;
      case DELETE_PROCESS_ERROR:
        draft.deletingProcess = false;
        draft.deletedProcess = false;
        draft.deleteProcessError = action.error.response;
        break;
      case DELETE_PROCESS_CLEANUP:
        draft.deletingProcess = false;
        draft.deletedProcess = false;
        draft.deleteProcessError = false;
        break;

      case GET_LIST_MARKET:
        draft.loading = true;
        draft.error = false;
        draft.dataMarketFetch = {};
        break;
      case GET_LIST_MARKET_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataMarketFetch = action.payload;
        break;
      case GET_LIST_MARKET_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_MARKET_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataMarketFetch = {};
        break;

      case DELETE_MARKET:
        draft.deletingMarket = true;
        draft.deletedMarket = false;
        draft.deleteMarketError = false;
        break;
      case DELETE_MARKET_SUCCESS:
        draft.deletingMarket = false;
        draft.deletedMarket = true;
        draft.deleteMarketError = false;
        draft.responseDeleteMarket = action.payload.data;
        break;
      case DELETE_MARKET_ERROR:
        draft.deletingMarket = false;
        draft.deletedMarket = false;
        draft.deleteMarketError = action.error.response;
        break;
      case DELETE_MARKET_CLEANUP:
        draft.deletingMarket = false;
        draft.deletedMarket = false;
        draft.deleteMarketError = false;
        break;

      case CREATE_MARKET:
        draft.creatingMarket = true;
        draft.createdMarket = false;
        draft.createMakerError = false;
        break;
      case CREATE_MARKET_SUCCESS:
        draft.creatingMarket = false;
        draft.createdMarket = true;
        draft.createMakerError = false;
        draft.responseCreatedMarket = action.payload;
        break;
      case CREATE_MARKET_ERROR:
        draft.creatingMarket = false;
        draft.createdMarket = false;
        draft.createMakerError = action.payload;
        break;
      case CREATE_MARKET_CLEANUP:
        draft.creatingMarket = false;
        draft.createdMarket = false;
        draft.createMakerError = false;
        draft.responseCreatedMarket = {};
        break;

      case EDIT_MARKET:
        draft.changingMarket = true;
        draft.changedMarket = false;
        draft.changMarketError = false;
        break;
      case EDIT_MARKET_SUCCESS:
        draft.changingMarket = false;
        draft.changedMarket = true;
        draft.changMarketError = false;
        draft.marketResponse = action.payload.data;
        break;
      case EDIT_MARKET_ERROR:
        draft.changingMarket = false;
        draft.changedMarket = true;
        draft.changMarketError = action.payload;
        break;
      case EDIT_MARKET_CLEANUP:
        draft.changingMarket = false;
        draft.changedMarket = false;
        draft.changMarketError = false;
        draft.marketResponse = false;
        break;
    }
  });

export default processReducer;
