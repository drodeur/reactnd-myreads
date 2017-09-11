import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SEARCH } from 'project-routes/path';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import Shelf from 'project-root/components/Shelf';

import classname from 'classname';
import home from 'project-pages/less/home';
import theme from 'project-theme/less/theme';

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static contextTypes = {
    books: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  filterBooks(shelf) {
    const { books } = this.context;
    return Object.values(books).filter(book => book.shelf === shelf);
  }

  render() {
    return (
      <div>
        {Object.keys(this.context.messages.Home.shelfs).map(key => (
          <Shelf key={key} books={this.filterBooks(key)} title={this.context.messages.Home.shelfs[key]} />
        ))}
        <Link to={SEARCH}>
          <div className={home.add}>
            <FontAwesome name="plus" size="lg" />
          </div>
        </Link>
      </div>
    );
  };
};