import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {injectIntl} from 'react-intl';
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  notification,
  Spin,
  TimePicker,
  DatePicker,
  Radio,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  createCustomerSchedule,
  createCustomerScheduleCleanup,
} from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { DATE_FORMAT } from "../../../helpers/constants";
import { isObjectEmpty } from "../../../helpers/globals";

const ModalImportSchedule = ({intl, ...props}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const {TextArea} = Input;
  const dispatch = useDispatch();
  const customerSchedule = props.customer.customer_schedule;
  const moment = require('moment')

  const scheduleSaving = useSelector(state => state.customer.scheduleSaving);
  const scheduleSavedError = useSelector(state => state.customer.scheduleSavedError);
  const dataScheduleSaveFetch = useSelector(state => state.customer.dataScheduleSaveFetch);

  const [visible, setVisible] = useState(props.visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
    return function clean() {
      dispatch(createCustomerScheduleCleanup());
    }
  }, [props.visible]);

  useEffect(() => {
    if (!scheduleSaving && !scheduleSavedError && !isObjectEmpty(dataScheduleSaveFetch)) {
      notification['success']({
        message: 'Hẹn lịch thành công.',
        description: '',
      });
      props.callbackModalVisible(false);
      setVisible(false);
      setSpinning(false);
      form.resetFields();
      dispatch(createCustomerScheduleCleanup());
    } else if (!scheduleSaving && scheduleSavedError) {
      notification['error']({
        message: 'Hẹn lịch thất bại, xin vui lòng thử lại.',
        description: '',
      });
      props.callbackModalVisible(false);
      setVisible(false);
      setSpinning(false);
      form.resetFields();
      dispatch(createCustomerScheduleCleanup());
    }
  }, [scheduleSaving, scheduleSavedError, dataScheduleSaveFetch])

  const onFinish = (values) => {
    setSpinning(true);
    let timeLog = '';
    if (values.date) {
      timeLog += values.date.format(DATE_FORMAT);
    }
    if (values.time) {
      timeLog += ' ' + values.time.format('HH:mm:ss');
    }
    values.schedule_at = timeLog;
    values.customer_id = props.customer.id
    dispatch(createCustomerSchedule(values));
  };

  const handleCancel = useCallback(() => {
    dispatch(createCustomerScheduleCleanup());
    form.resetFields();
    props.callbackModalVisible(false);
    setVisible(false);
  }, [form]);

  return (
    <Modal
      title="Đặt lịch tư vấn"
      visible={visible}
      confirmLoading={confirmLoading}
      width={600}
      className="modal-import-customer"
      footer={[
        <Button className="btn-success" key="submit" htmlType={'submit'} form={'schedule'}>
          Lưu
        </Button>,
        <Button type="danger" onClick={handleCancel}>
          Hủy
        </Button>
      ]}
    >
      <Spin spinning={spinning} tip="Đang tải...">
        <Row>
          <Col span={20} offset={2}>
            <Form
              name="import"
              onFinish={onFinish}
              className=""
              form={form}
              id='schedule'
            >
              <Row>
                <Col span={10}>
                  <span className='item-required'>Lịch tư vấn</span>
                </Col>
                <Col span={14}>
                  <Row>
                    <Col span={11}>
                      <Form.Item
                        name="time"
                        rules={[{required: true, message: 'Xin hãy nhập thời gian.'}]}
                        initialValue={customerSchedule ? moment(customerSchedule.time, 'HH:mm') : ''}
                      >
                        <TimePicker format={'HH:mm'}/>
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={11}>
                      <Form.Item
                        name="date"
                        rules={[{required: true, message: 'Xin hãy nhập ngày.'}]}
                        initialValue={customerSchedule ? moment(customerSchedule.date, 'YYYY-MM-DD') : ''}
                      >
                        <DatePicker/>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <span>Người tư vấn</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="user_consultant"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    initialValue={customerSchedule ? customerSchedule.user_consultant : ''}
                  >
                    <Select style={{width: '100%'}} showSearch placeholder={"Chọn 1 giá trị"}>
                      {
                        props.admins ? props.admins.map(admin => (
                          <Option value={admin.id} key={admin.id}>{admin.name}</Option>
                        )) : null
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <span className='item-required'>Hình thức tư vấn</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: 'Xin hãy chọn hình thức tư vấn.'
                      },
                    ]}
                    initialValue={customerSchedule ? customerSchedule.type : ''}
                  >
                    <Radio.Group defaultValue={customerSchedule ? customerSchedule.type : null}>
                      <Radio value={1}>Offline</Radio>
                      <Radio value={2}>Online</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <span className='item-required'>Đã mua/chưa mua sp</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="purchased_product"
                    rules={[
                      {
                        required: true,
                        message: 'Xin hãy nhập Chưa/Đã mua sản phẩm'
                      },
                    ]}
                    initialValue={customerSchedule ? customerSchedule.purchased_product : ''}
                  >
                    <Select style={{width: '100%'}} placeholder={"Chọn 1 giá trị"}>
                      <Option value={1} key={1}>Đã mua sản phẩm</Option>
                      <Option value={2} key={2}>Chưa mua sản phẩm</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <span className='item-required'>Chi nhánh</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="branch_id"
                    rules={[
                      {
                        required: true,
                        message: 'Xin hãy nhập chi nhánh.'
                      },
                    ]}
                    initialValue={customerSchedule ? customerSchedule.branch_id : ''}
                  >
                    <Select style={{width: '100%'}} placeholder={"Chọn 1 giá trị"}>
                      {
                        props.branches ? props.branches.map(branch => (
                          <Option value={branch.id} key={branch.id}>{branch.name}</Option>
                        )) : null
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <span>Ghi chú</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="note"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        max: 255,
                        message: 'Không được vượt quá 255 ký tự.',
                      }
                    ]}
                    initialValue={customerSchedule ? customerSchedule.note : ''}
                    style={{width: '100%'}}
                  >
                    <TextArea/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
}
export default injectIntl(ModalImportSchedule);
