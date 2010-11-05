class AccountsController < ApplicationController
  def index
    render :json => Account.all
  end

  def destroy
    account = Account.find(params[:id])
    account.destroy
    render :json => account.to_json(:methods => [:errors])
  end

  def create
    render :json => Account.create(ActiveSupport::JSON.decode(params["model"])).to_json(:methods => [:errors])
  end

  def update
    account = Account.find(params[:id])
    account.update_attributes(ActiveSupport::JSON.decode(params[:model]))
    render :json => account.to_json(:methods => [:errors])
  end
end
