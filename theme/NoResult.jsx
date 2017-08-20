import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import theme from 'project-theme/less/theme';

export default class NoResult extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    const { name } = this.props;

    return (
      <div className="text-center">
        <div className={theme.paddingUD}>
          <h3><FormattedMessage id="DefaultLayout.noResult.title" values={{name: <span className={theme.emphasis}>{name}</span>}} /></h3>
          <h4>{this.context.messages.DefaultLayout.noResult.body}</h4>
        </div>
        <div className={theme.noResult} />
      </div>
    );
  };
};
