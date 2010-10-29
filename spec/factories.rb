Factory.define :operation do |o|
  o.amount Money.new(100, :USD)
  o.account
  o.transaction
end

Factory.define :account do |a|
  a.name "account"
  a.currency "USD"
end

Factory.define :transaction do |t|
  t.comment "comment"
end