import { test, expect } from "@playwright/test";
import { homepage } from "../pages/homepage";
import { searchresultspage } from "../pages/searchresultspage";
import { productpage } from "../pages/productpage";
import { wishlistpage } from "../pages/wishlistpage";
import { testconfig } from "../test.config";
import { loginpage } from "../pages/loginpage.ts";
import { myaccountpage } from "../pages/myaccountpage.ts";


let config: testconfig;
let homePage: homepage;
let searchresultsPage: searchresultspage;
let productPage: productpage;
let wishlistPage: wishlistpage;
let loginPage: loginpage;
let myaccountPage: myaccountpage;

test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    searchresultsPage = new searchresultspage(page);
    productPage = new productpage(page);
    wishlistPage = new wishlistpage(page);
    loginPage = new loginpage(page);
    myaccountPage = new myaccountpage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("verifying wishlist feature", async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLoginLink();
    await loginPage.performLogin(config.email, config.password);

    const MyaccountPage = await myaccountPage.ismyaccountpageexist();
    expect(MyaccountPage).toBe(true);

    await homePage.enterProductname(config.Productname);
    await homePage.clickSearchbutton();

    //Verify that the search results page is displayed
    const searchResultspage = await searchresultsPage.issearchresultspageexists();
    expect(searchResultspage).toBe(true);

    //Select a product from the search results by its name
    await searchresultsPage.selectProduct(config.Productname);


    //add product to wishlist and validate the confirmation message

    await productPage.producttoWishlist();
    expect(await productPage.ismsgVisibleafteraddedtoWishlist()).toBe(true);
    await page.waitForTimeout(5000);
    console.log("product added to wishlist");

    await productPage.clickonwishlistlink();

    //click wishlist button for verifying and adding the item to Add to Cart and remove the item from wishlist

    expect(await wishlistPage.iswishlistpageVisible()).toBe(true);

    await wishlistPage.additemtoAddtocart(); //adding item to AddtoCart
    await wishlistPage.Removeitemfromwishlist(); //removing item from wishlist

    //validate confirmation message after adding item to addtoCart

    expect(await wishlistPage.iscnfmsgVisibleafteraddtotheCart()).toBe(true);
    await wishlistPage.clickoncontinuebtn();

}

)