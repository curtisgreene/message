class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :body, :title, :user

  # has_one :user

end
