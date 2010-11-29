class ExchangeRatesController < ApplicationController

  def index
    rates = Hash.new

    rates["USD_TO_UAH"] = Money.default_bank.get_rate("USD", "UAH")
    rates["UAH_TO_USD"] = Money.default_bank.get_rate("UAH", "USD")

    render :json => rates
  end

end
