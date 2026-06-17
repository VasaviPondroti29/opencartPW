import { test, expect } from "@playwright/test";
import { shoppingcartpage } from "../pages/shoppingcartpage";
import { checkoutpage } from "../pages/checkoutpage";
import { testconfig } from "../test.config.ts";
import { productpage } from "../pages/productpage.ts";
import { homepage } from "../pages/homepage.ts";
import { searchresultspage } from "../pages/searchresultspage.ts";

let config: testconfig;
let shoppingcartPage: shoppingcartpage;
let checkoutPage: checkoutpage;
let productPage: productpage;
let homePage: homepage;
let searchresultsPage: searchresultspage;


test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    shoppingcartPage = new shoppingcartpage(page);
    checkoutPage = new checkoutpage(page);
    productPage = new productpage(page);
    homePage = new homepage(page);
    searchresultsPage = new searchresultspage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("verify shopping cart page after product added to cart", async ({ page }) => {
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

    await page.waitForTimeout(5000);

    await productPage.clickshoppingCart();
    //await shoppingcartPage.verifyshoppingcart();
    await shoppingcartPage.isShoppingcartpageVisible();
    await shoppingcartPage.Totalprice();
    await shoppingcartPage.clickCheckoutCart();

});