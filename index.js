'use-strict'

import 'regenerator-runtime/runtime'
import React from 'react'
import Web3 from 'web3'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './src/Root'
import createStore from './src/store'
import { GETH_HOST } from './src/const'

if (typeof web3 === 'undefined')
  window.web3 = new Web3(new Web3.providers.HttpProvider(GETH_HOST))

const app = (
  <Provider store={createStore()}>
    <Root />
  </Provider>
)

render(app, document.getElementById('amply'))