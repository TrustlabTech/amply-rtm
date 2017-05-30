'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ListContainer from './ListContainer'

export class CreateDIDEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props} >
        {
          this.props.events.sort((a, b) => a.blockNumber < b.blockNumber).map(e => {
            return (
              <CreateDIDCard key={e.transactionHash} eventLog={e} />
          )})
        }
      </ListContainer>
    )
  }
}
CreateDIDEventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
}

class CreateDIDCard extends Component {
  render() {
    return (
      <li>
        <div className="block">
          <div className="block_content">
            <h2 className="title">
                <a>DID: {this.props.eventLog.args.did}</a>
            </h2>
            <div className="byline">
              <span>Transaction hash: </span> <a>{this.props.eventLog.transactionHash}</a>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
CreateDIDCard.propTypes = {
  eventLog: PropTypes.object.isRequired,
}