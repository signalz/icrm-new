import React, {
  useEffect,
  useState,
  Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Divider,
  Spin,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
  getCalendar,
  getCalendarCleanup,
} from '../actions';
import {
  isObjectEmpty
} from "../../../../helpers/globals";
import { useHistory } from "react-router-dom";
import {
  CURRENT_PROCESS_CONSULTANT_1,
  MONTH_YEAR_FORMAT,
} from "../../../../helpers/constants";
import NoData from "../../../../components/NoData";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import viLocale from '@fullcalendar/core/locales/vi';
import moment from 'moment';

export function SaleConsultant({intl, ...props}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const {formatMessage} = intl;
  const {Content} = Layout;
  const {Option} = Select;
  const [form] = Form.useForm();

  const dataConsultantCalendar = useSelector(state => state.saleConsultantReducer.dataConsultantCalendar);

  const [spinning, setSpinning] = useState(false);
  const [conditions, setConditions] = useState({
    admin_id: '',
    branch_id: '',
    month: '',
    name: '', // row 2
    phone_number: '',
    campaign_id: '',
    process_type: CURRENT_PROCESS_CONSULTANT_1,
  });
  const [consultants, setConsultants] = useState([]);
  const [campaigns, setCampaigns] = useState();
  const [branches, setBranches] = useState();
  const [admins, setAdmins] = useState();
  const [currentMonth, setCurrentMonth] = useState(moment().format(MONTH_YEAR_FORMAT));

  useEffect(() => {
    dispatch(getCalendar(conditions));
    return function cleanup() {
      dispatch(getCalendarCleanup());
    }
  }, [conditions]);

  useEffect(() => {
    if (dataConsultantCalendar && !isObjectEmpty(dataConsultantCalendar)) {
      setConsultants(dataConsultantCalendar.customerSchedules);
      setCampaigns(dataConsultantCalendar.campaigns);
      setBranches(dataConsultantCalendar.branches);
      setAdmins(dataConsultantCalendar.admins);

      var schedule = [];
      if (dataConsultantCalendar.customerSchedules.length) {
        for (let key in dataConsultantCalendar.customerSchedules) {
          let customerSchedule = dataConsultantCalendar.customerSchedules[key];
          let data = {
            name: customerSchedule.customer.first_name + ' ' + customerSchedule.customer.last_name,
            phoneNumber: customerSchedule.customer.phone_number,
            date: customerSchedule.date,
            admin: customerSchedule.user_consultant_relation ? customerSchedule.user_consultant_relation.name : '',
            time: customerSchedule.time
          }
          schedule.push(data);
        }
      }
      setConsultants(schedule);
    }
  }, [dataConsultantCalendar]);

  const cleanSearch = () => {
    setConditions(prevConditions => ({
      ...prevConditions,
      admin_id: '',
      branch_id: '',
      month: moment().format(MONTH_YEAR_FORMAT),
      name: '', // row 2
      phone_number: '',
      campaign_id: '',
      process_type: CURRENT_PROCESS_CONSULTANT_1,
    }));
    form.resetFields();
    setCurrentMonth(moment().format(MONTH_YEAR_FORMAT));
  };

  const onFinishSearch = values => {
    setConditions(prevConditions => ({
      ...prevConditions,
      admin_id: values.admin_id,
      branch_id: values.branch_id,
      month: values.month ? values.month.format(MONTH_YEAR_FORMAT) : moment().format(MONTH_YEAR_FORMAT),
      name: values.name, // row 2
      phone_number: values.phone_number,
      campaign_id: values.campaign_id,
      process_type: CURRENT_PROCESS_CONSULTANT_1,
    }));
  };

  const switchMonth = (type) => {
    if (type === 'previous') {
      let month = moment(currentMonth);
      month = month.subtract(1, 'months').format(MONTH_YEAR_FORMAT);
      setCurrentMonth(month);
      setConditions(prevConditions => ({
        ...prevConditions,
        month: month,
      }));
    } else if (type === 'next') {
      let month = moment(currentMonth);
      month = month.add(1, 'months').format(MONTH_YEAR_FORMAT);
      setCurrentMonth(month);
      setConditions(prevConditions => ({
        ...prevConditions,
        month: month,
      }));
    }
  }

  const table = () => {
    let table = `/sale/consultants-1`;
    history.push({
      pathname: table,
    });
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
      <Spin spinning={spinning}>
        <Fragment>
          <Content className="site-layout-background customer consultant">
            <div className="d-flex justify-content-start">
              <span className="title">Trang chủ > Bán hàng > Bảng tư vấn </span>
            </div>
            <Divider plain></Divider>
            <div>
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
                </div>
                <div style={{ width: '100%' }} className="d-flex justify-content-start consultant-search">
                  <div className="d-flex" style={{ width: 120 }}>
                    <Form.Item>
                      <Button className="button-table" type="primary" onClick={table} icon={<CalendarOutlined />}>
                        Dạng bảng
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

                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: 12 }}>Chọn tháng&nbsp;&nbsp;</span>
                    <Form.Item
                      name="month"
                      rules={[{required: false}]}
                      initialValue={''}
                    >
                      <DatePicker picker="month" style={{width: 150}} placeholder="mm/yyyy" format={"MM/YYYY"}/>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
            <br/>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="calendar-date">{currentMonth}</span>
              </div>
              <div class="d-flex  align-items-center">
                <Button onClick={() => cleanSearch()} className="button-today">Hôm nay</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => switchMonth('previous')} class="w3-button w3-large w3-black">‹</button>
                &nbsp;&nbsp;
                <button onClick={() => switchMonth('next')} class="w3-button w3-large w3-black">›</button>
              </div>
            </div>
            <br/>
            <div style={{ width: '100%', height: 'auto' }}>
              {
                consultants ?
                <FullCalendar
                  plugins={[ dayGridPlugin ]}
                  initialView="dayGridMonth"
                  dayMaxEvents={2}
                  dayMaxEventRows={2}
                  events={consultants}
                  locale={viLocale}
                  headerToolbar={false}
                  // views={[
                  //   {
                  //     dayGridMonth: {
                  //       columnHeaderHtml: function (date) {
                  //         const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];//todo asptext
                  //         let html = '';
                  //         html += '<span class="column-header-week">' + days[date.getDay()] + '</span>';
                  //         return html;
                  //       }
                  //     }
                  //   }
                  // ]}
                  eventContent={function (arg) {
                    let html =
                      `
                        <div style="padding: 5px 10px;">
                          <span style="font-size: 15px">${arg.event.extendedProps.name}</span>
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                              <i class="fas fa-phone"></i>
                              &nbsp;&nbsp;&nbsp;
                              <span>${arg.event.extendedProps.phoneNumber}</span>
                            </div>
                            <div>
                              <i class="far fa-calendar-check"></i>
                              &nbsp;&nbsp;
                              <span>${arg.event.extendedProps.time}</span>
                            </div>
                          </div>
                          <div class="d-flex align-items-center">
                            <i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;<span>Tư vấn: ${arg.event.extendedProps.admin}</span>
                          </div>
                        </div>
                      `
                    return { html: html }
                  }}
                /> : <NoData/>
              }
            </div>
          </Content>
        </Fragment>
      </Spin>
    </Fragment>
  );
}

export default injectIntl(SaleConsultant);
