# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shoppingcartverification.spec.ts >> verify shopping cart page after product added to cart
- Location: tests/shoppingcartverification.spec.ts:32:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { shoppingcartpage } from "../pages/shoppingcartpage";
  3  | import { checkoutpage } from "../pages/checkoutpage";
  4  | import { testconfig } from "../test.config.ts";
  5  | import { productpage } from "../pages/productpage.ts";
  6  | import { homepage } from "../pages/homepage.ts";
  7  | import { searchresultspage } from "../pages/searchresultspage.ts";
  8  | 
  9  | let config: testconfig;
  10 | let shoppingcartPage: shoppingcartpage;
  11 | let checkoutPage: checkoutpage;
  12 | let productPage: productpage;
  13 | let homePage: homepage;
  14 | let searchresultsPage: searchresultspage;
  15 | 
  16 | 
  17 | test.beforeEach(async ({ page }) => {
  18 |     config = new testconfig();
> 19 |     await page.goto(config.appurl);
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  20 |     shoppingcartPage = new shoppingcartpage(page);
  21 |     checkoutPage = new checkoutpage(page);
  22 |     productPage = new productpage(page);
  23 |     homePage = new homepage(page);
  24 |     searchresultsPage = new searchresultspage(page);
  25 | });
  26 | 
  27 | test.afterEach(async ({ page }) => {
  28 |     await page.waitForTimeout(3000);
  29 |     await page.close();
  30 | });
  31 | 
  32 | test("verify shopping cart page after product added to cart", async ({ page }) => {
  33 |     await homePage.enterProductname(config.Productname);
  34 |     await homePage.clickSearchbutton();
  35 | 
  36 |     //Verify that the search results page is displayed
  37 |     const searchResultspage = await searchresultsPage.issearchresultspageexists();
  38 |     expect(searchResultspage).toBeTruthy();
  39 | 
  40 |     //Validate, searched product appears in results
  41 |     const searchedproduct = await searchresultsPage.isProductexist(config.Productname);
  42 |     expect(searchedproduct).toBeTruthy();
  43 | 
  44 |     //Select product → Set quantity → Add to cart → Verify confirmation
  45 | 
  46 |     if (await searchresultsPage.isProductexist(config.Productname)) {
  47 |         await searchresultsPage.selectProduct(config.Productname);
  48 |         await productPage.enterQuantity(config.ProductQuantity);
  49 |         await productPage.clickAddtoCart();
  50 |     }
  51 | 
  52 |     const isvisible = await productPage.isconfirmationmsgVisible();
  53 |     expect(isvisible).toBeTruthy();
  54 | 
  55 |     await page.waitForTimeout(5000);
  56 | 
  57 |     await productPage.clickshoppingCart();
  58 |     //await shoppingcartPage.verifyshoppingcart();
  59 |     await shoppingcartPage.isShoppingcartpageVisible();
  60 |     await shoppingcartPage.Totalprice();
  61 |     await shoppingcartPage.clickCheckoutCart();
  62 | 
  63 | });
```