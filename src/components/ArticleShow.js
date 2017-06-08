import React from 'react'

function ArticleShow(props){


  if (!props.article) {
    return null
  }
  return (
    <div>
      <h1>{props.article.title}</h1>
      <p>{props.article.body}</p>
    </div>
  )
}

export default ArticleShow
