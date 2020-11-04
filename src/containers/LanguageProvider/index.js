import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider, addLocaleData } from 'react-intl';

import { makeSelectLocale } from './selectors';
import {translationMessages} from "../../i18n";


const language = navigator.language.split(/[-_]/)[0]

export function LanguageProvider(props) {
  return (
    <IntlProvider
      // locale={props.locale}
      // key={props.locale}
      // messages={props.messages[props.locale]}
      locale={language}
      messages={translationMessages[language]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export default connect(mapStateToProps)(LanguageProvider);
