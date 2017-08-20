import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from 'project-root/BooksAPI';

import NoResult from 'project-theme/NoResult';
import Shelf from 'project-root/components/Shelf';
import Spinner from 'react-spinner';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  state = {
    books: [],
    lastQuery: '',
    querying: false
  };

  componentDidMount() {
    this.searchResults();
  }

  componentDidUpdate() {
    this.searchResults();
  }

  getURLParam() {
    return new URLSearchParams(this.context.router.route.location.search).get('q') || '';
  }

  searchResults() {
    const { lastQuery } = this.state;
    const query = this.getURLParam();

    if(lastQuery !== query) {
      this.setState({ 
        lastQuery: query,
        querying: !!query
      });

      if(!!query) {
        BooksAPI.search(query, 20).then(books => this.state.querying && this.setState({ 
          books: (Array.isArray(books) && books) || [],
          querying: false
        }));
      } else {
        this.setState({ books: [] });
      }
    }
  }

  render() {
    const { books, querying } = this.state;
    const query = this.getURLParam();

    if(querying) {
      return <div className={classname(theme.bigSpinner, theme.spinner)}><Spinner /></div>;
    }

    return !!query && (books.length 
                    ? <Shelf books={books} title={this.context.messages.Search.searchResult} />
                    : <NoResult name={query} />);
  };
};