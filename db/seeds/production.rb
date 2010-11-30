require 'factory_girl'

[Account, Operation, Transaction].each(&:delete_all)

Factory(:account, :name => "Salary", :currency => "USD")
Factory(:account, :name => "Credit Card", :currency => "USD")
Factory(:account, :name => "Credit Card 2", :currency => "UAH")
Factory(:account, :name => "Cash", :currency => "USD")
Factory(:account, :name => "Cash", :currency => "UAH")

Factory(:account, :name => "Savings", :currency => "USD")
Factory(:account, :name => "Savings", :currency => "UAH")
Factory(:account, :name => "Food", :currency => "UAH")
Factory(:account, :name => "Other Expenses", :currency => "UAH")
