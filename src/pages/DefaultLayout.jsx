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
    books: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired
  };

  state = {
    books: [],
    isFetching: true,
    selection: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ 
      books,
      isFetching: false
    }));
  }

  filterSelection(id) {
    return this.state.selection.filter(_id => _id !== id);
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
    this.setState({selection: []});
  }

  onSelect(id) {
    let selection = this.filterSelection(id);
    selection.push(id);
    this.setState({selection});
  }

  onUnselect(id) {
    this.setState({selection: this.filterSelection(id)});
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
          {
            React.cloneElement(this.props.children, {
              books
            })
          }
        </div>
        <ShelfManager books={books} selection={this.state.selection} onCancelSelection={this.onCancelSelection.bind(this)} />
      </div>
    );
  };
};