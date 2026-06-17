import { Locator, Page } from "@playwright/test";
import { checkoutpage } from "../pages/checkoutpage";

export class shoppingcartpage {
    private readonly page: Page;
    private readonly shoppingcartheader: Locator;
    private readonly textboxforqty:Locator;
     private readonly removebtn: Locator;
     private readonly updatebtn: Locator;
     private readonly successmsg:Locator;
    private readonly totalprice: Locator;
    private readonly checkoutlink:Locator;

    constructor(page:Page){
        this.page=page;
        this.shoppingcartheader=this.page.getByRole('heading', { name: 'Shopping Cart' });
        this.removebtn=this.page.locator("button[data-original-title='Remove']");
        this.textboxforqty=this.page.locator("input[size='1']");
        this.updatebtn=this.page.locator("button[data-original-title='Update']");
        this.successmsg=this.page.getByText("Success: You have modified your shopping cart!");;
        this.totalprice=this.page.locator("tbody tr td:nth-child(6)");
        this.checkoutlink=this.page.locator('a.btn.btn-primary:visible');
    }

//Action methods
//check shopping cart page is visible
async isShoppingcartpageVisible() {
        try {
            const headerText = await this.shoppingcartheader.textContent();
            return headerText?.includes('Shopping Cart');
        } catch (error) {
          console.log(`exception occured while showing Shopping Cart page:${error}`);
            throw error;
        }
        return false;
    }
    
//check the total price before checkout

async Totalprice() {
        try {
            return await this.totalprice.textContent();
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }
// update the items inthe cart

async Updateitemsincart(quantity:string)
{
    await this.textboxforqty.fill('');
    await this.textboxforqty.fill(quantity);
    await this.updatebtn.click();
}

//validate successful message after update the cart
async isconfirmationmsgVisibleafterUpdatetheCart() {
        try {
            if(this.successmsg!=null){
                 return true;
            }
            else{
                return false;
            }
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }


//remove the items from the cart

async RemoveitemsfroomCart() {
        try {
            await this.removebtn.click();
        }
        catch (error) {
            console.log(`exception occured while clicking 'remove item button':${error}`);
            throw error;
        }
    }


//click Checkout button
    async clickCheckoutCart() {
        try {
            await this.checkoutlink.click();
            //return new checkoutpage(this.page);
        }
        catch (error) {
            console.log(`exception occured while clicking 'Checkout Cart':${error}`);
            throw error;
        }
    }


    //perform all at once
    async verifyshoppingcart(){
        await this.isShoppingcartpageVisible();
        await this.Totalprice();
        await this.clickCheckoutCart();
    }
}


  