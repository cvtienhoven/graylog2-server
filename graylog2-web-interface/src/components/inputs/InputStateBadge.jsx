import React from 'react';
import Reflux from 'reflux';
import { Label, OverlayTrigger, Popover } from 'react-bootstrap';

import { InputStatesStore } from 'stores/inputs';

import { LinkToNode, Spinner } from 'components/common';

import InputStateComparator from 'logic/inputs/InputStateComparator';

const InputStateBadge = React.createClass({
  propTypes: {
    input: React.PropTypes.object.isRequired,
  },
  mixins: [Reflux.connect(InputStatesStore)],
  getInitialState() {
    return {};
  },
  comparator: new InputStateComparator(),
  _labelClassForState(state) {
    switch (state) {
      case 'RUNNING':
        return 'success';
      case 'FAILED':
        return 'danger';
      case 'STARTING':
        return 'info';
      default:
        return 'warning';
    }
  },

  _textForState(sortedStates) {
    return sortedStates.map(state => state.count + ' ' + state.state).join(', ');
  },
  render() {
    if (!this.state.inputStates) {
      return <Spinner />;
    }

    const input = this.props.input;
    const inputId = input.id;

    const inputStates = {};
    if (this.state.inputStates[inputId]) {
      Object.keys(this.state.inputStates[inputId]).forEach((node) => {
        const state = this.state.inputStates[inputId][node].state;
        if (!inputStates[state]) {
          inputStates[state] = [];
        }
        inputStates[state].push(node);
      });
    }

    const sorted = Object.keys(inputStates).sort(this.comparator.compare.bind(this.comparator)).map(state => {
      return {state: state, count: inputStates[state].length};
    });

    if (sorted.length > 0) {
      const popOverText = sorted.map(state => {
        return inputStates[state.state].map(node => {
          return <span><LinkToNode nodeId={node} />: {state.state}<br/></span>;
        });
      });
      const popover = (
        <Popover id="inputstate-badge-details" title={'Input States for ' + input.title}>
          {popOverText}
        </Popover>
      );
      return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
          <Label bsStyle={this._labelClassForState(sorted[0].state)} title="Click to show details"
                 bsSize="xsmall" style={{cursor: 'pointer'}}>{this._textForState(sorted)}</Label>
        </OverlayTrigger>
      );
    } else {
      const text = input.global || input.node === undefined ? "0 RUNNING" : "NOT RUNNING";
      return (
        <Label bsStyle="danger" bsSize="xsmall">{text}</Label>
      );
    }
  },
});

export default InputStateBadge;
