
import { test, expect, Page } from "@playwright/test";
import { homepage } from "../pages/homepage";
import { registerpage } from "../pages/registerpage"
import { testconfig } from "../test.config.ts";
import { randomDataUtil } from "../utils/randomdatagenerator";
import { loginpage } from "../pages/loginpage.ts";
import { myaccountpage } from "../pages/myaccountpage.ts";
import { logoutpage } from "../pages/logoutpage";
import { searchresultspage } from "../pages/searchresultspage";
import { productpage } from "../pages/productpage.ts";
import { shoppingcartpage } from "../pages/shoppingcartpage.ts";
import { checkoutpage } from "../pages/checkoutpage.ts";

let config: testconfig;
let homePage: homepage;
let Registerpage: registerpage;
let loginPage: loginpage;
let myaccountPage: myaccountpage;
let logoutPage: logoutpage;
let searchresultsPage: searchresultspage;
let productPage: productpage;
let shoppingcartPage: shoppingcartpage;
let checkoutPage: checkoutpage;

test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    Registerpage = new registerpage(page);
    loginPage = new loginpage(page);
    myaccountPage = new myaccountpage(page);
    logoutPage = new logoutpage(page);
    searchresultsPage = new searchresultspage(page);
    productPage = new productpage(page);
    shoppingcartPage = new shoppingcartpage(page);
    checkoutPage = new checkoutpage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

//1. Function to account registration
async function performRegistration(page: Page) {
    await homePage.isHomepageexist();
    await homePage.clickMyAccount();
    await homePage.clickRegisterLink();
    await Registerpage.setFirstName(randomDataUtil.getfirstName());
    await Registerpage.setLastName(randomDataUtil.getlastName());
    const email = randomDataUtil.getemail();
    await Registerpage.setemail(randomDataUtil.getemail());
    await Registerpage.setTelephone(randomDataUtil.getphonenumber());
  
    await Registerpage.setpassword('test@123');
    await Registerpage.setconfirmpassword("test@123");
    await Registerpage.clickprivacycheckbox();
    await Registerpage.clickonContinueButton();

    //validate confirmation message
    const confirmationmessage = await Registerpage.confirmationmsg();
    expect(confirmationmessage).toContain("Your Account Has Been Created!");
    return email; // Return the email for later use in login
}

//2.function to log out from the current user
async function performLogout(page: Page) {
    const LogoutPage = await myaccountPage.clickonLogoutlink();
    expect(await logoutPage.isLogoutpageexist()).toBe(true);
    expect(await logoutPage.iscontionuebtnexists()).toBe(true);
    await logoutPage.clickoncontinuebutton();
    expect(await homePage.isHomepageexist()).toBe(true);

}

//3.Function to log in by using the registered email

async function performLogin(page: Page, email: string) {
    await homePage.clickMyAccount();
    await homePage.clickLoginLink();
    await loginPage.performLogin(email, 'test@123');

    //const MyaccountPage = await myaccountPage.ismyaccountpageexist();
    //expect(MyaccountPage).toBe(true);

}

//4.function to search for a product and add it to cart
async function addProductToCart(page: Page) {
    await homePage.enterProductname(config.Productname);
    await homePage.clickSearchbutton();

    //Verify that the search results page is displayed
    const searchResultspage = await searchresultsPage.issearchresultspageexists();
    expect(searchResultspage).toBe(true);

    //Validate, searched product appears in results
    const searchedproduct = await searchresultsPage.isProductexist(config.Productname);
    expect(searchedproduct).toBe(true);

    if (await searchresultsPage.isProductexist(config.Productname)) {
        await searchresultsPage.selectProduct(config.Productname);
        await productPage.enterQuantity(config.ProductQuantity);
        await productPage.clickAddtoCart();
        
    }
    const isvisible = await productPage.isconfirmationmsgVisible();
    expect(isvisible).toBeTruthy();
    await page.waitForTimeout(5000);
}

//Function to verify the shopping cart details
async function verifyshoppingcart(page: Page) {
    await productPage.clickshoppingCart();
    expect(await shoppingcartPage.isShoppingcartpageVisible()).toBe(true);

    // Validate that total price is correct (based on config)
    expect(await shoppingcartPage.Totalprice()).toBe(config.TotalPrice);

    //update the cart item

    await shoppingcartPage.Updateitemsincart('4');

    //validate successful message after update the cart
    expect (await shoppingcartPage.isconfirmationmsgVisibleafterUpdatetheCart()).toBe(true);

    // Validate that total price after modification
    expect(await shoppingcartPage.Totalprice()).toBe('$492.80');

    console.log("Shopping cart verification completed!");

    expect(await shoppingcartPage.clickCheckoutCart()).toBeUndefined(); 
    //since this is a demo application, checkout feature is not allowed

    
}

//Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.

};

test("performing E2E test @end-to-end", async ({ page }) => {

    const registeredmail=await performRegistration(page);
    console.log("Registration is completed!");

    await performLogout(page);
    console.log(" Logout is completed!");

    await performLogin(page,registeredmail);
    console.log(" Login is completed!");

    await addProductToCart(page);
    console.log("Product added to cart!");

    await verifyshoppingcart(page);
    console.log("Shopping cart verification completed!");




});