import React, {
  useEffect,
  useState,
  Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import LoadingSpin from "../../../../components/LoadingSpin";
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
  Divider,
  Avatar,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  ArrowRightOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  getListCleanup,
  getRemain,
  getRemainCleanup,
} from '../actions';
import {
  getListProcess,
  getListProcessCleanup,
  storeCustomerProcess,
  storeCustomerProcessCleanup,
} from "../../actions";
import {
  getMaxValueCollection,
  isArrayEmpty,
  isObjectEmpty
} from "../../../../helpers/globals";
import Pagination from "../../../../components/Pagination/pagination";
import { useHistory, useLocation } from "react-router-dom";
import {
  CURRENT_PROCESS_CONSULTANT_2,
  DATE_FORMAT,
} from "../../../../helpers/constants";
import NoData from "../../../../components/NoData";
import ModalSwitchUserFindData from "./ModalSwitchUserFindData";

export function SaleConsultant({intl, ...props}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const {formatMessage} = intl;
  const {Content} = Layout;
  const {Option} = Select;
  const [form] = Form.useForm();
  const location = useLocation();

  const admin = useSelector(state => state.global.adminData);
  const dataConsultantFetch = useSelector(state => state.saleConsultantReducer.dataConsultantFetch);
  const loading = useSelector(state => state.saleConsultantReducer.loading);

  const dataConsultantRemain = useSelector(state => state.saleConsultantReducer.dataConsultantFetchRemain);

  const dataProcessFetch = useSelector(state => state.saleConfigReducer.dataProcessFetch);
  const loadingProcess = useSelector(state => state.saleConfigReducer.loadingProcess);
  const errorProcess = useSelector(state => state.saleConfigReducer.errorProcess);

  const customerProcessSaving = useSelector(state => state.saleConfigReducer.customerProcessSaving)
  const customerProcessSavedError = useSelector(state => state.saleConfigReducer.customerProcessSavedError)
  const dataCustomerProcessSaveFetch = useSelector(state => state.saleConfigReducer.dataCustomerProcessSaveFetch)

  const [currentPage, setCurrentPage] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [conditions, setConditions] = useState({
    page: 1,
    admin_id: '',
    process_value: '',
    branch_id: '',
    start_date: '',
    end_date: '',
    name: '', // row 2
    phone_number: '',
    start_created_at: '',
    end_created_at: '',
    campaign_id: '',
    process_type: CURRENT_PROCESS_CONSULTANT_2,
  });
  const [paginateInfo, setPaginateInfo] = useState({});
  const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataProcesses, setDataProcesses] = useState();
  const [consultants, setConsultants] = useState();
  const [campaigns, setCampaigns] = useState();
  const [branches, setBranches] = useState();
  const [admins, setAdmins] = useState();
  const [configProcesses, setConfigProcesses] = useState();
  const [processTypes, setProcessTypes] = useState();
  const [data, setData] = useState();
  const [columns, setColumns] = useState([
    {
      title:
        <div className="d-flex justify-content-center align-items-center">
          <DeleteOutlined className="on-hover" onClick={() => destroy(selectedCustomer)}/>
        </div>,
      dataIndex: 'action',
      width: 50,
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Họ và tên đệm',
      dataIndex: 'first_name',
      width: 125,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'last_name',
      width: 100,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number',
      width: 125,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'process_max_status',
      width: 100,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Sở hữu',
      dataIndex: 'find_data_by',
      fixed: 'left',
      width: 100,
      align: 'center',
      className: 'column-fixed'  // fixed left
    },
    {
      title: 'Người sale',
      dataIndex: 'sale_by',
      width: 100,
      align: 'center',
    },
    {
      title: 'Ngày tư vấn',
      dataIndex: 'date_consultant',
      width: 100,
      align: 'center',
    },
    {
      title: 'Giờ tư vấn',
      dataIndex: 'time_consultant',
      width: 75,
      align: 'center',
    },
    {
      title: 'Người tư vấn',
      dataIndex: 'user_consultant',
      width: 100,
      align: 'center',
    },
    {
      title: 'Hình thức',
      dataIndex: 'type',
      width: 75,
      align: 'center',
    },
  ]);
  const [isRenderConfigProcess, setIsRenderConfigProcess] = useState(true);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const [isRenderRemain, setIsRenderRemain] = useState(true);

  useEffect(() => {
    dispatch(getRemainCleanup());
    dispatch(getListProcessCleanup());
    dispatch(getList(conditions));
    return function cleanup() {
      dispatch(getListCleanup());
      // setPaginateInfo({});
    }
  }, [conditions]);

  useEffect(() => {
    dispatch(getListProcess({type: CURRENT_PROCESS_CONSULTANT_2}));
    return function cleanup() {
      dispatch(getListProcessCleanup());
    }
  }, []);

  useEffect(() => {
    dispatch(getRemain(conditions));
    return function cleanup() {
      dispatch(getRemainCleanup());
    }
  }, [conditions]);

  useEffect(() => {
    if (!customerProcessSaving && !customerProcessSavedError && !isObjectEmpty(dataCustomerProcessSaveFetch)) {
      var processOrder = dataCustomerProcessSaveFetch.process_order;
      var idRemain = 'remain' + processOrder;
      if (dataCustomerProcessSaveFetch.isCreate) {
        if (processOrder == 1) {
          let oldRemain = document.getElementById(idRemain).innerHTML;
          oldRemain = parseInt(oldRemain) - 1;
          document.getElementById(idRemain).innerHTML = oldRemain + '';
          dispatch(storeCustomerProcessCleanup());
        } else {
          let currentRemain = document.getElementById(idRemain).innerHTML;
          currentRemain = parseInt(currentRemain);

          let idPreviousRemain = 'remain' + (processOrder - 1);
          let previousRemain = document.getElementById(idPreviousRemain).innerHTML;
          previousRemain = parseInt(previousRemain);
          document.getElementById(idRemain).innerHTML = (currentRemain + 1) + '';
          document.getElementById(idPreviousRemain).innerHTML = (previousRemain - 1) + '';
        }
        notification['success']({
          message: 'Thêm thành công.',
          description: '',
        });
      } else if(dataCustomerProcessSaveFetch.isUpdate) {
        let idSelect = 'process' + dataCustomerProcessSaveFetch.customer_id + dataCustomerProcessSaveFetch.process_order;
        document.getElementById(idSelect).value = dataCustomerProcessSaveFetch.process_value_id;
        notification['success']({
          message: 'Cập nhật thành công.',
          description: '',
        });
      }

    } else if (!customerProcessSaving && customerProcessSavedError) {
      notification['error']({
        message: 'Thêm không thành công.',
        description: '',
      });
      dispatch(storeCustomerProcessCleanup());
    }
    setSpinning(false);
  }, [customerProcessSaving, customerProcessSavedError, dataCustomerProcessSaveFetch])

  useEffect(() => {
    if (!loadingProcess && !errorProcess && !isObjectEmpty(dataProcessFetch)) {
      setDataProcesses(dataProcessFetch.data);
    }
  }, [dataProcessFetch, loadingProcess, errorProcess]);

  useEffect(() => {
    if (dataConsultantFetch && !isObjectEmpty(dataConsultantFetch) && isRenderPaginate) {
      let {consultants} = dataConsultantFetch;
      setPaginateInfo(consultants);
      setIsRenderPaginate(false);
    }
  }, [dataConsultantFetch]);

  useEffect(() => {
    let oldCustomerRemain = document.getElementById('customerRemain');
    if (oldCustomerRemain) {
      oldCustomerRemain.remove();
    }
    if (data && dataConsultantRemain && !isObjectEmpty(dataConsultantRemain) && !isArrayEmpty(dataConsultantRemain.processRemainConsultants) && isRenderRemain) {
      setIsRenderRemain(false);
      let processRemainConsultants = dataConsultantRemain.processRemainConsultants;
      var remainInfo =
        `
          <tr id="customerRemain" data-row-key="0" class="ant-table-row ant-table-row-level-0" style="background-color: darkred">
            <td class="ant-table-cell ant-table-cell-fix-left" style="background-color: #DB5800; text-align: center; position: sticky; left: 0; color: white; font-size: 22px" colspan="7">
                Tổng khách hàng còn lại ở các bước
            </td>
            <td class="ant-table-cell" style="background-color: #DB5800;" colspan="5">

            </td>
        `;

      var orderNumber = 1;
      for (var key in processRemainConsultants) {
        let value = processRemainConsultants[key];
        if (orderNumber === 1) {
          remainInfo +=
            `
            <td id=remain${value.order} class="ant-table-cell" style="background-color: #DB5800; text-align: center; color: white; font-size: 22px"" colspan="1">
              ${value.customer_process.length ? dataConsultantRemain.total - value.customer_process[0].total_process_order : dataConsultantRemain.total}
            </td>
          `;
        } else {
          remainInfo +=
            `
            <td id=remain${value.order} class="ant-table-cell" style="background-color: #DB5800; text-align: center; color: white; font-size: 22px"" colspan="1">
              ${value.customer_process.length ? value.customer_process[0].total_process_remain : 0}
            </td>
          `;
        }
        orderNumber++;
      }

      remainInfo += `</tr>`;

      setTimeout(() => {
        window.$('.ant-table-tbody tr:first').after(
          remainInfo
        );
      }, 1000);
    }
  }, [dataConsultantRemain, data]);

  useEffect(() => {
    if (isRenderConfigProcess && !isArrayEmpty(configProcesses)) {
      var newColumns = columns;
      if (configProcesses) {
        for (let i = 0; i < configProcesses.length; i++) {
          let newCol = [{
            title: configProcesses[i].name,
            dataIndex: 'config' + i,
            width: 150,
            align: 'center',
          }];
          newColumns = newColumns.concat(newCol);
        }
        setColumns(newColumns);
        setIsRenderConfigProcess(false);
      }
    }
  }, [configProcesses]);

  useEffect(() => {
    var dataTbl = [];
    if (dataConsultantFetch && dataProcesses && !isObjectEmpty(dataConsultantFetch)) {
      setConsultants(dataConsultantFetch.consultants);
      setCampaigns(dataConsultantFetch.campaigns);
      setBranches(dataConsultantFetch.branches);
      setAdmins(dataConsultantFetch.admins);
      setConfigProcesses(dataConsultantFetch.configProcesses);
      setProcessTypes(dataConsultantFetch.processTypes);

      for (let i = 0; i < dataConsultantFetch.consultants.data.length; i++) {
        let max = getMaxValueCollection(dataConsultantFetch.consultants.data[i].customer_processes);
        dataTbl.push({
          key: dataConsultantFetch.consultants.data[i].id,
          action:
            <div className="d-flex justify-content-center align-items-center">
              <ClockCircleOutlined onClick={() => showCustomer(dataConsultantFetch.consultants.data[i].id)} className="on-hover"/>
              &nbsp;&nbsp;
              <DeleteOutlined onClick={() => destroy([dataConsultantFetch.consultants.data[i].id])} className="on-hover"/>
            </div>,
          first_name: dataConsultantFetch.consultants.data[i].first_name,
          last_name: dataConsultantFetch.consultants.data[i].last_name,
          phone_number: dataConsultantFetch.consultants.data[i].phone_number,
          created_at: dataConsultantFetch.consultants.data[i].created_at,
          find_data_by: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          sale_by: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          date_consultant: dataConsultantFetch.consultants.data[i].customer_schedule ? dataConsultantFetch.consultants.data[i].customer_schedule.date : null,
          time_consultant: dataConsultantFetch.consultants.data[i].customer_schedule ? dataConsultantFetch.consultants.data[i].customer_schedule.time : null,
          user_consultant: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          type: dataConsultantFetch.consultants.data[i].type,
          process_max_status: max,
          customer_id: dataConsultantFetch.consultants.data[i].id,
          customer_processes: dataConsultantFetch.consultants.data[i].customer_processes
        });
      }

      for (let i = 0; i < dataTbl.length; i++) {
        for (let j = 0; j < dataProcesses.length; j++) {
          let index = 'config' + j;
          dataTbl[i][index] = (
            <select
              className="browser-default custom-select"
              onChange={(event) => onChangeProcess(event.target.value, dataTbl[i].customer_id, dataProcesses[j].order) }

              value={dataTbl[i].customer_processes[j] ? dataTbl[i].customer_processes[j].process_value_id : null}
              id={'process' + dataTbl[i].customer_id + dataProcesses[j].order}
            >
              <option key="" value=""></option>
              {
                dataProcesses[j].values ? dataProcesses[j].values.map(value => (
                  <option key={value.id} value={value.id} >{value.name}</option>
                )) : null
              }
            </select>
          )
        }
      }
    }
    setData(dataTbl);
  }, [dataConsultantFetch, dataProcesses]);

  // useEffect(() => {
  //   if (dataProcesses && data) {
  //     for (let i = 0; i < data.length; i++) {
  //       for (let j = 0; j < dataProcesses.length; j++) {
  //         let index = 'config' + j;
  //         data[i][index] = (
  //           <select
  //             className="browser-default custom-select"
  //             onChange={(event) => onChangeProcess(event.target.value, data[i].customer_id, dataProcesses[j].order) }
  //
  //             value={data[i].customer_processes[j] ? data[i].customer_processes[j].process_value_id : null}
  //             id={'process' + data[i].customer_id + dataProcesses[j].order}
  //           >
  //             <option key="" value=""></option>
  //             {
  //               dataProcesses[j].values ? dataProcesses[j].values.map(value => (
  //                 <option key={value.id} value={value.id} >{value.name}</option>
  //               )) : null
  //             }
  //           </select>
  //         )
  //       }
  //     }
  //   }
  // }, [dataProcesses, data])

  const cleanSearch = () => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      admin_id: '',
      process_value: '',
      branch_id: '',
      start_date: '',
      end_date: '',
      name: '', // row 2
      phone_number: '',
      start_created_at: '',
      end_created_at: '',
      campaign_id: '',
      process_type: CURRENT_PROCESS_CONSULTANT_2,
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
        icon: <ExclamationCircleOutlined/>,
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk: () => onDeleteCustomer(value)
      })
    }
  };

  const onDeleteCustomer = (value) => {

  };

  const showCustomer = (customerId) => {
    let showUrl = `/customer/${customerId}/show`;
    history.push({
      pathname: showUrl,
      state: {cardTab: 'customerHistory'}
    });
  };

  const createCustomer = () => {
    let createCustomerUrl = `/customer/create`;
    history.push({
      pathname: createCustomerUrl,
    });
  };

  const calendar = () => {
    let calendar = `/sale/consultants-2/calendar`;
    history.push({
      pathname: calendar,
    });
  }

  const showModalImportExcel = () => {
    setVisible(true);
  }

  const callbackModalVisible = (value) => {
    setVisible(value);
  }

  const onChangeProcess = (processTargetValue, customerId, processId) => {
    if (processTargetValue && parseInt(processId) > 1) {
      let previousId = 'process' + customerId + (parseInt(processId) - 1);
      let selectPre = document.getElementById(previousId).value;
      if (!selectPre) {
        notification['error']({
          message: 'Quy trình tư vấn chưa chính xác.',
          description: '',
        });
        return false;
      }
    }
    if (processTargetValue) {
      dispatch(storeCustomerProcess({customer_id: customerId, process_value_id: processTargetValue}));
      setSpinning(true);
    }
  }

  const onFinishSearch = values => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      admin_id: values.admin_id,
      process_value: values.process_value,
      branch_id: values.branch_id,
      start_date: values.start_date ? values.start_date.format(DATE_FORMAT) : '',
      end_date: values.end_date ? values.end_date.format(DATE_FORMAT) : '',
      name: values.name, // row 2
      phone_number: values.phone_number,
      start_created_at: values.start_created_at ? values.start_created_at.format(DATE_FORMAT) : '',
      end_created_at: values.end_created_at ? values.end_created_at.format(DATE_FORMAT) : '',
      campaign_id: values.campaign_id,
      process_type: CURRENT_PROCESS_CONSULTANT_2,
    }));
    setIsRenderPaginate(true);
    setPaginateInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCustomer(selectedRowKeys);
    }
  };

  const switchUserFindData = () => {
    if (selectedCustomer.length > 0) {
      setVisible(true);
    }
  }

  const selectAll = () => {
    notification['success']({
      message: isSelectAll ? 'Đã bỏ chọn tất cả.' : 'Đã lựa chọn tất cả',
      description: '',
    });
    setIsSelectAll(!isSelectAll);
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
      <Spin spinning={spinning}>
        <Fragment>
          <Content className="site-layout-background customer consultant">
            <div className="d-flex justify-content-start">
              <span className="title">Trang chủ > Bán hàng > Quá trình tư vấn</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="title">Quá trình tư vấn</span>
              <div className="d-flex">
                <Button type="primary" icon={<PlusSquareOutlined/>} onClick={selectAll}>
                  Chọn tất cả
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" icon={<ArrowRightOutlined/>} onClick={switchUserFindData}>
                  Chuyển sở hữu
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" icon={<UserOutlined />} onClick={showModalImportExcel}>
                  Người tư vấn
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" icon={<DownloadOutlined/>} onClick={showModalImportExcel}>
                  Xuất
                </Button>
              </div>
            </div>
            <Divider plain></Divider>
            <div className="d-flex justify-content-between">
              <Form
                name="search"
                onFinish={onFinishSearch}
                className="row"
                form={form}
              >
                <div style={{ width: '100%' }} className="d-flex justify-content-start consultant-search">
                  <div className="d-flex align-items-center" style={{ width: 120 }}>
                    <Form.Item>
                      <Button className="button-search" type="primary" htmlType="submit" icon={<SearchOutlined/>} >
                        Tìm kiếm
                      </Button>
                    </Form.Item>
                    <i className="fas fa-eraser clean-search" onClick={cleanSearch}> </i>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Phụ trách</span>
                    <Form.Item
                      name="admin_id"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          admins ? admins.map(admin => (
                            <Option value={admin.id} key={admin.id}>{admin.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Trạng thái</span>
                    <Form.Item
                      name="process_value"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          processTypes ? processTypes.map(processType => (
                            <Option key={processType.id}>{processType.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Cơ sở</span>
                    <Form.Item
                      name="branch_id"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          branches ? branches.map(branch => (
                            <Option key={branch.id}>{branch.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: 12 }}>Ngày tư vấn&nbsp;&nbsp;</span>
                    <Form.Item
                      name="start_date"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>

                    <Form.Item
                      name="end_date"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"}/>
                    </Form.Item>
                  </div>
                </div>
                <div style={{ width: '100%' }} className="d-flex justify-content-start consultant-search">
                  <div className="d-flex" style={{ width: 120 }}>
                    <Form.Item>
                      <Button type="primary" className="button-table-calendar" onClick={calendar} icon={<CalendarOutlined />}>
                        Dạng lịch
                      </Button>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Họ và tên</span>
                    <Form.Item
                      name="name"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Input style={{width: 150}} placeholder="Họ và tên"/>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Số ĐT</span>
                    <Form.Item
                      name="phone_number"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Input style={{width: 150}} placeholder="Sô điện thoại"/>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Chiến dịch</span>
                    <Form.Item
                      name="campaign_id"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          campaigns ? campaigns.map(campaign => (
                            <Option key={campaign.id}>{campaign.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: 12 }}>Ngày nhập&nbsp;&nbsp;</span>
                    <Form.Item
                      name="start_created_at"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"}/>
                    </Form.Item>

                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>

                    <Form.Item
                      name="end_created_at"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"}/>
                    </Form.Item>
                  </div>
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
            {
              data && data.length > 0 && !loading ?
                (
                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{x: 'max-content'}}
                    size={'middle'}
                    sticky
                    pagination={false}
                    className="customer-table"
                    rowSelection={rowSelection}
                    id="myTable"
                  />
                ) : (
                  loading ? <LoadingSpin></LoadingSpin> : <NoData></NoData>
                )
            }
          </Content>
        </Fragment>
      </Spin>
      <ModalSwitchUserFindData
        admins={admins}
        visible={visible}
        callbackModalVisible={callbackModalVisible}
        selectedCustomer={selectedCustomer}
      />
    </Fragment>
  );
}

export default injectIntl(SaleConsultant);
