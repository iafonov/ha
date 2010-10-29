class AddTransactionIdToOperation < ActiveRecord::Migration
  def self.up
    add_column :operations, :transaction_id, :integer
  end

  def self.down
    remove_column :operations, :transaction_id
  end
end
