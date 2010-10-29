require 'spec_helper'

describe Account do
  it "should allow only USD and UAH as currencies" do
    Factory.build(:account, :currency => "UAH").should be_valid
    Factory.build(:account, :currency => "USD").should be_valid
  end

  it "should always have currency" do
    Factory.build(:account, :currency => "").should_not be_valid
  end

  it "should always have name" do
    Factory.build(:account, :name => "").should_not be_valid
  end

  it "should have unique name" do
    Factory.create(:account, :name => "test")
    Factory.build(:account, :name => "test").should_not be_valid
  end
end
