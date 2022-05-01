import React from 'react';

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="App">
        <header className="App-header" id="root">
          {content}
        </header>
      </div>
    );
  }
}

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div>
        Connect Wallet
      </div>
    )
  }
}

exports.DeployerOrAttacher = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        <br />
        <p>
          <button
            onClick={() => parent.selectDeployer()}
          >CREATE GROUP</button>
          <button
            onClick={() => parent.selectAttacher()}
          >JOIN GROUP</button>
          <br />
        </p>
      </div>
    );
  }
}

export default exports;
