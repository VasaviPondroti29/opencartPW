import { Locator, Page } from "@playwright/test";
import { homepage } from "./homepage";

export class logoutpage {
    private readonly page: Page;
    private readonly logoutmsgheading: Locator;
    private readonly continuebtn:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.logoutmsgheading=this. page.getByRole('heading', { name: 'Account Logout' });
        this.continuebtn=this.page.getByRole('link', { name: 'Continue' });
    }

    //action methods
    //verify myaccount page is exist
    
async isLogoutpageexist() {
        try {
            const isVisible = await this.logoutmsgheading.isVisible();
            return isVisible;
        } 
        catch (error) {
            console.log(`Error checking My Logout page heading visibility: ${error}`);
            return false;
        }
    }

    //verify continue button is visible for after logout
    async iscontionuebtnexists() {
        try {
            const isVisible = await this.continuebtn.isVisible();
            return isVisible;
        } 
        catch (error) {
            console.log(`Error checking for continue button visibility: ${error}`);
            return false;
        }
    }

    //click continue button after Logout

    async clickoncontinuebutton(){
        await this.continuebtn.click();
        return new homepage(this.page);
    }

    //perform Logout
    async performLogout(){
        await this.isLogoutpageexist();
        await this.iscontionuebtnexists();
        await this.clickoncontinuebutton();
    }
}