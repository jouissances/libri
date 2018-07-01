class Libri::Books
    attr_accessor :title, :author, :url

    @@all = []

    def initialize(books_hash) 
        books_hash.map { |key, val|
            send "#{key}=", val
        }
        @@all << self
    end

    def self.create_from_collection(books_array)
        books_array.map { |books_hash|
            self.new(books_hash)
        }
    end

    def self.all
        @@all
    end

end

