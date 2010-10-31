class AccountsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json  { render :json => Account.all }
    end
  end
end
