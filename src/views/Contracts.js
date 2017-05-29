'use-strict'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import Layout from './common/Layout'
import Token from '../components/queries/Token'
import Registry from '../components/queries/Registry'
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

const bindJQuery = () => {
  $('.collapse-link').on('click', function() {
    var $BOX_PANEL = $(this).closest('.x_panel'),
        $ICON = $(this).find('i'),
        $BOX_CONTENT = $BOX_PANEL.find('.x_content');
    
    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr('style')) {
        $BOX_CONTENT.slideToggle(200, function(){
            $BOX_PANEL.removeAttr('style');
        });
    } else {
        $BOX_CONTENT.slideToggle(200); 
        $BOX_PANEL.css('height', 'auto');  
    }

    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
  });
}

class Contracts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contracts: {
        Token: null,
        Registry: null,
        DeliveryService: null,
      }
    }
  }

  componentDidMount() {
    this.getContracts()
    bindJQuery()
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
    const tokenInterface = this.state.contracts.Token ? (
      <div className="row">
        <Token Token={this.state.contracts.Token} />
      </div>
    ) : null
    
    const registryInterface = this.state.contracts.Registry ? (
      <div className="row">
        <Registry Registry={this.state.contracts.Registry} />
      </div>
    ) : null

    return (
      <Layout>
        <div className="right_col" role="main">
          <div className="row tile_count">
						<BlockNumber eth={web3.eth} faClass='fa fa-list' title='Total Blocks' />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Foundation' titleBottom='Transactions' address={FUNDER_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='System' titleBottom='Transactions' address={SYSTEM_ADDRESS} />
						<TransactionsCount eth={web3.eth} faClass='fa fa-file-text' titleTop='Assurance' titleBottom='Transactions' address={ASSURANCE_ADDRESS} />
					</div>
          
          {tokenInterface}
          {registryInterface}

        </div>
      </Layout>
    )
  }
}

Contracts.propTypes = {
}

export default connect()(Contracts)