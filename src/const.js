export const GETH_HOST = 'http://nodes-tx1.amply.tech:8545'

export const FUNDER_ADDRESS = '0x5C0BdA0234FDb5a4EF625FfFEc52184743E49C93'
          ,  SYSTEM_ADDRESS = '0x7660efCd4f31E836936c83D323A784C8E93Ae920'
          ,  ASSURANCE_ADDRESS = '0x0c88d71C621Bbaed6c9050642c8B792bdb1413B5'

/* Redux actions and events types */
// Identity Service
export const ACTION_CREATE_DID = 'CREATE_DID'
// Delivery Service
export const ACTION_CONFIRM_OP = 'CONFIRM_OP'
export const ACTION_RECORD_CLAIM = 'RECORD_CLAIM'
export const ACTION_MULTI_TRANSACT = 'MULTI_TRANSACT'
export const ACTION_TOKEN_TRANSFER = 'TOKEN_TRANSFER'
export const ACTION_CONFIRM_OP_NEEDED = 'CONFIRM_OP_NEEDED'