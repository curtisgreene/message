class User < ApplicationRecord
  belongs_to :account
  has_many :articles, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
  has_many :passive_relationships, class_name: "Relationship",
                                   foreign_key: "followed_id",
                                   dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower


  def follow(other)
    active_relationships.create(followed_id: other.id)
  end

  def unfollow(other)
    active_relationships.find_by(followed_id: other.id).destroy
  end

  def following?(other)
    following.include?(other)
  end

  def like(article)
    likes.create(article_id: article.id)
  end

  def unlike(article)
    like = likes.find_by(article_id: article.id)
    like.destroy
  end

  def likes?(article)
    likes.find_by(article_id: article.id)
  end

end
