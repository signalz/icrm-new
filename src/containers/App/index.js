import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
    Switch,
    Route,
    Redirect,
    matchPath,
    withRouter,
} from 'react-router-dom';
import Header from '../../components/Header';
import Main from "../../components/Main";
import { connect } from 'react-redux';
import { Wrapper } from './style';
import routes from '../../routes';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';

const App = ({isAuthenticated}) => {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}
            locale={locale}
            getPopupContainer={
                node => {
                    if (node) {
                        return node.parentNode;
                    }
                    return document.body;
                }
            }
        >
            <Wrapper className="wrapper main-wrapper" isAuthenticated={isAuthenticated}>
                <Helmet
                    titleTemplate="%s | iCRM"
                    defaultTitle="iCRM"
                >
                    <meta name="description" content="iCRM"/>
                </Helmet>
                {isAuthenticated ? (
                    <Fragment>
                        <Header/>
                        <Main/>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header/>
                        <MainContentArea isPublic defaultRef="/login"/>
                    </Fragment>
                )}
            </Wrapper>
        </ConfigProvider>
    );
};

export const MainContentArea = withRouter(({location, isPublic, defaultRef}) => {
    const validLocation = routes.find(
        route => !!matchPath(location.pathname, route),
    );
    return (
        <Switch>
            {routes.map(
                (value, index) =>
                    (value.all || value.public === isPublic) && (
                        <Route
                            key={index}
                            exact={value.exact || false}
                            path={value.path}
                            component={value.component}
                        />
                    ),
            )}
            <Redirect push to={validLocation ? defaultRef : '/404'}/>
        </Switch>
    );
});

App.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.global.accessToken !== null,
});

export default connect(mapStateToProps)(App);
