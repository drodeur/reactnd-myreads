import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Topbar from 'project-root/components/Topbar';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div className="col-sm-12">
        <Topbar />
        {this.props.children}
      </div>
    );
  };
};