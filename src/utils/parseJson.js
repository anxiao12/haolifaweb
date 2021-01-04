export default function parseJson (obj, keys) {
  keys.forEach(key => {
    let item = obj[key]
    if (item && typeof item === 'string') obj[key] = JSON.parse(item)
  })
  return obj
}
