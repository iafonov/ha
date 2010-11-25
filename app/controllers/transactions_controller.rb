class TransactionsController < ApplicationController

  def index
    render :json => Transaction.all.to_json(:include => :operations)
  end

  def create
    transaction_attrs = ActiveSupport::JSON.decode(params["model"])
    transaction_attrs["operations_attributes"] = transaction_attrs.delete("operations")
    render :json => Transaction.create!(transaction_attrs).to_json(:methods => [:errors])
  end

end
