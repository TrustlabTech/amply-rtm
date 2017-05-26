'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  SYSTEM_ADDRESS,
  ASSURANCE_ADDRESS,
} from '../../const'

export class ConfirmOpCard extends Component {
  render() {
    const owner = this.props.eventLog.args.owner
        , ownerString = owner === SYSTEM_ADDRESS ? '(SYSTEM)' 
                      : owner === ASSURANCE_ADDRESS ? '(ASSURANCE BOT)' : ''
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
              <span>Owner: </span> <a>{owner}  {ownerString}</a>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
ConfirmOpCard.propTypes = {
  eventLog: PropTypes.object.isRequired,
}