class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create(user_params)
    render json: user
  end

  def show
    user = User.find(params[:id])
    articles = Article.where(user_id: user.id)
    render json: {
      id: user.id,
      username: user.username,
      profile: user.profile,
      articles: articles
    }
  end


  private

  def user_params
    params.require(:user).permit(:username, :profile)
  end
end
