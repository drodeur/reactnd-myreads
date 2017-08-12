import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShelfBook from './ShelfBook';

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
        <div className="col-sm-12">{title}</div>
        {books.map(book => <ShelfBook key={book.id} {...book} />)}
      </div>
    );
  };
};
