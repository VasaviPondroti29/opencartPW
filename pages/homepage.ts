import { Locator, Page } from "@playwright/test";

export class homepage {
    private readonly page: Page;
    private readonly clickmyaccount: Locator;
    private readonly clickregisterlink: Locator;
    private readonly clickloginlink: Locator;
    private readonly searchtextbox: Locator;
    private readonly clicksearchbtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickmyaccount = this.page.locator("span:has-text('My Account')");
        this.clickregisterlink = this.page.getByText('Register');
        this.clickloginlink = this.page.getByText('Login');
        this.searchtextbox = this.page.getByRole('textbox', { name: 'Search' });
        this.clicksearchbtn = this.page.locator("button[class='btn btn-default btn-lg']");
    }

    //Action Methods

    //check if homepage exist
    async isHomepageexist() {
        const title = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }


    // click My Account
    async clickMyAccount() {
        try {
            await this.clickmyaccount.waitFor({ state: 'visible', timeout: 10000 });
            await this.clickmyaccount.click();
        }
        catch (error) {
            console.log(`exception occured while clicking 'my account':${error}`);
            throw error;
        }
    }

    //click Register link
    async clickRegisterLink() {
        try {
            await this.clickregisterlink.waitFor({ state: 'visible', timeout: 10000 });
            await this.clickregisterlink.click();
        }
        catch (error) {
            console.log(`exception occured while clicking 'Register':${error}`);
            throw error;
        }
    }

    //click Loginlink
    async clickLoginLink() {
        try {
            await this.clickloginlink.waitFor({ state: 'visible', timeout: 10000 });
            await this.clickloginlink.click();
        }
        catch (error) {
            console.log(`exception occured while clicking 'Login':${error}`);
            throw error;
        }
    }


    // search the product by its name
    async enterProductname(Productname: string) {
        try {
            await this.searchtextbox.waitFor({ state: 'visible', timeout: 10000 });
            await this.searchtextbox.fill(Productname);
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }
    //click searchbutton after entering product name

    async clickSearchbutton() {
        try {
            await this.clicksearchbtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.clicksearchbtn.click();
        } catch (error) {
            console.log(`Exception occurred while clicking search button: ${error}`);
            throw error;
        }
    }


}