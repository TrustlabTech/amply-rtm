'use-strict'

import React, { Component } from 'react'

import Layout from './common/Layout'
import { improveUI } from '../libs/util'
import { BlockNumber, TransactionsCount } from '../components/overview'
import { FUNDER_ADDRESS, SYSTEM_ADDRESS, ASSURANCE_ADDRESS } from '../const'

export default class Statistics extends Component {

  componentDidMount() {
    improveUI()
  }

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

          

        </div>
      </Layout>
    )
  }
}