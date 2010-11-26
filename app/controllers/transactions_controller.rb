class TransactionsController < ApplicationController

  def index
    render :json => Transaction.all.to_json(:include => :operations)
  end

  def create
    begin
      transaction_attrs = ActiveSupport::JSON.decode(params["model"])
      transaction_attrs["operations_attributes"] = transaction_attrs.delete("operations")
      render :json => Transaction.create!(transaction_attrs).to_json(:methods => [:errors])
    rescue Exception => e
      render :json => {:errors => {:base => "Error. Transaction was not created."}}.to_json
    end
  end

end
