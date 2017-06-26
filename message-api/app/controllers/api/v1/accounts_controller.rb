class Api::V1::AccountsController < ApplicationController

  def index
    accounts = Account.all
    render json: accounts
  end

  def create
    account = Account.create(account_params)
    user = User.create(username: account.username, account_id: account.id)
    render json: account
  end


  private

  def account_params
    params.require(:account).permit(:username, :password)
  end
end
