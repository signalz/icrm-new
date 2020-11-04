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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMarket,
  getListMarket,
  getListMarketCleanup,
  createMarket,
  createMarketCleanUp,
  editMarketCleanUp,
} from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";
import { useHistory } from "react-router-dom";
import ModalEdit from "../Market/ModalEdit";

export function Market({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const [form] = Form.useForm();

  const customerTypeList = useSelector(state => state.process.dataMarketFetch);
  const createDataError = useSelector(state => state.process.createDataError);

  const deletingMarket = useSelector(state => state.process.deletingMarket);
  const deleteMarketError = useSelector(state => state.process.deleteMarketError);
  const responseDeleteMarket = useSelector(state => state.process.responseDeleteMarket);

  const createdData = useSelector(state => state.process.createdMarket);
  const responseCreatedMarket = useSelector(state => state.process.responseCreatedMarket);

  const [loading, setLoading] = useState(true);
  const [marketEdit, setMarketEdit] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getListMarket());
    return function cleanup() {
      dispatch(getListMarketCleanup());
    };
  }, []);

  useEffect(() => {
    const showNofication = async () => {
      if (createDataError) {
        notification["error"]({
          message: "Tạo thị trường không thành công!",
          description: ""
        });
        dispatch(createMarketCleanUp());
      } else if (createdData && responseCreatedMarket) {
        console.log(responseCreatedMarket)
        if (responseCreatedMarket.status) {
          notification["success"]({
            message: "Tạo thị trường thành công!",
            description: ""
          });
          form.setFieldsValue({
            customer_type_name: ""
          });
          dispatch(createMarketCleanUp());
          dispatch(getListMarket());
        } else {
          notification["error"]({
            message: responseCreatedMarket.message,
            description: ""
          });
          dispatch(createMarketCleanUp());
        }
      }
      await setLoading(false);
    };
    showNofication();

  }, [createDataError, createdData]);

  useEffect(() => {
    if (!deletingMarket && !deleteMarketError && responseDeleteMarket) {
      notification['success']({
        message: 'Xóa thành công.',
        description: '',
      });
      dispatch(getListMarket({}));
    } else if (!deletingMarket && deleteMarketError) {
      notification['error']({
        message: 'Xóa thất bại, xin vui lòng thử lại.',
        description: '',
      });
      dispatch(getListMarket({}));
    }
  }, [deletingMarket, deleteMarketError, responseDeleteMarket]);

  const onFinish = values => {
    setLoading(true);
    dispatch(createMarket({
      name: values.name,
      code: values.code ? values.code : null,
    }));
  };

  const actionEditMarket = (market) => {
    setVisible(true);
    setMarketEdit(market);
  }

  var [customerTypes, setCustomerTypes] = useState([]);
  useEffect(() => {
    if (customerTypeList && !isObjectEmpty(customerTypeList)) {
      const data = [];
      var { markets } = customerTypeList.data;
      for (let i = 0; i < markets.length; i++) {
        let action = (
          <div className="d-flex justify-content-center align-items-center col-2">
            <EditTwoTone className="on-hover action icon-action-setting" onClick={() => actionEditMarket(markets[i])}/>
            &nbsp;&nbsp;
            <DeleteOutlined className="on-hover action icon-action-setting" onClick={() => destroy(markets[i])}/>
          </div>
        );
        let card = (
          <Card className="list-role list-role-market" title={markets[i].name} key={i} extra={action}>
            <div className="row">
              <div className="col-10">
                <label className="content-title">
                  Mã thị trường: {markets[i].code}
                </label>
              </div>
            </div>
          </Card>
        );
        data.push(card);
      }
      setCustomerTypes(data);
    }
  }, [customerTypeList]);

  const destroy = (value) => {
    Modal.confirm({
      title: 'Bạn có thực sự muốn xóa?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => onDelete(value)
    })
  };

  const onDelete = (value) => {
    dispatch(deleteMarket({}, value.id));
  }

  const callbackModalVisible = (callbackModalVisible) => {
    setVisible(false);
    dispatch(editMarketCleanUp());
    dispatch(getListMarket({}));
    setMarketEdit(null);
  }

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
                Trang chủ > Cài Đặt > Cài đặt bán hàng > Thị trường
              </span>
            </div>
            <br />
            <p className="title-group">Thị trường</p>
            <div className="row d-flex ">
              <div className="col-md-6 col-6">{customerTypes}</div>
              <div className="col-md-6 col-6">
                <Card title="Tạo thị trường">
                  <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="item-required">Tên thị trường</label>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập tên thị trường" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="item-required">Mã thị trường</label>
                          <Form.Item
                            name="code"
                            rules={[
                              {
                                required: true,
                                message: "Không để trống"
                              }
                            ]}
                          >
                            <Input placeholder="Nhập mã thị trường" />
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
      <ModalEdit
        visible={visible}
        callbackModalVisible={callbackModalVisible}
        marketEdit={marketEdit}
        title={'Cập nhật thị trường'}
      />
    </Fragment>
  );
}

export default injectIntl(Market);
