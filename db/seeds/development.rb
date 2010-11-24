require 'factory_girl'

[Account, Operation, Transaction].each(&:delete_all)

Factory(:account, :name => "Anahoret Salary", :currency => "USD")
Factory(:account, :name => "PrivatBank Card (9970)", :currency => "USD")
Factory(:account, :name => "Cash", :currency => "USD")
Factory(:account, :name => "Cash", :currency => "UAH")

Factory(:account, :name => "Savings", :currency => "USD")
Factory(:account, :name => "Savings", :currency => "UAH")
Factory(:account, :name => "Food", :currency => "UAH")
Factory(:account, :name => "Other Expenses", :currency => "UAH")
