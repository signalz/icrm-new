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
  editProcess,
  editProcessCleanUp,
} from './actions';
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../components/NoData";

const ModalEdit = ({intl, ...props}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const changingProcess = useSelector(state => state.process.changingProcess);
  const changProcessError = useSelector(state => state.process.changProcessError);
  const processResponse = useSelector(state => state.process.processResponse);

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
      dispatch(editProcessCleanUp());
    } else if (!changingProcess && changProcessError) {
      notification['error']({
        message: 'Cập nhật thất bại, xin vui lòng thử lại.',
        description: '',
      });
      form.resetFields();
      props.callbackModalVisible(false);
      setVisible(false);
      dispatch(editProcessCleanUp());
    }
  }, [changingProcess, changProcessError, processResponse]);

  const handleCancel = () => {
    form.resetFields();
    props.callbackModalVisible(false);
    setVisible(false);
  };

  const onFinish = (values) => {
    dispatch(editProcess(values, values.id))
  }

  return (
    <Modal
      title={props.title}
      visible={visible}
      confirmLoading={confirmLoading}
      width={600}
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
          {
            props.consultantEdit ?
              <Col span={24}>
                <Form
                  name="import"
                  onFinish={onFinish}
                  className=""
                  form={form}
                  id='switchUserFindData'
                >
                  <Row>
                    <Card
                      className="card-list"
                    >
                      <Form
                        form={form}
                        name="dynamic_rule"
                        onFinish={onFinish}
                        initialValues={{
                          values: props.consultantEdit.values
                        }}

                      >
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Item
                              name="type"
                              initialValue={props.consultantEdit.type}
                              hidden={true}
                            >
                            </Form.Item>

                            <Form.Item
                              name="id"
                              initialValue={props.consultantEdit.id}
                              hidden={true}
                            >
                            </Form.Item>

                            <div className="form-group">
                              <label className="item-required">Tên bước</label>
                              <Form.Item
                                name="name"
                                initialValue={props.consultantEdit.name}
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
                                Thứ tự của bước
                              </label>
                              <Form.Item
                                name="order"
                                initialValue={props.consultantEdit.order}
                                rules={[
                                  {
                                    required: true,
                                    message: "Không để trống"
                                  }
                                ]}
                              >
                                <Input disabled/>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="item-required">
                                Tình trạng xử lý
                              </label>
                              <Form.List name="values">
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => {
                                        return (
                                          <Form.Item
                                            required={false}
                                            key={field.key}
                                          >
                                            <label className="col-1">{`${index +
                                            1}.`}</label>
                                            <Form.Item
                                              className="col-5"
                                              name={[field.name, "name"]}
                                              fieldKey={[field.fieldKey, "name"]}
                                              validateTrigger={[
                                                "onChange",
                                                "onBlur"
                                              ]}
                                              initialValue={field.name}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    "Nhập thông tin hoặc xóa input "
                                                }
                                              ]}
                                              noStyle
                                            >
                                              <Input
                                                placeholder="Tình trạng xử lý"
                                                style={{
                                                  width: "60%"
                                                }}
                                              />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{
                                                  margin: "0 8px",
                                                  color: "red"
                                                }}
                                                onClick={() => {
                                                  remove(field.name);
                                                }}
                                              />
                                            ) : null}
                                            {fields.length - 1 === index ? (
                                              <PlusCircleOutlined
                                                className="dynamic-add-button"
                                                style={{
                                                  margin: "0 8px",
                                                  color: "green"
                                                }}
                                                onClick={() => {
                                                  add();
                                                }}
                                              />
                                            ) : null}
                                          </Form.Item>
                                        );
                                      })}
                                    </div>
                                  );
                                }}
                              </Form.List>
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
