import React from 'react';
import { FormattedMessage } from 'react-intl';
import A from '../A';
import LocaleToggle from '../../containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
    return (
        <Wrapper>
            <section>
                <FormattedMessage
                    {...messages.authorMessage}
                    values={{
                        author: <A target="_blank" href="https://github.com/pdtung">CRM System</A>,
                    }}
                />
            </section>
        </Wrapper>
    );
}

export default Footer;
