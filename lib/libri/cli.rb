class Libri::CLI
    attr_accessor :awards, :name, :book, :url

    def call
        puts "’Tis some visitor, tapping at my chamber door—".blue
        puts "Have you come to indulge in my trophies?".blue
        puts "Well, well..".blue
        puts "Welcome to Libri, a chamber full of literary wonders.".blue
        puts "Do come inside, this will take a few moments..".blue
        list_awards
        leave
    end

    def list_awards
        @awards_array = Libri::Awards.all
        @awards_array.each.with_index(1) { |award, i|
            puts "#{i}. #{award[:name]}"
        }
        puts "Which award would you like to explore?".blue

        menu_awards
    end

    def list_books(award)
        @books_array = Libri::Books.scrape_award(award)
        @books_array.each.with_index(1) { |book, i|
            puts "#{i}. #{book[:title]} #{book[:author]}. #{book[:rating]}"
        }
        puts "Which book would you like to know more about?".blue

        menu_books(award)
    end

    def list_details(book)
        @book_info_hash = Libri::Book.scrape_book(book)
        @book_info_hash.each { |key, val|
            puts "#{key.upcase}".red
            puts "#{val}"
        }
    end

    def menu_awards
        input = STDIN.gets.strip.downcase
    
        if input.to_i > 0
            award = @awards_array[input.to_i - 1]
            list_books(award)
        elsif input == "list awards"
            list_awards
        elsif input == "exit"
            nil
        else
            puts "The raven croaked, 'Please try again.'".red
            list_awards
        end
    end

    def menu_books(award)
        input = STDIN.gets.strip.downcase
    
        if input.to_i > 0
            book = @books_array[input.to_i - 1]
            list_details(book)
            puts "---------------------------------------------------"
            puts "To list the books of the same award again, type list books.".blue
            puts "To list all the awards again, type list awards".blue
            menu_books(award)            
        elsif input == "list books"
            list_books(award)
        elsif input == "list awards"
            list_awards
        elsif input == "exit"
            nil
        else
            puts "The raven croaked, 'Please try again.'".red
            list_books(award)
        end
    end

    def leave
        puts "Nevermore!".blue
    end

end