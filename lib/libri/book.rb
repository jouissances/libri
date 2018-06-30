class Libri::Book
    attr_accessor :title_by_author, :blurbs_and_plot, :about_author,:excerpt,  :availability, :url, :book

    @@all = []

    def initialize(book_info_hash) 
        book_info_hash.each { |key, val|
            send "#{key}=", val
        }
        @@all << self
    end

    def self.create_from_collection(book_info_array)
        book_info_array.each { |book_info_hash|
          self.new(book_info_hash)
        }
    end
    
    def self.all
        @@all
    end 

end
