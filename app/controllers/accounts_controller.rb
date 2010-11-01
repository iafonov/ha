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
    render :json => Account.create(ActiveSupport::JSON.decode(params["model"]))
  end
end
