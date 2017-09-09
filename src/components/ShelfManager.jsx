import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import Select from 'react-select';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class ShelfManager extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onCancelSelection: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired
  };

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  state = {
    options: []
  };

  componentWillMount() {
    let options = Object.keys(this.context.messages.Home.shelfs).map(name => ({
      label: this.context.messages.Home.shelfs[name],
      value: name
    }));

    options.push({
      label: this.context.messages.Home.unclassified,
      value: 'unclassified'
    });

    this.setState({options});
  }

  handleChange(option) {
    this.setState({option: option.value});
  }

  onTransfer() {
    const { option } = this.state;
    
    if(!!state) {
      // TODO
    }
  }

  onCancel() {
    this.props.onCancelSelection();
    this.setState({option: null});
  }

  renderShelfRecap(inCart, name, displayName) {
    const count = inCart.filter(category => category === name).length;

    if(!count) {
      return false;
    }

    return (
      <div key={name}>
        <FormattedMessage id="Home.match" values={{ 
          count, 
          name: <span className={theme.emphasis}>{displayName}</span> 
        }} />
      </div>
    );
  }

  render() {
    const { books, selection } = this.props;
    
    const inCart = selection.map(id => {
      const match = books.find(book => book.id === id);
      return match && match.shelf || 'unclassified';
    });

    if(!selection.length) {
      return false;
    }

    return (
      <div className={theme.shelfManager}>
        <div>{this.context.messages.Home.youHaveSelected}</div>
        {Object.keys(this.context.messages.Home.shelfs).map(name => this.renderShelfRecap(inCart, name, this.context.messages.Home.shelfs[name]))}
        {this.renderShelfRecap(inCart, 'unclassified', this.context.messages.Home.unclassified)}
        <div className="text-left">
          <Select className={theme.menuSelect} value={this.state.option} options={this.state.options} onChange={this.handleChange.bind(this)} clearable={false} autosize={false} />
        </div>
        <button onClick={this.onTransfer.bind(this)} className={classname('btn btn-primary', theme.primary)}>{this.context.messages.DefaultLayout.transfer}</button>
        <button onClick={this.onCancel.bind(this)} className={classname('btn btn-primary', theme.secondary)}>{this.context.messages.DefaultLayout.cancel}</button>
      </div>
    );
  };
};
