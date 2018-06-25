class Libri::Quote
    attr_accessor :quote

    def self.scrape_quote
        html = "https://www.goodreads.com/quotes/tag/books"
        quotes_page = Nokogiri::HTML(open(html))
        quote_section = quotes_page.css("div.quote")

        quotes_array = []
        quote_hash = {}

        quote_section.each { |quote|
            quote_hash = {
                :quote => quote.css("div.quoteText").first.text.scan(/(“.+”)/).join(""),
                :author => quote.css("div.quoteText a").first.text
            }

            quotes_array << quote_hash
        }
        quotes_array
    end
end
