class CreateOperations < ActiveRecord::Migration
  def self.up
    create_table :operations do |t|
      t.integer :cents
      t.string :currency
      t.integer :account_id

      t.timestamps
    end
  end

  def self.down
    drop_table :operations
  end
end
