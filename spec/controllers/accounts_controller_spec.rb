require 'spec_helper'

describe AccountsController do

  describe "#index" do
    before do
      Account.stub(:all).and_return([Factory.build(:account, :name => "acc1"), Factory.build(:account, :name => "acc2")])
    end

    it "should return response with application/json content type" do
      get 'index'
      response.header["Content-Type"].should include("application/json")
    end

    it "should return array of accounts attributes" do
      get 'index'

      decoded_response_body = ActiveSupport::JSON.decode(response.body)
      decoded_response_body.class.should be == Array
    end
  end

  describe "#create" do
    it "should create new account when params are valid" do
      expect {
        post 'create', {"model"=>"{\"name\":\"Test\",\"currency\":\"USD\"}", "action"=>"create", "controller"=>"accounts"}
      }.to change { Account.count }.by(1)
    end

    it "should return errors if account cannot be created" do
      post 'create', {"model"=>"{\"name\":\"\",\"currency\":\"USD\"}", "action"=>"create", "controller"=>"accounts"}

      decoded_response_body = ActiveSupport::JSON.decode(response.body)
      decoded_response_body.should have_key("errors")
    end
  end

  describe "#destroy" do
    before do
      @account = Factory.create(:account, :name => "Test", :currency => "USD")
    end

    it "should return error if account not found" do
      post 'destroy', {"model"=>"{\"name\":\"TEST\",\"created_at\":\"2010-11-22T15:37:52Z\",\"updated_at\":\"2010-11-22T15:37:52Z\",\"id\":62,\"currency\":\"USD\"}", "action"=>"update", "id"=>"0", "controller"=>"accounts"}

      decoded_response_body = ActiveSupport::JSON.decode(response.body)
      decoded_response_body.should have_key("errors")
    end
  end

  describe "#update" do
    before do
      @account = Factory.create(:account, :name => "Test", :currency => "USD")
    end

    it "should return error if account not found" do
      post 'update', {"model"=>"{\"name\":\"TEST\",\"created_at\":\"2010-11-22T15:37:52Z\",\"updated_at\":\"2010-11-22T15:37:52Z\",\"id\":62,\"currency\":\"USD\"}", "action"=>"update", "id"=>"0", "controller"=>"accounts"}

      decoded_response_body = ActiveSupport::JSON.decode(response.body)
      decoded_response_body.should have_key("errors")
    end

    it "should return error if updating of entry failed" do
      post 'update', {"model"=>"{\"name\":\"\",\"created_at\":\"2010-11-22T15:37:52Z\",\"updated_at\":\"2010-11-22T15:37:52Z\",\"id\":62,\"currency\":\"USD\"}", "action"=>"update", "id"=>"#{@account.id}", "controller"=>"accounts"}

      decoded_response_body = ActiveSupport::JSON.decode(response.body)
      decoded_response_body.should have_key("errors")
      decoded_response_body["errors"].should have_key("name")
    end

  end

end
