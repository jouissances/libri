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
        Libri::Scraper.new.scrape_barnes_noble
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
        Libri::Scraper.new.scrape_award(award)
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
        info = Libri::Scraper.new.scrape_book(book)
    
        puts 
        puts "Title by Author".upcase.red
        puts LINE
        puts "#{info.title_by_author}"
        puts
        puts "Blurbs and Plot".upcase.red
        puts LINE
        puts "#{info.blurbs_and_plot}"
        puts
        puts "About the Author".upcase.red
        puts LINE
        puts "#{info.about_author}"
        puts 
        puts "Availability".upcase.red
        puts LINE
        puts "#{info.availability}"
        puts        
        puts "URL".upcase.red
        puts LINE
        puts "#{info.url}"
        puts 

        if !info.excerpt.nil?
            puts "An excerpt of this book is available. Would you like to read it? (Yn)"
            input = STDIN.gets.strip.downcase
            if input == "y"
                puts
                puts "Excerpt".upcase.red
                puts LINE
                puts "#{info.excerpt.slice(1..1000)}..."
                puts
            else
                nil
            end
        end
    end

    def random_quote
        quote = Libri::Scraper.new.scrape_quote.sample

        puts
        puts "#{quote.quote}"
        puts 
        puts "#{quote.author}"
        puts
    end

    def menu_awards
        input = STDIN.gets.strip.downcase
    
        if input.to_i.between?(1,Libri::Awards.all.size)
            award = Libri::Awards.all[input.to_i - 1]
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
    
        if input.to_i.between?(1,Libri::Books.all.size)
            book = Libri::Books.all[input.to_i - 1]
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