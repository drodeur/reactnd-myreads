import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from 'project-root/BooksAPI';

import ShelfManager from 'project-root/components/ShelfManager';
import Spinner from 'react-spinner';
import Topbar from 'project-theme/Topbar';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    books: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    selection: PropTypes.object.isRequired
  };

  state = {
    books: {},
    isFetching: true,
    selection: {}
  };

  componentDidMount() {
    BooksAPI.getAll().then(_books => {
      let books = {};

      for(const book of _books) {
        books[book.id] = book;
      }

      this.setState({ 
        books,
        isFetching: false
      });
    });
  }

  getChildContext() {
    return {
      books: this.state.books,
      onSelect: this.onSelect.bind(this),
      onUnselect: this.onUnselect.bind(this),
      selection: this.state.selection
    };
  }

  onCancelSelection() {
    this.setState({selection: {}});
  }

  onSelect(obj) {
    this.setState({selection: {
      ...this.state.selection,
      [obj.id]: obj
    }});
  }

  onTransfert(shelf) {
    console.log(shelf);

    this.onCancelSelection();
  }

  onUnselect(obj) {
    delete this.state.selection[obj.id];
    this.setState({selection: this.state.selection});
  }

  render() {
    const { books, isFetching } = this.state;

    if(isFetching) {
      return <div className={classname(theme.bigSpinner, theme.spinner)}><Spinner /></div>;
    }

    return (
      <div className="col-sm-12">
        <Topbar />
        <div className={theme.content}>
          {this.props.children}
        </div>
        <ShelfManager books={books} selection={this.state.selection} onCancelSelection={this.onCancelSelection.bind(this)} onTransfert={this.onTransfert.bind(this)} />
      </div>
    );
  };
};