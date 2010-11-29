class ExchangeRatesController < ApplicationController
  # stub
  def index
    rates = Hash.new

    rates["USD_TO_UAH"] = 7.93
    rates["UAH_TO_USD"] = (1.0 / 7.98)

    render :json => rates
  end
end
