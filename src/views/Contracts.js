'use-strict'

import React, { Component } from 'react'

import Layout from './common/Layout'
import Token from '../components/queries/Token'
import Registry from '../components/queries/Registry'
import { improveUI } from '../libs/util'
import { BlockNumber, TransactionsCount } from '../components/overview'
import { FUNDER_ADDRESS, SYSTEM_ADDRESS, ASSURANCE_ADDRESS } from '../const'

const init = async () => {
  let instances = {}
  const
        // Fetch contracts ABIs and adddresses
        tokenAbiRes = await fetch('/assets/contracts/Token.abi.json')
      , tokenAddrRes = await fetch('/assets/contracts/Token.address.json')
      , registryAbiRes = await fetch('/assets/contracts/Registry.abi.json')
      , registryAddrRes =  await fetch('/assets/contracts/Registry.address.json')
      , deliveryServiceAbiRes = await fetch('/assets/contracts/DeliveryService.abi.json')
      , deliveryServiceAddrRes = await fetch('/assets/contracts/DeliveryService.address.json') 
      // transform
      , tokenAbi = await tokenAbiRes.json()
      , tokenAddr = await tokenAddrRes.json()
      , registryAbi = await registryAbiRes.json()
      , registryAddr = await registryAddrRes.json()
      , deliveryServiceAbi = await deliveryServiceAbiRes.json()
      , deliveryServiceAddr = await deliveryServiceAddrRes.json()
  
  // instantiate actual contracts
  const Token = web3.eth.contract(tokenAbi)
      , DeliveryService = web3.eth.contract(deliveryServiceAbi)
      , Registry = web3.eth.contract(registryAbi)

  instances.token = Token.at(tokenAddr)
  instances.registry = Registry.at(registryAddr)
  instances.deliveryService = DeliveryService.at(deliveryServiceAddr)

  return instances
}

export default class Contracts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contracts: {
        Token: {},
        Registry: {},
        DeliveryService: {},
      }
    }
  }

  componentDidMount() {
    this.getContracts()
    improveUI()
  }

  async getContracts() {
    const contracts = await init()

    this.setState({
      contracts: {
        Token: contracts.token,
        Registry: contracts.registry,
        DeliveryService: contracts.deliveryService,
      }
    })
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
          
          <div className="row">
            <Token Token={this.state.contracts.Token} />
          </div>
          <div className="row">
            <Registry Registry={this.state.contracts.Registry} />
          </div>

        </div>
      </Layout>
    )
  }
}