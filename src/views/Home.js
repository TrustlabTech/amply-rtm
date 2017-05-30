'use-strict'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Layout from './common/Layout'
import { improveUI } from '../libs/util'
import { CreateDIDEventList, } from '../components/EISEventsList'
import { BlockNumber, TransactionsCount } from '../components/overview'
import {
	RecordEventList,
	ConfirmOpEventList,
	ConfirmNeededEventList,
	MultiTransactEventList,
	TokenTransferEventList,
} from '../components/EDSEventsList'
import { FUNDER_ADDRESS, SYSTEM_ADDRESS, ASSURANCE_ADDRESS } from '../const'

class Home extends Component {
	componentDidMount() {
    improveUI()
  }

  render() {
    return (
			<Layout>
				<div className="right_col" role="main">
					<div className="row tile_count full-height">
						<BlockNumber eth={web3.eth} faClass='fa fa-list' title='Total Blocks' />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Foundation' titleBottom='Transactions' address={FUNDER_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='System' titleBottom='Transactions' address={SYSTEM_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Assurance' titleBottom='Transactions' address={ASSURANCE_ADDRESS} />
					</div>
					<br />
					<div className="row">
						<CreateDIDEventList
							title='DID Creation'
							description='Ethereum Identity Service'
							events={this.props.eis.events.createDID.data} />
						<RecordEventList
							title='Verifiable Claim Record'
							description='Ethereum Delivery Service'
							events={this.props.eds.events.record.data} />
					</div>
					<div className="row">
						<ConfirmOpEventList
							title='Init Token Transfer'
							description='Ethereum Delivery Service'
							events={this.props.eds.events.confirm.data} />
						<ConfirmNeededEventList
							title='Confirmation Needed'
							description='Ethereum Delivery Service'
							events={this.props.eds.events.confirmNeeded.data} />
					</div>
					<div className="row">
						<MultiTransactEventList
							title='Transaction Approved'
							description='Ethereum Delivery Service'
							events={this.props.eds.events.multiTransact.data} />
						<TokenTransferEventList
							title='Token Transfer'
							description='Ethereum Delivery Service'
							events={this.props.eds.events.transfer.data} />
					</div>
				</div>
			</Layout>
    )
  }
}
Home.propTypes = {
	eis: PropTypes.object.isRequired,
	eds: PropTypes.object.isRequired,
	eth: PropTypes.object.isRequired,
}

const mapStoreToProps = (store) => {
	return {
		...store,
	}
}

export default connect(mapStoreToProps)(Home)