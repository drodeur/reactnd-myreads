import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import topbar from 'project-theme/less/topbar';

export default class TopbarItem extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    if(this.context.router.route.location.pathname === '/') {
      return null;
    }

    return (
      <Link to='/' className={topbar.backlink}>
        <div className={topbar.back}>
          <FontAwesome name="chevron-left" size="lg" />
        </div>
      </Link>
    );
  };
};
