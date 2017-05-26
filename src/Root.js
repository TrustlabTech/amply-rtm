'use-strict'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  Route,
  Router,
  browserHistory,
} from 'react-router'

import Home from  './views/Home'
import EIS from './libs/events/eis'
import EDS from './libs/events/eds'
import { createDID, } from './actions/eis'
import {
  confirmOp,
  recordClaim,
  multiTransact,
  tokenTransfer,
  confirmOpNeeded,
} from './actions/eds'
import {
  ACTION_CREATE_DID,
  ACTION_CONFIRM_OP,
  ACTION_RECORD_CLAIM,
  ACTION_MULTI_TRANSACT,
  ACTION_TOKEN_TRANSFER,
  ACTION_CONFIRM_OP_NEEDED,
} from './const'

class Root extends Component {
  constructor(props) {
    super(props)

    this.eis = new EIS()
    this.eds = new EDS()
  }

  componentDidMount() {
    this.initWatchers()
  }

  async initWatchers() {
    const eisInit = await this.eis.init()
        , edsInit = await this.eds.init()

    this.eisEmitter = eisInit.watch()
    this.edsEmitter = edsInit.watch()

    this.registerListeners()
  }

  registerListeners() {
    // identity service
    this.eisEmitter.addListener(ACTION_CREATE_DID, (e, r) => !e && this.props.createDID(r))
    // delivery service
    this.edsEmitter.addListener(ACTION_CONFIRM_OP, (e, r) => !e && this.props.confirmOp(r))
    this.edsEmitter.addListener(ACTION_RECORD_CLAIM, (e, r) => !e && this.props.recordClaim(r))
    this.edsEmitter.addListener(ACTION_MULTI_TRANSACT, (e, r) => !e && this.props.multiTransact(r))
    this.edsEmitter.addListener(ACTION_TOKEN_TRANSFER, (e, r) => !e && this.props.tokenTransfer(r))
    this.edsEmitter.addListener(ACTION_CONFIRM_OP_NEEDED, (e, r) => !e && this.props.confirmOpNeeded(r))
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
      </Router>
    )
  }
}

Root.propTypes = {
  createDID: PropTypes.func.isRequired
, confirmOp: PropTypes.func.isRequired
, recordClaim: PropTypes.func.isRequired
, multiTransact: PropTypes.func.isRequired
, tokenTransfer: PropTypes.func.isRequired
, confirmOpNeeded: PropTypes.func.isRequired
,
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDID: data => dispatch(createDID(data))
  , confirmOp: data => dispatch(confirmOp(data))
  , recordClaim: data => dispatch(recordClaim(data))
  , multiTransact: data => dispatch(multiTransact(data))
  , tokenTransfer: data => dispatch(tokenTransfer(data))
  , confirmOpNeeded: data => dispatch(confirmOpNeeded(data))
  ,
  }
}

export default connect(null, mapDispatchToProps)(Root)