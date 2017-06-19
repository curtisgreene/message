class AddPictureUrlToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :url, :string
  end
end
