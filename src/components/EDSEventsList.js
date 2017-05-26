'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ListContainer from './ListContainer'
import {
  RecordCard,
  ConfirmOpCard,
  ConfirmNeededCard,
  MultiTransactCard,
  TokenTransferCard,
} from './eds'

const commonPropTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export class RecordEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props}>
        {
          this.props.events.reverse().map(e => {
            return <RecordCard key={e.transactionHash} eventLog={e} />
          })
        }
      </ListContainer>
    )
  }
}
RecordEventList.propTypes = {
  ...commonPropTypes,
}

export class ConfirmOpEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props}>
        {
          this.props.events.reverse().map(e => {
            return <ConfirmOpCard key={e.transactionHash} eventLog={e} />
          })
        }
      </ListContainer>
    )
  }
}
ConfirmOpEventList.propTypes = {
  ...commonPropTypes,
}

export class ConfirmNeededEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props}>
        {
          this.props.events.reverse().map(e => {
            return <ConfirmNeededCard key={e.transactionHash} eventLog={e} />
          })
        }
      </ListContainer>
    )
  }
}
ConfirmNeededEventList.propTypes = {
  ...commonPropTypes,
}

export class MultiTransactEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props}>
        {
          this.props.events.reverse().map(e => {
            return <MultiTransactCard key={e.transactionHash} eventLog={e} />
          })
        }
      </ListContainer>
    )
  }
}
MultiTransactEventList.propTypes = {
  ...commonPropTypes,
}

export class TokenTransferEventList extends Component {
  render() {
    return (
      <ListContainer {...this.props}>
        {
          this.props.events.reverse().map(e => {
            return <TokenTransferCard key={e.transactionHash} eventLog={e} />
          })
        }
      </ListContainer>
    )
  }
}
TokenTransferEventList.propTypes = {
  ...commonPropTypes,
}