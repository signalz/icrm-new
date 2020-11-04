import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {injectIntl} from 'react-intl';
import LoadingSpin from "../../components/LoadingSpin";

export function HomePage({intl, ...props}) {
    const {formatMessage} = intl;

    return (
        <article>
            <Helmet>
                <title>{formatMessage({id: 'homepage.titlePage'})}</title>
                <meta
                    name="description"
                    content={formatMessage({id: 'homepage.titlePage'})}
                />
            </Helmet>
            <LoadingSpin></LoadingSpin>
        </article>
    );
}

export default injectIntl(HomePage);
