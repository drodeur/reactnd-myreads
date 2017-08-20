import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SEARCH } from 'project-routes/path';

import FontAwesome from 'react-fontawesome';

import classname from 'classname';
import theme from 'project-theme/less/theme';
import topbar from 'project-theme/less/topbar';

export default class SearchBar extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  getURLParam() {
    return (this.isSearchPage() && new URLSearchParams(this.context.router.route.location.search).get('q')) || '';
  }

  isSearchPage() {
    const { router } = this.context;
    return router.route.location.pathname === SEARCH;
  }

  handleChange(event) {
    const { value } = event.target;
    const { router } = this.context;

    let action = (this.isSearchPage()) 
                        ? router.history.replace 
                        : router.history.push;

    action({
      pathname: SEARCH,
      search: (value && `?q=${value}`) || ''
    });
  }

  render() {
    const query = this.getURLParam();

    return (
      <div className={topbar.searchBar}>
        <FontAwesome className={topbar.searchIcon} name="search" size="lg" />
        <input type="text" onChange={this.handleChange.bind(this)} placeholder={this.context.messages.DefaultLayout.searchBy} value={query} />
      </div>
    );
  };
};
