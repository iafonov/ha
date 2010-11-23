Ha::Application.routes.draw do
  resources :accounts
  resources :transactions

  root :to => "application#index"
end
