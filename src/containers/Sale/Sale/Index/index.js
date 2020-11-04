import React, {
  useEffect,
  useState,
  Fragment,
  useLayoutEffect,
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
  EditTwoTone,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
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
  CURRENT_PROCESS_SALE_1,
  DATE_FORMAT,
} from "../../../../helpers/constants";
import NoData from "../../../../components/NoData";
import ModalSwitchUserFindData from "../Component/ModalSwitchUserFindData";

export function Sale({intl, ...props}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const {formatMessage} = intl;
  const {Content} = Layout;
  const {Option} = Select;
  const [form] = Form.useForm();
  const location = useLocation();

  const dataSaleFetch = useSelector(state => state.saleSaleReducer.dataSaleFetch);
  const loading = useSelector(state => state.saleSaleReducer.loading);

  const dataSaleRemain = useSelector(state => state.saleSaleReducer.dataSaleFetchRemain);

  const customerProcessSaving = useSelector(state => state.saleConfigReducer.customerProcessSaving);
  const customerProcessSavedError = useSelector(state => state.saleConfigReducer.customerProcessSavedError);
  const dataCustomerProcessSaveFetch = useSelector(state => state.saleConfigReducer.dataCustomerProcessSaveFetch);

  const [currentPage, setCurrentPage] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [conditions, setConditions] = useState({
    page: 1,
    market_id: '',
    config_customer_type_id: '',
    admin_id: '',
    process_value: '',
    branch_id: '',
    name: '', // row 2
    phone_number: '',
    start_created_at: '',
    end_created_at: '',
    campaign_id: '',
    process_type: CURRENT_PROCESS_SALE_1,
  });
  const [paginateInfo, setPaginateInfo] = useState({});
  const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sales, setSales] = useState();
  const [markets, setMarkets] = useState();
  const [configCustomerTypes, setConfigCustomerTypes] = useState();
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
      title: 'Ngày nhập',
      dataIndex: 'created_at',
      width: 100,
      align: 'center',
    },
    {
      title: 'KH nhập',
      dataIndex: 'customer_type',
      width: 75,
      align: 'center',
      className: 'customer-total'
    },
  ]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const [isRenderConfigProcess, setIsRenderConfigProcess] = useState(true);
  const [isRenderRemain, setIsRenderRemain] = useState(true);
  const [numberColumns, setNumberColumns] = useState(0);
  const [finishRenderRemain, setFinishRenderRemain] = useState(false);

  useEffect(() => {
    dispatch(getList(conditions));
    return function cleanup() {
      dispatch(getListCleanup());
    }
  }, [conditions]);

  useEffect(() => {
    dispatch(getRemain(conditions));
    return function cleanup() {
      dispatch(getRemainCleanup());
    }
  }, [conditions]);

  useEffect(() => {
    if (!customerProcessSaving && !customerProcessSavedError && !isObjectEmpty(dataCustomerProcessSaveFetch)) {
      if (dataCustomerProcessSaveFetch.isCreate) {
        dispatch(getRemain(conditions));
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
      dispatch(storeCustomerProcessCleanup());
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
    if (dataSaleFetch && !isObjectEmpty(dataSaleFetch) && isRenderPaginate) {
      let {sales} = dataSaleFetch;
      setPaginateInfo(sales);
      setIsRenderPaginate(false);
    }
  }, [dataSaleFetch]);

  useEffect(() => {
    var dataTbl = [];
    if (dataSaleFetch && dataSaleFetch.sales) {
      setSales(dataSaleFetch.sales);
      setCampaigns(dataSaleFetch.campaigns);
      setBranches(dataSaleFetch.branches);
      setAdmins(dataSaleFetch.admins);
      setConfigProcesses(dataSaleFetch.configProcesses);
      setProcessTypes(dataSaleFetch.processTypes);
      setMarkets(dataSaleFetch.markets);
      setConfigCustomerTypes(dataSaleFetch.configCustomerTypes);

      const dataProcesses = dataSaleFetch.listProcessTypes;
      for (let i = 0; i < dataSaleFetch.sales.data.length; i++) {
        let max = getMaxValueCollection(dataSaleFetch.sales.data[i].customer_processes);
        dataTbl.push({
          key: dataSaleFetch.sales.data[i].id,
          action:
            <div className="d-flex justify-content-center align-items-center">
              <ClockCircleOutlined onClick={() => showCustomer(dataSaleFetch.sales.data[i].id)} className="on-hover"/>
              &nbsp;&nbsp;
              <DeleteOutlined onClick={() => destroy([dataSaleFetch.sales.data[i].id])} className="on-hover"/>
            </div>,
          first_name: dataSaleFetch.sales.data[i].first_name,
          last_name: dataSaleFetch.sales.data[i].last_name,
          phone_number: dataSaleFetch.sales.data[i].phone_number,
          created_at: dataSaleFetch.sales.data[i].created_at,
          find_data_by: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          customer_type: dataSaleFetch.sales.data[i].config_customer_type ? dataSaleFetch.sales.data[i].config_customer_type.name : '',
          sale_by: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          user_consultant: (
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large">
              {'T'}
            </Avatar>
          ),
          type: dataSaleFetch.sales.data[i].type,
          process_max_status: max,
          customer_id: dataSaleFetch.sales.data[i].id,
          customer_processes: dataSaleFetch.sales.data[i].customer_processes
        });

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
  }, [dataSaleFetch]);

  useEffect(() => {

    if (numberColumns > 0 && data && dataSaleRemain && !isObjectEmpty(dataSaleRemain) && dataSaleRemain.processRemainSales && isRenderRemain) {
      const showHeader = async () => {
          setIsRenderRemain(false);
          var remainInfo =
            `
          <tr id="customerRemain" data-row-key="0" class="ant-table-row ant-table-row-level-0" style="background-color: #157c5e !important;">
            <td class="ant-table-cell ant-table-cell-fix-left" style="background-color: #157c5e; text-align: center; position: sticky; left: 0; color: white; font-size: 22px" colspan="7">
                Tổng khách hàng còn lại ở các bước
            </td>
            <td class="ant-table-cell" style="background-color: #157c5e;">

            </td>
            <td id="totalRemain" class="ant-table-cell" style="background-color: #157c5e; text-align: center; position: sticky; left: 0; color: white; font-size: 22px" colspan="1">

            </td>
        `;

          for (let newCol = 1; newCol <= numberColumns - 8; newCol++) {
            remainInfo +=
              `
            <td id=remain${newCol} class="ant-table-cell" style="background-color: #157c5e; text-align: center; color: white; font-size: 22px"" colspan="1">

            </td>
          `;
          }

          remainInfo += `</tr>`;

        await window.$('.ant-table-tbody tr:first').after(
          remainInfo
        );
        await setFinishRenderRemain(true);
      };
      showHeader();
    }

  }, [dataSaleRemain, data, numberColumns]);

  useEffect(() => {
    if (finishRenderRemain && dataSaleRemain && (dataSaleRemain.total || dataSaleRemain.total === 0)) {
      document.getElementById('totalRemain').innerHTML = dataSaleRemain.total;
      for (var key in dataSaleRemain.processRemainSales) {
        document.getElementById('remain' + key).innerHTML = dataSaleRemain.processRemainSales[key];
      }
    }
  }, [dataSaleRemain, finishRenderRemain])

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
        setNumberColumns(newColumns.length);
        setIsRenderConfigProcess(false);
      }
    }
  }, [configProcesses]);

  const cleanSearch = () => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      market_id: '',
      config_customer_type_id: '',
      admin_id: '',
      process_value: '',
      branch_id: '',
      name: '', // row 2
      phone_number: '',
      start_created_at: '',
      end_created_at: '',
      campaign_id: '',
      process_type: CURRENT_PROCESS_SALE_1,
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

  const showModalImportExcel = () => {
    setVisible(true);
  }

  const callbackModalVisible = (value) => {
    setVisible(value);
  }

  const onChangeProcess = (processTargetValue, customerId, processId) => {
    console.log(customerId)
    if (processTargetValue && parseInt(processId) > 1) {
      let previousId = 'process' + customerId + (parseInt(processId) - 1);
      let selectPre = document.getElementById(previousId).value;
      if (!selectPre) {
        notification['error']({
          message: 'Quy trình tư vấn chưa chính xác.',
          description: '',
        });
        let idSelect = 'process' + customerId + (parseInt(processId));
        document.getElementById(idSelect).value = null;
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
      market_id: values.market_id,
      config_customer_type_id: values.config_customer_type_id,
      admin_id: values.admin_id,
      process_value: values.process_value,
      branch_id: values.branch_id,
      name: values.name, // row 2
      phone_number: values.phone_number,
      start_created_at: values.start_created_at ? values.start_created_at.format(DATE_FORMAT) : '',
      end_created_at: values.end_created_at ? values.end_created_at.format(DATE_FORMAT) : '',
      campaign_id: values.campaign_id,
      process_type: CURRENT_PROCESS_SALE_1,

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
              <span className="title">Trang chủ > Bán hàng > Quá trình bán hàng 1</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="title">Quá trình bán hàng 1</span>
              <div className="d-flex">
                <Button type="primary" icon={<PlusSquareOutlined/>} onClick={selectAll}>
                  Chọn tất cả
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" icon={<ArrowRightOutlined/>} onClick={switchUserFindData}>
                  Chuyển sở hữu
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
                    <span>Thị trường</span>
                    <Form.Item
                      name="market_id"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          markets ? markets.map(market => (
                            <Option value={market.id} key={market.id}>{market.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="item-search d-flex justify-content-between align-items-center">
                    <span>Phân loại KH</span>
                    <Form.Item
                      name="config_customer_type_id"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <Select style={{width: 150}} showSearch placeholder={"Chọn 1 giá trị"}>
                        {
                          configCustomerTypes ? configCustomerTypes.map(configCustomerType => (
                            <Option value={configCustomerType.id} key={configCustomerType.id}>{configCustomerType.name}</Option>
                          )) : null
                        }
                      </Select>
                    </Form.Item>
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
                </div>

                {/*Row 2*/}

                <div style={{ width: '100%' }} className="d-flex justify-content-start consultant-search">
                  <div className="d-flex" style={{ width: 120 }}>

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

export default injectIntl(Sale);
