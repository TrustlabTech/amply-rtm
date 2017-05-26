'use-strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

const PLACEHOLDER = '...'

export default class RealTimeMonitoring extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
			loading: false,
		}
	}

	componentWillMount() {
		this.setState({ loading: true })
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.update(this.props)
		}, 5 * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	update() {
		this.setState({ loading: true })
		this.method(this.props, this.state.data)
	}

	commonCallback(error, result) {
	if (error) this.setState({ data: null, loading: false })
	else this.setState({ data: result, loading: false })
}

	method(props) { /* must override */ }

	render() {
		return (
			<div className="col-md-3 col-sm-5 col-xs-8 tile_stats_count">
				<span className="count_top"><i className={this.props.faClass}></i> {this.props.title}</span>
				<div className="count">{this.state.data === null ? PLACEHOLDER : this.state.data}</div>
			</div>
		)
	}
}

RealTimeMonitoring.propTypes = {
	title: PropTypes.string.isRequired,
	faClass: PropTypes.string.isRequired,
}

export class ExtendedRealTimeMonitoring extends RealTimeMonitoring {
	render() {
		return (
			<div className="col-md-3 col-sm-5 col-xs-8 tile_stats_count">
				<span className="count_top"><i className={this.props.faClassTop}></i> {this.props.titleTop}</span>
				<div className="count">{this.state.data === null ? PLACEHOLDER : this.state.data}</div>
				<span className="count_bottom">
					<i className={this.props.faClassBottom}></i>
					{this.props.titleBottom}:    {this.state.dataBottom === null ? PLACEHOLDER : this.state.dataBottom}
				</span>
			</div>
		)
	}
}