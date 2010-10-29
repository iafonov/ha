class Operation < ActiveRecord::Base
  belongs_to :account
  belongs_to :transaction

  validates_exclusion_of :cents, :in => [0]

  composed_of :amount,
    :class_name => "Money",
    :mapping => [%w(cents cents), %w(currency currency)],
    :constructor => Proc.new { |cents, currency| Money.new(cents || 0, currency || Money.default_currency) }

end
