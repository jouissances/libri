class Libri::CLI
    attr_accessor :awards, :name, :book, :url

    LINE = "----------------------------------------------------------"
    SPACE = "                                                          "

    def call
        puts <<~HEREDOC
                                    .     .
                                    !!!!!!!                            
           ..'''::::..      .       [[[|]]]   .
       .::'      ``::..     !!!!!!!!|--_--|!!!!!
'...::'          `'':::.    [[[[[[[[\\_(X)_/]]]]]
                . . |=| ._/-__-__\\===========/-__\\_
                !!!!!!!!!\\========[ /]]|[[\\ ]=====/
            /_-_-| | |-_--|=| | | ||=|_|_|=||"|==|
           /-__--|_|_|_-_-| |_|_|=||______=||_| =|
          /-----------------------\\===========/-----/
          ^^^\\^^^^^^^^^^^^^^^^^^^^^^[[|]]|[[|]]=====/
              |.' ..==::'"'::==.. '.[ /~~~~~\\ ]]]]]]]
              | .'=[[[|]]|[[|]]]=`._||==  =  || =\\ ]
              ||= == ||:^s^:|| = == ||=| | | || |=||
             _||_ = =||o---.|| = ==_||_= == =||==_||_
             \\__/= = ||:   :||= == \\__/[][][][][]\\__/
             [||]= ==||:___:|| = = [||]\\//\\//\\[||]
             }  {---'"'-----'"'- --}  {//\\//\\//}  {
         ____[==]__________________[==]\\//\\//\\[==]_____
          |`|~~~~|================|~~~~|~~~~~~~~|~~~~||
       jgs|^| ^  |================|^   | ^ ^^ ^ |  ^ ||
        HEREDOC
        puts SPACE
        puts "Welcome to Libri, a chamber full of literary wonders.".blue
        puts "Come freely. This will take a few moments..".blue
        puts "Below are some of the most prized literary awards of our time.".blue
        puts LINE
        list_awards
        puts LINE
        leave
    end

    def list_awards
        @awards_array = Libri::Awards.all
        @awards_array.each.with_index(1) { |award, i|
            puts "#{i}. #{award[:name]}"
        }
        puts LINE
        puts "Which award would you like to explore?".blue
        puts LINE

        menu_awards
    end

    def list_books(award)
        @books_array = Libri::Books.scrape_award(award)
        @books_array.each.with_index(1) { |book, i|
            puts "#{i}. #{book[:title]} #{book[:author]}. #{book[:rating]}"
        }
        puts LINE
        puts "Which book would you like to know more about?".blue
        puts LINE

        menu_books(award)
    end

    def list_details(book)
        @book_info_hash = Libri::Book.scrape_book(book)
        @book_info_hash.each { |key, val|
            puts SPACE
            puts "#{key.upcase}".red
            puts LINE
            puts "#{val}"
        }
    end

    def random_quote
        @quotes_array = Libri::Quote.scrape_quote
        @random = @quotes_array.sample
        @random.each { |key, val|
            puts SPACE
            puts "#{val}"
        }
        puts SPACE
    end

    def menu_awards
        input = STDIN.gets.strip.downcase
    
        if input.to_i > 0
            award = @awards_array[input.to_i - 1]
            list_books(award)
        elsif input == "nevermore"
            puts LINE
            random_quote
        elsif input == "awards"
            list_awards
        elsif input == "exit"
            nil
        else
            puts "The raven croaked, 'Please try again.'".red
            puts LINE
            list_awards
        end
    end

    def menu_books(award)
        input = STDIN.gets.strip.downcase
    
        if input.to_i > 0
            book = @books_array[input.to_i - 1]
            list_details(book)
            puts LINE
            puts "   To list the books of the same award again, type books.".blue
            puts "   To list all the awards again, type awards".blue
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