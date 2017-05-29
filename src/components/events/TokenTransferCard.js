'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class TokenTransferCard extends Component {
  render() {
    return (
      <li>
        <div className="block">
          <div className="block_content">
            <h2 className="title">
                <a>To: {this.props.eventLog.args._to}</a>
            </h2>
            <div className="byline">
              <span>Transaction hash: </span> <a>{this.props.eventLog.transactionHash}</a>
            </div>
            <br />
            <div className="byline">
              <span>From: </span> <a>{this.props.eventLog.args._from} (Delivery Service)</a>
            </div>
            <div className="byline">
              <span>Tokens: </span> <a>{this.props.eventLog.args._value.toString()}</a>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
TokenTransferCard.propTypes = {
  eventLog: PropTypes.object.isRequired,
}