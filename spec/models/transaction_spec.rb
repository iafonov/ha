require 'spec_helper'

describe Transaction do
  it "should have comment" do
    Factory.build(:transaction, :comment => "").should_not be_valid
  end

  it "must have zero balance" do
    trn = Factory.build(:transaction, :comment => "test trn")
    trn.operations << Factory.build(:operation, :amount => Money.new(10))
    trn.operations << Factory.build(:operation, :amount => Money.new(-12))

    trn.should_not be_valid
  end

  it "should have oprations to be valid" do
    Factory.build(:transaction, :comment => "test trn").should_not be_valid
  end
end
