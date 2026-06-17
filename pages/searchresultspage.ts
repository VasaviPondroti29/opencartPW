import { Locator, Page } from "@playwright/test";
import { productpage } from "./productpage";

export class searchresultspage {
    private readonly page: Page;
    private readonly searchpageheader: Locator;
    private readonly productsSearch: Locator;

    constructor(page:Page)
{
    this.page=page;
    this.searchpageheader=this.page.locator("#content h1");
    this.productsSearch=this.page.locator("h4>a");
}

//action methods
//Verify search results page exists by checking the header text
 async issearchresultspageexists() {
        try {
            const headerText = await this.searchpageheader.textContent();
            return headerText?.includes('Search -');
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
        }
        return false;
    }
//Check if a product exists in the search results by its name

async isProductexist(Productname: string) {
        try {
            const count = await this.productsSearch.count();
            for (let i = 0; i < count; i++) {
                const product = this.productsSearch.nth(i);
                 const title = await product.textContent();
                 if (title === Productname) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

//Select a product from the search results by its name
async selectProduct(Productname: string) {
        try {
            const count = await this.productsSearch.count();
            for (let i = 0; i < count; i++) {
                const product = this.productsSearch.nth(i);
                const title = await product.textContent();
                if (title === Productname) {
                    await product.click();
                    return new productpage(this.page);
                }
            }
            console.log(`Product not found: ${Productname}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }

//Get count of products in search results
async productsCount() {
        return await this.productsSearch.count();
    }






}