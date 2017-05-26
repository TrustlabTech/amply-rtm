'use-strict'

import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Layout from '../common/Layout'
import RealTimeMonitoring, { ExtendedRealTimeMonitoring } from '../components/RealTimeMonitoring'
import { FUNDER_ADDRESS, SYSTEM_ADDRESS, ASSURANCE_ADDRESS } from '../const'
import { CreateDIDEventList, } from '../components/EISEventsList'
import {
	RecordEventList,
	ConfirmOpEventList,
	ConfirmNeededEventList,
	MultiTransactEventList,
	TokenTransferEventList,
} from '../components/EDSEventsList'

const monitoringComponentsDefaultPropTypes = {
	eth: PropTypes.object.isRequired,
}

class BlockNumber extends RealTimeMonitoring {
	method(props) {
		props.eth.getBlockNumber((error, result) => {
			this.commonCallback(error, result)
		})
	}
}
BlockNumber.propTypes = {
	...monitoringComponentsDefaultPropTypes
}

class TransactionsCount extends ExtendedRealTimeMonitoring {
	method(props) {
		props.eth.getTransactionCount(this.props.address, (error, result) => {
			if (error) !this.setState({ dataBottom: null, loading: false }) && console.log(error)
			else this.setState({ dataBottom: result, loading: false })
		})
		props.eth.getBalance(this.props.address, (error, result) => {
			this.commonCallback(error, web3.fromWei(result, 'ether').toString())
		})
	}
}
TransactionsCount.propTypes = {
	...monitoringComponentsDefaultPropTypes,
	address: PropTypes.string.isRequired,
}

class Home extends Component {
  render() {
    return (
			<Layout>
				<div className="right_col" role="main">
					<div className="row tile_count">
						<BlockNumber eth={web3.eth} faClass='fa fa-list' title='Total Blocks' />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Foundation' titleBottom='Transactions' address={FUNDER_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='System' titleBottom='Transactions' address={SYSTEM_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Assurance' titleBottom='Transactions' address={ASSURANCE_ADDRESS} />
					</div>
					<br />
					<div className="row">
						<CreateDIDEventList
							title='Ethereum Identity Service'
							description='DID Creation'
							events={this.props.eis.events.createDID.data} />
						<RecordEventList
							title='Ethereum Delivery Service'
							description='Verifiable Claim Record'
							events={this.props.eds.events.record.data} />
					</div>
					<div className="row">
						<ConfirmOpEventList
							title='Ethereum Delivery Service'
							description='Init Token Transfer'
							events={this.props.eds.events.confirm.data} />
						<ConfirmNeededEventList
							title='Ethereum Delivery Service'
							description='Confirmation Needed'
							events={this.props.eds.events.confirmNeeded.data} />
					</div>
					<div className="row">
						<MultiTransactEventList
							title='Ethereum Delivery Service'
							description='Transaction Approved'
							events={this.props.eds.events.multiTransact.data} />
						<TokenTransferEventList
							title='Ethereum Delivery Service'
							description='Token Transfer'
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