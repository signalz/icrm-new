import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ConfigProvider, Layout, Menu, Button } from "antd";
import { MainContentArea } from "../../containers/App/index";
import {
  MailOutlined,
  LineChartOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  TeamOutlined
} from "@ant-design/icons";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";

function Main({ intl, ...props }) {
  const history = useHistory();
  const { SubMenu } = Menu;
  const { formatMessage } = intl;
  const pathName = useSelector(state => state.router.location.pathname);
  const { Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState("1");

  const handleClick = event => {
    setCurrentKey(event.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sidebar"
      >
        <div
          onClick={toggleCollapsed}
          className={collapsed ? "text-center" : "text-right"}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: "20px", color: "#fff" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "20px", color: "#fff" }} />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={currentKey}
          onClick={handleClick}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={"/"}>
              <span>Trang chủ</span>
            </Link>
          </Menu.Item>
          <SubMenu key="Marketing" icon={<LineChartOutlined />} title="Marketing">
            <Menu.Item key="2" className="tree-2">
              <Link to={"/campaigns"}>
                <span>
                  {formatMessage({ id: "sidebar.marketing.campaign" })}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" className="tree-2">
              <Link to={"/customers"}>
                <span>
                  {formatMessage({ id: "sidebar.marketing.customer" })}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" className="tree-2">
              Quảng cáo
            </Menu.Item>
          </SubMenu>
          <SubMenu key="BanHang" icon={<TeamOutlined />} title="Bán hàng">
            <SubMenu key="BanHang-1" title="Quá trình bán hàng">
              <Menu.Item key="BanHang-1-1" className="tree-4">
                <Link to={"/sale/sale-1"}>
                  <span>Bán hàng 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="BanHang-1-2" className="tree-4">
                <Link to={"/sale/sale-2"}>
                  <span>Bán hàng 2</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub6-2" title="Quá trình tư vấn">
              <Menu.Item key="sub6-2-1" className="tree-4">
                <Link to={"/sale/consultants-1"}>
                  <span>Tư vấn 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub6-2-2" className="tree-4">
                <Link to={"/sale/consultants-2"}>
                  <span>Tư vấn 2</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="sale-3" className="tree-4">
              <Link to={"/customers"}>
                <span>{formatMessage({ id: "sidebar.sale.arrears" })}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sale-4" className="tree-4">
              <Link to={"/customers"}>
                <span>{formatMessage({ id: "sidebar.sale.upsell" })}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sale-5" className="tree-4">
              <Link to={"/customers"}>
                <span>{formatMessage({ id: "sidebar.sale.trash" })}</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          {/*thoai*/}
          <SubMenu
            key="setting"
            icon={<SettingOutlined />}
            title="Cài đặt"
            onTitleClick={() => {
              history.push("/settings");
            }}
          >
            <SubMenu key="system" title="Cài đặt hệ thống" className="tree-3">
              <Menu.Item key="5" className="tree-3">
                <Link to={"/branches"}>
                  <span>Cơ sở</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="7" className="tree-3">
                <Link to={"/roles"}>
                  <span>{formatMessage({ id: "sidebar.settings.role" })}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="8" className="tree-3">
                <Link to={"/users"}>
                  <span>{formatMessage({ id: "sidebar.settings.user" })}</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="setting-sale" title="Cài đặt bán hàng" className="tree-4">

              <Menu.Item key="setting-sale-market" className="tree-5">
                <Link to={"/process/markets"}>
                  <span>
                    Thị trường
                  </span>
                </Link>
              </Menu.Item>

              <SubMenu key="setting-sale-1" title="Bán hàng" className="tree-4">
                <Menu.Item key="setting-sale-1-1" className="tree-5">
                  <Link to={"/process/sale-1"}>
                    <span>Bán hàng 1</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting-sale-1-2" className="tree-5">
                  <Link to={"/process/sale-2"}>
                    <span>Bán hàng 2</span>
                  </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="setting-sale-3" title="Tư vấn" className="tree-4">
                <Menu.Item key="setting-sale-3-1" className="tree-5">
                  <Link to={"/process/consultation-1"}>
                    <span>Tư vấn 1</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting-sale-3-2" className="tree-5">
                  <Link to={"/process/consultation-2"}>
                    <span>Tư vấn 2</span>
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="setting-sale-2" className="tree-5">
                <Link to={"/settings/sale/customer"}>
                  <span>
                    {formatMessage({
                      id: "sidebar.settings.sale.customer"
                    })}
                  </span>
                </Link>
              </Menu.Item>

            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content className={"app-layout"}>
          <MainContentArea isPublic={false} defaultRef="/" />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default injectIntl(Main);
