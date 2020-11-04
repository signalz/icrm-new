import React from "react";
import loadable from "./utils/loadable";
import LoadingIndicator from "./components/LoadingIndicator";
import LoadingSpin from "./components/LoadingSpin";

const asyncComponent = path =>
  loadable(() => import(`${path}/index`), {
    fallback: <LoadingSpin />
  });

const routes = [
  {
    path: "/",
    exact: true,
    public: false,
    component: asyncComponent("./containers/HomePage")
  },
  {
    path: "/login",
    exact: true,
    public: true,
    component: asyncComponent("./containers/Login")
  },
  {
    path: "/reset-password",
    exact: true,
    public: true,
    component: asyncComponent("./containers/ForgotPassword")
  },
  {
    path: "/404",
    all: true,
    component: asyncComponent("./containers/NotFoundPage")
  },
  {
    path: "/customers",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Customer/Index")
  },
  {
    path: "/customer/:id/show",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Customer/Show")
  },
  {
    path: "/customer/:id/edit",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Customer/Edit")
  },
  {
    path: "/customer/create",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Customer/Create")
  },
  {
    path: "/branches",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Branch/Index")
  },
  {
    path: "/campaigns",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Campaign/Index")
  },
  {
    path: "/campaign/create",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Campaign/Create")
  },
  {
    path: "/roles",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Role/Index")
  },
  {
    path: "/users",
    exact: true,
    public: false,
    component: asyncComponent("./containers/User/Index")
  },
  {
    path: "/user/create",
    exact: true,
    public: false,
    component: asyncComponent("./containers/User/Create")
  },
  // =================================> setting
  {
    path: "/process/consultation-1",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Process/Consultation")
  },
  {
    path: "/process/consultation-2",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Process/Consultation2")
  },
  {
    path: "/process/sale-1",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Process/Sale")
  },
  {
    path: "/process/sale-2",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Process/Sale2")
  },
  {
    path: "/settings",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Setting/Index")
  },
  {
    path: "/process/markets",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Process/Market")
  },
  //===================================================> Sale
  {
    path: "/sale/process",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Process/Index")
  },
  {
    path: "/sale/consultants-1",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Consultant/Index")
  },
  {
    path: "/sale/consultants-1/calendar",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Consultant/IndexCalendar")
  },
  {
    path: "/sale/consultants-2/calendar",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Consultant/IndexCalendar2")
  },
  {
    path: "/sale/consultants-2",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Consultant/Index2")
  },
  {
    path: "/sale/sale-1",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Sale/Index")
  },
  {
    path: "/sale/sale-2",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Sale/Sale/Index2")
  },
  //===================================================> End sale
  {
    path: "/settings/sale/customer",
    exact: true,
    public: false,
    component: asyncComponent("./containers/Setting/CustomerType")
  }
];

export default routes;
