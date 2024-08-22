import scrapy
from bs4 import BeautifulSoup as bs
import re
from dotenv import load_dotenv
import os
from pymongo import MongoClient

# Load environment variables from a .env file
load_dotenv('.env')
file_path='output.json'
class NoberoSpider(scrapy.Spider):
    name = "nobero"

    def start_requests(self):
        # Define the URL to start scraping from
        urls = ['https://nobero.com/pages/men']
        for url in urls:
            # Yield a request for each URL, using the parse method as the callback
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        urls = []
        # Extract subcategory links from the men's section
        menCategories = response.css('div.custom-page-season-grid-item').getall()
        for categories in menCategories:
            # Use helper function to get the category link and clean it up
            url = getcategoryLink(categories).split("%")[0]
            urls.append(url)
        for link in urls:
            # Follow each subcategory link to scrape product information
            yield response.follow(link, self.parse_subcategory)

    def parse_subcategory(self, response):
        # Extract product links from each subcategory page
        productLink = []
        productSection = response.css('section .product-section')
        productarticle = productSection.css('section .product-card-container').getall()
        for products in productarticle:
            # Use helper function to get the product link
            product = getProducts(products)
            if product:
                productLink.append(product)
        for link in productLink:
            # Follow each product link to scrape product details
            yield response.follow(link, self.parse_product)

    def parse_product(self, response):
        # Extract product details
        skus = []
        url = response.url
        
        # Define CSS selectors for extracting various product details
        infoString = '.theme-content > .icartShopifyCartContent > .shopify-section > main.flex.flex-col >  div.flex.flex-col >'
        infoStringPDCT = 'div.px-4.pt-4 >  div.w-full >'        
        
        # Extract product information using CSS selectors
        getproductCategory = response.css(' .theme-content > .icartShopifyCartContent > .shopify-section > div.breadcrumbs-desktop > nav.breadcrumb >span::text').getall()
        getproudctTitles = response.css('{} {} div.flex.justify-between.gap-2 >  h1.capitalize.text-lg.leading-none::text'.format(infoString, infoStringPDCT)).getall()
        #If you want to scrape the image too then use this:
        getproudctImage = response.css('{} div.flex.h-fit > div.container > div.pdp-main-image >  figure.image-container > img::attr(src)'.format(infoString)).getall()
        getproductPrice = response.css('{} {} div.flex.justify-between > div.flex.flex-col.py-2 > div.flex.items-center > h2.text-xl > spanclass::text'.format(infoString, infoStringPDCT)).getall()
        getproductDiscount = response.css('{} {} div.flex.justify-between > div.flex.flex-col.py-2 > div.flex.items-center > h2.text-base::text'.format(infoString, infoStringPDCT)).getall()
        productboughtCount = response.css('{} {} div.flex.gap-2.items-end > span::text'.format(infoString, infoStringPDCT)).getall()
        productSize = response.css('{} div.px-4 > form.shopify-product-form > variant-radios > div.size-section > div.flex.overflow-x-scroll.hide-scrollbar > fieldset > label::text '.format(infoString)).getall()
        productColor = response.css('{} div.px-4 > form.shopify-product-form > variant-radios > div.color-section > div.capitalize >  span #selected-color-title::text  '.format(infoString)).getall()
        productKeySpecifications = response.css('{} section.border-y-8 > section.flex-col > div.product-information-container > div.product-metafields > div.product-metafields-values > p::text '.format(infoString)).getall()
        productDescription = response.css('{} section.border-y-8 > section.flex-col > section > details.filter-group > div.product-description > span::text'.format(infoString)).getall()
        
        # Format available SKUs
        availble_skus = [{
            "Color": [productColor],
            "Size": [productSize]
        }]
        
        # Create a dictionary with the scraped data
        unfiltered_item = {
            "Category": filter_Fields(getproductCategory),
            "url": url,
            "title": filter_Fields(getproudctTitles),
            "price": getproductPrice,
            "Discount": getproductDiscount,
            "Image": getproudctImage,
            "Last_7_days": filter_Fields(productboughtCount),
            "availble_skus": filter_Fields(availble_skus),
            "product_key_specifications": productKeySpecifications,
            "product_description": productDescription
        }
        
        # Save the data to the database
        SaveDataToDB(unfiltered_item)
        

# Helper function to extract category links from HTML
def getcategoryLink(html_string):
    soup = bs(html_string, 'html.parser')
    anchor_tag = soup.find('a')
    if anchor_tag and 'href' in anchor_tag.attrs:
        return anchor_tag['href']
    return None

# Helper function to extract product links from HTML
def getProducts(html_string):
    soup = bs(html_string, 'html.parser')
    anchor_tag = soup.find('a')
    href_url = anchor_tag['href']
    if href_url is not None:
        return href_url
    return None

# Helper function to clean and format fields
def filter_Fields(Field):
    catStr = ' '.join(str(item) for item in Field)
    catStr = catStr.replace('\n', '').replace('\\n', '').strip()
    cleanedField = ''.join([char for char in catStr if char.isalnum() or char.isspace()])
    cleanedField = re.sub(r'nn+', '', cleanedField)
    return cleanedField

# Helper function to save data to MongoDB
def SaveDataToDB(data):
    databaseUrl = os.getenv('MONGO_URL')
    try:
        client = MongoClient(databaseUrl)
        db = client['Nobero']
        products = db['Products']
        print("Database Connected Successfully Name:{}  Collection:{}".format(db.name, products.name))
        try:
            products.insert_one(data)
            print("Data Inserted Successfully")
        except:
            print("Error Occurred while Inserting the Data")
    except:
        print("Error Occurred while Connecting to the Database")
        exit(0)
