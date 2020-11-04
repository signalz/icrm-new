import produce from "immer";
import {
  GET_LIST_CAMPAIGN,
  GET_LIST_CAMPAIGN_CLEANUP,
  GET_LIST_CAMPAIGN_ERROR,
  GET_LIST_CAMPAIGN_SUCCESS,
  GET_DETAIL_CAMPAIGN,
  GET_DETAIL_CAMPAIGN_SUCCESS,
  GET_DETAIL_CAMPAIGN_ERROR,
  GET_DETAIL_CAMPAIGN_CLEANUP,
  UPDATE_DETAIL_CAMPAIGN,
  UPDATE_DETAIL_CAMPAIGN_SUCCESS,
  UPDATE_DETAIL_CAMPAIGN_ERROR,
  UPDATE_DETAIL_CAMPAIGN_CLEANUP,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_CLEANUP,
  GET_DATA_FOR_CREATE_CAMPAIGN,
  GET_DATA_FOR_CREATE_CAMPAIGN_SUCCESS,
  GET_DATA_FOR_CREATE_CAMPAIGN_ERROR,
  GET_DATA_FOR_CREATE_CAMPAIGN_CLEANUP,
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_ERROR,
  CREATE_CAMPAIGN_CLEANUP
} from "./constants";

import {
  createData,
  createDataSuccess,
  createDataError,
  createDataCleanUp
} from "../ReduxShared/reducer";

export const initialState = {};

const campaignReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_CAMPAIGN:
        draft.loading = true;
        draft.error = false;
        draft.dataCampaignFetch = {};
        break;
      case GET_LIST_CAMPAIGN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataCampaignFetch = action.payload.data;
        break;
      case GET_LIST_CAMPAIGN_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_LIST_CAMPAIGN_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataCampaignFetch = {};
        break;
      case GET_DETAIL_CAMPAIGN:
        draft.loading = true;
        draft.error = false;
        draft.dataCampaignDetailFetch = {};
        break;
      case GET_DETAIL_CAMPAIGN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.dataCampaignDetailFetch = action.payload;
        break;
      case GET_DETAIL_CAMPAIGN_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_DETAIL_CAMPAIGN_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.dataCampaignDetailFetch = {};
        break;
      case UPDATE_DETAIL_CAMPAIGN:
        draft.changingCampaign = true;
        draft.changedCampaign = false;
        draft.changCampaignError = false;
        break;
      case UPDATE_DETAIL_CAMPAIGN_SUCCESS:
        draft.changingCampaign = false;
        draft.changedCampaign = true;
        draft.changCampaignError = false;
        draft.response = action.payload;
        break;
      case UPDATE_DETAIL_CAMPAIGN_ERROR:
        draft.changingCampaign = false;
        draft.changedCampaign = false;
        draft.changCampaignError = action.payload;
        break;
      case UPDATE_DETAIL_CAMPAIGN_CLEANUP:
        draft.changingCampaign = false;
        draft.changedCampaign = false;
        draft.changCampaignError = false;
        break;
      case DELETE_CAMPAIGN:
        draft.deletingCampaign = true;
        draft.deletedCampaign = false;
        draft.deleteCampaignError = false;
        break;
      case DELETE_CAMPAIGN_SUCCESS:
        draft.deletingCampaign = false;
        draft.deletedCampaign = true;
        draft.deleteCampaignError = false;
        draft.response = action.payload;
        break;
      case DELETE_CAMPAIGN_ERROR:
        draft.deletingCampaign = false;
        draft.deletedCampaign = false;
        draft.deleteCampaignError = action.error.response;
        break;
      case DELETE_CAMPAIGN_CLEANUP:
        draft.deletingCampaign = false;
        draft.deletedCampaign = false;
        draft.deleteCampaignError = false;
        break;
      case GET_DATA_FOR_CREATE_CAMPAIGN:
        draft.loading = true;
        draft.error = false;
        draft.prepareCampaignData = {};
        break;
      case GET_DATA_FOR_CREATE_CAMPAIGN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.prepareCampaignData = action.payload;
        break;
      case GET_DATA_FOR_CREATE_CAMPAIGN_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case GET_DATA_FOR_CREATE_CAMPAIGN_CLEANUP:
        draft.loading = false;
        draft.error = false;
        draft.prepareCampaignData = {};
        break;
      case CREATE_CAMPAIGN:
        createData(draft, action);
        break;
      case CREATE_CAMPAIGN_SUCCESS:
        createDataSuccess(draft, action);
        break;
      case CREATE_CAMPAIGN_ERROR:
        createDataError(draft, action);
        break;
      case CREATE_CAMPAIGN_CLEANUP:
        createDataCleanUp(draft, action);
        break;
    }
  });

export default campaignReducer;
