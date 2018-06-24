class Libri::Books
    attr_accessor :award, :url

    def self.scrape_award(award)
        html = award[:url]
        books_page = Nokogiri::HTML(open(html))

        books_array = []
        books = {}

        books_page.css("div.product-shelf-info").take(20).each { |book|
            books = {
                :title => book.css("div.product-shelf-title").text.strip,
                :author => book.css("div.product-shelf-author").text.strip,
                :url => "https://www.barnesandnoble.com" + book.css("a").attribute("href").value
            } 

            books_array << books
        }
        books_array
    end
end

