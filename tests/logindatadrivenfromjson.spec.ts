import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage.ts";
import { testconfig } from "../test.config.ts";
import { loginpage } from "../pages/loginpage.ts";
import { myaccountpage } from "../pages/myaccountpage.ts";
import { dataprovider } from "../utils/dataprovider.ts";

let config: testconfig;
let homePage: homepage;
let loginPage: loginpage;
let myaccountPage: myaccountpage;

test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    loginPage = new loginpage(page);
    myaccountPage = new myaccountpage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

//Load JSON testdata logindata.json

const jsonpath = "testdata/login.json file";
const jsontestdata = dataprovider.gettestdatafromjson(jsonpath);

for (const data of jsontestdata) {
    test(`Login Test with JSON Data: ${data.testName}`, async ({ page }) => {

        await homePage.clickMyAccount();
        await homePage.clickLoginLink();
        await loginPage.performLogin(data.email, data.password);

        if (data.expected.toLowerCase() === 'success') {
            const MyaccountPage = await myaccountPage.ismyaccountpageexist();
            expect(MyaccountPage).toBe(true);

        }
        else {
            const errormessage = await loginPage.Errormsg();
            expect(errormessage).toContain('Warning: ');
        }

    })
};
