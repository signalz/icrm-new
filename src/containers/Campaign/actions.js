import {
  GET_LIST_CAMPAIGN,
  GET_LIST_CAMPAIGN_SUCCESS,
  GET_LIST_CAMPAIGN_ERROR,
  GET_LIST_CAMPAIGN_CLEANUP,

  GET_DATA_FOR_CREATE_CAMPAIGN,
  GET_DATA_FOR_CREATE_CAMPAIGN_SUCCESS,
  GET_DATA_FOR_CREATE_CAMPAIGN_ERROR,
  GET_DATA_FOR_CREATE_CAMPAIGN_CLEANUP,

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

  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_ERROR,
  CREATE_CAMPAIGN_CLEANUP
} from "./constants";

// get list
export function getList(payload) {
  return {
    type: GET_LIST_CAMPAIGN,
    payload
  };
}

export function getListSuccess(payload) {
  return {
    type: GET_LIST_CAMPAIGN_SUCCESS,
    payload
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_CAMPAIGN_ERROR,
    error
  };
}

export function getListCleanup() {
  return {
    type: GET_LIST_CAMPAIGN_CLEANUP
  };
}

// get data for create customer
export function getDataForCreateCampaign(payload, param) {
  return {
    type: GET_DATA_FOR_CREATE_CAMPAIGN,
    payload,
    param
  };
}

export function getDataForCreateCampaignSuccess(payload) {
  return {
    type: GET_DATA_FOR_CREATE_CAMPAIGN_SUCCESS,
    payload
  };
}

export function getDataForCreateCampaignError(payload) {
  return {
    type: GET_DATA_FOR_CREATE_CAMPAIGN_ERROR,
    payload
  };
}

export function getDataForCreateCampaignCleanup() {
  return {
    type: GET_DATA_FOR_CREATE_CAMPAIGN_CLEANUP
  };
}

// create Campaign
export function createCampaign(payload) {
  return {
    type: CREATE_CAMPAIGN,
    payload
  };
}

export function createCampaignSuccess(payload) {
  return {
    type: CREATE_CAMPAIGN_SUCCESS,
    payload
  };
}

export function createCampaignError(payload) {
  return {
    type: CREATE_CAMPAIGN_ERROR,
    payload
  };
}

export function createCampaignCleanup(payload) {
  return {
    type: CREATE_CAMPAIGN_CLEANUP,
    payload
  };
}

// get detail
export function getDetailCampaign(payload, param) {
  return {
    type: GET_DETAIL_CAMPAIGN,
    payload,
    param
  };
}

export function getDetailCampaignSuccess(payload) {
  return {
    type: GET_DETAIL_CAMPAIGN_SUCCESS,
    payload
  };
}

export function getDetailCampaignError(payload) {
  return {
    type: GET_DETAIL_CAMPAIGN_ERROR,
    payload
  };
}

export function getDetailCampaignCleanup() {
  return {
    type: GET_DETAIL_CAMPAIGN_CLEANUP
  };
}

//update Campaign
export function updateDetailCampaign(payload, param) {
  return {
    type: UPDATE_DETAIL_CAMPAIGN,
    payload,
    param
  };
}

export function updateDetailCampaignSuccess(payload) {
  return {
    type: UPDATE_DETAIL_CAMPAIGN_SUCCESS,
    payload
  };
}

export function updateDetailCampaignError(payload) {
  return {
    type: UPDATE_DETAIL_CAMPAIGN_ERROR,
    payload
  };
}

export function updateDetailCampaignCleanup() {
  return {
    type: UPDATE_DETAIL_CAMPAIGN_CLEANUP
  };
}

// delete Campaign
export function deleteCampaign(payload, param) {
  return {
    type: DELETE_CAMPAIGN,
    payload,
    param
  };
}

export function deleteCampaignSuccess(payload) {
  return {
    type: DELETE_CAMPAIGN_SUCCESS,
    payload
  };
}

export function deleteCampaignError(error) {
  return {
    type: DELETE_CAMPAIGN_ERROR,
    error
  };
}

export function deleteCampaignCleanUp(error) {
  return {
    type: DELETE_CAMPAIGN_CLEANUP,
    error
  };
}
