'use-strict'

export const dedupeTxs = (array) => {
  const seen = []
  return array.map(e => {
    if (seen.indexOf(e.transactionHash) === -1) {
      seen.push(e.transactionHash)
      return e
    }
  })
}