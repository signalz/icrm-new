import React from 'react';
import { injectIntl } from 'react-intl';
import { notification } from "antd";

const Notification = ({intl, ...props}) => {
    return (
        notification[props.type]({
            message: props.title,
            description: props.description,
        })
    );
}
export default injectIntl(Notification);
