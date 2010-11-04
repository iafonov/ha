class AccountsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json  { render :json => Account.all }
    end
  end

  def destroy
    render :json => Account.find(params[:id]).destroy
  end

  def create
    render :json => Account.create(ActiveSupport::JSON.decode(params["model"])).to_json(:methods => [:valid?, :errors])
  end

  def update
    account = Account.find(params[:id])
    account.update_attributes(ActiveSupport::JSON.decode(params[:model]))
    render :json => account.to_json(:methods => [:valid?, :errors])
  end
end
