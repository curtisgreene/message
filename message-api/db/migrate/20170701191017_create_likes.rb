class CreateLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :likes do |t|
      t.belongs_to :article, index: true
      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
