require 'spec_helper'

describe Operation do
  it "should have non zero amount to be valid" do
    Factory.build(:operation, :amount => Money.new(0)).should_not be_valid
  end
end
