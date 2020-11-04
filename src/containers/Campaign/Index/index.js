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
import { getList, getListCleanup, deleteCampaign } from "../actions";
import { isArrayEmpty, isObjectEmpty } from "../../../helpers/globals";
import Pagination from "../../../components/Pagination/pagination";
import { useHistory } from "react-router-dom";
import { DATE_FORMAT } from "../../../helpers/constants";
import NoData from "../../../components/NoData";

export function CampaignList({ intl, ...props }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const { Option } = Select;
  const [form] = Form.useForm();

  const admin = useSelector(state => state.global.adminData);
  const dataCampaignFetchs = useSelector(
    state => state.campaign.dataCampaignFetch
  );
  const loading = useSelector(state => state.campaign.loading);
  const deleteCampaignError = useSelector(
    state => state.campaign.deleteCampaignError
  );
  const deletedCampaign = useSelector(state => state.campaign.deletedCampaign);

  const [currentPage, setCurrentPage] = useState(1);
  const [conditions, setConditions] = useState({
    page: 1,
    name: "",
    phone_number: "",
    start_date: "",
    end_date: "",
    campaign: "",
    branch_id: ""
  });
  const [paginateInfo, setPaginateInfo] = useState({});
  const [isRenderPaginate, setIsRenderPaginate] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState([]);

  useEffect(() => {
    dispatch(getList(conditions));
    return function cleanup() {
      dispatch(getListCleanup());
    };
  }, [conditions]);

  useEffect(() => {
    if (
      dataCampaignFetchs &&
      !isObjectEmpty(dataCampaignFetchs) &&
      isRenderPaginate
    ) {
      setPaginateInfo(dataCampaignFetchs);
      setIsRenderPaginate(false);
    }
  }, [dataCampaignFetchs]);

  useEffect(() => {
    if (deleteCampaignError) {
      notification["error"]({
        message: "Xóa không thành công",
        description: ""
      });
    } else if (deletedCampaign) {
      notification["success"]({
        message: "Xóa thành công",
        description: ""
      });
      let conditions = {
        page: currentPage
      };
      dispatch(getList(currentPage ? conditions : {}));
    }
  }, [deleteCampaignError, deletedCampaign]);

  const cleanSearch = () => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      name: "",
      phone_number: "",
      start_date: "",
      end_date: "",
      campaign: "",
      branch_id: ""
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
        onOk: () => onDeleteCampaign(value)
      });
    }
  };

  const onDeleteCampaign = value => {
    dispatch(deleteCampaign({ campaign_ids: value }, admin.id));
  };

  const showCampaign = campaignId => {
    let showUrl = `/campaign/${campaignId}/show`;
    history.push({
      pathname: showUrl
    });
  };

  const createCampaign = () => {
    let createCampaignUrl = `/campaign/create`;
    history.push({
      pathname: createCampaignUrl
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
            onClick={() => destroy(selectedCampaign)}
          />
        </div>
      ),
      dataIndex: "action",
      width: 100,
      align: "center",
      fixed: "left"
    },
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      width: 150,
      fixed: "left"
    },
    {
      title: "Từ ngày",
      dataIndex: "begin_at",
      width: 100
    },
    { title: "Đến ngày", dataIndex: "end_at", width: 200 },
    {
      title: "Thị trường",
      dataIndex: "market_name",
      width: 150
    },
    {
      title: "Data dự kiến",
      dataIndex: "data_expected",
      width: 150
    },
    {
      title: "KH mua",
      dataIndex: "customer_buy",
      width: 200
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      width: 200
    },
    {
      title: "Chi phí dự kiến",
      dataIndex: "expected_cost",
      width: 200
    }
  ];

  var data = [];
  var branches = [];
  if (dataCampaignFetchs && !isObjectEmpty(dataCampaignFetchs)) {
    var campaigns = dataCampaignFetchs.data;
    for (let i = 0; i < campaigns.length; i++) {
      data.push({
        key: campaigns[i].id,
        action: (
          <div className="d-flex justify-content-center align-items-center">
            <EditTwoTone
              onClick={() => showCampaign(campaigns[i].id)}
              className="on-hover"
            />
            &nbsp;&nbsp;
            <DeleteOutlined
              onClick={() => destroy([campaigns[i].id])}
              className="on-hover"
            />
          </div>
        ),
        name: campaigns[i].name,
        begin_at: campaigns[i].begin_at,
        end_at: campaigns[i].end_at,
        market_name: "no data",
        data_expected: "no data",
        customer_buy: "no data",
        revenue: "no data",
        expected_cost: "no data"
      });
    }
  }

  const onFinishSearch = values => {
    setConditions(prevConditions => ({
      ...prevConditions,
      page: 1,
      name: values.name,
      phone_number: values.phone_number,
      start_date: values.start_date
        ? values.start_date.format(DATE_FORMAT)
        : "",
      end_date: values.end_date ? values.end_date.format(DATE_FORMAT) : "",
      campaign: values.campaign,
      branch_id: values.branch_id
    }));
    setIsRenderPaginate(true);
    setPaginateInfo({});
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCampaign(selectedRowKeys);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "campaign.title" })}</title>
        <meta
          name="description"
          content={formatMessage({
            id: "campaign.title"
          })}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background customer">
          <div className="d-flex justify-content-between">
            <span className="title">Marketing > Chiến dịch</span>
            <div className="d-flex">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={createCampaign}
              >
                Thêm chiến dịch
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary">Xuất ></Button>
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
                    Search
                  </Button>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Chiến dịch"
                  name="campaign_id"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Select
                    style={{ width: 125 }}
                    showSearch
                    placeholder={"Chọn 1 giá trị"}
                  >
                    {data.map((campaign, index) => (
                      <Option value={campaign.id} key={index}>
                        {campaign.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Từ ngày"
                  name="begin_at"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>

              <span>-</span>

              <div>
                <Form.Item
                  name="end_at"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Thị trường"
                  name="market_name"
                  rules={[{ required: false }]}
                  initialValue={""}
                >
                  <Input />
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
                summary={pageData => {
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={6}>
                          {`> Kết quả từ ${pageData.length}chiến dịch`}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>12312</Table.Summary.Cell>
                        <Table.Summary.Cell>12312</Table.Summary.Cell>
                        <Table.Summary.Cell>12312</Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
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

export default injectIntl(CampaignList);
