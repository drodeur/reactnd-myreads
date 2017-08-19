import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TopbarItem extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div className="pull-left">
        {this.props.children}
      </div>
    );
  };
};
