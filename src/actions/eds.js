'use-strict'

import {
  ACTION_CONFIRM_OP,
  ACTION_RECORD_CLAIM,
  ACTION_MULTI_TRANSACT,
  ACTION_TOKEN_TRANSFER,
  ACTION_CONFIRM_OP_NEEDED,
} from '../const'

export const recordClaim = (data) => {
  return {
    type: ACTION_RECORD_CLAIM,
    payload: data,
  }
}

export const confirmOp = (data) => {
  return {
    type: ACTION_CONFIRM_OP,
    payload: data,
  }
}

export const confirmOpNeeded = (data) => {
  return {
    type: ACTION_CONFIRM_OP_NEEDED,
    payload: data,
  }
}

export const multiTransact = (data) => {
  return {
    type: ACTION_MULTI_TRANSACT,
    payload: data,
  }
}

export const tokenTransfer = (data) => {
  return {
    type: ACTION_TOKEN_TRANSFER,
    payload: data,
  }
}

