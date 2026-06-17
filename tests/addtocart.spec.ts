
import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage";
import { searchresultspage } from "../pages/searchresultspage";
import { productpage } from "../pages/productpage";
import { testconfig } from "../test.config";

let config: testconfig;
let homePage: homepage;
let searchresultsPage: searchresultspage;
let productPage: productpage;


test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    searchresultsPage = new searchresultspage(page);
    productPage = new productpage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("verifying add to cart feature", async ({ page }) => {
    await homePage.enterProductname(config.Productname);
    await homePage.clickSearchbutton();

    //Verify that the search results page is displayed
    const searchResultspage = await searchresultsPage.issearchresultspageexists();
    expect(searchResultspage).toBeTruthy();

    //Validate, searched product appears in results
    const searchedproduct = await searchresultsPage.isProductexist(config.Productname);
    expect(searchedproduct).toBeTruthy();

    //Select product → Set quantity → Add to cart → Verify confirmation

    if (await searchresultsPage.isProductexist(config.Productname)) {
        await searchresultsPage.selectProduct(config.Productname);
        await productPage.enterQuantity(config.ProductQuantity);
        await productPage.clickAddtoCart();
    }

    const isvisible = await productPage.isconfirmationmsgVisible();
    expect(isvisible).toBeTruthy();



})