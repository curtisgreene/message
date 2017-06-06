export function createUser(username, profile){
  return fetch("http://localhost:3000/api/v1/users", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify( {user: {username: username, profile: profile}} )
  }).then( res => res.json() )
}

export function fetchArticles() {
  return fetch("http://localhost:3000/api/v1/articles")
  .then( res => res.json() )
}
