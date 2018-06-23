class Libri::Awards
    attr_accessor :award, :awards

    def self.all
        self.scrape_barnes_noble
    end

    def self.scrape_barnes_noble
        doc = Nokogiri::HTML(open("https://www.barnesandnoble.com/b/books/awards/_/N-29Z8q8Z1d6q?showMoreIds=10008"))
                
        doc.css(".mb-m h2.mb-xs").map { |award|
            award.text
        }

    end

end

