Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update]
      resources :articles, only: [:index, :create, :update]
      resources :accounts, only: [:index, :create, :update]
      post '/auth', to: 'auth#create'
      post '/follow/:id', to: 'users#new_follow'
      post '/unfollow/:id', to: 'users#unfollow'
    end
  end
end
