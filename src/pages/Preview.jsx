import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <span>Preview</span>
      </div>
    );
  };
};