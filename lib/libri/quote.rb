class Libri::Quote
    attr_accessor :quote, :author

    @@all = []

    def initialize(quote_hash) 
        quote_hash.each { |key, val|
            send "#{key}=", val
        }
        @@all << self
    end

    def self.create_from_collection(quotes_array)
        quotes_array.each { |quote_hash|
            self.new(quote_hash)
        }
    end

    def self.all
        @@all
    end
end
