require 'jwt'
class Api::V1::AuthController < ApplicationController

  def create
    account = Account.find_by(username: params[:accountName])
    user = User.find_by(account_id: account.id)
    if account.present? && account.authenticate(params[:password])
      token = JWT.encode({account_id: account.id}, ENV['JWT_SECRET'],  ENV['JWT_ALGORITHM'])
      render json: {
        account: {
          username: account.username
        },
        user: {
          id: user.id,
          username: user.username,
          profile: user.profile
        },
        token: token
      }
    else
      render json: {error: 'No account or password found'}
    end
  end
end
