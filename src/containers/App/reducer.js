/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT,
  RESET_LOG_IN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';
import {
  saveLogInInfo,
  loadLogInInfo,
  removeLogInInfo,
} from '../../helpers/localStorage';

const {storageAdmin, storageToken} = loadLogInInfo();

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  status: false,
  userData: {
    repositories: false,
  },
  adminData: storageAdmin,
  accessToken: storageToken,
  systemSetting: ''
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOG_IN:
        draft.loading = true;
        draft.error = false;
        draft.adminData = {};
        draft.accessToken = null;
        break;

      case LOG_IN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.adminData = action.payload.data.user;
        draft.accessToken = action.payload.data.token;
        saveLogInInfo(draft.accessToken, draft.adminData);
        break;

      case LOG_IN_ERROR:
        draft.loading = false;
        draft.status = action.error.response.status;
        draft.error = action.error.response.data;
        break;

      case LOG_OUT:
        removeLogInInfo();
        draft.adminData = {};
        draft.accessToken = null;
        break;

      case RESET_LOG_IN_ERROR:
        draft.error = false;
        break;

      case RESET_PASSWORD:
        draft.loading = true;
        draft.error = false;
        break;

      case RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.status = action.payload.status;
        break;

      case RESET_PASSWORD_ERROR:
        draft.loading = false;
        draft.status = action.error.response.status;
        draft.error = action.error.response.data;
        break;
    }
  });

export default appReducer;
