import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Input,
    Button,
    Form
} from 'antd';
import { Wrapper } from './style';
import messages from './messages';
import { logIn } from '../App/actions';
import { useDispatch, useSelector } from "react-redux";
import { appReducer } from '../App/reducer'
import { Link } from "react-router-dom";
import { CODE_ENTER } from "../../helpers/constants"
import '@ant-design/compatible/assets/index.css';

export function Login({intl, ...props}) {
    fetch("https://5e762ca975012c00165e48b9.mockapi.io/projects").then(res => res.json()).then(res => console.log(res, "===========")).catch(e => console.log(e))
    const {formatMessage} = intl;
    const dispatch = useDispatch();
    const errorData = useSelector(state => state.global);

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [inputs, setInputs] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        event.persist();
        setError(null);
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    useEffect(() => {
        setStatus(errorData.status);
        if (errorData.error === false) {
            setError(null);
        } else {
            setError(formatMessage({id: 'loginPage.validate.notFound'}));
        }
    }, [errorData, status]);

    const onFinish = values => {
        setLoading(true);
        dispatch(logIn(values));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleKeyPress = (values) => {
        if (values.charCode === CODE_ENTER) {
            setLoading(true);
            dispatch(logIn(values));
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Wrapper className="login-box">
            <Helmet
                defaultTitle={formatMessage({id: 'loginPage.title'})}
            >
            </Helmet>
            <div className="register-box text-center">
                <div>
                    <b>
                        <FormattedMessage {...messages.titlePage} />
                    </b>
                </div>
                <div className="login-box-body">
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            className="text-left"
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({id: 'loginPage.validate.loginId.required'}),
                                },
                                {
                                    type: "email",
                                    message: formatMessage({id: 'loginPage.validate.loginId'})
                                },
                            ]}
                        >
                            <div className="has-feedback">
                                <Input
                                    name="email"
                                    type="text"
                                    required
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    value={inputs.email}
                                    className="has-feedback"
                                    placeholder={formatMessage({id: 'loginPage.userIDPlaceholder'})}
                                />
                                <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                                <span className="text-danger p-0">{error}</span>
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className="text-left"
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({id: 'loginPage.validate.password.required'})
                                },
                                {
                                    min: 6,
                                    message: formatMessage({id: 'loginPage.validate.password'})
                                },
                                {
                                    max: 20,
                                    message: formatMessage({id: 'loginPage.validate.password'})
                                },
                            ]}
                        >
                            <div className="has-feedback">
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    value={inputs.password}
                                    className="has-feedback"
                                    placeholder={formatMessage({id: 'loginPage.passwordPlaceholder'})}
                                />
                                <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                                <span className="text-danger p-0">{error}</span>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                className="w-100 btn-login"
                                loading={loading}
                                htmlType="submit"
                            >
                                <FormattedMessage {...messages.signIn} />
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <Link to="/reset-password"><FormattedMessage {...messages.forgotPassword} /></Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default injectIntl(Login);
