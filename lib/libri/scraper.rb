class Libri::Scraper

    attr_accessor :url, :award, :book

    def scrape_barnes_noble
        html = "https://www.barnesandnoble.com/b/books/awards/_/N-8q8Z1d6q?showMoreIds=10008"
        awards_page = Nokogiri::HTML(open(html))

        awards = {}

        # Chosen .take(28) because without it, our awards list will include a 'Show Less'
        awards_array = awards_page.css("ul#sidebar-section-0 li a").take(28).map { |award|
            awards = {
                :name => award.text.chomp,
                :url => "https://www.barnesandnoble.com" + award.attribute("href").value
            }
        }

        Libri::Awards.create_from_collection(awards_array)
    end

    def scrape_award(award)
        html = award.url
        books_page = Nokogiri::HTML(open(html))

        books = {}

        books_array = books_page.css("div.product-shelf-info").take(20).map { |book|
            books = {
                :title => book.css("div.product-shelf-title").text.strip,
                :author => book.css("div.product-shelf-author").text.strip,
                :url => "https://www.barnesandnoble.com" + book.css("a").attribute("href").value
            } 
        }.uniq

        Libri::Books.create_from_collection(books_array)
    end

    def scrape_book(book)
        html = book.url
        book_page = Nokogiri::HTML(open(html))
        info_section = book_page.css("div.tabpanel")

        book_info_hash = {
            :title_by_author => info_section.css("div#productInfoOverview div.mb-m").text,
            :blurbs_and_plot => info_section.css("div#productInfoOverview p").map(&:text).join("\n").strip,
            :about_author => info_section.css("div#MeetTheAuthor div.text--medium").text.strip,
            :excerpt => info_section.css("div.read-an-excerpt p").text,
            # info_section.xpath("//div[@class='read-an-excerpt']/p[not(@class) and position()<3]").map(&:text).join("\n"),
            :availability => book_page.css("button#pdp-marketplace-btn").text.chomp,
            :url => book.url
        }.delete_if { |key, val| val.to_s.strip.empty? }

        Libri::Book.create_from_collection(book_info_hash)
    end

    def scrape_quote
        html = "https://www.goodreads.com/quotes/tag/books"
        quotes_page = Nokogiri::HTML(open(html))
        quote_section = quotes_page.css("div.quote")

        quote_hash = {}

        quotes_array = quote_section.map { |quote|
            quote_hash = {
                :quote => quote.css("div.quoteText").first.text.scan(/(“.+”)/).join(""),
                :author => quote.css("div.quoteText a").first.text
            }
        }
        
        Libri::Quote.create_from_collection(quotes_array)
    end

end
