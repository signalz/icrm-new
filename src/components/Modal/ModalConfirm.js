import React, { useEffect, useState } from 'react';
import {injectIntl} from 'react-intl';
import { Modal } from "antd";
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const ModalConfirm = ({intl, ...props}) => {
    const {formatMessage} = intl;
    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    return (
        Modal.confirm({
            title: 'Bạn có thực sự muốn xóa?',
            icon: <ExclamationCircleOutlined />,
            content: props.content,
            okText: 'ĐỒng ý',
            cancelText: 'HỦy',
        })
    );
}
export default injectIntl(ModalConfirm);
