require 'spec_helper'

describe Transaction do
  it "should have comment" do
    Factory.build(:transaction, :comment => "").should_not be_valid
  end

  it "must have zero balance in usd" do
    trn = Factory.build(:transaction, :comment => "test trn")
    trn.operations << Factory.build(:operation, :amount => Money.new(10))
    trn.operations << Factory.build(:operation, :amount => Money.new(-12))

    trn.should_not be_valid
  end

  it "should be valid if have zero balance in usd" do
    Money.add_rate("USD", "UAH", 10)
    Money.add_rate("UAH", "USD", 0.1)

    trn = Factory.build(:transaction, :comment => "test trn2")
    trn.operations << Factory.build(:operation, :amount => Money.new(1, "USD"))
    trn.operations << Factory.build(:operation, :amount => Money.new(-10, "UAH"))

    trn.should be_valid
  end

  it "should have oprations to be valid" do
    Factory.build(:transaction, :comment => "test trn").should_not be_valid
  end
end
