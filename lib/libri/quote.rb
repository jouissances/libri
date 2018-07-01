class Libri::Quote
    attr_accessor :quote, :author

    @@all = []

    def initialize(quote_hash) 
        quote_hash.map { |key, val|
            send "#{key}=", val
        }
        @@all << self
    end

    def self.create_from_collection(quotes_array)
        quotes_array.map { |quote_hash|
            self.new(quote_hash)
        }
    end

    def self.all
        @@all
    end
end
