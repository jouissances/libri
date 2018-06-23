# Libri

This gem is made with the purpose of retrieving detailed information about various book awards shortlist for 2017 — 2018. All data is scraped from Barnes & Noble's website.

## Installation

You can install this gem via `gem install libri` on your terminal. The `libri` CLI will be installed and you can run `libri` on the terimnal to get a list of notable book awards and a list of shortlisted books available on the B&N website, as well as details and excerpts from the books.


## Usage

After installation, run the gem in your CLI by executing `libri`. Make sure to have installed all the required gems beforehand (pry, nokogiri, and open-air), otherwise the command would return error.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/<github username>/libri. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Libri project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/<github username>/libri/blob/master/CODE_OF_CONDUCT.md).
