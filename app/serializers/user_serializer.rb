class UserSerializer < ActiveModel::Serializer
  attributes :account_id, :id, :profile, :username, :followers, :following, :url

  has_many :articles

  def followers
    object.followers.map do |follower|
      {
      username: follower.username,
      id: follower.id
    }
    end
  end

  def following
    object.following.map do |person|
      {
      username: person.username,
      id: person.id
    }
    end
  end
end
