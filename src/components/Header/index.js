import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import Img from "./Img";
import Banner from "../../images/logo.png";
import Wrapper from "./Wrapper";
import { logOut } from "../../containers/App/actions";
import { Modal, Badge, Avatar, Input, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  MessageOutlined
} from "@ant-design/icons";
function Header({ intl, ...props }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.global.accessToken);
  const pathName = useSelector(state => state.router.location.pathname);
  const dataUser = useSelector(state => state.global.adminData);
  const { confirm } = Modal;
  const { formatMessage } = intl;
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    setCurrentTab(pathName);
  }, [currentTab, pathName]);

  const onOk = () => {
    dispatch(logOut());
    setVisible(false);
  };

  const showModalNoti = () => {
    setVisible(true);
  };

  const handleOkNoti = e => {
    setVisible(true);
  };

  const handleCancelNoti = e => {
    setVisible(false);
  };

  const urlEditUser = "/user/" + dataUser.id + "/edit";

  const okHandle = () => {
    confirm({
      title: formatMessage(
        { id: "header.confirm.logout" },
        {
          action: formatMessage({ id: "header.confirm.logout" }),
          name: formatMessage({ id: "header.confirm.logout" })
        }
      ),
      onOk: onOk,
      onCancel() {},
      okText: formatMessage({ id: "header.confirm.ok" }),
      cancelText: formatMessage({ id: "header.confirm.cancel" }),
      visible: visible
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">
          <a>
            <UserOutlined />
            <span style={{ marginLeft: "8px" }}>
              {" "}
              ádsadasd ádsadasd ádsadasd
            </span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/auth/change-password">
          <a>
            <UserOutlined />
            <span style={{ marginLeft: "8px" }}>đâsdas ádsadasd ádsadasd</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link onClick={okHandle}>
          <a>
            <UserOutlined />
            <span style={{ marginLeft: "8px" }}>Đăng xuất</span>
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper className="col-12 main-header">
      <div className="d-flex col-2">
        <Link to={"/"}>
          <Img src={Banner} alt="Solid" className="logo" />
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="col-10">
          <div className="row">
            {/* <ul className="list-header">
              <li> */}
            <div className="col-6"></div>
            <div className="col-6 right-header ">
              <div>
                <a type="button" onClick={showModalNoti} href="#">
                  <MessageOutlined className="icon" />
                </a>
                <a type="button" onClick={showModalNoti} href="#">
                  <Badge dot className="icon">
                    <BellOutlined />
                  </Badge>
                </a>

                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="user-menu-dropdown"
                >
                  <div className="d-inline-block">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                    <span className="p-2">{dataUser.name}</span>
                  </div>
                </Dropdown>
                {/* <a type="button" href={urlEditUser}>
                  <img src={dataUser.avatar} className="avatar-user mr-2" />
                  <span className="mr-2">{dataUser.name}</span>
                </a> */}
                <Modal
                  title={formatMessage({ id: "header.notification" })}
                  visible={visible}
                  onOk={handleOkNoti}
                  onCancel={handleCancelNoti}
                  okText={formatMessage({ id: "header.confirm.ok" })}
                  cancelText={formatMessage({ id: "header.confirm.cancel" })}
                >
                  <p>Some contents...</p>
                </Modal>
                {/* <a type="button" onClick={okHandle} href="#" className="ml-3">
                  <i className="fas fa-sign-out-alt"></i>
                </a> */}
              </div>
            </div>
            {/* </li>
            </ul> */}
          </div>
        </div>
      ) : (
        <div />
      )}
    </Wrapper>
  );
}

export default injectIntl(Header);
