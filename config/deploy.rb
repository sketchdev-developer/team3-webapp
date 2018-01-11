# config valid only for current version of Capistrano
lock '3.10.1'

set :application, 'workshop_webapp'
set :repo_url, 'git@github.com:sketchdev-developer/team3-webapp.git'

# Default branch is :master
set :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :deploy_to, '/var/applications/team3/webapp'
# append :linked_files, 'config/database.yml', 'config/secrets.yml'
#append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'
#append :linked_dirs, 'node_modules'
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

set :keep_releases, 5

set :local_webapp_dist_path, File.expand_path('../../dist', __FILE__)
#set :local_api_dist_path, File.expand_path('../../build', __FILE__)

#set :nvm_type, :user
#set :nvm_node, 'v7.2.1'
#set :nvm_map_bins, %w{node npm}

#set :yarn_target_path, -> { release_path.join('subdir') }  # default not set
#set :yarn_flags, '--production --pure-lockfile --no-emoji' # default
#set :yarn_roles, :all
#set :yarn_env_variables, {}

# set :node_env, ENV['node_env'] || 'production'

namespace :deploy do
  task :upload_webapp_distribution do
    on roles(:web) do
      upload! fetch(:local_webapp_dist_path), release_path.join('dist'), recursive: true
    end
  end

  task :create_and_upload_webapp_distribution do
    invoke 'deploy:upload_webapp_distribution'
  end

  before 'deploy:publishing', 'create_and_upload_webapp_distribution'
end

