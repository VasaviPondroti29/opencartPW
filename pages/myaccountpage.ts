import { Locator, Page } from "@playwright/test";
import { logoutpage } from "./logoutpage";

export class myaccountpage {
    private readonly page: Page;
    private readonly msgheading: Locator;
    private readonly logoutlink:Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgheading = this.page.locator("h2:has-text('My Account')");
        this.logoutlink=this.page.getByRole('link', { name: 'Logout' });
    }

    //action methods
    //verify myaccount page is exist
    
async ismyaccountpageexist() {
        try {
            const isVisible = await this.msgheading.isVisible();
            return isVisible;
        } 
        catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }

// click logout link for logout from the application
 
async clickonLogoutlink(){
    try{
        await this.logoutlink.click();
        return new logoutpage(this.page);
    }
    catch(error){
        console.log(`Unable to click Logout link: ${error}`);
        throw error;
    }
    
}






}