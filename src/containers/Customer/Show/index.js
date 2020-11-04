import React, {useEffect, useState, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {injectIntl} from 'react-intl';
import LoadingSpin from "../../../components/LoadingSpin";
import {
  Button,
  Layout,
  Collapse,
  Avatar,
  Card,
  Divider,
  Form,
  Input,
  DatePicker,
  Modal,
  notification,
  TimePicker,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailCustomer,
  getDetailCustomerCleanup,
  deleteCustomer,
  deleteCustomerCleanUp,
  createCustomerLog,
  createCustomerLogCleanup,
  createCustomerScheduleCleanup,
} from '../actions';
import { isArrayEmpty, isObjectEmpty } from "../../../helpers/globals";
import { useHistory, useLocation } from "react-router-dom";
import HistoryCustomer from "./HistoryCustomer";
import {DATE_FORMAT} from "../../../helpers/constants";
import ModalStoreSchedule from "../Show/ModalStoreSchedule.js";

export function CustomerShow({intl, ...props}) {
  const dispatch = useDispatch();
  const {formatMessage} = intl;
  const {Content} = Layout;
  const {Panel} = Collapse;
  let history = useHistory();
  const [form] = Form.useForm();
  const {TextArea} = Input;
  const location = useLocation();

  const admin = useSelector(state => state.global.adminData);
  const customerDetail = useSelector(state => state.customer.dataCustomerDetailFetch);
  const deleteCustomerError = useSelector(state => state.customer.deleteCustomerError);
  const deletedCustomer = useSelector(state => state.customer.deletedCustomer);

  const dataLogSaveFetch = useSelector(state => state.customer.dataLogSaveFetch);
  const logSaving = useSelector(state => state.customer.logSaving);
  const logSavedError = useSelector(state => state.customer.logSavedError);

  const [noTitleKey, setNoTitleKey] = useState(location.state && location.state.cardTab ? location.state.cardTab : 'customerDetail');
  const [customerLogs, setCustomerLogs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getDetailCustomer({}, props.match.params.id));
    return function cleanup() {
      dispatch(getDetailCustomerCleanup());
      dispatch(createCustomerLogCleanup());
    }
  }, []);

  useEffect(() => {
    if (customerDetail && !isObjectEmpty(customerDetail) && customerDetail.customer) {
      let customerInfo = customerDetail.customer.customer_logs;
      setCustomerLogs(customerInfo);
    }
  }, [customerDetail]);

  useEffect(() => {
    if (!logSaving && !logSavedError && !isObjectEmpty(dataLogSaveFetch)) {
      notification['success']({
        message: 'Thêm thành công.',
        description: '',
      })
      const {log} = dataLogSaveFetch;
      let oldLogs = customerLogs;
      oldLogs = [log].concat(oldLogs);
      setCustomerLogs(oldLogs);
    } else if (!logSaving && logSavedError) {
      notification['error']({
        message: 'Có lỗi xẩy ra, vui lòng thử lại.',
        description: '',
      })
    }
  }, [logSaving, logSavedError, dataLogSaveFetch]);

  useEffect(() => {
    if (deleteCustomerError) {
      notification['error']({
        message: 'Xóa không thành công',
        description: '',
      })
    } else if (deletedCustomer) {
      notification['success']({
        message: 'Xóa thành công',
        description: '',
      });
      dispatch(deleteCustomerCleanUp());
      let indexUrl = `/customers`;
      history.push({
        pathname: indexUrl,
      });
    }
  }, [deleteCustomerError, deletedCustomer]);

  useEffect(() => {
    if (location.state && location.state.cardTab === 'customerHistory') {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }
  }, [location.state]);

  if (!customerDetail || isObjectEmpty(customerDetail)) {
    return (<LoadingSpin> </LoadingSpin>)
  }
  const {customer} = customerDetail;
  const {admins} = customerDetail;
  const {branches} = customerDetail;

  const edit = () => {
    let editUrl = `/customer/${customer.id}/edit`;
    history.push({
      pathname: editUrl,
    });
  }

  const create = () => {
    let createUrl = `/customer/create`;
    history.push({
      pathname: createUrl,
    })
  }

  const importCustomer = () => {
    let createUrl = `/customers`;
    history.push({
      pathname: createUrl,
      state: {importCustomer: true}
    });
  }

  const confirmDestroy = (value) => {
    Modal.confirm({
      title: 'Bạn có thực sự muốn xóa?',
      icon: <ExclamationCircleOutlined/>,
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => onDeleteCustomer(value)
    })
  };

  const onDeleteCustomer = () => {
    dispatch(deleteCustomer({customer_ids: [customer.id]}, admin.id));
  }

  const onTabChange = (key) => {
    setNoTitleKey(key)
  };

  const tabListCustomer = [
    {
      key: "customerDetail",
      tab: "Chi tiết khách hàng"
    },
    {
      key: "customerHistory",
      tab: "Nhật ký hoạt động"
    },
    {
      key: "customerBill",
      tab: "Hóa đơn"
    }
  ];

  const addHistory = (values) => {
    let timeLog = '';
    if (values.date) {
      timeLog += values.date.format(DATE_FORMAT);
    }
    if (values.time) {
      timeLog += ' ' + values.time.format('HH:mm:ss');
    }
    values.time_log = timeLog;
    values.customer_id = customer.id;
    dispatch(createCustomerLog(values));
  };

  const callbackModalVisible = (value) => {
    setVisible(value);
    createCustomerScheduleCleanup();
  };

  const openModelCreate = () => {
    setVisible(true);
  }

  const contentListNoTitle = {
    customerDetail:
      <Collapse
        bordered={true}
        defaultActiveKey={['1', '2', '3', '4']}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Thông tin cơ bản" key="1" className="site-collapse-custom-panel">
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Họ và tên đệm</p>
              </div>
              <div className="col-6">
                <p>{customer.first_name}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Địa chỉ</p>
              </div>
              <div className="col-6">
                <p>{customer.address}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Tên</p>
              </div>
              <div className="col-6">
                <p>{customer.last_name}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Thị trường</p>
              </div>
              <div className="col-6">
                <p>{customer.market ? customer.market.name : ''}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Số điện thoại</p>
              </div>
              <div className="col-6">
                <p>{customer.phone_number}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Chiến dịch</p>
              </div>
              <div className="col-6">
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Email</p>
              </div>
              <div className="col-6">
                <p>{customer.email}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Cơ sở</p>
              </div>
              <div className="col-6">
                <p>{customer.branch ? customer.branch.name : ''}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Mạng xã hội</p>
              </div>
              <div className="col-6">
                <p>{customer.social}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Phân loại khách hàng</p>
              </div>
              <div className="col-6">
                <p>{customer.config_customer_type_id ? customer.config_customer_type_id : ''}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Giới tính</p>
              </div>
              <div className="col-6">
                <p>{customer.gender_name}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Sở thích</p>
              </div>
              <div className="col-6">
                <p>{customer.interests}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Ngày sinh</p>
              </div>
              <div className="col-6">
                <p>{customer.birthday}</p>
              </div>
            </div>
            <div className="col-6 d-flex">

            </div>
          </div>
        </Panel>
        <Panel header="Thông tin người thân liên hệ nếu cần" key="2" className="site-collapse-custom-panel">
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Họ và tên</p>
              </div>
              <div className="col-6">
                <p>{customer.relative_name}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Điện thoại</p>
              </div>
              <div className="col-6">
                <p>{customer.relative_phone_number}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Địa chỉ</p>
              </div>
              <div className="col-6">
                <p>{customer.relative_address}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Ngày sinh</p>
              </div>
              <div className="col-6">
                <p>{customer.relative_birthday}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Email</p>
              </div>
              <div className="col-6">
                <p>{customer.relative_email}</p>
              </div>
            </div>
            <div className="col-6 d-flex">

            </div>
          </div>
        </Panel>
        <Panel header="Thông tin nhu cầu - khó khăn ra quyết định" key="2" className="site-collapse-custom-panel">
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Mong muốn</p>
              </div>
              <div className="col-6">
                <p>{customer.desire}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Khó khăn khi đăng ký</p>
              </div>
              <div className="col-6">
                <p>{customer.register_difficult}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Nỗi sợ</p>
              </div>
              <div className="col-6">
                <p>{customer.fear}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Ghi chú</p>
              </div>
              <div className="col-6">
                <p>{customer.note}</p>
              </div>
            </div>
          </div>
        </Panel>
        <Panel header="Thông tin người tìm data" key="3" className="site-collapse-custom-panel">
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Người tìm data</p>
              </div>
              <div className="col-6">
                <p>{customer.find_data_by ? customer.find_data_by.name : ''}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Người chăm sóc</p>
              </div>
              <div className="col-6">
                <p>{customer.care_by ? customer.care_by.name : ''}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Người sale</p>
              </div>
              <div className="col-6">
                <p>{customer.sale_by ? customer.sale_by.name : ''}</p>
              </div>
            </div>
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Người upsell</p>
              </div>
              <div className="col-6">
                <p>{customer.upsell_by ? customer.upsell_by.name : ''}</p>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-6">
                <p>Người tư vấn</p>
              </div>
              <div className="col-6">
                <p>{customer.consultant_by ? customer.consultant_by.name : ''}</p>
              </div>
            </div>
            <div className="col-6 d-flex">

            </div>
          </div>
        </Panel>
      </Collapse>,
    customerHistory:
      <div className="d-flex">
        <div className="col-8">
          <Divider orientation="left">Nhật ký chi tiết</Divider>
          <div className="history">
            {
              customerLogs.length ? customerLogs.map(log => (
                <HistoryCustomer
                  logs={log}
                />
              )) : null
            }
          </div>

        </div>
        <div className="col-4">
          <Divider orientation="left">Ghi chú chăm sóc</Divider>
          <div className="add-history">
            <Form
              name="addHistory"
              onFinish={addHistory}
              className="row col-12 d-flex justify-content-between"
              form={form}
            >
              <Form.Item
                name="title"
                rules={[{required: true}]}
                initialValue={''}
                style={{width: '100%', height: '200px'}}
              >
                <TextArea style={{height: '200px'}}/>
              </Form.Item>
              <div className=" col-12 d-flex justify-content-between">
                <b className="col-4">Lịch hẹn</b>
                <Form.Item
                  name="time"
                  rules={[{required: true}]}
                  initialValue={''}
                  className="col-4"
                >
                  <TimePicker format={'HH:mm'}/>
                </Form.Item>
                <Form.Item
                  name="date"
                  rules={[{required: true}]}
                  initialValue={''}
                  className="col-4"
                >
                  <DatePicker/>
                </Form.Item>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <Button htmlType="submit" type="primary" icon={<PlusOutlined/>}>
                  Nhập
                </Button>
              </div>
            </Form>
          </div>
          <div className="add-schedule d-flex justify-content-center">
            <Button type="primary" icon={<CalendarOutlined/>} className="btn-schedule" onClick={openModelCreate}>
              Đặt lịch tư vấn
            </Button>
          </div>
        </div>
      </div>,
    customerBill:
      <div>
        <p>Hóa đơn</p>
      </div>
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({id: 'customer.title'})}</title>
        <meta
          name="description"
          content={formatMessage({id: 'customer.title'})}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background customer-show">
          <div className="d-flex justify-content-between">
            <span className="title">Marketing > Khách hàng</span>
            <div className="d-flex">
              <Button type="primary" icon={<PlusOutlined/>} onClick={create}>
                Thêm data
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" icon={<DownloadOutlined/>} onClick={importCustomer}>
                Nhập dữ liệu
              </Button>
            </div>
          </div>
          <br/>
          <div className="col-12 group-avatar d-flex justify-content-between">
            <div className="d-flex align-item-center avatar">
              <Avatar size={100} icon={<UserOutlined/>}/>
              <span className="user-name">{customer.first_name} {customer.last_name}</span>
            </div>
            <div>
              <Button type="primary" icon={<PlusOutlined/>} onClick={() => edit()}>
                Sửa
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" icon={<DownloadOutlined/>} onClick={() => confirmDestroy()}>
                Xóa
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" icon={<DownloadOutlined/>}>
                Nhân đôi
              </Button>
            </div>
          </div>
          <br/><br/>
          <div>
            <Card
              style={{width: '100%'}}
              tabList={tabListCustomer}
              activeTabKey={noTitleKey}
              tabBarExtraContent={null}
              onTabChange={key => {
                onTabChange(key);
              }}
            >
              {contentListNoTitle[noTitleKey]}
            </Card>
          </div>
        </Content>
        <ModalStoreSchedule
          visible={visible}
          callbackModalVisible={callbackModalVisible}
          admins={admins}
          customer={customer}
          branches={branches}
        />
      </Fragment>
    </Fragment>
  );
}

export default injectIntl(CustomerShow);
