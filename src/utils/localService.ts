export function isUse() {
  const serverUrl = window.location.href || ''
  return serverUrl.includes('https://zhouhaoshi.github.io')
}
const baseUrl = 'https://zhouhaoshi.github.io/BD2merchant/json/'

export function getLocalSenceList() {
  return fetch(baseUrl + 'map.json').then((response) => response.json())
}
// https://zhouhaoshi.github.io/BD2merchant/json/map.json
