class Libri::Book
    attr_accessor :title_by_author, :about_author, :plot, :url, :excerpt, :related_books, :book

    def self.scrape_book(book)
        html = book[:url]
        book_page = Nokogiri::HTML(open(html))
        info_section = book_page.css("div.tabpanel")

        related_books_hash = {}

        book_info_hash = {
            :title_by_author => info_section.css("div#productInfoOverview div.mb-m").text,
            :plot => info_section.css("div#productInfoOverview p").text,
            :about_author => info_section.css("div#MeetTheAuthor div.text--medium").text,
            :excerpt => info_section.xpath("//div[@class='read-an-excerpt']/p[not(@class) and position()<7]").text,
            # :related_books => book_page.css("div.product-shelf-info").each { |book|
            #     related_books_hash = {
            #         :title => book.css("div.product-shelf-title").text.strip,
            #         :author => book.css("div.product-shelf-author").text.strip,
            #         :url => "https://www.barnesandnoble.com" + book.css("a").attribute("href").value
            #     }
            # },
            :url => book[:url]
        }
    end

end
