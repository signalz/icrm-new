import React, { useEffect, useState, Fragment, useRef } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import {
  Layout,
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
  MinusCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  CheckCircleFilled
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  getListCleanup,
  createProcess,
  createProcessCleanUp,
  deleteProcess,
  deleteProcessCleanUp,
  editProcessCleanUp,
} from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";
import { useHistory } from "react-router-dom";
import { CURRENT_PROCESS_SALE_1 } from "../../../helpers/constants";
import ModalEdit from "../ModalEdit";

export function Sale1({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;

  const processList = useSelector(state => state.process.dataProcessFetch);
  const createDataError = useSelector(state => state.process.createDataError);
  const createdData = useSelector(state => state.process.createdData);

  const deletingProcess = useSelector(state => state.process.deletingProcess);
  const deleteProcessError = useSelector(state => state.process.deleteProcessError);
  const responseDeleteProcess = useSelector(state => state.process.responseDeleteProcess);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [consultantEdit, setConsultantEdit] = useState();

  useEffect(() => {
    dispatch(getList({ type: CURRENT_PROCESS_SALE_1 }));
    return function cleanup() {
      dispatch(getListCleanup());
    };
  }, []);

  useEffect(() => {
    const showNotification = async () => {
      if (createDataError) {
        notification["error"]({
          message: "Tạo quy trình tư vấn không thành công!",
          description: ""
        });
      } else if (createdData) {
        notification["success"]({
          message: "Tạo quy trình tư vấn thành công!",
          description: ""
        });
        form.setFieldsValue({
          name: "",
          values: [
            {
              name: ""
            }
          ],
          order: ""
        });
      }
      await setLoading(false);
    };
    showNotification();
    return function cleanup() {
      dispatch(createProcessCleanUp());
    };
  }, [createDataError, createdData]);

  useEffect(() => {
    if (!deletingProcess && !deleteProcessError && responseDeleteProcess) {
      notification['success']({
        message: 'Cập nhật thành công.',
        description: '',
      });
      dispatch(getList({ type: CURRENT_PROCESS_SALE_1 }));
    } else if (!deletingProcess && deleteProcessError) {
      notification['error']({
        message: 'Cập nhật thất bại, xin vui lòng thử lại.',
        description: '',
      });
      dispatch(getList({ type: CURRENT_PROCESS_SALE_1 }));
    }
  }, [deletingProcess, deleteProcessError, responseDeleteProcess]);

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
    dispatch(deleteProcess({}, value.id));
  }

  const editConsultant = (processes) => {
    setVisible(true);
    setConsultantEdit(processes);
  }

  var [processes, setProcesses] = useState([]);
  useEffect(() => {
    if (processList && !isObjectEmpty(processList)) {
      const data = [];
      const processes = processList.data;
      var maxOrder = 1;
      for (let i = 0; i < processes.length; i++) {
        console.log(processes[i].order)
        if (maxOrder <= processes[i].order) {
          maxOrder = processes[i].order + 1;
        }
        let action = (
          <div className="d-flex justify-content-center align-items-center">
            <EditTwoTone className="on-hover action" onClick={() => editConsultant(processes[i])}/>
            &nbsp;&nbsp;
            <DeleteOutlined className="on-hover action" onClick={() => destroy(processes[i])}/>
          </div>
        );
        let content = [];
        processes[i].values.map(value => {
          content.push(
            <div className="content-values" key={`${value.id}`}>
              <CheckCircleFilled className="icon-success" />{" "}
              <span className="title-values">{value.name}</span>
            </div>
          );
        });
        let card = (
          <Card
            title={processes[i].name}
            className="card-list"
            key={i}
            extra={action}
          >
            <h4>{`Vị trí trong quy trình: ${processes[i].order}`}</h4>
            {content}
          </Card>
        );
        data.push(card);
      }
      setProcesses(data);
      setFieldsValue({
        order: maxOrder
      })
    }
  }, [processList]);

  const onFinish = values => {
    setLoading(true);

    dispatch(
      createProcess({
        ...values
      })
    );
  };

  const callbackModalVisible = (callbackModalVisible) => {
    setVisible(false);
    dispatch(editProcessCleanUp());
    dispatch(getList({ type: CURRENT_PROCESS_SALE_1 }));
    setConsultantEdit(null);
  }

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "process.consultation.title" })}</title>
        <meta
          name="description"
          content={formatMessage({
            id: "process.consultation.title"
          })}
        />
      </Helmet>
      <div style={{ padding: "0 24px 24px" }}>
        {loading ? (
          <LoadingSpin> </LoadingSpin>
        ) : (
          <Content className="site-layout-background sale">
            <div className="d-flex justify-content-between">
              <span>
                Trang chủ > Cài Đặt > Cài đặt bán hàng > Cài đặt quy trình bán hàng
              </span>
            </div>
            <br />
            <p className="title-group">Cài đặt quy trình bán hàng 1</p>
            <div className="row col-12 d-flex ">
              <div className="col-md-6 col-6">{processes}</div>
              <div className="col-md-6 col-6">
                <Card title="Tạo bước">
                  <Form
                    form={form}
                    name="dynamic_rule"
                    onFinish={onFinish}
                    initialValues={{
                      values: [
                        {
                          name: ""
                        }
                      ]
                    }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <Form.Item
                          name="type"
                          initialValue={CURRENT_PROCESS_SALE_1}
                          hidden={true}
                        ></Form.Item>
                        <div className="form-group">
                          <label className="item-required">Tên bước</label>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "không để trống"
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
                            initialValue={1}
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
                      <div className="col-md-12 ">
                        <Form.Item>
                          <Button
                            style={{
                              float: "right"
                            }}
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
        consultantEdit={consultantEdit}
        title={'Cập nhật bán hàng 1'}
      />
    </Fragment>
  );
}

export default injectIntl(Sale1);
