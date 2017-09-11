import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classname from 'classname';
import home from 'project-pages/less/home';
import theme from 'project-theme/less/theme';

export default class EmptyShelf extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={classname(theme.inline, theme.relative, home.shelfWrapper)}>
        <div className={home.emptyBook}>
          <h1>{this.context.messages.DefaultLayout.oooops}</h1>
          <span>{this.context.messages.Home.noBookInThisShelf}</span>
        </div>
        <div className={home.shelf} />
      </div>
    );
  };
};
