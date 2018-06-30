class Scraper

    attr_accessor :url, :award, :book

    def self.scrape_barnes_noble
        html = "https://www.barnesandnoble.com/b/books/awards/_/N-8q8Z1d6q?showMoreIds=10008"
        awards_page = Nokogiri::HTML(open(html))

        awards_array = []
        awards = {}

        awards_page.css("ul#sidebar-section-0 li a").take(28).each { |award|
            awards = {
                :name => award.text.chomp,
                :url => "https://www.barnesandnoble.com" + award.attribute("href").value
            }
            awards_array << awards
        }
        awards_array
    end

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

        books_array.uniq
    end

    def self.scrape_book(book)
        html = book[:url]
        book_page = Nokogiri::HTML(open(html))
        info_section = book_page.css("div.tabpanel")

        # related_books_hash = {}

        book_info_hash = {
            :title_by_author => info_section.css("div#productInfoOverview div.mb-m").text,
            :blurbs_and_plot => info_section.css("div#productInfoOverview p").map(&:text).join("\n").strip,
            :about_author => info_section.css("div#MeetTheAuthor div.text--medium").text.strip,
            :excerpt => info_section.xpath("//div[@class='read-an-excerpt']/p[not(@class) and position()<5]").map(&:text).join("\n"),
            # :related_books => book_page.css("div.product-shelf-info").each { |book|
            #     related_books_hash = {
            #         :title => book.css("div.product-shelf-title").text.strip,
            #         :author => book.css("div.product-shelf-author").text.strip,
            #         :url => "https://www.barnesandnoble.com" + book.css("a").attribute("href").value
            #     }
            # },
            :availability => book_page.css("button#pdp-marketplace-btn").text.chomp,
            :url => book[:url]
        }

        book_info_hash.delete_if { |key, val| val.to_s.strip.empty? }

    end

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
