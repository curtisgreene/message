class UserSerializer < ActiveModel::Serializer
  attributes :account_id, :id, :username, :followers, :following

  has_many :articles
end
