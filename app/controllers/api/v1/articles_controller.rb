class Api::V1::ArticlesController < ApplicationController

  before_action :authorize_account!

  def index
    current_user = User.find_by(account_id: @current_account.id)
    following_ids = current_user.following_ids.push(current_user.id)
    articles = Article.where(user_id: following_ids)
    render json: articles
  end

  def create
    article = Article.create(article_params)
    render json: article
  end

  def update
    article = Article.find(params[:id])
    article.update(article_params)
    render json: article, root: nil
  end


  private

  def article_params
    params.require(:article).permit(:title, :user_id, :body)
  end

end
