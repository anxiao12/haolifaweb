/* eslint-disable */
export default function getTree (data, rootId, idTxt, pidTxt, childrenTxt) {
  function getNode (id) {
    let node = []
    let len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i][pidTxt] === id) {
        data[i][childrenTxt] = getNode(data[i][idTxt]) || null
        node.push(data[i])
      }
    }
    if (node.length === 0) return
    else return node
  }
  return getNode(rootId)
}
