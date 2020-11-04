import produce from "immer";
import {
  GET_LIST_CUSTOMER_TYPE,
  GET_LIST_SUCCESS_CUSTOMER_TYPE,
  GET_LIST_ERROR_CUSTOMER_TYPE,
  GET_LIST_CLEANUP_CUSTOMER_TYPE,
  CREATE_CUSTOMER_TYPE_SUCCESS,
  CREATE_CUSTOMER_TYPE_ERROR,
  CREATE_CUSTOMER_TYPE,
  CREATE_CUSTOMER_TYPE_CLEANUP
} from "./constants";
import {
  createDataError,
  createDataSuccess,
  createData,
  createDataCleanUp
} from "../../ReduxShared/reducer";

export const initialState = {
  customer_type: ""
};

const customerTypeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_CUSTOMER_TYPE:
        draft.loading = true;
        draft.error = false;
        draft.dataCustomerTypeFetch = {};
        break;
      case GET_LIST_SUCCESS_CUSTOMER_TYPE:
        draft.loading = false;
        draft.error = false;
        draft.dataCustomerTypeFetch = action.payload.data;
        break;
      case GET_LIST_ERROR_CUSTOMER_TYPE:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CLEANUP_CUSTOMER_TYPE:
        draft.loading = false;
        draft.error = false;
        draft.dataCustomerTypeFetch = {};
        break;
      case CREATE_CUSTOMER_TYPE:
        createData(draft, action);
        break;
      case CREATE_CUSTOMER_TYPE_SUCCESS:
        draft.dataCustomerTypeFetch.customer_types.unshift(action.payload.data);
        createDataSuccess(draft, action);
        break;
      case CREATE_CUSTOMER_TYPE_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_CUSTOMER_TYPE_CLEANUP:
        createDataCleanUp(draft, action);
        break;
    }
  });

export default customerTypeReducer;
