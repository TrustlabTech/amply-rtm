'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'
import {
  ACTION_CONFIRM_OP,
  ACTION_RECORD_CLAIM,
  ACTION_MULTI_TRANSACT,
  ACTION_TOKEN_TRANSFER,
  ACTION_CONFIRM_OP_NEEDED,
} from '../const'

export default (state = tree.eds, action) => {
  switch(action.type) {
    case ACTION_RECORD_CLAIM:
      return {
        ...state,
        events: {
          ...state.events,
          record: {
            ...state.events.record,
            data: state.events.record.data.concat([action.payload])
          }
        }
      }
    case ACTION_CONFIRM_OP:
      return {
        ...state,
        events: {
          ...state.events,
          confirm: {
            ...state.events.confirm,
            data: state.events.confirm.data.concat([action.payload])
          }
        }
      }
    case ACTION_CONFIRM_OP_NEEDED:
      return {
        ...state,
        events: {
          ...state.events,
          confirmNeeded: {
            ...state.events.confirmNeeded,
            data: state.events.confirmNeeded.data.concat([action.payload])
          }
        }
      }
    case ACTION_MULTI_TRANSACT:
      return {
        ...state,
        events: {
          ...state.events,
          multiTransact: {
            ...state.events.multiTransact,
            data: state.events.multiTransact.data.concat([action.payload])
          }
        }
      }
    case ACTION_TOKEN_TRANSFER:
      return {
        ...state,
        events: {
          ...state.events,
          transfer: {
            ...state.events.transfer,
            data: state.events.transfer.data.concat([action.payload])
          }
        }
      }
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.eds,
      }
    default:
      return state
  }
}