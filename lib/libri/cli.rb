# Controller

class Libri::CLI
    def initialize
        
    end

    def call
        puts <<~HEREDOC
            "’Tis some visitor,” I muttered, “tapping at my chamber door—"
            "Which trophy shall we indulge in tonight?"
        HEREDOC
        list_awards

    end

    def list_awards
        puts <<~HEREDOC
            1. Pulitzer Prize
            2. B&N Discover Award
            3. National Book Awards
        HEREDOC
        menu
    end

    def menu
        puts "Which award would you like to explore?"
    end

end