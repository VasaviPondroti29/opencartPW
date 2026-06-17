import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage";
import { registerpage } from "../pages/registerpage"
import { testconfig } from "../test.config.ts";
import { randomDataUtil } from "../utils/randomdatagenerator";

let config: testconfig;
let homePage: homepage;
let Registerpage: registerpage;

test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    Registerpage = new registerpage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("user registration test", async ({ page }) => {
    await expect(page).toHaveURL("https://tutorialsninja.com/demo/");
    await homePage.isHomepageexist();
    await homePage.clickMyAccount();
    await homePage.clickRegisterLink();
    
    await Registerpage.setFirstName(randomDataUtil.getfirstName());
    await Registerpage.setLastName(randomDataUtil.getlastName());
    await Registerpage.setemail(randomDataUtil.getemail());
    await Registerpage.setTelephone(randomDataUtil.getphonenumber());
    const Password=randomDataUtil.getpassword();
    await Registerpage.setpassword(Password);
    await Registerpage.setconfirmpassword(Password);
    await Registerpage.clickprivacycheckbox();
    await Registerpage.clickonContinueButton();
    
    //validate confirmation message
    const confirmationmessage=await Registerpage.confirmationmsg();
    expect (confirmationmessage).toContain("Your Account Has Been Created!");

    Registerpage.clickContinueButton();

})