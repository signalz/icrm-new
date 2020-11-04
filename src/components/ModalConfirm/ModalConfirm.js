import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from "antd";

const ModalConfirm = ({ intl, ...props }) => {
  const {formatMessage} = intl;
  const [visible, setVisible] = useState(props.visible);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <Modal
      visible={visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okText={props.okText}
      cancelText={props.cancelText}
      width="400px"
      closable={false}
      okButtonProps ={{
        loading: props.loading
      }}
    >
      <p>{props.content}</p>
    </Modal>
  );
}
export default injectIntl(ModalConfirm);
