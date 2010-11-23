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
    begin
      account = Account.find(params[:id])
      account.update_attributes(ActiveSupport::JSON.decode(params[:model]))
      render :json => account.to_json(:methods => [:errors])
    rescue ActiveRecord::RecordNotFound => e
      render :json => {:errors => {:base => "Account not found."}}.to_json
    end
  end
end
