class Api::V1::ArticlesController < ApplicationController

  # before_action :authorize_account!

  def index
    @articles = Article.all
    render json: @articles
  end

  def create
    article = Article.create(article_params)
    render json: article
  end


  private

  def article_params
    params.require(:article).permit(:title, :user_id, :body)
  end
end
