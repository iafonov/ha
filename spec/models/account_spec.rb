require 'spec_helper'

describe Account do
  describe Account, "when first created" do
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

    it "should have unique name in scope of currency" do
      Factory.create(:account, :name => "test", :currency => "USD")
      Factory.build(:account, :name => "test", :currency => "USD").should_not be_valid
      Factory.build(:account, :name => "test", :currency => "UAH").should be_valid
    end
  end

  describe Account, "with operations" do
    before(:each) do
      @account = Factory.create(:account, :name => "test")
      Factory.create(:operation, :amount => Money.new(10), :account => @account)
    end

    it "cannot be deleted" do
      @account.destroy.should be_false
      @account.errors.should_not be_empty
    end

    it "shouldn't allow changing currency" do
    end
  end
end
