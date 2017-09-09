import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classname from 'classname';
import home from 'project-pages/less/home';
import theme from 'project-theme/less/theme';

export default class ShelfBook extends Component {
  static propTypes = {
    authors: PropTypes.array,
    id: PropTypes.string.isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired
  };

  extractImage() {
    const { imageLinks } = this.props;
    let style = {};

    if(!!imageLinks && !!imageLinks.thumbnail) {
      style['backgroundImage'] = `url(${imageLinks.thumbnail})`;
    }

    return style;
  }

  isActive() {
    const { id } = this.props;
    return this.context.selection.filter(_id => _id === id).length > 0;
  }

  onClick() {
    const { id } = this.props;
    !this.isActive() 
            ? this.context.onSelect(id) 
            : this.context.onUnselect(id);
  }

  render() {
    const { authors, title } = this.props;

    return (
      <div className={classname(theme.inline, theme.relative, home.shelfWrapper)}>
        <div onClick={this.onClick.bind(this)} className={classname(home.bookCenter, this.isActive() && home.active)}>
          <div className={home.thumbnail} style={this.extractImage()}>
            <span className={home.caption}>
              <span>
                {title}
                {!!authors && authors.map((author, key) => <span key={key} className={home.author}>{author}</span>)}
              </span>
            </span>
          </div>
        </div>
        <div className={home.shelf} />
      </div>
    );
  };
};
