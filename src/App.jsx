import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppMessage from './AppMessage';
import AppRoutes from 'project-routes/AppRoutes';

export default class App extends Component {
  render() {
    return (
      <AppMessage>
        <AppRoutes />
      </AppMessage>
    );
  };
};
