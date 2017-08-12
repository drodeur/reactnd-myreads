import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShelfBook extends Component {
  static propTypes = {
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  render() {
    const { imageLinks, title } = this.props;

    return (
      <div className="col-sm-2">
        <img src={imageLinks.thumbnail} alt={title} />
        {title}
      </div>
    );
  };
};
