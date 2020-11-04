import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import {
  Button,
  Layout,
  Collapse,
  Avatar,
  Input,
  Select,
  Form,
  notification,
  DatePicker
} from "antd";
import {
  EditTwoTone,
  UserOutlined,
  PlusOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataForCreateCampaign,
  getDataForCreateCampaignCleanup,
  createCampaign,
  createCampaignCleanup
} from "../actions";
import { isObjectEmpty } from "../../../helpers/globals";
import { DATE_FORMAT } from "../../../helpers/constants";
import { useHistory } from "react-router-dom";

export function CampaignCreate({ intl, ...props }) {
  const dispatch = useDispatch();
  const { formatMessage } = intl;
  const { Content } = Layout;
  const { Panel } = Collapse;
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  let history = useHistory();

  const prepareCampaignData = useSelector(
    state => state.campaign.prepareCampaignData
  );
  const createDataError = useSelector(state => state.campaign.createDataError);
  const createdData = useSelector(state => state.campaign.createdData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getDataForCreateCampaign());
    return function cleanup() {
      dispatch(getDataForCreateCampaignCleanup());
    };
  }, []);

  useEffect(() => {
    if (createDataError) {
      notification["error"]({
        message: "Tạo chiến dịch không thành công!",
        description: ""
      });
    } else if (createdData) {
      notification["success"]({
        message: "Tạo chiến dịch thành công!",
        description: ""
      });
      history.push("/campaigns");
    }
    setLoading(false);
    return function cleanup() {
      dispatch(createCampaignCleanup());
    };
  }, [createDataError, createdData]);

  if (!prepareCampaignData || isObjectEmpty(prepareCampaignData)) {
    return <LoadingSpin> </LoadingSpin>;
  }
  const { branches, markets } = prepareCampaignData;

  const onFinish = values => {
    setLoading(true);
    dispatch(
      createCampaign({
        ...values,
        name: values.campaign_name
      })
    );
  };

  const back = () => {
    history.push("/campaigns");
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "campaign.title" })}</title>
        <meta
          name="description"
          content={formatMessage({ id: "campaign.title" })}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background campaign-show">
          <div className="d-flex justify-content-start">
            <span className="title">
              Marketing > Chiến dịch > Thêm Chiến dịch
            </span>
          </div>
          <br />
          <br />
          <div>
            <Form form={form} name="dynamic_rule" onFinish={onFinish}>
              <div className="col-12 group-input p-0">
                <p className="title-group">Thông tin chiến dịch</p>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Tên chiến dịch</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="campaign_name"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập họ và tên đệm"
                            },
                            {
                              max: 255,
                              message: "Không được vượt quá 255 ký tự."
                            }
                          ]}
                        >
                          <Input placeholder="Họ và tên đệm" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Ngày bắt đầu</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="begin_at"
                          initialValue={""}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập ngày bắt đầu"
                            }
                          ]}
                        >
                          <DatePicker />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Cơ sở</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="branch_id"
                          initialValue={""}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập Cơ sở."
                            }
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder={"Chọn 1 giá trị"}
                            style={{ width: "100%" }}
                          >
                            {branches.map(branch => (
                              <Option key={branch.id} value={branch.id}>
                                {branch.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p className="item-required">Ngày kết thúc</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="relative_birthday"
                          initialValue={""}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Xin hãy nhập ngày kết thúc"
                            }
                          ]}
                        >
                          <DatePicker />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Thị trường</p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="market_id" initialValue={""}>
                          <Select
                            showSearch
                            placeholder={"Chọn 1 giá trị"}
                            style={{ width: "100%" }}
                          >
                            {markets.map(market => (
                              <Option key={market.id} value={market.id}>
                                {market.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Mục tiêu chi phí</p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="cost_target" initialValue={""}>
                          <Input prefix="đ" placeholder={0} />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Mục tiêu data</p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="customers_target" initialValue={""}>
                          <Input placeholder="0" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Mục tiêu KH đăng ký</p>
                      </div>
                      <div className="col-6">
                        <Form.Item name="feed_back_target" initialValue={""}>
                          <Input placeholder="0" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex">
                    <div className="col-6 d-flex">
                      <div className="col-6">
                        <p>Mục tiêu doanh thu</p>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          name="revenue_target"
                          initialValue={""}
                          rules={[
                            {
                              required: false
                            }
                          ]}
                        >
                          <Input prefix="đ" placeholder="0" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 group-input p-0">
                <p className="title-group">Mô tả về chiến dịch</p>
                <div className="input-group">
                  <div className="col-12 d-flex">
                    <Form.Item
                      name="description"
                      initialValue={""}
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: false
                        },
                        {
                          max: 255,
                          message: "Không được vượt quá 255 ký tự."
                        }
                      ]}
                    >
                      <TextArea rows="10" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <br />
              <div className="d-flex justify-content-end">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Lưu
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

export default injectIntl(CampaignCreate);
