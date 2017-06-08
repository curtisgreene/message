export function createAccount(params) {
  return fetch("http://localhost:3000/api/v1/accounts", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}


export function logIn(params){
  return fetch("http://localhost:3000/api/v1/auth", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function fetchArticles() {
  return fetch("http://localhost:3000/api/v1/articles", {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  })
  .then( res => res.json() )
}
