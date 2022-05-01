import React from 'react';
import UserViews from './UserViews';

const exports = {...UserViews};
exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Attacher">
        {content}
      </div>
    );
  }
}

exports.Attach = class extends React.Component {
  render() {
    const {parent} = this.props;
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Enter Contract:
        <br />
        <textarea spellCheck="false"
          className='ContractInfo'
          onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
          placeholder='{}'
        />
        <br />
        <button
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
        >JOIN</button>
      </div>
    );
  }
}

exports.Attaching = class extends React.Component {
  render() {
    return (
      <div>
        Joining, please wait...
      </div>
    );
  }
}

exports.Connected = class extends React.Component {
  render() {
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Connected to: {ctcInfoStr}
      </div>
    );
  }
}

exports.ReadMessage = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        <br /> Message:
        <br />
      </div>
    );
  }
}

export default exports;
