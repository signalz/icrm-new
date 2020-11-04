import produce from "immer";
import {
  GET_LIST_ROLE,
  GET_LIST_SUCCESS_ROLE,
  GET_LIST_ERROR_ROLE,
  GET_LIST_CLEANUP_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_ERROR,
  CREATE_ROLE,
  CREATE_ROLE_CLEANUP
} from "./constants";
import {
  createDataError,
  createDataSuccess,
  createData,
  createDataCleanUp
} from "../ReduxShared/reducer";

export const initialState = {
  role_name: ""
};

const roleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROLE:
        draft.loading = true;
        draft.error = false;
        draft.dataRoleFetch = {};
        break;
      case GET_LIST_SUCCESS_ROLE:
        draft.loading = false;
        draft.error = false;
        draft.dataRoleFetch = action.payload.data;
        break;
      case GET_LIST_ERROR_ROLE:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CLEANUP_ROLE:
        draft.loading = false;
        draft.error = false;
        draft.dataRoleFetch = {};
        break;
      case CREATE_ROLE:
        createData(draft, action);
        break;
      case CREATE_ROLE_SUCCESS:
        draft.dataRoleFetch.roles.unshift(action.payload.data);
        createDataSuccess(draft, action);
        break;
      case CREATE_ROLE_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_ROLE_CLEANUP:
        createDataCleanUp(draft, action);
        break;
    }
  });

export default roleReducer;
