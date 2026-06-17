# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> verifying wishlist feature
- Location: tests/wishlist.spec.ts:28:5

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://tutorialsninja.com/demo/
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import {test,expect} from "@playwright/test";
  2  | import { homepage } from "../pages/homepage";
  3  | import { searchresultspage } from "../pages/searchresultspage";
  4  | import { productpage } from "../pages/productpage";
  5  | import { wishlistpage } from "../pages/wishlistpage";
  6  | import {testconfig} from "../test.config";
  7  | 
  8  |  let config: testconfig;
  9  |  let homePage: homepage;
  10 |  let searchresultsPage: searchresultspage;
  11 |  let productPage:productpage;
  12 |  let wishlistPage:wishlistpage;
  13 | 
  14 | test.beforeEach(async ({ page }) => {
  15 |     config = new testconfig();
> 16 |     await page.goto(config.appurl);
     |                ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://tutorialsninja.com/demo/
  17 |     homePage = new homepage(page);
  18 |     searchresultsPage = new searchresultspage(page);
  19 |     productPage = new productpage(page);
  20 |     wishlistPage= new wishlistpage(page);
  21 | });
  22 | 
  23 | test.afterEach(async ({ page }) => {
  24 |     await page.waitForTimeout(3000);
  25 |     await page.close();
  26 | });
  27 | 
  28 | test("verifying wishlist feature",async({page})=>{
  29 | await homePage.enterProductname(config.Productname);
  30 | await homePage.clickSearchbutton();
  31 | 
  32 | //Verify that the search results page is displayed
  33 | const searchResultspage=await searchresultsPage.issearchresultspageexists();
  34 | expect(searchResultspage).toBe(true);
  35 | 
  36 | //Select a product from the search results by its name
  37 | await searchresultsPage.selectProduct(config.Productname);
  38 | 
  39 | 
  40 | //add product to wishlist and validate the confirmation message
  41 | 
  42 | await productPage.producttoWishlist();
  43 | expect (await productPage.ismsgVisibleafteraddedtoWishlist()).toBe(true);
  44 | await page.waitForTimeout(5000);
  45 | console.log("product added to wishlist");
  46 | 
  47 | await productPage.clickonwishlistlink();
  48 | 
  49 | //click wishlist button for verifying and adding the item to Add to Cart and remove the item from wishlist
  50 | 
  51 | expect (await wishlistPage.iswishlistpageVisible()).toBe(true);
  52 | 
  53 | await wishlistPage.additemtoAddtocart(); //adding item to AddtoCart
  54 | await wishlistPage.Removeitemfromwishlist(); //removing item from wishlist
  55 | 
  56 | //validate confirmation message after adding item to addtoCart
  57 | 
  58 | expect (await wishlistPage.iscnfmsgVisibleafteraddtotheCart()).toBe(true);
  59 | await wishlistPage.clickoncontinuebtn();
  60 | 
  61 | }
  62 | 
  63 | )
```