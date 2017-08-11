import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Redirect extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    window.location.href = this.props.to;
  }

  render() {
    return null;
  }
};
