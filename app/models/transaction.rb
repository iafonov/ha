class Transaction < ActiveRecord::Base
  has_many :operations

  validates_presence_of :comment
  validates_presence_of :operations

  validate :transaction_sum_must_be_zero

  accepts_nested_attributes_for :operations

private

  def transaction_sum_must_be_zero
    operations.each do |o|
      p o.amount.exchange_to("USD").to_s
    end
    if operations.reduce(Money.new(0)) {|sum, operation| sum + operation.amount.exchange_to("USD") } != 0
      errors.add(:base, "Transaction sum must be zero")
    end
  end

end
