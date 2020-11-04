import produce from "immer";
import {
  GET_LIST_USER,
  GET_LIST_SUCCESS,
  GET_LIST_ERROR,
  GET_LIST_CLEANUP,
  GET_DETAIL_USER,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_ERROR,
  GET_DETAIL_USER_CLEANUP,
  UPDATE_DETAIL_USER,
  UPDATE_DETAIL_USER_SUCCESS,
  UPDATE_DETAIL_USER_ERROR,
  UPDATE_DETAIL_USER_CLEANUP,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_CLEANUP,
  GET_DATA_FOR_CREATE_USER,
  GET_DATA_FOR_CREATE_USER_SUCCESS,
  GET_DATA_FOR_CREATE_USER_ERROR,
  GET_DATA_FOR_CREATE_USER_CLEANUP,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_CLEANUP
} from "./constants";

import {
  createData,
  createDataSuccess,
  createDataError,
  createDataCleanUp
} from "../ReduxShared/reducer";

export const initialState = {};

const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_USER:
        draft.loading = true;
        draft.error = false;
        draft.dataUserFetch = {};
        break;
      case GET_LIST_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataUserFetch = action.payload.data;
        break;
      case GET_LIST_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataUserFetch = {};
        break;
      case GET_DETAIL_USER:
        draft.loading = true;
        draft.error = false;
        draft.userDetailFetch = {};
        break;
      case GET_DETAIL_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.userDetailFetch = action.payload;
        break;
      case GET_DETAIL_USER_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_DETAIL_USER_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.userDetailFetch = {};
        break;
      case UPDATE_DETAIL_USER:
        draft.user = true;
        draft.user = false;
        draft.userError = false;
        break;
      case UPDATE_DETAIL_USER_SUCCESS:
        draft.user = false;
        draft.user = true;
        draft.userError = false;
        draft.response = action.payload;
        break;
      case UPDATE_DETAIL_USER_ERROR:
        draft.user = false;
        draft.user = false;
        draft.userError = action.payload;
        break;
      case UPDATE_DETAIL_USER_CLEANUP:
        draft.user = false;
        draft.user = false;
        draft.userError = false;
        break;
      case DELETE_USER:
        draft.user = true;
        draft.user = false;
        draft.userError = false;
        break;
      case DELETE_USER_SUCCESS:
        draft.user = false;
        draft.user = true;
        draft.userError = false;
        draft.response = action.payload;
        break;
      case DELETE_USER_ERROR:
        draft.user = false;
        draft.user = false;
        draft.userError = action.error.response;
        break;
      case DELETE_USER_CLEANUP:
        draft.user = false;
        draft.user = false;
        draft.userError = false;
        break;
      case GET_DATA_FOR_CREATE_USER:
        draft.loading = true;
        draft.error = false;
        draft.prepareUserData = {};
        break;
      case GET_DATA_FOR_CREATE_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.prepareUserData = action.payload;
        break;
      case GET_DATA_FOR_CREATE_USER_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_DATA_FOR_CREATE_USER_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.prepareUserData = {};
        break;
      case CREATE_USER:
        createData(draft, action);
        break;
      case CREATE_USER_SUCCESS:
        createDataSuccess(draft, action);
        break;
      case CREATE_USER_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_USER_CLEANUP:
        createDataCleanUp(draft, action);
        break;
    }
  });

export default userReducer;
