import React, {
  useEffect,
  useState,
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
  Card,
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  editMarket,
  editMarketCleanUp,
} from '../actions';
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../components/NoData";

const ModalEdit = ({intl, ...props}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const changingProcess = useSelector(state => state.process.changingMarket);
  const changProcessError = useSelector(state => state.process.changMarketError);
  const processResponse = useSelector(state => state.process.marketResponse);

  const [visible, setVisible] = useState(props.visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
    return function cleanup() {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (!changingProcess && !changProcessError && processResponse) {
      notification['success']({
        message: 'Cập nhật thành công.',
        description: '',
      });
      form.resetFields();
      props.callbackModalVisible(false);
      setVisible(false);
      dispatch(editMarketCleanUp());
    } else if (!changingProcess && changProcessError) {
      notification['error']({
        message: 'Cập nhật thất bại, xin vui lòng thử lại.',
        description: '',
      });
      form.resetFields();
      props.callbackModalVisible(false);
      setVisible(false);
      dispatch(editMarketCleanUp());
    }
  }, [changingProcess, changProcessError, processResponse]);

  const handleCancel = () => {
    form.resetFields();
    props.callbackModalVisible(false);
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values)
    dispatch(editMarket(values, values.id))
  }

  return (
    <Modal
      title={props.title}
      visible={visible}
      confirmLoading={confirmLoading}
      width={600}
      className="modal-import-customer"
      footer={[
        <Button className="btn-success" key="submit" htmlType={'submit'} form={'updateMarket'}>
          Lưu
        </Button>,
        <Button type="danger" onClick={handleCancel}>
          Hủy
        </Button>
      ]}
    >
      <Spin spinning={spinning} tip="Đang tải...">
        <Row>
          {
            props.marketEdit ?
              <Col span={24}>
                <Form
                  name="import"
                  onFinish={onFinish}
                  className=""
                  form={form}
                  id='updateMarket'
                >
                  <Row>
                    <Card
                      className="card-list"
                    >
                      <Form
                        form={form}
                        name="dynamic_rule"
                        onFinish={onFinish}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Item
                              name="id"
                              initialValue={props.marketEdit.id}
                              hidden={true}
                            >
                            </Form.Item>

                            <div className="form-group">
                              <label className="item-required">Tên thị trường</label>
                              <Form.Item
                                name="name"
                                initialValue={props.marketEdit.name}
                                rules={[
                                  {
                                    required: true,
                                    message: "Không để trống"
                                  }
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="item-required">
                                Mã thị trường
                              </label>
                              <Form.Item
                                name="code"
                                initialValue={props.marketEdit.code}
                                rules={[{required: true, message: "Không để trống"}]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Card>
                  </Row>
                </Form>
              </Col>
              :
              <NoData/>
          }
        </Row>
      </Spin>
    </Modal>
  );
}
export default injectIntl(ModalEdit);
