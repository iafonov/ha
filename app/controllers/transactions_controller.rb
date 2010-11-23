class TransactionsController < ApplicationController

  def index
    render :json => Transaction.all
  end

  def create
    render :json => Transaction.create!(ActiveSupport::JSON.decode(params["model"])).to_json(:methods => [:errors])
  end

end
