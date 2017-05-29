'use-strict'

import PropTypes from 'prop-types'
import RealTimeMonitoring, { ExtendedRealTimeMonitoring } from './RealTimeMonitoring'

const monitoringComponentsDefaultPropTypes = {
	eth: PropTypes.object.isRequired,
}

export class BlockNumber extends RealTimeMonitoring {
	method(props) {
		props.eth.getBlockNumber((error, result) => {
			this.commonCallback(error, result)
		})
	}
}
BlockNumber.propTypes = {
	...monitoringComponentsDefaultPropTypes
}

export class TransactionsCount extends ExtendedRealTimeMonitoring {
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