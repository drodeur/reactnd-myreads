import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class ShelfBook extends Component {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    const { authors, imageLinks, title } = this.props;

    return (
      <div className={classname(theme.inline, theme.relative, theme.shelfWrapper)}>
        <div className={classname(theme.bookCenter)}>
          <div className={theme.thumbnail} style={{backgroundImage: `url(${imageLinks.thumbnail})`}}>
            <span className={theme.caption}>
              <span>
                {title}
                {authors.map((author, key) => <span key={key} className={theme.author}>{author}</span>)}
              </span>
            </span>
          </div>
        </div>
        <div className={theme.shelf} />
      </div>
    );
  };
};
