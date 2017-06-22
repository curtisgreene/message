class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :body, :title, :created_at, :user

  # has_one :user

end
