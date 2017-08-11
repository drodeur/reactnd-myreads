import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Redirect from 'project-core/request/Redirect';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Components
import DefaultLayout from 'project-pages/DefaultLayout';

export default class AppRoutes extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  discoverChildren() {
    return (
      <Switch>
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={() => <DefaultLayout children={this.discoverChildren()} />} />
        </div>
      </BrowserRouter>
    );
  };
};