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
  Form,
  Input,
  Select,
  DatePicker
} from "antd";
import Icon, {
  EditTwoTone,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getList, getListCleanup, deleteUser } from "../actions";
import { isArrayEmpty, isObjectEmpty } from "../../../helpers/globals";
import Pagination from "../../../components/Pagination/pagination";
import { useHistory } from "react-router-dom";
import { DATE_FORMAT } from "../../../helpers/constants";
import NoData from "../../../components/NoData";

export function UserList({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const { Option } = Select;
  const [form] = Form.useForm();

  const admin = useSelector(state => state.global.adminData);
  const dataUserFetchs = useSelector(
    state => state.user.dataUserFetch
  );
  const loading = useSelector(state => state.user.loading);
  const deleteUserError = useSelector(
    state => state.user.deleteUserError
  );
  const deletedUser = useSelector(state => state.user.deletedUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [conditions, setConditions] = useState({
    page: 1,
    name: "",
    phone: "",
    code: "",
    branch_id: "",
  });
  const [paginateInfo, setPaginateInfo] = useState({});
  const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    dispatch(getList(conditions));
    return function cleanup() {
      dispatch(getListCleanup());
    };
  }, [conditions]);

  useEffect(() => {
    if (
      dataUserFetchs &&
      !isObjectEmpty(dataUserFetchs) &&
      isRenderPaginate
    ) {
      setPaginateInfo(dataUserFetchs);
      setIsRenderPaginate(false);
    }
  }, [dataUserFetchs]);

  useEffect(() => {
    if (deleteUserError) {
      notification["error"]({
        message: "Xóa không thành công",
        description: ""
      });
    } else if (deletedUser) {
      notification["success"]({
        message: "Xóa thành công",
        description: ""
      });
      let conditions = {
        page: currentPage
      };
      dispatch(getList(currentPage ? conditions : {}));
    }
  }, [deleteUserError, deletedUser]);

  const cleanSearch = () => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      name: "",
      phone: "",
      code: "",
      branch_id: "",
    }));
    form.resetFields();
  };

  const handlePageClick = data => {
    let selected = data.selected;
    setConditions(prevConditions => ({
      ...prevConditions,
      page: selected + 1
    }));
  };

  const destroy = value => {
    if (!isArrayEmpty(value)) {
      Modal.confirm({
        title: "Bạn có thực sự muốn xóa?",
        icon: <ExclamationCircleOutlined />,
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk: () => onDeleteUser(value)
      });
    }
  };

  const onDeleteUser = value => {
    dispatch(deleteUser({ user_ids: value }, admin.id));
  };

  const showUser = userId => {
    let showUrl = `/user/${userId}`;
    history.push({
      pathname: showUrl
    });
  };

  const createUser = () => {
    let createUserUrl = `/user/create`;
    history.push({
      pathname: createUserUrl
    });
  };

  const columns = [
    {
      title: (
        <div className="d-flex justify-content-center align-items-center">
          <EditTwoTone className="on-hover" />
          &nbsp;&nbsp;
          <DeleteOutlined
            className="on-hover"
            onClick={() => destroy(selectedUser)}
          />
        </div>
      ),
      dataIndex: "action",
      width: 50,
      align: "center"
    },
    {
      title: "STT",
      dataIndex: "index",
      width: 50
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 100
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      width: 75
    },
    {
      title: "Mã NV",
      dataIndex: "code",
      width: 75
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 100
    },
    {
      title: "Facebook",
      dataIndex: "social_profile_link",
      width: 150
    },
    {
      title: "Cơ sở",
      dataIndex: "branchs",
      width: 100
    },
    {
      title: "Chức danh",
      dataIndex: "role",
      width: 100
    }
  ];

  var data = [];
  var branches = [];
  if (dataUserFetchs && !isObjectEmpty(dataUserFetchs)) {
    var users = dataUserFetchs.data;
    for (let i = 0; i < users.length; i++) {
      const branch_name = users[i].branch_user.map(item=> {
        return item.branch.name;
      }).join(", ");
      data.push({
        key: users[i].id,
        action: (
          <div className="d-flex justify-content-center align-items-center">
            <EditTwoTone
              onClick={() => showUser(users[i].id)}
              className="on-hover"
            />
            &nbsp;&nbsp;
            <DeleteOutlined
              onClick={() => destroy([users[i].id])}
              className="on-hover"
            />
          </div>
        ),
        index: i + 1,
        name: users[i].name,
        phone: users[i].phone,
        code: users[i].code,
        email: users[i].email,
        social_profile_link: (
          <div>
            <a href="#" target="_blank">
              {users[i].social_profile_link}
            </a>
          </div>
        ),
        branchs: branch_name,
        role: "chưa xử lý"
      });
    }
  }

  const onFinishSearch = values => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      name: values.name,
      phone: values.phone_number,
      code: values.code,
      branch_id: values.branch_id
    }));
    setIsRenderPaginate(true);
    setPaginateInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUser(selectedRowKeys);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "user.title" })}</title>
        <meta
          name="description"
          content={formatMessage({
            id: "user.title"
          })}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background customer">
          <div className="d-flex justify-content-between">
            <span className="title">
              Trang chủ > Cài đặt > Cài đăt người dùng > Nhân viên
            </span>
            <div className="d-flex">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={createUser}
              >
                Thêm nhân viên
              </Button>
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <Form
              name="search"
              // onFinish={onFinishSearch}
              className="row col-12 d-flex justify-content-between"
              form={form}
            >
              <div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    Tìm kiếm
                  </Button>
                  <i
                    className="fas fa-eraser clean-search"
                    onClick={cleanSearch}
                  >
                  </i>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="name"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="phone"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="code"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Input placeholder="Mã nhân viên" />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Cơ sở"
                  name="branch_id"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Select
                    style={{ width: 125 }}
                    showSearch
                    placeholder={"Chọn 1 giá trị"}
                  >
                    {branches.map((branch, index) => (
                      <Option value={branch.id} key={index}>
                        {branch.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Cơ sở"
                  name="branch_id"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Select
                    style={{ width: 125 }}
                    showSearch
                    placeholder={"Chọn 1 giá trị"}
                  >
                    {branches.map((branch, index) => (
                      <Option value={branch.id} key={index}>
                        {branch.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="d-flex justify-content-end">
            {
              <Pagination
                onPageChange={handlePageClick}
                data={paginateInfo}
                forcePage={0}
              />
            }
          </div>
          {data.length > 0 && !loading ? (
            <>
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 2000 }}
                sticky
                pagination={false}
                className="customer-table"
                rowSelection={rowSelection}
              />
            </>
          ) : loading ? (
            <LoadingSpin></LoadingSpin>
          ) : (
            <NoData></NoData>
          )}
        </Content>
      </Fragment>
    </Fragment>
  );
}

export default injectIntl(UserList);
