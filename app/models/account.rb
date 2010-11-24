class Account < ActiveRecord::Base
  has_many :operations, :dependent => :destroy

  VALID_CURRENCIES = %w(USD UAH)

  validates_length_of :name, :minimum => 3
  validates_uniqueness_of :name, :scope => :currency
  validates_inclusion_of :currency, :in => VALID_CURRENCIES

  attr_accessible :name
  attr_accessible :currency

  before_destroy :check_that_no_operations_exist

  def balance_in_cents
    operations.reduce(Money.new(0)){ |sum, operation| sum += operation.amount }.cents
  end

private

  def check_that_no_operations_exist
    if operations.any?
      errors.add(:base, "Account cannot be deleted because there are operations tied to it")
      false
    end
  end

end
