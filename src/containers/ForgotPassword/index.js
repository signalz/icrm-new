import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {FormattedMessage, injectIntl} from 'react-intl';
import {compose} from 'redux';
import {useHistory} from "react-router-dom";
import {
    Button,
    Form,
    Input,
    notification
} from "antd";
import {resetPassword} from "../App/actions";
import {useDispatch, useSelector} from "react-redux";

export function ForgotPassword({intl, form, ...props}) {
    let history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = intl;
    const {getFieldDecorator, setFieldsValue, getFieldValue, isFieldsTouched} = form;
    const error = useSelector(state => state.global.error);
    const loading = useSelector(state => state.global.loading);
    const status = useSelector(state => state.global.status);
    const [isReset, setIsReset] = useState(false);

    const openNotificationWithIcon = (type, description) => {
        notification[type]({
            message: formatMessage({id: 'appName'}),
            description: description,
        });
    };

    useEffect(() => {
        if (error && error.errors) {
            for (let [key, value] of Object.entries(error.errors)) {
                form.setFields({
                    [key]: {
                        value: getFieldValue(key),
                        errors: [new Error(value)],
                    },
                })
            }
        } else if (!error && isReset && !loading && status) {
            openNotificationWithIcon('success', 'Please confirm the password change in the email');
            setTimeout(() => {
                history.push('login')
            }, 2000);
        }
    }, [error, isReset, loading]);

    const validateToNextPassword = (rule, value, callback) => {
        if (value && window.confirm) {
            form.validateFields(['password_confirmation'], {force: true});
        }
        callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== getFieldValue('password')) {
            callback('Passwords do not match');
        } else {
            callback();
        }
    };

    const okHandle = (e) => {
        setIsReset(true)
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                dispatch(resetPassword({
                    'email': values.email,
                    'password': values.password,
                    'password_confirmation': values.password_confirmation
                }));
            }
        });
    }

    return (
        <div>
            <Helmet
                defaultTitle={formatMessage({id: 'forgotPasswordPage.titlePage'}) + " | Solid"}
            >
            </Helmet>
            <div className="register-box text-center">
                <div>
                    <b>
                        {formatMessage({id: 'forgotPasswordPage.titlePage'})}
                    </b>
                </div>
                <div className="login-box-body">
                    <Form className="row">
                        <Form.Item className="col-12 text-left">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({id: 'registerUserPage.validate.email.required'})
                                    },
                                    {
                                        type: 'email',
                                        message: formatMessage({id: 'registerUserPage.validate.email.email'})
                                    }
                                ],
                            })(
                                <Input
                                    name="email"
                                    type="text"
                                    placeholder={formatMessage({id: 'loginPage.userIDPlaceholder'})}
                                />
                            )}
                        </Form.Item>
                        <Form.Item className="col-12 text-left">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({id: 'registerUserPage.validate.password.required'})
                                    },
                                    {
                                        min: 8,
                                        message: formatMessage({id: 'registerUserPage.validate.password.min'})
                                    },
                                    {
                                        max: 20,
                                        message: formatMessage({id: 'registerUserPage.validate.password.max'})
                                    },
                                    {
                                        validator: validateToNextPassword,
                                    }
                                ],
                            })(
                                <Input.Password
                                    type="password"
                                    placeholder={formatMessage({id: 'forgotPasswordPage.newPassword'})}
                                />
                            )}
                        </Form.Item>
                        <Form.Item className="col-12 text-left">
                            {getFieldDecorator('password_confirmation', {
                                rules: [
                                    {
                                        validator: compareToFirstPassword,
                                    },
                                ],
                            })(
                                <Input.Password
                                    name="password_confirmation"
                                    type="password"
                                    placeholder={formatMessage({id: 'forgotPasswordPage.newPasswordConfirm'})}
                                />
                            )}
                        </Form.Item>
                        <Form.Item className="col-12">
                            <Button
                                type="primary"
                                className="col-12"
                                onClick={okHandle}
                            >
                                {formatMessage({id: 'forgotPasswordPage.reissue'})}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const ForgotPasswordForm = Form.create({name: 'forgotPassword'})(ForgotPassword);
export default compose()(injectIntl(ForgotPasswordForm));
