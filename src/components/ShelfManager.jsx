import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UNCLASSIFIED } from 'project-root/Constants';
import { FormattedMessage } from 'react-intl';

import Select from 'react-select';

import classname from 'classname';
import theme from 'project-theme/less/theme';

export default class ShelfManager extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    onCancelSelection: PropTypes.func.isRequired,
    onTransfert: PropTypes.func.isRequired,
    selection: PropTypes.object.isRequired
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
      value: UNCLASSIFIED
    });

    this.setState({options});
  }

  componentWillReceiveProps(nextProps) {
    if(!Object.keys(nextProps.selection).length) {
      this.setState({option: null});
    }
  }

  handleChange(option) {
    this.setState({option: option.value});
  }

  onTransfer() {
    const { option } = this.state;

    if(!!option && Object.keys(this.props.selection).length) {
      this.props.onTransfert(option);
      this.setState({option: null});
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
      <div key={name} className={theme.marginSUD}>
        <FormattedMessage id="Home.match" values={{ 
          count, 
          name: <span className={theme.emphasis}>{displayName}</span> 
        }} />
      </div>
    );
  }

  render() {
    const { books, selection } = this.props;
    
    const inCart = Object.keys(selection).map(id => {
      const match = Object.keys(books).find(_id => _id === id);
      return match && books[match].shelf || UNCLASSIFIED;
    });

    return (
      <div className={classname(theme.shelfManager, !!Object.keys(selection).length && theme.active)}>
        <div className={theme.marginSUD}>
          <div>{this.context.messages.Home.youHaveSelected}</div>
        </div>
        {Object.keys(this.context.messages.Home.shelfs).map(name => this.renderShelfRecap(inCart, name, this.context.messages.Home.shelfs[name]))}
        {this.renderShelfRecap(inCart, UNCLASSIFIED, this.context.messages.Home.unclassified)}
        <div className={theme.marginUD}>
          <div className="text-left">
            <Select className={theme.menuSelect} value={this.state.option} options={this.state.options} onChange={this.handleChange.bind(this)} clearable={false} autosize={false} />
          </div>
        </div>
        <button onClick={this.onTransfer.bind(this)} className={classname('btn btn-primary', theme.primary, theme.btn)}>{this.context.messages.DefaultLayout.transfer}</button>
        <button onClick={this.onCancel.bind(this)} className={classname('btn btn-primary', theme.secondary, theme.btn)}>{this.context.messages.DefaultLayout.cancel}</button>
      </div>
    );
  };
};
