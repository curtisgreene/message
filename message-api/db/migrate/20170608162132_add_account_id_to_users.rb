class AddAccountIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :account_id, :integer
  end
end
