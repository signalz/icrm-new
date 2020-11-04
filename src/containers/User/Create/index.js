import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import {
  Button,
  Layout,
  Collapse,
  Avatar,
  Input,
  Select,
  Form,
  notification,
  DatePicker
} from "antd";
import {
  EditTwoTone,
  UserOutlined,
  PlusOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataForCreateUser,
  getDataForCreateUserCleanup,
  createUser,
  createUserCleanup
} from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";
import { DATE_FORMAT } from "../../../helpers/constants";
import { useHistory } from "react-router-dom";

export function UserCreate({ intl, ...props }) {
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const { Panel } = Collapse;
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  let history = useHistory();

  const prepareUserData = useSelector(state => state.user.prepareUserData);
  const createDataError = useSelector(state => state.user.createDataError);
  const createdData = useSelector(state => state.user.createdData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getDataForCreateUser());
    return function cleanup() {
      dispatch(getDataForCreateUserCleanup());
    };
  }, []);

  useEffect(() => {
    if (createDataError) {
      notification["error"]({
        message: "Tạo mới nhân viên không thành công!",
        description: ""
      });
    } else if (createdData) {
      notification["success"]({
        message: "Tạo mới nhân viên thành công!",
        description: ""
      });
      history.push("/users");
    }
    setLoading(false);
    return function cleanup() {
      dispatch(createUserCleanup());
    };
  }, [createDataError, createdData]);

  if (!prepareUserData || isObjectEmpty(prepareUserData)) {
    return <LoadingSpin> </LoadingSpin>;
  }
  const {branches} =  prepareUserData.data;
  const onFinish = values => {
    setLoading(true);
    const relationsStore = [];
    form.getFieldValue("relations").map(item => {
      relationsStore.push({
        ...item,
        birthday: item.birthday.format(DATE_FORMAT)
        });
    });
    dispatch(
      createUser({
        ...values,
        birthday: values.birthday.format(DATE_FORMAT),
        relations: relationsStore
      })
    );
  };
  const back = () => {
    history.push("/users");
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "user.title" })}</title>
        <meta
          name="description"
          content={formatMessage({ id: "user.title" })}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background user-show">
          <div className="d-flex justify-content-start">
            <span className="title">
              Trang chủ > Cài đặt > Cài đặt hệ thống > Nhân viên > Thêm Nhân
              viên
            </span>
          </div>
          <br />
          <div>
            <Form form={form} name="dynamic_rule" onFinish={onFinish}>
              <div className="col-12 group-input p-0">
                <p className="title-group">Thêm nhân viên</p>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Họ và tên</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="name"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập họ và tên đệm"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input placeholder="Họ và tên đệm" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Email</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="email"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập email."
                            },
                            {
                              type: "email",
                              message: "Email không đúng định dạng."
                            }
                          ]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Ngày sinh</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="birthday"
                          initialValue={""}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập ngày sinh"
                            }
                          ]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Địa chỉ</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="address"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập địa chỉ"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Số CMND</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="identify_number"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập số CMND"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Hộ khẩu thường trú</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="home_town"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập hộ khẩu thường trú"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Điện thoại</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="phone"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập số điện thoại"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Mật khẩu</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="password"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập mật khẩu"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input type="password" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Mã nhân viên</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="code"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập mã nhân viên"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Xác nhân mật khẩu</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="password_confirmation"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập xác nhân mật khẩu"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input type="password" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Facebook</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="social_profile_link"
                          initialValue={""}
                          rules={[
                            {
                              required: false,
                              message: "Xin hãy nhập fa"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Cơ sở</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="branch_id"
                          rules={[
                            {
                              required: true
                            }
                          ]}
                        >
                          <Select
                            mode="multiple"
                            showSearch
                            placeholder={"Chọn giá trị"}
                            style={{ width: "100%" }}
                          >
                            {branches.length > 0 &&
                              branches.map(branch => (
                                <Option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <br></br>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Họ và tên bố</p>
                      </div>
                      <Form.Item
                        name={["relations", 0, "type"]}
                        initialValue={"Bố"}
                        className="input-hidden"
                      >
                        <Input />
                      </Form.Item>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "name"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập họ và tên đệm bố"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Điên thoại</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "phone"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập điện thoại"
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Năm sinh</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "birthday"]}
                          initialValue={""}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập ngày sinh"
                            }
                          ]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Số CMND</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "identify_number"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập số CMND"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Công việc</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "work_title"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập công việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Đang làm tại</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 0, "work_location"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập địa chỉ làm việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Họ và tên mẹ</p>
                      </div>
                       <Form.Item
                        name={["relations", 1, "type"]}
                        initialValue={"Mẹ"}
                        className="input-hidden"
                      ></Form.Item>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "name"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập họ và tên đệm mẹ"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Điên thoại</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "phone"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập điện thoại"
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Năm sinh</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "birthday"]}
                          initialValue={""}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập ngày sinh"
                            }
                          ]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Số CMND</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "identify_number"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập số CMND"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Công việc</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "work_title"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập công việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Đang làm tại</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name={["relations", 1, "work_location"]}
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập địa chỉ làm việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <br></br>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Trình độ</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="edu_level"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập họ và tên đệm bố"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Sở thích</p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="phone1" initialValue={""}>
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Trình độ ngoại ngữ</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="language_level"
                          initialValue={""}
                          style={{ width: "100%" }}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Giấy từ đã nộp</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="document_submited"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập số CMND"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Tài khoản ngân hàng</p>
                      </div>
                      <div className="col-3">
                        <Form.Item
                          name="bank_number"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập công việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input placeholder="số tài khoản" />
                        </Form.Item>
                      </div>
                      <div className="col-3">
                        <Form.Item
                          name="bank_name"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập công việc"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input placeholder="Tên ngân hàng + chi nhánh" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Mục tiêu công việc / khó khăn </p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="note" initialValue={""}>
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="col-12 group-input p-0">
                <p className="title-group">Ghi chú</p>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <Form.Item
                      name="description"
                      initialValue={""}
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: false
                        },
                        {
                          max: 255,
                          message: "Không được vượt quá 255 ký tự."
                        }
                      ]}
                    >
                      <TextArea rows="10" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <br />
              <div className="d-flex justify-content-end">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Lưu
                  </Button>
                  &nbsp;&nbsp;
                  <Button type="danger" onClick={back}>
                    Hủy
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Content>
      </Fragment>
    </Fragment>
  );
}

export default injectIntl(UserCreate);
