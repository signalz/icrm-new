import { all } from "redux-saga/effects";
import globalSagas from "./containers/App/saga";
import customerSagas from "./containers/Customer/saga";
import campaignSagas from "./containers/Campaign/saga";
import branchSagas from "./containers/Branch/saga";
import roleSagas from "./containers/Role/saga";
import userSagas from "./containers/User/saga";
import processSagas from "./containers/Process/saga";
import customerTypeSagas from "./containers/Setting/CustomerType/saga";
import consultantSagas from "./containers/Sale/Consultant/saga";
import saleSagas from "./containers/Sale/Sale/saga";
import saleConfigSagas from "./containers/Sale/saga";

export default function* rootSaga() {
  yield all([
    globalSagas(),
    customerSagas(),
    campaignSagas(),
    branchSagas(),
    roleSagas(),
    userSagas(),
    processSagas(),
    customerTypeSagas(),
    consultantSagas(),
    saleSagas(),
    saleConfigSagas(),
  ]);
}
