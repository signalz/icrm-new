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
  createBranch,
  createBranchCleanup
} from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";
import Pagination from "../../../components/Pagination/pagination";
import { useHistory } from "react-router-dom";
import { updateDetailCustomer } from "../../Customer/actions";

export function BranchList({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const [form] = Form.useForm();

  const branchLists = useSelector(state => state.branch.dataBranchFetch);
  const createDataError = useSelector(state => state.branch.createDataError);
  const createdData = useSelector(state => state.branch.createdData);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginateInfo, setPaginateInfo] = useState({});
  const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  const [visibleDelete, setVisibleDelete] = useState(false);

  useEffect(() => {
    let conditions = {
      page: currentPage
    };
    dispatch(getList(currentPage ? conditions : {}));
    return function cleanup() {
      dispatch(getListCleanup());
    };
  }, [currentPage]);

  useEffect(() => {
    const showNofication = async () => {
      if (createDataError) {
        notification["error"]({
          message: "Tạo cơ sở không thành công!",
          description: ""
        });
      } else if (createdData) {
        notification["success"]({
          message: "Tạo cở sở thành công!",
          description: ""
        });
        let conditions = {
          page: currentPage
        };
        await dispatch(getList(currentPage ? conditions : {}));
        await form.setFieldsValue({
          code: "",
          phone: "",
          address: "",
          name: ""
        });
      }
      await setLoading(false);
    };
    showNofication();
    return function cleanup() {
      dispatch(createBranchCleanup());
    };
  }, [createDataError, createdData]);

  useEffect(() => {
    if (branchLists && !isObjectEmpty(branchLists) && isRenderPaginate) {
      let { branches } = branchLists;
      setPaginateInfo(branches);
      setIsRenderPaginate(false);
    }
  }, [branchLists]);

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

  const handlePageClick = data => {
    let selected = data.selected;
    setCurrentPage(selected + 1);
  };

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

  var data = [];
  if (branchLists && !isObjectEmpty(branchLists)) {
    var { branches } = branchLists;
    for (let i = 0; i < branches.length; i++) {
      let action = (
        <div className="d-flex justify-content-center align-items-center">
          <EditTwoTone className="on-hover" />
          &nbsp;&nbsp;
          <DeleteOutlined className="on-hover" />
        </div>
      );
      let card = (
        <Card title={branches[i].name} extra={action} key={i}>
          <div className="row form-inline">
            <div className="col-md-12">
              <div className="form-inline">
                <HomeOutlined className="on-hover" />
                <p style={{ paddingTop: "15px", paddingLeft: "10px" }}>
                  {branches[i].address}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-inline">
                <PhoneOutlined className="on-hover" />
                <p style={{ paddingTop: "15px", paddingLeft: "10px" }}>
                  {branches[i].phone}
                </p>
              </div>
            </div>
          </div>
        </Card>
      );
      data.push(card);
    }
  }
  const onFinish = values => {
    setLoading(true);
    dispatch(createBranch(values));
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
          <Content className="site-layout-background customer">
            <div className="d-flex justify-content-between">
              <span>Cài Đặt > Cơ sở</span>
            </div>
            <br />

            <div className="row col-12 d-flex ">
              <div className="col-md-6 col-6">{data}</div>
              <div className="col-md-6 col-6">
                <Card title="Tạo cơ sở" extra={<a href="#">More</a>}>
                  <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Mã cơ sở</label>
                          <Form.Item
                            name="code"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập mã cơ sở" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Tên cơ sở</label>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập tên cơ sở" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Địa chỉ</label>
                          <Form.Item
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập địa chỉ" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <Form.Item
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập số điện thoại" />
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
                            Submit
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

export default injectIntl(BranchList);
