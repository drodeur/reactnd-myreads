import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { flatten } from 'project-core/utils/flatten';
import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES} from 'project-root/Constants';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';

import DefaultLayoutRessource from 'project-ressources/DefaultLayout';
import HomeRessource from 'project-ressources/Home';
import PreviewRessource from 'project-ressources/Preview';
import SearchRessource from 'project-ressources/Search';

export default class AppMessage extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    changeLanguage: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired
  };

  state = {};

  componentWillMount() {
    const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE;
    this.state.language = (language.indexOf('fr') === -1) ? DEFAULT_LANGUAGE : 'fr-CA';
    this.state.messages = this.getMessages(this.state.language);

    addLocaleData([...en, ...fr]);
  }

  changeLanguage(newLanguage) {
    this.setState({
      lang: newLanguage.split('-')[0],
      language: newLanguage,
      messages: this.getMessages(newLanguage)
    });
  }

  getChildContext() {
    return {
      changeLanguage: this.changeLanguage.bind(this),
      lang: this.state.language.split('-')[0],
      language: this.state.language,
      languages: SUPPORTED_LANGUAGES,
      messages: this.state.messages
    };
  }

  getMessages(language) {
    return {
      DefaultLayout: DefaultLayoutRessource[language],
      Home: HomeRessource[language],
      Preview: PreviewRessource[language],
      Search: SearchRessource[language]
    };
  }

  render() {
    const {language, messages} = this.state;

    return (
      <IntlProvider key={language} locale={language} messages={flatten(messages)}>
        {this.props.children}
      </IntlProvider>
    );
  };
};
