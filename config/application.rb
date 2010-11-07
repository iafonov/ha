require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(:default, Rails.env) if defined?(Bundler)

module Ha
  class Application < Rails::Application
    def collect_javascripts(*dirs)
      dirs.inject([]) do |paths, dir| 
        paths += Dir[Rails.root.join('public', 'javascripts', 'app', dir,'*.{js}')].collect do |path|
          Pathname.new(path).relative_path_from(Rails.root.join('public', 'javascripts')).to_s
        end
      end
    end

    config.action_view.javascript_expansions[:js_app] = collect_javascripts("models", "views", "")
    p config.action_view.javascript_expansions[:js_app]

    config.encoding = "utf-8"

    config.filter_parameters += [:password]
  end
end
