class Libri::Awards
    attr_accessor :name, :url
    
    def self.all
        self.scrape_barnes_noble
    end

    def self.scrape_barnes_noble
        html = "https://www.barnesandnoble.com/b/books/awards/_/N-29Z8q8Z1d6q"
        awards_page = Nokogiri::HTML(open(html))

        # awards.name = awards_page.css("ul#sidebar-section-0 li a").text
        # awards.url = awards_page.css("ul#sidebar-section-0 li a").attribute("href").value

        awards_array = []
        awards = {}

        awards_page.css("ul#sidebar-section-0 li a").take(15).each { |award|
            awards = {
                :name => award.text.chomp,
                :url => "https://www.barnesandnoble.com" + award.attribute("href").value
            }
            awards_array << awards
        }
        awards_array
    end

end