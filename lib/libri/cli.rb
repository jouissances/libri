class Libri::CLI

    attr_accessor :award, :awards_array, :books_array, :book_info_hash, :quotes_array, :title_by_author

    LINE = "----------------------------------------------------------"

    def call
        puts "Welcome to Libri.".blue
        puts "I'm the Raven, your guide in this chamber full of literary wonders.".blue
        puts "Below are some of the most prized literary awards of our time.".blue
        puts "Come freely. This will take a few moments...".blue
        puts LINE
        make_awards
        list_awards
        puts LINE
        leave
    end

    def make_awards
        @awards_array = Libri::Scraper.new.scrape_barnes_noble
        Libri::Awards.create_from_collection(awards_array)
    end

    def list_awards
        Libri::Awards.all.each.with_index(1) { |award, i|
            puts "#{i}. #{award.name}"
        }
        puts LINE
        puts "Which award would you like to explore?".blue
        puts LINE

        menu_awards
    end

    def make_books(award)
        @books_array = Libri::Scraper.new.scrape_award(award)
        Libri::Books.create_from_collection(books_array)
    end

    def list_books(award)
        Libri::Books.all.each.with_index(1) { |book, i|
            puts "#{i}. #{book.title} #{book.author}"
        }
        puts LINE
        puts "Which book would you like to know more about?".blue
        puts LINE

        menu_books(award)
        
    end

    def list_details(book)
        @book_info_hash = Libri::Scraper.new.scrape_book(book)

        @book_info_hash.each { |key, val|
            puts
            puts "#{key}".upcase.red
            puts LINE
            puts "#{val}"
        }     
    end

    def random_quote
        @quotes_array = Libri::Scraper.new.scrape_quote
        Libri::Quote.create_from_collection(quotes_array)

        random = @quotes_array.sample
        random.each { |key, val|
            puts 
            puts "#{val}"
        }
        puts 
    end

    def menu_awards
        input = STDIN.gets.strip.downcase
    
        if input.to_i.between?(1,Libri::Awards.all.size)
            award = @awards_array[input.to_i - 1]
            Libri::Books.all.clear
            make_books(award)
            list_books(award)
        elsif input == "awards"
            list_awards
        elsif input == "exit"
            nil
        elsif input == "nevermore"
            puts LINE
            random_quote
        else
            puts "The raven croaked, 'Please try again.'".red
            puts LINE
            list_awards
        end
    end

    def menu_books(award)
        input = STDIN.gets.strip.downcase
    
        if input.to_i.between?(1,20)
            book = @books_array[input.to_i - 1]
            list_details(book)
            puts LINE
            puts "To list the books of the same award again, type books".blue
            puts "To list all the awards again, type awards".blue
            puts LINE
            menu_books(award)            
        elsif input == "nevermore"
            puts LINE
            random_quote
        elsif input == "books"
            list_books(award)
        elsif input == "awards"
            list_awards
        elsif input == "exit"
            nil
        else
            puts "The raven croaked, 'Please try again.'".red
            puts LINE
            list_books(award)
        end
    end

    def leave
        puts "Farewell!".blue
    end

end