class Account < ActiveRecord::Base
  has_many :operations, :dependent => :destroy

  VALID_CURRENCIES = %w(USD UAH)

  validates_length_of :name, :minimum => 3
  validates_uniqueness_of :name, :on => :create
  validates_inclusion_of :currency, :in => VALID_CURRENCIES
end
