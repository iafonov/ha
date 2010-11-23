class TransactionsController < ApplicationController
  def create
    render :json => Transaction.create(ActiveSupport::JSON.decode(params["model"])).to_json(:methods => [:errors])
  end
end
