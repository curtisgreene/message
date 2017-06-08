Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
      resources :articles, only: [:index, :create]
      resources :accounts, only: [:index, :create]
      post '/auth', to: 'auth#create'
    end
  end
end
