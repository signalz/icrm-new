import { call, put, takeEvery, all } from "redux-saga/effects";
import { RestfulEntityApi } from "../../restfulApi";

import {
  getListSuccess,
  getListError,
  getDetailCampaignSuccess,
  getDetailCampaignError,
  updateDetailCampaignSuccess,
  updateDetailCampaignError,
  deleteCampaignSuccess,
  deleteCampaignError,
  getDataForCreateCampaignSuccess,
  getDataForCreateCampaignError,
  createCampaignSuccess,
  createCampaignError
} from "./actions";

import {
  GET_LIST_CAMPAIGN,
  GET_DETAIL_CAMPAIGN,
  UPDATE_DETAIL_CAMPAIGN,
  DELETE_CAMPAIGN,
  GET_DATA_FOR_CREATE_CAMPAIGN,
  CREATE_CAMPAIGN
} from "./constants";

const getListCampaignApi = RestfulEntityApi("marketing/campaign/index");
const getDetailCampaignApi = RestfulEntityApi("marketing/campaign/edit");
const updateDetailCampaignApi = RestfulEntityApi("marketing/campaign/update");
const deleteCampaignApi = RestfulEntityApi("marketing/campaign");

// prepare Campaign Api
const listBranch = RestfulEntityApi("config/branch/index");
const listMarket = RestfulEntityApi("config/market/index");

const createCampaignApi = RestfulEntityApi("marketing/campaign/store");

const getListCampaign = function*({ payload }) {
  try {
    const response = yield call(getListCampaignApi.GET, "", payload);
    yield put(getListSuccess(response.data));
  } catch (err) {
    yield put(getListError(err));
  }
};

const getDetailCampaign = function*({ payload, param }) {
  try {
    const response = yield call(getDetailCampaignApi.GET, param, payload);
    yield put(getDetailCampaignSuccess(response.data));
  } catch (err) {
    yield put(getDetailCampaignError(err));
  }
};

const getDataForCreateCampaign = function*({ payload }) {
  try {
    const [branchesRes, marketsRes] = yield all([
      call(listBranch.GET, "", payload),
      call(listMarket.GET, "", payload)
    ]);
    if (branchesRes.status && marketsRes.status) {
      yield put(
        getDataForCreateCampaignSuccess({
          branches: branchesRes.data.data.branches,
          markets: marketsRes.data.data.markets
        })
      );
    }
  } catch (err) {
    yield put(getDataForCreateCampaignError(err));
  }
};

const updateDetailCampaign = function*({ payload, param }) {
  try {
    const response = yield call(updateDetailCampaignApi.PUT, param, payload);
    yield put(updateDetailCampaignSuccess(response.data));
  } catch (err) {
    yield put(updateDetailCampaignError(err));
  }
};

const deleteCampaign = function*({ payload, param }) {
  try {
    const response = yield call(deleteCampaignApi.DELETE, param, payload);
    yield put(deleteCampaignSuccess(response.data));
  } catch (err) {
    yield put(deleteCampaignError(err));
  }
};

const createCampaign = function*({ payload }) {
  try {
    const response = yield call(createCampaignApi.POST, payload);
    yield put(createCampaignSuccess(response.data));
  } catch (err) {
    yield put(createCampaignError(err));
  }
};

export default function* saga() {
  yield takeEvery(GET_LIST_CAMPAIGN, getListCampaign);
  yield takeEvery(GET_DETAIL_CAMPAIGN, getDetailCampaign);
  yield takeEvery(UPDATE_DETAIL_CAMPAIGN, updateDetailCampaign);
  yield takeEvery(DELETE_CAMPAIGN, deleteCampaign);
  yield takeEvery(GET_DATA_FOR_CREATE_CAMPAIGN, getDataForCreateCampaign);
  yield takeEvery(CREATE_CAMPAIGN, createCampaign);
}
