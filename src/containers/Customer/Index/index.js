import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
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
    DatePicker,
} from "antd";
import {
    EditTwoTone,
    DeleteOutlined,
    DownloadOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
    getList,
    getListCleanup,
    deleteCustomer,
    deleteCustomerCleanUp,
} from '../actions';
import { isArrayEmpty, isObjectEmpty } from "../../../helpers/globals";
import Pagination from "../../../components/Pagination/pagination";
import { useHistory, useLocation } from "react-router-dom";
import { DATE_FORMAT } from "../../../helpers/constants";
import NoData from "../../../components/NoData";
import ModalImport from "./ModalImport";

export function CustomerList({intl, ...props}) {
    let history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = intl;
    const { Content } = Layout;
    const { Option } = Select;
    const [form] = Form.useForm();
    const location = useLocation();

    const admin = useSelector(state => state.global.adminData);
    const dataCustomerFetchs = useSelector(state => state.customer.dataCustomerFetch);
    const loading = useSelector(state => state.customer.loading);
    const deleteCustomerError = useSelector(state => state.customer.deleteCustomerError);
    const deletedCustomer = useSelector(state => state.customer.deletedCustomer);

    const [currentPage, setCurrentPage] = useState(1);
    const [conditions, setConditions] = useState({
        page: 1,
        name: '',
        phone_number: '',
        start_date: '',
        end_date: '',
        campaign: '',
        branch_id: ''
    });
    const [paginateInfo, setPaginateInfo] = useState({});
    const [isRenderPaginate, setIsRenderPaginate] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (location.state.importCustomer) {
                setVisible(true);
            }
        }, 1000)
    }, []);

    useEffect(() => {
        dispatch(getList(conditions));
        return function cleanup() {
          console.log("jottttttttttttttt")
            dispatch(getListCleanup());
            dispatch(deleteCustomerCleanUp());
            setPaginateInfo({});
        }
    }, [conditions]);

    useEffect(() => {
      console.log(dataCustomerFetchs, isObjectEmpty(dataCustomerFetchs), isRenderPaginate, "11111111111111")
      if (dataCustomerFetchs && !isObjectEmpty(dataCustomerFetchs) && isRenderPaginate) {
        console.log(dataCustomerFetchs, "+++++++++++++++++++++++")
            let {customers} = dataCustomerFetchs;
            setPaginateInfo(customers);
            // setIsRenderPaginate(false);
        }
    }, [dataCustomerFetchs]);

    useEffect(() => {
        if (deleteCustomerError) {
            notification['error']({
                message: 'Xóa không thành công',
                description: '',
            })
        } else if (deletedCustomer) {
            notification['success']({
                message: 'Xóa thành công',
                description: '',
            });
            let conditions = {
                page: currentPage
            };
            dispatch(getList(currentPage ? conditions : {}));
        }
    }, [deleteCustomerError, deletedCustomer]);

    const cleanSearch = () => {
        setConditions(prevConditions => ({
            ...prevConditions,
            page: 1,
            name: '',
            phone_number: '',
            start_date: '',
            end_date: '',
            campaign: '',
            branch_id: ''
        }));
        form.resetFields();
    };

    const handlePageClick = (data) => {
        let selected = data.selected;
        setConditions(prevConditions => ({
            ...prevConditions,
            page: selected + 1
        }));
    };

    const destroy = (value) => {
        if (!isArrayEmpty(value)) {
            Modal.confirm({
                title: 'Bạn có thực sự muốn xóa?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk: () => onDeleteCustomer(value)
            })
        }
    };

    const onDeleteCustomer = (value) => {
        dispatch(deleteCustomer({customer_ids: value}, admin.id));
    };

    const showCustomer = (customerId) => {
        let showUrl = `/customer/${customerId}/show`;
        history.push({
            pathname: showUrl,
        });
    };

    const createCustomer = () => {
        let createCustomerUrl = `/customer/create`;
        history.push({
            pathname: createCustomerUrl ,
        });
    };

    const showModalImportExcel = () => {
        setVisible(true);
    }

    const callbackModalVisible = (value) => {
        setVisible(value);
    }

    const columns = [
        {
            title:
                <div className="d-flex justify-content-center align-items-center">
                    <EditTwoTone className="on-hover" />
                    &nbsp;&nbsp;
                    <DeleteOutlined className="on-hover" onClick={() => destroy(selectedCustomer)}/>
                </div>,
            dataIndex: 'action',
            width: 100,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Họ và tên đệm',
            dataIndex: 'first_name',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Tên',
            dataIndex: 'last_name',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone_number',
            width: 100,
            fixed: 'left',
            className: 'column-fixed'
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'created_at',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
        },
        {
            title: 'MXH',
            dataIndex: 'social',
            width: 150,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 150,
        },
        {
            title: 'Mong muốn',
            dataIndex: 'desire',
            width: 200,
        },
        {
            title: 'Nỗi sợ',
            dataIndex: 'fear',
            width: 200,
        },
        {
            title: 'Khó khăn khi đăng ký',
            dataIndex: 'register_difficult',
            width: 200,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            width: 200,
        },
    ];

    var data = [];
    if (dataCustomerFetchs && !isObjectEmpty(dataCustomerFetchs)) {
        var {customers} = dataCustomerFetchs;
        var {campaigns} = dataCustomerFetchs;
        var {branches} = dataCustomerFetchs;
        var {markets} = dataCustomerFetchs;
        var {configCustomerTypes} = dataCustomerFetchs;
        var {actionUpload} = dataCustomerFetchs;
        for (let i = 0; i < customers.data.length; i++) {
            data.push({
                key: customers.data[i].id,
                action:
                    <div className="d-flex justify-content-center align-items-center">
                        <EditTwoTone onClick={() => showCustomer(customers.data[i].id)} className="on-hover"/>
                        &nbsp;&nbsp;
                        <DeleteOutlined onClick={() => destroy([customers.data[i].id])} className="on-hover" />
                    </div>,
                first_name: customers.data[i].first_name,
                last_name: customers.data[i].last_name,
                phone_number: customers.data[i].phone_number,
                created_at: customers.data[i].created_at,
                email: customers.data[i].email,
                social: customers.data[i].social,
                address: customers.data[i].address,
                desire: customers.data[i].desire,
                fear: customers.data[i].fear,
                register_difficult: customers.data[i].register_difficult,
                note: customers.data[i].note,
            });
        }
    }

    const onFinishSearch = values => {
        setConditions(prevConditions => ({
            ...prevConditions,
            page: 1,
            name: values.name,
            phone_number: values.phone_number,
            start_date: values.start_date ? values.start_date.format(DATE_FORMAT) : '',
            end_date: values.end_date ? values.end_date.format(DATE_FORMAT) : '',
            campaign: values.campaign,
            branch_id: values.branch_id
        }));
        setIsRenderPaginate(true);
        setPaginateInfo({});
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedCustomer(selectedRowKeys);
        }
    };

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
                <Content className="site-layout-background customer">
                    <div className="d-flex justify-content-between">
                        <span className="title">Marketing > Khách hàng</span>
                        <div className="d-flex">
                            <Button type="primary" icon={<PlusOutlined />} onClick={createCustomer}>
                                Thêm data
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon={<DownloadOutlined />} onClick={showModalImportExcel}>
                                Nhập dữ liệu
                            </Button>
                        </div>
                    </div>
                    <br/>
                    <div className="d-flex justify-content-between">
                        <Form
                            name="search"
                            onFinish={onFinishSearch}
                            className="row col-12 d-flex justify-content-between"
                            form={form}
                        >
                            <div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                        Search
                                    </Button>
                                    <i className="fas fa-eraser clean-search" onClick={cleanSearch}> </i>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <Input placeholder="Họ và tên"/>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    name="phone_number"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <Input placeholder="Sô điện thoại" />
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    label="Ngày nhập"
                                    name="start_date"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} />
                                </Form.Item>
                            </div>

                            <span>-</span>

                            <div>
                                <Form.Item
                                    name="end_date"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} />
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    label="Chiến dịch"
                                    name="campaign"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <Select style={{ width: 125 }} showSearch placeholder={"Chọn 1 giá trị"} >
                                        {
                                            campaigns ? campaigns.map(campaign => (
                                                <Option key={campaign.id}>{campaign.name}</Option>
                                            )) : null
                                        }
                                    </Select>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    label="Cơ sở"
                                    name="branch_id"
                                    rules={[{ required: false }]}
                                    initialValue={''}
                                >
                                    <Select style={{ width: 125 }} showSearch placeholder={"Chọn 1 giá trị"} >
                                        {
                                            branches ? branches.map(branch => (
                                                <Option key={branch.id}>{branch.name}</Option>
                                            )) : null
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className="d-flex justify-content-end">
                        {
                            <Pagination
                                onPageChange={handlePageClick}
                                data={{...paginateInfo, initialPage: conditions.page}}
                                forcePage={0}
                            />
                        }
                    </div>
                    {
                        data.length > 0 && !loading ?
                            (
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    scroll={{ x: 2000 }}
                                    sticky
                                    pagination={false}
                                    className="customer-table"
                                    rowSelection={rowSelection}
                                />
                            ) : (
                                loading ? <LoadingSpin></LoadingSpin> : <NoData></NoData>
                            )
                    }
                </Content>
                <ModalImport
                    visible={visible}
                    campaigns={campaigns}
                    branches={branches}
                    markets={markets}
                    actionUpload={actionUpload}
                    configCustomerTypes={configCustomerTypes}
                    callbackModalVisible={callbackModalVisible}
                />
            </Fragment>
        </Fragment>
    );
}

export default injectIntl(CustomerList);
