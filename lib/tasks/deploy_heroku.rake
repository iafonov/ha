namespace "heroku" do
  task :deploy do
    require 'jammit'
    require 'git'

    FileUtils.rm_rf("public/packages")
    Jammit.package!

    g = Git.open(".", :log => Logger.new(STDOUT))
    g.add("public/packages/*")
    g.commit("Static assets for heroku.")
    g.push(g.remote('heroku'))

    FileUtils.rm_rf("public/packages")
  end
end
