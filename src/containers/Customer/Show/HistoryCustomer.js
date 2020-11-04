import React from 'react';
import {
    Col,
    Row,
    Spin,
    Avatar,
} from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import { injectIntl } from 'react-intl';

const HistoryCustomer = ({intl, ...props}) => {
    const log = props.logs;
    if (!log) {
        return null;
    }
    return (
        <Row align="middle" style={{ margin: '25px 0' }}>
            <Col span={6}>
                <b>{log.created_at}</b>
            </Col>
            <Col span={9}>
                <Row align="middle">
                    <Col>
                        <Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Col>
                    &nbsp;&nbsp;&nbsp;
                    <Col>
                        <Row>
                            <b>{log.user.name}</b>
                        </Row>
                        <Row>
                            <span>Chuyên viên kinh doanh</span>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <span>{log.title}&nbsp;</span><b>{log.description}</b>
            </Col>
        </Row>
    );
}

export default injectIntl(HistoryCustomer);
