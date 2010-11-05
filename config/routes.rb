Ha::Application.routes.draw do
  resources :accounts

  root :to => "application#index"
end
