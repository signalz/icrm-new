import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import {
  Layout,
  Table,
  Button,
  Modal,
  notification,
  Card,
  Form,
  Input
} from "antd";
import {
  EditTwoTone,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  getListCleanup,
  createCustomerType,
  createCustomerTypeCleanUp
} from "./actions";
import { isObjectEmpty } from "../../../helpers/globals";
// import Pagination from "../../../components/Pagination/pagination";
import { useHistory } from "react-router-dom";
// import { updateDetailCustomer } from "../../Customer/actions";

export function CustomerTypeList({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const [form] = Form.useForm();

  const customerTypeList = useSelector(
    state => state.customerType.dataCustomerTypeFetch
  );
  const createDataError = useSelector(
    state => state.customerType.createDataError
  );
  const createdData = useSelector(state => state.customerType.createdData);
  const [loading, setLoading] = useState(true);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [paginateInfo, setPaginateInfo] = useState({});
  // const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  // const [visibleDelete, setVisibleDelete] = useState(false);

  useEffect(() => {
    dispatch(getList());
    return function cleanup() {
      dispatch(getListCleanup());
    };
  }, []);

  useEffect(() => {
    const showNofication = async () => {
      if (createDataError) {
        notification["error"]({
          message: "Tạo phân loại khách hàng không thành công!",
          description: ""
        });
      } else if (createdData) {
        notification["success"]({
          message: "Tạo phân loại khách hàng thành công!",
          description: ""
        });
        form.setFieldsValue({
          customer_type_name: ""
        });
      }
      await setLoading(false);
    };
    showNofication();
    return function cleanup() {
      dispatch(createCustomerTypeCleanUp());
    };
  }, [createDataError, createdData]);

  // useEffect(() => {
  //   if (branchLists && !isObjectEmpty(branchLists) && isRenderPaginate) {
  //     // let { branches } = branchLists;
  //     // setPaginateInfo(branches);
  //     // setIsRenderPaginate(false);
  //   }
  // }, [branchLists]);

  // useEffect(() => {
  //     if (deleteCustomerError) {
  //         notification['error']({
  //             message: 'Xóa không thành công',
  //             description: '',
  //         })
  //     } else if (deletedCustomer) {
  //         notification['success']({
  //             message: 'Xóa thành công',
  //             description: '',
  //         });
  //         let conditions = {
  //             page: currentPage
  //         };
  //         dispatch(getList(currentPage ? conditions : {}));
  //     }
  // }, [deleteCustomerError, deletedCustomer])

  // const handlePageClick = data => {
  //   let selected = data.selected;
  //   setCurrentPage(selected + 1);
  // };

  // const destroy = (value) => {
  //     Modal.confirm({
  //         title: 'Bạn có thực sự muốn xóa?',
  //         icon: <ExclamationCircleOutlined />,
  //         okText: 'Đồng ý',
  //         cancelText: 'Hủy',
  //         onOk: () => onDeleteCustomer(value)
  //     })
  // };
  //
  // const onDeleteCustomer = (value) => {
  //     dispatch(deleteCustomer({}, value.id));
  // }
  //
  // const showCustomer = (customerId) => {
  //     let showUrl = `/customer/${customerId}/show`;
  //     history.push({
  //         pathname: showUrl ,
  //     });
  // }
  var [customerTypes, setCustomerTypes] = useState([]);
  useEffect(() => {
    if (customerTypeList && !isObjectEmpty(customerTypeList)) {
      const data = [];
      var { customer_types } = customerTypeList;
      for (let i = 0; i < customer_types.length; i++) {
        let action = (
          <div className="d-flex justify-content-center align-items-center col-2">
            <EditTwoTone className="on-hover" />
            &nbsp;&nbsp;
            <DeleteOutlined className="on-hover" />
          </div>
        );
        let card = (
          <Card className="list-role" title="sadas" key={i}>
            <div className="row">
              <div className="col-10">
                <label className="content-title">
                  {customer_types[i].name}
                </label>
              </div>
              {action}
            </div>
          </Card>
        );
        data.push(card);
      }
      setCustomerTypes(data);
    }
  }, [customerTypeList]);

  const onFinish = values => {
    setLoading(true);
    dispatch(createCustomerType({ name: values.customer_type_name }));
  };
  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "customer.title" })}</title>
        <meta
          name="description"
          content={formatMessage({ id: "customer.title" })}
        />
      </Helmet>
      <div style={{ padding: "0 24px 24px" }}>
        {loading ? (
          <LoadingSpin> </LoadingSpin>
        ) : (
          <Content className="site-layout-background role-show">
            <div className="d-flex justify-content-between">
              <span>
                Trang chủ > Cài Đặt > Cài đặt bán hàng > Cài đặt khách hàng
              </span>
            </div>
            <br />
            <p className="title-group">Phân loại khách hàng</p>
            <div className="row d-flex ">
              <div className="col-md-6 col-6">{customerTypes}</div>
              <div className="col-md-6 col-6">
                <Card title="Phân loại khách hàng">
                  <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="item-required">Tên mức độ</label>
                          <Form.Item
                            name="customer_type_name"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập chức danh" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <Form.Item>
                          <Button
                            style={{ float: "right" }}
                            type="primary"
                            htmlType="submit"
                          >
                            Tạo
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                </Card>
              </div>
            </div>
          </Content>
        )}
      </div>
    </Fragment>
  );
}

export default injectIntl(CustomerTypeList);
