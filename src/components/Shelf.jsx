import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShelfBook from './ShelfBook';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    const { books, title } = this.props;

    return (
      <div className="row">
        <h2 className={classname('col-sm-12', theme.subtitle)}>{title}</h2>
        <div className={classname(theme.center, theme.clear, theme.overflow)}>
          {books.map(book => <ShelfBook key={book.id} {...book} />)}
        </div>
      </div>
    );
  };
};
