class Libri::Awards
    attr_accessor :name, :url

    @@all = []

    def initialize(awards_hash) 
        awards_hash.map { |key, val|
            send "#{key}=", val
        }
        @@all << self
    end

    def self.create_from_collection(awards_array)
        awards_array.map { |awards_hash|
            self.new(awards_hash)
        }
    end

    def self.all
        @@all
    end

end