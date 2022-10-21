const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

const urls = [
            "https://www.staples.com/whalen-abington-desk/product_2736557",
            "https://www.staples.com/staples-easy-2-go-student-desk-with-bookcases-gray-we-of-0146g/product_24343774",
            "https://www.staples.com/union-scale-60-w-essentials-l-shaped-desk-beigewood-un60420/product_24503499",
            "https://www.staples.com/staples-easy-2-go-student-desk-with-bookcases-gray-we-of-0146g/product_24343774",
            "https://www.staples.com/midmod-60-storage-desk-espresso-un56950/product_24398973",
            "https://www.staples.com/Easy2Go-Corner-Computer-Desk-Resort-Cherry/product_951572",
            "https://www.staples.com/Bush-Furniture-Cabot-Collection-L-Desk-with-Hutch-Heather-Gray-CAB001HRG/product_2094393",
            "https://www.staples.com/Easy2Go-Metal-and-Glass-Computer-Cart/product_951534",
            "https://www.staples.com/eureka-ergonomic-47-computer-gaming-desk-black-stgd010/product_24502575",
            "https://www.staples.com/eureka-ergonomic-63-computer-gaming-desk-black-gd0076-bk/product_24502572",
         ];

(async () => {
    let ProductArray= [];
    for(let prodData of urls) {
        const res = await request({
            uri:prodData,
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,de;q=0.8"
            },
            gzip:true,
        })
        let $ = cheerio.load(res)
        let name = $("#product_title").text();
        let price = $(".price-info__final_price_sku").text()
        let item_number = $("#item_number").text()
        let model_number = $("#manufacturer_number").text()
        let discription = $("#prodParagraph").text()
        console.log(name,price,item_number,model_number)
    
        ProductArray.push({
            Name:name,
            Price:price,
            Item_number:item_number,
            Model_number:model_number,
            Discription:discription,
        })
    }
    const j2cp = new json2csv()
    const csv = j2cp.parse(ProductArray)

    fs.writeFileSync("./prodData.csv",csv , "utf-8")
  }
)();


