require 'spec_helper'

describe ExchangeRatesController do
  describe "#index" do
    it "should return list of predefined rates" do
      get 'index'

      response.header["Content-Type"].should include("application/json")
      decoded_response_body = ActiveSupport::JSON.decode(response.body)

      decoded_response_body.should have_key("UAH_TO_USD")
      decoded_response_body.should have_key("USD_TO_UAH")
    end
  end
end
