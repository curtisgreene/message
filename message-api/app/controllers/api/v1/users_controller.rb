class Api::V1::UsersController < ApplicationController

  before_action :authorize_account!, only: [:new_follow, :unfollow]


  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create(user_params)
    render json: user
  end

  def show
    found_user = User.find(params[:id])
    render json: found_user, root: nil
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, root: nil
  end

  def new_follow
    to_be_followed = User.find(params[:id])
    current_user = User.find_by(account_id: @current_account.id)
    current_user.follow(to_be_followed)
    render json: to_be_followed, each_serializer: UserSerializer, root: nil
  end

  def unfollow
    to_be_unfollowed = User.find(params[:id])
    current_user = User.find_by(account_id: @current_account.id)
    current_user.unfollow(to_be_unfollowed)
    render json: to_be_unfollowed, each_serializer: UserSerializer, root: nil
  end



  private

  def user_params
    params.require(:user).permit(:username, :profile, :url)
  end
end
