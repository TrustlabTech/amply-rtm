'use-strict'

import fetch from 'isomorphic-fetch'
import { EventEmitter } from 'fbemitter'
import {
  ACTION_CREATE_DID,
} from '../../const'

export default class EisWatcher {
  constructor() {
    this.emitter = new EventEmitter()
  }

  getEmitter() {
    return this.emitter
  }

  async init() {
    const didRegistryAbiRes = await fetch('/assets/contracts/did-registry.abi.json')
        , didRegistryAddrRes =  await fetch('/assets/contracts/did-registry.addr.json')
        , didRegistryAbi = await didRegistryAbiRes.json()
        , didRegistryAddr = await didRegistryAddrRes.json()
    
    const DIDRegistry = web3.eth.contract(didRegistryAbi)

    this.registry = DIDRegistry.at(didRegistryAddr)

    return this
  }

  watch() {
    this.registry.CreatedDID((e, r) => {
      this.emitter.emit(ACTION_CREATE_DID, e, r)
    })

    return this.emitter
  }
}