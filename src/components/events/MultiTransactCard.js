'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  SYSTEM_ADDRESS,
  ASSURANCE_ADDRESS,
} from '../../const'

export class MultiTransactCard extends Component {
  render() {
    const approver = this.props.eventLog.args.initiator
        , approverString = approver === SYSTEM_ADDRESS ? '(SYSTEM)' 
                         : approver === ASSURANCE_ADDRESS ? '(ASSURANCE BOT)' : ''
    return (
      <li>
        <div className="block">
          <div className="block_content">
            <h2 className="title">
                <a>Operation: {this.props.eventLog.args.operation}</a>
            </h2>
            <div className="byline">
              <span>Transaction hash: </span> <a>{this.props.eventLog.transactionHash}</a>
            </div>
            <br />
            <div className="byline">
              <span>Approved by: </span> <a>{approver}  {approverString}</a>
            </div>
            <div className="byline">
              <span>To: </span> <a>{this.props.eventLog.args.to}</a>
            </div>
            <div className="byline">
              <span>Claimed Tokens: </span> <a>{this.props.eventLog.args.value.toString()}</a>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
MultiTransactCard.propTypes = {
  eventLog: PropTypes.object.isRequired,
}