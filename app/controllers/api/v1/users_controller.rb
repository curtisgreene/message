class Api::V1::UsersController < ApplicationController

  # before_action :authorize_account!


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

  def new_follow
    authorize_account!
    to_be_followed = User.find(params[:id])
    current_user = User.find_by(account_id: @current_account.id)
    current_user.follow(to_be_followed)
    render json: to_be_followed
  end


  private

  def user_params
    params.require(:user).permit(:username, :profile)
  end
end
