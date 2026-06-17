import { Locator, Page } from "@playwright/test";


import {shoppingcartpage} from "../pages/shoppingcartpage";
import { wishlistpage } from "../pages/wishlistpage";

export class productpage {
    private readonly page: Page;
    private readonly quantity: Locator;
    private readonly wishlistbtn:Locator;
    private readonly wishlstitemmsg:Locator;
    private readonly wishlistlink:Locator;
    private readonly addtocartbtn: Locator;
    private readonly alertmsg: Locator;
    private readonly shoppingcartlink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistbtn=this.page.locator("button[class='btn btn-default'] i[class='fa fa-heart']");
        this.wishlstitemmsg=this.page.getByText("Success");
        this.wishlistlink=this.page.locator("span:has-text('Wish List')");
        this.quantity = this.page.getByRole('textbox', { name: 'Qty' });
        this.addtocartbtn = this.page.locator("#button-cart");
        this.alertmsg = this.page.locator(".alert.alert-success.alert-dismissible");
        this.shoppingcartlink = this.page.locator('span:has-text("Shopping Cart")');
    }

//action methods

// add the product to wishlist

async producttoWishlist(){
    await this.wishlistbtn.click();
}

//verify alert message after product added to Wishlist
async ismsgVisibleafteraddedtoWishlist() {
        try {
            if(this.wishlstitemmsg!=null){
                 return true;
            }
            else{
                return false;
            }//await expect(this.cnfMsg).toBeVisible();
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

 //click Wishlist link to view the products in wishlist
    async clickonwishlistlink() {
        try {
            await this.wishlistlink.click();
            return new wishlistpage(this.page);
        }
        catch (error) {
            console.log(`exception occured while clicking 'Wishlist cart':${error}`);
            throw error;
        }
    }


//enter the quantity
async enterQuantity(ProductQuantity:string){
    await this.quantity.fill('');
    await this.quantity.fill(ProductQuantity);
}

//click Addtocart button

async clickAddtoCart(){
    this.addtocartbtn.click();
}

//verify alert message after product added to add to cart
async isconfirmationmsgVisible() {
        try {
            if(this.alertmsg!=null){
                 return true;
            }
            else{
                return false;
            }//await expect(this.cnfMsg).toBeVisible();
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    //click Shopping Cart to view the products in cart
    async clickshoppingCart() {
        try {
            await this.shoppingcartlink.click();
            return new shoppingcartpage(this.page);
        }
        catch (error) {
            console.log(`exception occured while clicking 'Shopping Cart':${error}`);
            throw error;
        }
    }

//complete workflow for add product to cart
async addProductToCart(ProductQuantity: string): Promise<void> {
        await this.enterQuantity(ProductQuantity);
        await this.clickAddtoCart();
        await this.isconfirmationmsgVisible();
    }







}