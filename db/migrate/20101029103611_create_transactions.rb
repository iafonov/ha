class CreateTransactions < ActiveRecord::Migration
  def self.up
    create_table :transactions do |t|
      t.string :comment

      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
