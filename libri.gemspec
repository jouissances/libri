
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "libri/version"

Gem::Specification.new do |spec|
  spec.name          = "libri"
  spec.version       = Libri::VERSION
  spec.authors       = ["jouissances"]
  spec.email         = ["janicedarikho@gmail.com"]

  spec.summary       = %q{CLI for retrieving info about certain award-shortlisted books}
  spec.description   = %q{Scrapes the Barnes & Noble website (https://www.barnesandnoble.com/) and provides a CLI for viewing various book awards, the respective shortlisted books, as well as details about each book.}
  spec.homepage      = "https://rubygems.org"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  # if spec.respond_to?(:metadata)
  #   spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  # else
  #   raise "RubyGems 2.0 or newer is required to protect against " \
  #     "public gem pushes."
  # end

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "bin"
  spec.executables   = ["libri"]
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "gem-release"
  spec.add_dependency "nokogiri", "~> 1.8.3"
  spec.add_dependency "colorize"
end
