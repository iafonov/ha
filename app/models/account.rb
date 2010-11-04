class Account < ActiveRecord::Base
  has_many :operations, :dependent => :destroy

  VALID_CURRENCIES = %w(USD UAH)

  validates_length_of :name, :minimum => 3
  validates_uniqueness_of :name
  validates_inclusion_of :currency, :in => VALID_CURRENCIES

  attr_accessible :name
  attr_accessible :currency
end
