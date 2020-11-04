import produce from "immer";
import {
  GET_LIST_BRANCH,
  GET_LIST_SUCCESS_BRANCH,
  GET_LIST_ERROR_BRANCH,
  GET_LIST_CLEANUP_BRANCH,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_ERROR,
  CREATE_BRANCH,
  CREATE_BRANCH_CLEANUP
} from "./constants";
import {
  createDataError,
  createDataSuccess,
  createData,
  createDataCleanUp
} from "../ReduxShared/reducer";

export const initialState = {
  branch_name: ""
};

const branchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_BRANCH:
        draft.loading = true;
        draft.error = false;
        draft.dataBranchFetch = {};
        break;
      case GET_LIST_SUCCESS_BRANCH:
        draft.loading = false;
        draft.error = false;
        draft.dataBranchFetch = action.payload.data;
        break;
      case GET_LIST_ERROR_BRANCH:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CLEANUP_BRANCH:
        draft.loading = false;
        draft.error = false;
        draft.dataBranchFetch = {};
        break;
      case CREATE_BRANCH:
        createData(draft, action);
        break;
      case CREATE_BRANCH_SUCCESS:
        createDataSuccess(draft, action);
        break;
      case CREATE_BRANCH_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_BRANCH_CLEANUP:
        createDataCleanUp(draft, action);
        break;
    }
  });

export default branchReducer;
