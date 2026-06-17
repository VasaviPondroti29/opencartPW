import { Locator, Page } from "@playwright/test";

export class loginpage {
    private readonly page: Page;
    private readonly Email: Locator;
    private readonly Password: Locator;
    private readonly clickloginbtn: Locator;
    private readonly errormsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.Email = this.page.getByLabel('E-Mail');
        this.Password = this.page.locator('#input-password');
        this.clickloginbtn = this.page.locator("input[type='submit']");
        this.errormsg = this.page.locator(".alert.alert-danger.alert-dismissible");
    }

    //action methods

    //enter Email
    async enteremail(emailaddress: string) {
        await this.Email.fill(emailaddress);
    }

    //enter Password
    async enterpassword(password: string) {
        await this.Password.fill(password);
    }

    //click continue button

    async clickloginButton() {
        await this.clickloginbtn.click();
    }

    //perform complete login
    async performLogin(emailaddress: string, password: string) {
        await this.enteremail(emailaddress);
        await this.enterpassword(password);
        await this.clickloginButton();
    }
    //verify myaccount page if login is successful
    //verify error message if login is unsuccessful
    async Errormsg() {
        return (this.errormsg.textContent());
    }


}