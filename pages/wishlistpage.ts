import { Locator, Page } from "@playwright/test";
import { myaccountpage } from "../pages/myaccountpage";

export class wishlistpage {
    private readonly page: Page;
    private readonly wishlistcartheader: Locator;
    private readonly addtoCartbtn: Locator;
    private readonly removebtn: Locator;
    private readonly Continuebtn: Locator;
    private readonly alertmsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistcartheader = this.page.locator('h2:has-text("My Wish List")');
        this.addtoCartbtn = this.page.locator("button[data-original-title='Add to Cart']");
        this.removebtn = this.page.locator("a[data-original-title='Remove']");
        this.Continuebtn = this.page.getByText('Continue');
        this.alertmsg = this.page.getByText("Success");
    }

    //Action methods
    //check wishlist page is visible
    async iswishlistpageVisible() {
        try {
            const headerText = await this.wishlistcartheader.textContent();
            return headerText?.includes('My Wish List');
        } catch (error) {
            console.log(`exception occured while showing Wishlist page:${error}`);
            throw error;
        }
        return false;
    }

    //remove the item from the wishlist

    async Removeitemfromwishlist() {
        try {
            await this.removebtn.click();
        }
        catch (error) {
            console.log(`exception occured while clicking 'remove item button':${error}`);
            throw error;
        }
    }

    //add item to Add to Cart from wishlist

    async additemtoAddtocart() {
        await this.addtoCartbtn.click();
    }

    //validate successful message after add product to cart from wishlist
    async iscnfmsgVisibleafteraddtotheCart() {
        try {
            if (this.alertmsg != null) {
                return true;
            }
            else {
                return false;
            }

        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }
    //click continue button
    async clickoncontinuebtn() {
        await this.Continuebtn.click();
        return new myaccountpage(this.page);
    }



}