import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import LoadingSpin from "../../../components/LoadingSpin";
import { Layout, Table, Button, Form, Input, Select, Statistic } from "antd";
import Icon, { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import NoData from "../../../components/NoData";
import { useHistory } from "react-router-dom";

export function Setting({ intl, ...props }) {
  let history = useHistory();
  const { formatMessage } = intl;
  const { Content } = Layout;

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage({ id: "config.title" })}</title>
        <meta
          name="description"
          content={formatMessage({
            id: "config.title"
          })}
        />
      </Helmet>
      <Fragment>
        <Content className="site-layout-background setting">
          <div className="d-flex justify-content-between">
            <span className="title">Trang chủ > Cài đặt</span>
          </div>
          <br />
          <div>
            <div className="row title-group">
              <div className="col-12">
                <p>Tổng quan</p>
              </div>
            </div>
            <div className="row mt-3 mb-4">
              <div className="col-3">
                <div className="small-box bg-info">
                  <p>Số nhân viên</p>
                  <h3>9</h3>
                  <p>Tháng 8/2020</p>
                </div>
              </div>
              <div className="col-3">
                <div className="small-box bg-info">
                  <p>Số sản phẩm</p>
                  <h3>9</h3>
                  <p>Tháng 8/2020</p>
                </div>
              </div>
              <div className="col-3">
                <div className="small-box bg-info">
                  <p>Số cơ sở</p>
                  <h3>9</h3>
                  <p>Tháng 8/2020</p>
                </div>
              </div>
              <div className="col-3">
                <div className="small-box bg-info">
                  <p>Số gói ưu đãi</p>
                  <h3>9</h3>
                  <p>Tháng 8/2020</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row title-group">
              <div className="col-6">
                <p>Thông tin gói đăng ký</p>
              </div>
              <div className="col-6">
                <p>Thông tin liên hệ</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Tên công ty:</p>
                  </div>
                  <div className="col-6">
                    <p>Công ty TNHH một thành viên MT</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Tên gói đăng ký: </p>
                  </div>
                  <div className="col-6">
                    <p>Gói Sliver</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Số tài khoản:</p>
                  </div>
                  <div className="col-6">
                    <p>012345678</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Ngày sử dụng</p>
                  </div>
                  <div className="col-6">
                    <p>3/9/2020</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Ngày hết hạn</p>
                  </div>
                  <div className="col-6">
                    <p>3/9/2020</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Tên đại diện:</p>
                  </div>
                  <div className="col-6">
                    <p>Anh NQ</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Số điện thoại:</p>
                  </div>
                  <div className="col-6">
                    <p>012345678</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 info-label">
                    <p>Email:</p>
                  </div>
                  <div className="col-6">
                    <p>test@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Fragment>
    </Fragment>
  );
}

export default injectIntl(Setting);
