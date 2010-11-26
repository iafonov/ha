namespace "heroku" do
  task :deploy do
    require 'jammit'
    require 'git'

    Jammit.package!

    g = Git.open(".", :log => Logger.new(STDOUT))
    g.add("public/packages/*")
    g.commit("Static assets for heroku.")
    g.push(g.remote('heroku'))
  end
end
