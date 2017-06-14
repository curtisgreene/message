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

export function fetchUser(id){
  const url = "http://localhost:3000/api/v1/users/" + id
  return fetch(url)
  .then( res => res.json() )
}

export function fetchArticles() {
  return fetch("http://localhost:3000/api/v1/articles", {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  })
  .then( res => res.json() )
}

export function createArticle(title, body, id){ //needs title
  // console.log('trying to create article from the api/index')
  return fetch("http://localhost:3000/api/v1/articles", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'POST',
    body: JSON.stringify( {article: {title: title, body: body, user_id: id}} )
  }).then( res => res.json() )
}

export function followUser(id){
  const url = "http://localhost:3000/api/v1/follow/" + id
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'POST'
    }).then( res => res.json() )
}
