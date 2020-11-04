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
  Upload,
  Button,
  notification,
  Spin,
  Radio,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  switchUserFindData,
  switchUserFindDataCleanup,
} from '../actions';
import { useDispatch, useSelector } from "react-redux";
import {isObjectEmpty} from "../../../../helpers/globals";

const ModalSwitchUserFindData = ({intl, ...props}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const switching = useSelector(state => state.saleConsultantReducer.switching);
  const switchError = useSelector(state => state.saleConsultantReducer.switchError);
  const dataSwitchFetch = useSelector(state => state.saleConsultantReducer.dataSwitchFetch);

  const [visible, setVisible] = useState(props.visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (!switching && !switchError && !isObjectEmpty(dataSwitchFetch)) {
      notification['success']({
        message: 'Chuyển đổi thành công.',
        description: '',
      });
      form.resetFields();
      props.callbackModalVisible(false);
      setVisible(false);

    } else if (!switching && switchError) {
      notification['error']({
        message: 'Chuyển đổi thất bại, xin vui lòng thử lại.',
        description: '',
      });
      form.resetFields();
      props.callbackModalVisible(false);
      setVisible(false);
    }
  }, [switching, switchError, dataSwitchFetch]);

  const handleCancel = () => {
    dispatch(switchUserFindDataCleanup());
    form.resetFields();
    props.callbackModalVisible(false);
    setVisible(false);
  };

  const onFinish = (values) => {
    let data = {
      'selectedCustomers': props.selectedCustomer,
      'admin_id': values.admin_id,
    };
    dispatch(switchUserFindData(data));
  }

  return (
    <Modal
      title="Chuyển quyền sở hữu"
      visible={visible}
      confirmLoading={confirmLoading}
      width={500}
      className="modal-import-customer"
      footer={[
        <Button className="btn-success" key="submit" htmlType={'submit'} form={'switchUserFindData'}>
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
              id='switchUserFindData'
            >
              <Row>
                <Col span={10}>
                  <span className='item-required'>Tên chủ sở hữu mới</span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="admin_id"
                    rules={[
                      {
                        required: true,
                        message: 'Xin hãy lựa chọn chủ sở hữu.'
                      },
                    ]}
                    initialValue={''}
                  >
                    <Select style={{width: '100%'}} showSearch placeholder={"Chọn 1 giá trị"}>
                      {
                        props.admins ? props.admins.map(admin => (
                          <Option key={admin.id}>{admin.name}</Option>
                        )) : null
                      }
                    </Select>
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
export default injectIntl(ModalSwitchUserFindData);
