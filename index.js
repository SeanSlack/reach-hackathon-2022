import React from 'react';
import AppViews from './views/AppViews';
import CreateViews from './views/CreateViews';
import JoinViews from './views/JoinViews';
import {renderDOM, renderView} from './views/render';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { string } from 'prop-types';
const reach = loadStdlib(process.env);
reach.setWalletFallback(reach.walletFallback({
  providerEnv: 'TestNet', MyAlgoConnect }));

const {standardUnit} = reach;
//const groupMembers = new Array();
const defaults = {defaultFundAmt: '10', defaultMessage: 'Hello', standardUnit};
const Message = {"from": string, "message": string};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'ConnectAccount', ...defaults};
  }
  async componentDidMount() {
    const acc = await reach.getDefaultAccount();
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    this.setState({acc, bal});
    this.setState({view: 'DeployerOrAttacher'});
  }
  selectAttacher() { this.setState({view: 'Wrapper', ContentView: Attacher}); }
  selectDeployer() { this.setState({view: 'Wrapper', ContentView: Deployer}); }
  render() { return renderView(this, AppViews); }
}

class Player extends React.Component {
  //displayName(i) { this.setState({view: 'Done', outcome: i}); }
}

class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Deploy'};
  }
  ready() {}
  async deploy() {
    const ctc = this.props.acc.contract(backend); // deploys contract
    this.setState({view: 'Deploying', ctc}); // displays deploy view
    backend.Admin(ctc, this); //runs reach program as alice
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2); //gets contract info
    this.setState({view: 'WaitingForAttacher', ctcInfoStr}); //displays contract info and waits
  }
  render() { return renderView(this, CreateViews); }
}
class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Attach'};
  }
  async attach(ctcInfoStr) {
    this.setState({view: 'Attaching'});
    const ctc = this.props.acc.contract(backend, JSON.parse(ctcInfoStr)); //attatches to contract
    this.setState({view: 'Connected', ctcInfoStr});
  }
  sendMessage(){
    Message["from"] = this.props.acc.getAddress();
    Message["message"] = "Hello";
    ctc.apis.MessengerApi.sendMessage(Message);
    const message = ctc.apis.MessengerApi.receiveMessage();
    console.log(message);
  }
  receiveMessage(){
  }
  render() { return renderView(this, JoinViews); }
}

renderDOM(<App />);