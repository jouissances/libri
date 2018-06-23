class Libri::CLI
    attr_accessor :awards

    def call
        puts <<~HEREDOC
            "’Tis some visitor,” I muttered, “tapping at my chamber door—"
            "Have you come to indulge in my trophies?"
            "Well, well.."
        HEREDOC
        list_awards
        leave
    end

    def list_awards
        @awards = Libri::Awards.all
        menu
    end

    def menu
        input = nil

        while input != "exit"
            input = STDIN.gets.strip.downcase
      
            if input.to_i > 0
            #   award = @awards[input.to_i-1]
              puts <<~HEREDOC
                1. Lincoln in the Bardo by George Saunders (3/5.0)
                2. Exit West by Mohsin Hamid (3.5/5.0)
                3. Autumn by Ali Smith (0/5.0)
                4. Elmet by Fiona Mosley (4/5.0)
                5. History of Wolves (3/5.0)
                6. 4 3 2 1: A Novel (3/5.0)
                Which book would you like to know more about?
              HEREDOC
            elsif input == "list"
              list_awards
            else
              puts "Please try again."
            end
        end
    end

    def leave
        puts "Nevermore!"
    end

end