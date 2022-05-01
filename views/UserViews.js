import React from 'react';

const exports = {};
exports.WaitingForResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}
exports.Done = class extends React.Component {
  async copyToClipboard(button) {
    const {ctcInfoStr} = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }
  render() {
    const {ctcInfoStr} = this.props;
    return (
      <div>
        Group Members:
      <br /> Please give them this contract info:
      <pre className='ContractInfo'>
        {ctcInfoStr}
      </pre>
      <button
        onClick={(e) => this.copyToClipboard(e.currentTarget)}
      >Copy to clipboard</button>
    </div>
    );
  }
}

exports.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

export default exports;
