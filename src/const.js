export const GETH_HOST = 'http://nodes-tx1.amply.tech:8545'

export const FUNDER_ADDRESS = '0xb4B59C3aCFeB9AFd9398C88B2f6f003cBf29B553'
          ,  SYSTEM_ADDRESS = '0x7aD7943109a3Fe38776353493fc87fB67A81f360'
          ,  ASSURANCE_ADDRESS = '0x4cEa53a746275eA5512BcAcECD1441dD4D5E8E5C'

/* Redux actions and events types */
// Identity Service
export const ACTION_CREATE_DID = 'CREATE_DID'
// Delivery Service
export const ACTION_CONFIRM_OP = 'CONFIRM_OP'
export const ACTION_RECORD_CLAIM = 'RECORD_CLAIM'
export const ACTION_MULTI_TRANSACT = 'MULTI_TRANSACT'
export const ACTION_TOKEN_TRANSFER = 'TOKEN_TRANSFER'
export const ACTION_CONFIRM_OP_NEEDED = 'CONFIRM_OP_NEEDED'