export const get = (url) => {
  return fetch(url, {
    method: 'get'
  })
  .then(response => response.json())
  .then((result) => {      
    return result.data
  })
}