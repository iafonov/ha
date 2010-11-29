Ha::Application.routes.draw do
  resources :accounts
  resources :transactions
  resources :exchange_rates

  root :to => "application#index"
end
