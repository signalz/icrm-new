import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import { Button, Layout, Collapse, Avatar, Input, Select, Form } from "antd";
import { PlusOutlined, DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import { getDetailCustomer, updateDetailCustomer } from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";

export function CustomerEdit({ intl, ...props }) {
    const dispatch = useDispatch();
    const { formatMessage } = intl;
    const { Content } = Layout;
    const { Panel } = Collapse;
    const { Option } = Select;
    const [form] = Form.useForm();

    const customerDetail = useSelector(
        state => state.customer.dataCustomerDetailFetch
    );

    // useEffect(() => {
    //     dispatch(getDetailCustomer({}, props.match.params.id));
    //     return function cleanup() {
    //         dispatch(getDetailCustomer());
    //     };
    // }, []);

    if (!customerDetail || isObjectEmpty(customerDetail)) {
        return <LoadingSpin> </LoadingSpin>;
    }

    const { customer } = customerDetail;

    const onFinish = values => {
        values.id = customer.id;
        // dispatch(updateDetailCustomer(values, customer.id));
    };

    return (
        <Fragment>
            <Helmet>
                <title>{formatMessage({ id: "customer.title" })}</title>
                <meta
                    name="description"
                    content={formatMessage({ id: "customer.title" })}
                />
            </Helmet>
            <Fragment>
                <Content className="site-layout-background customer-show">
                    <div className="d-flex justify-content-between">
                        <span className="title">Marketing > Khách hàng</span>
                        <div className="d-flex">
                            <Button type="primary" icon={<PlusOutlined />}>
                                Thêm data
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Nhập dữ liệu
                            </Button>
                        </div>
                    </div>
                    <br />
                    <div className="col-12 group-avatar d-flex justify-content-between">
                        <div>
                            <Avatar
                                size={100}
                                style={{ backgroundColor: "#87d068" }}
                                icon={<UserOutlined />}
                            />
                            <span className="user-name">
                                {customer.first_name} {customer.last_name}
                            </span>
                        </div>
                        <div>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Sửa
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Xóa
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Nhân đôi
                            </Button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <Form
                            form={form}
                            name="dynamic_rule"
                            onFinish={onFinish}
                        >
                            <Collapse
                                bordered={true}
                                defaultActiveKey={["1", "2", "3", "4"]}
                                className="site-collapse-custom-collapse"
                            >
                                <Panel
                                    header="Thông tin học sinh"
                                    key="1"
                                    className="site-collapse-custom-panel"
                                >
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Họ và tên đệm</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="first_name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Xin hãy nhập họ và tên đệm"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Họ và tên đệm" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Mạng xã hội</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="social"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Mạng xã hội" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Tên</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="last_name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Xin hãy nhập tên"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Tên" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Địa chỉ</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="address"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Địa chỉ" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Số điện thoại</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="phone_number"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Xin hãy nhập số điện thoại"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Số điện thoại" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Chiến dịch</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="chien_dich"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Select
                                                        placeholder={
                                                            "Chiến dịch"
                                                        }
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <Option value="jack">
                                                            Jack
                                                        </Option>
                                                        <Option value="lucy">
                                                            Lucy
                                                        </Option>
                                                        <Option value="Yiminghe">
                                                            yiminghe
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Email</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Xin hãy nhập email"
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Email" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Cơ sở</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="co_so"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Select
                                                        placeholder={"Cơ sở"}
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <Option value="jack">
                                                            Jack
                                                        </Option>
                                                        <Option value="lucy">
                                                            Lucy
                                                        </Option>
                                                        <Option value="Yiminghe">
                                                            yiminghe
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                                <Panel
                                    header="Thông tin nhu cầu - khó khăn ra quyết định"
                                    key="2"
                                    className="site-collapse-custom-panel"
                                >
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Mong muốn</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="desire"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Mong muốn" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Khó khăn khi đăng ký</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="register_difficult"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Khó khăn khi đăng ký" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Nỗi sợ</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="fear"
                                                    rules={[
                                                        {
                                                            required: false
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Nỗi sợ" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex"></div>
                                    </div>
                                </Panel>
                                <Panel
                                    header="Thông tin sử dụng sản phẩm"
                                    key="3"
                                    className="site-collapse-custom-panel"
                                >
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Học phí đã hoàn thành</p>
                                            </div>
                                            <div className="col-6">
                                                <p> </p>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex"></div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Thông tin sản phẩm</p>
                                            </div>
                                            <div className="col-6">
                                                <p> </p>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex"></div>
                                    </div>
                                </Panel>
                                <Panel
                                    header="Ghi chú"
                                    key="4"
                                    className="site-collapse-custom-panel"
                                >
                                    <div className="col-12 d-flex">
                                        <p>{customer.note}</p>
                                    </div>
                                </Panel>
                            </Collapse>
                            <br />
                            <div className="d-flex justify-content-end">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
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

export default injectIntl(CustomerEdit);
