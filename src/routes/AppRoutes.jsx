import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as PATH from './path';
import Redirect from 'project-core/request/Redirect';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Components
import DefaultLayout from 'project-pages/DefaultLayout';
import Home from 'project-pages/Home';
import Preview from 'project-pages/Preview';
import Search from 'project-pages/Search';


export default class AppRoutes extends Component {
  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  discoverChildren() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`${PATH.PREVIEW}/:id`} component={Preview} />
        <Route exact path={PATH.SEARCH} component={Search} />
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