import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {injectIntl} from 'react-intl';
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Button,
  notification,
  Spin,
  Radio,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  uploadCustomer,
  downloadCustomerExcel,
  uploadCustomerCleanup,
  saveCustomerExcel,
} from '../actions';
import {useDispatch, useSelector} from "react-redux";

var formData = new FormData();

const ModalImport = ({intl, ...props}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const {TextArea} = Input;
  const dispatch = useDispatch();

  const uploadedData = useSelector(state => state.customer.uploadedData);
  const uploadDataError = useSelector(state => state.customer.uploadDataError);
  const uploadResponse = useSelector(state => state.customer.uploadResponse);

  const dataDownloadFetch = useSelector(state => state.customer.dataDownloadFetch);
  const downloading = useSelector(state => state.customer.downloading);
  const downloadError = useSelector(state => state.customer.downloadError);

  const saving = useSelector(state => state.customer.saving);
  const savedError = useSelector(state => state.customer.savedError);
  const dataSaveFetch = useSelector(state => state.customer.dataSaveFetch);

  const [visible, setVisible] = useState(props.visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [hasPrepareImport, setHasPrepareImport] = useState(false);
  const [dataStatistic, setDataStatistic] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (!saving && !savedError && dataSaveFetch) {
      notification['success']({
        message: 'Lưu thành công.',
        description: '',
      });
      setDisabled(true);
    } else if (!saving && savedError) {
      notification['error']({
        message: 'Lưu không thành công, xin vui lòng thử lại.',
        description: '',
      });
      setDisabled(true);
    }
  }, [saving, savedError, dataSaveFetch])

  useEffect(() => {
    setSpinning(false);
    if (uploadedData && !uploadDataError) {
      let {statisticUpload} = uploadResponse;
      setDataStatistic(statisticUpload);
      setHasPrepareImport(true);
    } else if (uploadedData && uploadDataError) {
      notification['error']({
        message: 'Import không thành công.',
        description: '',
      });
    }
  }, [uploadedData, uploadDataError])

  useEffect(() => {
    if (!downloading && !downloadError && dataDownloadFetch) {
      let {url} = dataDownloadFetch;
      window.open(url);
    } else if (!downloading && uploadDataError) {
      notification['error']({
        message: 'Download không thành công.',
        description: '',
      });
    }
  }, [downloading, downloadError])

  const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleCancel = useCallback(() => {
    dispatch(uploadCustomerCleanup());
    form.resetFields();
    props.callbackModalVisible(false);
    setVisible(false);
    setHasPrepareImport(false);
  }, [form]);

  const onFinishImport = (values) => {
    setSpinning(true);
    formData.append("branch_id", values.branch_id);
    formData.append("campaign_id", values.campaign_id);
    formData.append("config_customer_type_id", values.config_customer_type_id);
    formData.append("market_id", values.market_id);
    formData.append("note", values.note);
    formData.append("current_process", values.current_process);
    dispatch(uploadCustomer(formData));
  };

  const save = () => {
    formData.append("row_success", dataStatistic['rowSuccess']);
    formData.append("row_db_duplicate", dataStatistic['rowDbDuplicate']);
    dispatch(saveCustomerExcel(formData));
  };

  const downloadTemplate = () => {
    window.open('template/mau_nhap_khach_hang.xlsx');
  };

  const downloadExcel = (type, values) => {
    formData.append("type", type);
    formData.append("rowNumber", values);
    dispatch(downloadCustomerExcel(formData));
  };

  var uploadProps = {
    beforeUpload: file => {
      let fileExt = file.name.split(".");
      fileExt = fileExt[fileExt.length - 1];
      if (fileExt === 'xlsx') {
        formData.append("file", file);
      } else {
        return false;
      }
    }
  };

  const fileValidator = (rule, value, callback) => {
    try {
      let file = value.file;
      let fileExt = file.name.split(".");
      fileExt = fileExt[fileExt.length - 1];
      if (fileExt !== 'xlsx') {
        callback('File không đúng định dạng.');
      }
      callback();
    } catch (err) {
      callback(err);
    }
  }

  return (
    <Modal
      title="Nhập dữ liệu từ file Excel"
      visible={visible}
      // okButtonProps={{form:'uploadCustomer', key: 'submit', htmlType: 'submit'}}
      confirmLoading={confirmLoading}
      width={800}
      className="modal-import-customer"
      footer={!hasPrepareImport ? [
        <Button className="btn-success" key="submit" htmlType={'submit'} form={'uploadCustomer'}>
          Lưu
        </Button>,
        <Button type="danger" onClick={handleCancel}>
          Hủy
        </Button>
      ] : [
        <span>Bạn xác nhận có muốn nhập?&nbsp;&nbsp;&nbsp;</span>,
        <Button className="btn-success" onClick={save} disabled={disabled}>
          Lưu
        </Button>,
        <Button type="danger" onClick={handleCancel}>
          Hủy
        </Button>
      ]}
    >
      {
        !hasPrepareImport ?
          <Spin spinning={spinning} tip="Đang tải...">
            <Row>
              <Col span={20} offset={2}>
                <Form
                  name="import"
                  onFinish={onFinishImport}
                  className=""
                  form={form}
                  id='uploadCustomer'
                >
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Chiến dịch</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="campaign_id"
                        rules={[
                          {
                            required: true,
                            message: 'Xin hãy nhập chiến dịch.'
                          },
                        ]}
                        initialValue={''}
                      >
                        <Select style={{width: '100%'}} showSearch placeholder={"Chọn 1 giá trị"}>
                          {
                            props.campaigns ? props.campaigns.map(campaign => (
                              <Option key={campaign.id}>{campaign.name}</Option>
                            )) : null
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Cơ sở</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="branch_id"
                        rules={[
                          {
                            required: true,
                            message: 'Xin hãy nhập cơ sở.'
                          },
                        ]}
                        initialValue={''}
                      >
                        <Select style={{width: '100%'}} showSearch placeholder={"Chọn 1 giá trị"}>
                          {
                            props.branches ? props.branches.map(branch => (
                              <Option key={branch.id}>{branch.name}</Option>
                            )) : null
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Thị trường</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="market_id"
                        rules={[
                          {
                            required: true,
                            message: 'Xin hãy nhập thị trường.'
                          },
                        ]}
                        initialValue={''}
                      >
                        <Select showSearch placeholder={"Chọn 1 giá trị"} style={{width: '100%'}}>
                          {
                            props.markets ? props.markets.map(market => (
                              <Option key={market.id}>{market.name}</Option>
                            )) : null
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Phân loại khách hàng</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="config_customer_type_id"
                        rules={[
                          {
                            required: true,
                            message: 'Xin hãy nhập phân loại khách hàng.'
                          },
                        ]}
                        initialValue={''}
                      >
                        <Select showSearch placeholder={"Chọn 1 giá trị"} style={{width: '100%'}}>
                          {
                            props.configCustomerTypes ? props.configCustomerTypes.map(configCustomerType => (
                              <Option key={configCustomerType.id} value={configCustomerType.id}>{configCustomerType.name}</Option>
                            )) : null
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Quá trình bán hàng</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="current_process"
                        rules={[
                          {
                            required: true,
                            message: 'Xin hãy nhập quá trình bán hàng.'
                          },
                        ]}
                        initialValue={''}
                      >
                        <Radio.Group>
                          <Radio value={1}>Bán hàng 1</Radio>
                          <Radio value={2}>Bán hàng 2</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span>Ghi chú</span>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        name="note"
                        rules={[
                          {
                            required: false,
                          },
                          {
                            max: 255,
                            message: 'Không được vượt quá 255 ký tự.',
                          }
                        ]}
                        initialValue={''}
                        style={{width: '100%'}}
                      >
                        <TextArea/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <span className='item-required'>Chọn file Excel</span>
                    </Col>
                    <Col span={14}>
                      <Row justify="space-between">
                        <Col>
                          <Form.Item
                            name="file_excel"
                            rules={[
                              {
                                required: true,
                                message: 'Xin hãy nhập file excel.',
                              },
                              {validator: fileValidator},
                            ]}
                            initialValue={null}
                          >
                            <Upload
                              {...uploadProps}
                              customRequest={dummyRequest}
                              multiple={false}
                            >
                              <Button icon={<UploadOutlined/>}>Tải lên</Button>
                            </Upload>
                          </Form.Item>
                        </Col>
                        <Col offset={1}>
                          <Button icon={<DownloadOutlined/>} onClick={downloadTemplate}>Mẫu</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Spin> :
          <Row>
            <Col span={16} offset={4}>
              <Row>
                <Col span={12}>
                  <b>Khách hàng trong file nhập</b>
                </Col>
                <Col span={6}>
                  <p className="success">{dataStatistic['totalRow']}</p>
                </Col>
                <Col span={6}>

                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Khách hàng nhập hợp lệ</b>
                </Col>
                <Col span={6}>
                  <p
                    className="success">{dataStatistic['rowSuccess'].length + dataStatistic['rowDbDuplicate'].length}</p>
                </Col>
                <Col span={6}>
                  <Button type="primary" icon={<DownloadOutlined/>}
                          onClick={() => downloadExcel('rowSuccess', dataStatistic['rowSuccess'].concat(dataStatistic['rowDbDuplicate']))}>
                    Tải về
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Khách hàng bị trùng trên hệ thống</b>
                </Col>
                <Col span={6}>
                  <p className="error">{dataStatistic['rowDbDuplicate'].length}</p>
                </Col>
                <Col span={6}>
                  <Button type="primary" icon={<DownloadOutlined/>}
                          onClick={() => downloadExcel('rowDbDuplicate', dataStatistic['rowDbDuplicate'])}>
                    Tải về
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Khách hàng nhập bị lỗi khác</b>
                </Col>
                <Col span={6}>
                  <p className="error">{dataStatistic['rowFailValidate'].length}</p>
                </Col>
                <Col span={6}>
                  <Button type="primary" icon={<DownloadOutlined/>}
                          onClick={() => downloadExcel('rowFailValidate', dataStatistic['rowFailValidate'])}>
                    Tải về
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Khách hàng trùng danh sách</b>
                </Col>
                <Col span={6}>
                  <p className="error">{dataStatistic['rowFileDuplicate'].length}</p>
                </Col>
                <Col span={6}>
                  <Button type="primary" icon={<DownloadOutlined/>}
                          onClick={() => downloadExcel('rowFileDuplicate', dataStatistic['rowFileDuplicate'])}>
                    Tải về
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
      }
    </Modal>
  );
}
export default injectIntl(ModalImport);
