require 'spec_helper'

describe TransactionsController do
  describe "#create" do
    it "should create transaction and operations provided in model attribute in json" do
      expect {
        post 'create', {:model =>
          { :comment => "Test",
            :operations_attributes => [{:cents => "10", :currency => "USD", :account_id => 1}, {:cents => "-10", :currency => "USD", :account_id => 2}]}.to_json}
      }.to change { Transaction.count }.by(1)
    end

    it "shouldn't create transaction if operations not provided" do
      expect {
        post 'create', {:model => {:comment => "Test"}.to_json}
      }.to change { Transaction.count }.by(0)
    end
  end
end
