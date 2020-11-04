import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import LoadingSpin from "../../../components/LoadingSpin";
import {
    Button,
    Layout,
    Collapse,
    Avatar,
    Input,
    Select,
    Form,
    notification, DatePicker,
} from "antd";
import {
    EditTwoTone,
    UserOutlined,
    PlusOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
    getDetailCustomer,
    updateDetailCustomer,
    getDetailCustomerCleanup,
    updateDetailCustomerCleanup,
} from '../actions';
import { isObjectEmpty } from "../../../helpers/globals";
import { useHistory } from "react-router-dom";
import { DATE_FORMAT } from "../../../helpers/constants";
import moment from 'moment';

export function CustomerEdit({intl, ...props}) {
    const dispatch = useDispatch();
    const {formatMessage} = intl;
    const {Content} = Layout;
    const {Panel} = Collapse;
    const { Option } = Select;
    const [form] = Form.useForm();
    const { TextArea } = Input;
    let history = useHistory();

    const customerDetail = useSelector(state => state.customer.dataCustomerDetailFetch);
    const changedCustomer = useSelector(state => state.customer.changedCustomer);
    const changCustomerError = useSelector(state => state.customer.changCustomerError);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getDetailCustomer({}, props.match.params.id));
        return function cleanup() {
            dispatch(getDetailCustomerCleanup());
            dispatch(updateDetailCustomerCleanup());
        }
    }, []);

    useEffect(() => {
        if (changCustomerError) {
            notification['error']({
                message: 'Cập nhật không thành công!',
                description: '',
            })
        } else if (changedCustomer) {
            notification['success']({
                message: 'Cập nhật thành công!',
                description: '',
            });
        }
        setLoading(false);
    }, [changCustomerError, changedCustomer])

    if (!customerDetail || isObjectEmpty(customerDetail)) {
        return (<LoadingSpin> </LoadingSpin>)
    }

    const {campaigns} = customerDetail;
    const {branches} = customerDetail;
    const {admins} = customerDetail;
    const {customer} = customerDetail;
    const {markets} = customerDetail;
    const {configCustomerTypes} = customerDetail;

    const onFinish = (values) => {
        setLoading(true);
        values.id = customer.id;
        if (values.relative_birthday) {
            values.relative_birthday = values.relative_birthday.format(DATE_FORMAT);
        }
        dispatch(updateDetailCustomer(values, customer.id));
    }

    const back = () => {
        history.push(`/customer/${customer.id}/show`);
    }

    return (
        <Fragment>
            <Helmet>
                <title>{formatMessage({id: 'customer.title'})}</title>
                <meta
                    name="description"
                    content={formatMessage({id: 'customer.title'})}
                />
            </Helmet>
            <Fragment>
                <Content className="site-layout-background customer-show">
                    <div className="d-flex justify-content-start">
                        <span className="title">Marketing > Khách hàng</span>
                    </div>
                    <br/>
                    <div className="col-12 group-avatar d-flex justify-content-between">
                        <div>
                            <Avatar size={100} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            <span className="user-name">{customer.first_name} {customer.last_name}</span>
                        </div>
                        <div>
                            <Button type="primary" icon={<PlusOutlined/>}>
                                Sửa
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined/>}>
                                Xóa
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined/>}>
                                Nhân đôi
                            </Button>
                        </div>
                    </div>
                    <br/><br/>
                    <div>
                        <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                            <div className="col-12 group-input p-0">
                                <p className="title-group">Thông tin cơ bản</p>
                                <div className="input-group">
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p className="item-required">Họ và tên đệm</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="first_name"
                                                    initialValue={customer.first_name}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập họ và tên đệm',
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Họ và tên đệm" />
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
                                                    initialValue={customer.address}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
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
                                                <p className="item-required">Tên</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="last_name"
                                                    initialValue={customer.last_name}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập tên',
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Tên" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p className="item-required">Thị trường</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="market_id"
                                                    initialValue={customer.market_id}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập Thị trường.'
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Thị trường"} style={{ width: '100%' }} >
                                                        {markets.map(market => (
                                                            <Option key={market.id} value={market.id}>{market.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p className="item-required">Số điện thoại</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="phone_number"
                                                    initialValue={customer.phone_number}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập số điện thoại',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Số điện thoại" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p className="item-required">Chiến dịch</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="campaign_id"
                                                    initialValue={customer.campaign_ids}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Xin hãy nhập Chiến dịch."
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder={"Chiến dịch"}
                                                        style={{ width: '100%' }}
                                                        mode="multiple"
                                                        showArrow
                                                        optionFilterProp="children"
                                                    >
                                                        {campaigns.map(campaign => (
                                                            <Option key={campaign.id} value={campaign.id}>{campaign.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p className="item-required">Email</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="email"
                                                    initialValue={customer.email}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập email.',
                                                        },
                                                        {
                                                            type: 'email',
                                                            message: 'Email không đúng định dạng.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Email" />
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
                                                    initialValue={customer.branch_id}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Xin hãy nhập Cơ sở.',
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Cơ sở"} style={{ width: '100%' }} >
                                                        {branches.map(branch => (
                                                            <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Mạng xã hội</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="social"
                                                    initialValue={customer.social}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Mạng xã hội" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Phân loại khách hàng</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="config_customer_type_id"
                                                    initialValue={customer.config_customer_type_id}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Chọn 1 giá trị"} style={{ width: '100%' }} >
                                                      {
                                                        configCustomerTypes ? configCustomerTypes.map(configCustomerType => (
                                                          <Option key={configCustomerType.id} value={configCustomerType.id}>{configCustomerType.name}</Option>
                                                        )) : null
                                                      }
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Giới tính</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="gender"
                                                    initialValue={customer.gender}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select placeholder={"Chọn 1 giá trị"} style={{ width: '100%' }} >
                                                        <Option value={1}>Nam</Option>
                                                        <Option value={2}>Nữ</Option>
                                                        <Option value={3}>Không xác định</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Sở thích</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="interests"
                                                    initialValue={customer.interests}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Sở thích" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 group-input p-0">
                                <p className="title-group">Thông tin người liên hệ khi cần</p>
                                <div className="input-group">
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Họ tên</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="relative_name"
                                                    initialValue={customer.relative_name}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Họ và tên" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Điện thoại</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="relative_phone_number"
                                                    initialValue={customer.relative_phone_number}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Điện thoại" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Địa chỉ</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="relative_address"
                                                    initialValue={customer.relative_address}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Địa chỉ" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex birthday">
                                            <div className="col-6">
                                                <p>Ngày sinh</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="relative_birthday"
                                                    initialValue={moment(customer.relative_birthday)}
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker format={DATE_FORMAT} />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 group-input p-0">
                                <p className="title-group">Thông tin nhu cầu - khó khăn ra quyết định</p>
                                <div className="input-group">
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Mong muốn</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="desire"
                                                    initialValue={customer.desire}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
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
                                                    initialValue={customer.register_difficult}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
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
                                                    initialValue={customer.fear}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="Nỗi sợ" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Ghi chú</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="note"
                                                    initialValue={customer.note}
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                        {
                                                            max: 255,
                                                            message: 'Không được vượt quá 255 ký tự.',
                                                        }
                                                    ]}
                                                >
                                                    <TextArea />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 group-input p-0">
                                <p className="title-group">Thông tin người phụ trách</p>
                                <div className="input-group">
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Người tìm data</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="find_data_by"
                                                    initialValue={customer.find_data_by ? customer.find_data_by.id : ''}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Người tìm data"} style={{ width: '100%' }} >
                                                        {admins.map(admin => (
                                                            <Option key={admin.id} value={admin.id}>{admin.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Người chăm sóc</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="care_by"
                                                    initialValue={customer.care_by ? customer.care_by.id : ''}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Người chăm sóc"} style={{ width: '100%' }} >
                                                        {admins.map(admin => (
                                                            <Option key={admin.id} value={admin.id}>{admin.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Người sale</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="sale_by"
                                                    initialValue={customer.sale_by ? customer.sale_by.id : ''}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Người sale"} style={{ width: '100%' }} >
                                                        {admins.map(admin => (
                                                            <Option key={admin.id} value={admin.id}>{admin.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Người upsell</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="upsell_by"
                                                    initialValue={customer.upsell_by ? customer.upsell_by.id : ''}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Người upsall"} style={{ width: '100%' }} >
                                                        {admins.map(admin => (
                                                            <Option key={admin.id} value={admin.id}>{admin.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <div className="col-6 d-flex">
                                            <div className="col-6">
                                                <p>Người tư vấn</p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Item
                                                    name="consultant_by"
                                                    initialValue={customer.consultant_by ? customer.consultant_by.id : ''}
                                                    rules={[
                                                        {
                                                            required: false,
                                                        },
                                                    ]}
                                                >
                                                    <Select showSearch placeholder={"Người tư vấn"} style={{ width: '100%' }} >
                                                        {admins.map(admin => (
                                                            <Option key={admin.id} value={admin.id}>{admin.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="d-flex justify-content-end">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Submit
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

export default injectIntl(CustomerEdit);
