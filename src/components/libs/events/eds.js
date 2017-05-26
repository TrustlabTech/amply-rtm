'use-strict'

import fetch from 'isomorphic-fetch'
import { EventEmitter } from 'fbemitter'
import {
  ACTION_CONFIRM_OP,
  ACTION_RECORD_CLAIM,
  ACTION_MULTI_TRANSACT,
  ACTION_TOKEN_TRANSFER,
  ACTION_CONFIRM_OP_NEEDED,
} from '../../const'

export default class EdsWatcher {

  constructor() {
    this.emitter = new EventEmitter()
  }

  getEmitter() {
    return this.emitter
  }

  async init() {
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

    this.token = Token.at(tokenAddr)
    this.registry = Registry.at(registryAddr)
    this.deliveryService = DeliveryService.at(deliveryServiceAddr)

    return this
  }

  watch() {
    this.registry.Record((e, r) => {
      this.emitter.emit(ACTION_RECORD_CLAIM, e, r)
    })

    this.deliveryService.Confirmation((e, r) => {
      this.emitter.emit(ACTION_CONFIRM_OP, e, r)
    })

    this.deliveryService.ConfirmationNeeded((e, r) => {
      this.emitter.emit(ACTION_CONFIRM_OP_NEEDED, e, r)
    })

    this.deliveryService.MultiTransact((e, r) => {
      this.emitter.emit(ACTION_MULTI_TRANSACT, e, r)
    })

    this.token.Transfer((e, r) => {
      this.emitter.emit(ACTION_TOKEN_TRANSFER, e, r)
    })

    return this.emitter
  }
}