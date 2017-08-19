import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import {forOwn as _forOwn} from 'lodash';

import classname from 'classname';
import theme from 'project-theme/less/theme';
import topbar from 'project-theme/less/topbar';

export default class AppLanguage extends Component {

  static contextTypes = {
    changeLanguage: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired
  };

  languages = null;

  constructLanguage() {
    if(!this.languages) {
      this.languages = [];

      _forOwn(this.context.languages, (value) => {
        this.languages.push({value, label: value.split('-')[0]});
      });
    }
  }

  handleChange(language) {
    this.context.changeLanguage(language.value);
  }

  render() {
    this.constructLanguage();

    return (
      <div className={topbar.fieldMargin}>
        <Select className={classname(theme.menuSelect, topbar.language)} value={this.context.language} options={this.languages} onChange={this.handleChange.bind(this)} clearable={false} autosize={false} />
      </div>
    );
  };
};
