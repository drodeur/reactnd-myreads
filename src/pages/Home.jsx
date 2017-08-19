import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SEARCH } from 'project-routes/path';
import { Link } from 'react-router-dom';

import * as BooksAPI from 'project-root/BooksAPI';
import FontAwesome from 'react-fontawesome';
import Shelf from 'project-root/components/Shelf';

import classname from 'classname';
import home from 'project-pages/less/home';
import theme from 'project-theme/less/theme';

export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  filterBooks(shelf) {
    const { books } = this.state;
    return books.filter(book => book.shelf === shelf);
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