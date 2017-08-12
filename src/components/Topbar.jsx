import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Topbar extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-3">
          <span>{this.context.messages.DefaultLayout.siteName}</span>
        </div>
        <div className="col-sm-6">
          <input type="text" placeholder={this.context.messages.DefaultLayout.searchBy} />
        </div>
        <div className="col-sm-3">
          EN
        </div>
      </div>
    );
  };
};
