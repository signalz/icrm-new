/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "./utils/history";
import globalReducer from "./containers/App/reducer";
import languageProviderReducer from "./containers/LanguageProvider/reducer";
import customerReducer from "./containers/Customer/reducer";
import campaginReducer from "./containers/Campaign/reducer";
import branchReducer from "./containers/Branch/reducer";
import roleReducer from "./containers/Role/reducer";
import userReducer from "./containers/User/reducer";
import processReducer from "./containers/Process/reducer";
import customerTypeReducer from "./containers/Setting/CustomerType/reducer";
import saleConsultantReducer from "./containers/Sale/Consultant/reducer";
import saleSaleReducer from "./containers/Sale/Sale/reducer";
import saleConfigReducer from "./containers/Sale/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    customer: customerReducer,
    campaign: campaginReducer,
    branch: branchReducer,
    role: roleReducer,
    user: userReducer,
    customerType: customerTypeReducer,
    process: processReducer,
    saleConsultantReducer: saleConsultantReducer,
    saleSaleReducer: saleSaleReducer,
    saleConfigReducer: saleConfigReducer,
    router: connectRouter(history),
    ...injectedReducers
  });
  return rootReducer;
}
