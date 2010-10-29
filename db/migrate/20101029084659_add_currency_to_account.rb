class AddCurrencyToAccount < ActiveRecord::Migration
  def self.up
    add_column :accounts, :currency, :string
  end

  def self.down
    remove_column :accounts, :currency
  end
end
