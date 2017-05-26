'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class RecordCard extends Component {
  render() {
    return (
      <li>
        <div className="block">
          <div className="block_content">
            <h2 className="title">
                <a>Verifiable Claim: {this.props.eventLog.args.vchash}</a>
            </h2>
            <div className="byline">
              <span>Transaction hash: </span> <a>{this.props.eventLog.transactionHash}</a>
            </div>
            <br />
            <div className="byline">
              <span>Date: </span> <a>{this.props.eventLog.args.date}</a>
            </div>
            <div className="byline">
              <span>Centre DID: </span> <a>{this.props.eventLog.args.centreDID}</a>
            </div>
            <div className="byline">
              <span>Claimed Tokens: </span> <a>{this.props.eventLog.args.claimedTokens.toString()}</a>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
RecordCard.propTypes = {
  eventLog: PropTypes.object.isRequired,
}