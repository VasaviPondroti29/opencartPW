import{test,expect} from "@playwright/test";
import{homepage} from "../pages/homepage";
import { testconfig } from "../test.config.ts";
import { loginpage } from "../pages/loginpage.ts";
import { myaccountpage } from "../pages/myaccountpage.ts";

let config: testconfig;
let homePage: homepage;
let loginPage: loginpage;
let myaccountPage: myaccountpage;

test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    loginPage = new loginpage(page);
    myaccountPage=new myaccountpage (page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("verify login test",async({page})=>{
await homePage.clickMyAccount();
await homePage.clickLoginLink();
await loginPage.performLogin(config.email,config.password);


const MyaccountPage= await myaccountPage.ismyaccountpageexist();
expect (MyaccountPage).toBe(true);

})





