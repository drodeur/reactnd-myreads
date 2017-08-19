import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppLanguage from 'project-core/application/AppLanguage';
import BackButton from './BackButton';
import SearchBar from 'project-theme/SearchBar';
import TopBarItem from './TopBarItem';

import classname from 'classname';
import theme from 'project-theme/less/theme';
import topbar from 'project-theme/less/topbar';

export default class Topbar extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={classname('row', topbar.topbar)}>
        <div className={theme.relative}>
          <div className="col-sm-3">
            <div className="row">
              <TopBarItem><BackButton /></TopBarItem>
              <TopBarItem><h1 className={topbar.siteName}>{this.context.messages.DefaultLayout.siteName}</h1></TopBarItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <SearchBar />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="pull-right">
              <AppLanguage />
            </div>
          </div>
        </div>
      </div>
    );
  };
};
