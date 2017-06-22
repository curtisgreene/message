import React from "react";
import { Item, Header, Icon, Container, Divider } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

function ArticlesList(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const articleCards = props.articles
    .map(article => <ArticleCard key={article.id} article={article} />)
    .reverse();
  return (
    <div>
      <Container text>
        <div className="article-feed-header">
          <h1>Do you have a message to send, {user.username}?</h1>
          <Header as="h2" icon textAlign="center">
            <Icon name="newspaper" circular />
            <Header.Content>
              Browse Articles
            </Header.Content>
          </Header>
          <h2>You have {props.articles.length} articles</h2>
        </div>
        <Divider fitted />
      </Container>
      <div className="articleList">
        <Container text>
          <Item.Group divided className="articleCard">
            {articleCards}
          </Item.Group>
        </Container>
      </div>
    </div>
  );
}

export default ArticlesList;
