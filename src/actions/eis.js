'use-strict'

import {
  ACTION_CREATE_DID,
} from '../const'

export const createDID = (data) => {
  return {
    type: ACTION_CREATE_DID,
    payload: data,
  }
}