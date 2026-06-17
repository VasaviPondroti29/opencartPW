# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: end2endtest.spec.ts >> performing E2E test @end-to-end
- Location: tests/end2endtest.spec.ts:131:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "$369.60"
Received: null
```

# Test source

```ts
  17  | let Registerpage: registerpage;
  18  | let loginPage: loginpage;
  19  | let myaccountPage: myaccountpage;
  20  | let logoutPage: logoutpage;
  21  | let searchresultsPage: searchresultspage;
  22  | let productPage: productpage;
  23  | let shoppingcartPage: shoppingcartpage;
  24  | let checkoutPage: checkoutpage;
  25  | 
  26  | test.beforeEach(async ({ page }) => {
  27  |     config = new testconfig();
  28  |     await page.goto(config.appurl);
  29  |     homePage = new homepage(page);
  30  |     Registerpage = new registerpage(page);
  31  |     loginPage = new loginpage(page);
  32  |     myaccountPage = new myaccountpage(page);
  33  |     logoutPage = new logoutpage(page);
  34  |     searchresultsPage = new searchresultspage(page);
  35  |     productPage = new productpage(page);
  36  |     shoppingcartPage = new shoppingcartpage(page);
  37  |     checkoutPage = new checkoutpage(page);
  38  | });
  39  | 
  40  | test.afterEach(async ({ page }) => {
  41  |     await page.waitForTimeout(3000);
  42  |     await page.close();
  43  | });
  44  | 
  45  | //1. Function to account registration
  46  | async function performRegistration(page: Page) {
  47  |     await homePage.isHomepageexist();
  48  |     await homePage.clickMyAccount();
  49  |     await homePage.clickRegisterLink();
  50  |     await Registerpage.setFirstName(randomDataUtil.getfirstName());
  51  |     await Registerpage.setLastName(randomDataUtil.getlastName());
  52  |     const email = randomDataUtil.getemail();
  53  |     await Registerpage.setemail(randomDataUtil.getemail());
  54  |     await Registerpage.setTelephone(randomDataUtil.getphonenumber());
  55  |   
  56  |     await Registerpage.setpassword('test@123');
  57  |     await Registerpage.setconfirmpassword("test@123");
  58  |     await Registerpage.clickprivacycheckbox();
  59  |     await Registerpage.clickonContinueButton();
  60  | 
  61  |     //validate confirmation message
  62  |     const confirmationmessage = await Registerpage.confirmationmsg();
  63  |     expect(confirmationmessage).toContain("Your Account Has Been Created!");
  64  |     return email; // Return the email for later use in login
  65  | }
  66  | 
  67  | //2.function to log out from the current user
  68  | async function performLogout(page: Page) {
  69  |     const LogoutPage = await myaccountPage.clickonLogoutlink();
  70  |     expect(await logoutPage.isLogoutpageexist()).toBe(true);
  71  |     expect(await logoutPage.iscontionuebtnexists()).toBe(true);
  72  |     await logoutPage.clickoncontinuebutton();
  73  |     expect(await homePage.isHomepageexist()).toBe(true);
  74  | 
  75  | }
  76  | 
  77  | //3.Function to log in by using the registered email
  78  | 
  79  | async function performLogin(page: Page, email: string) {
  80  |     await homePage.clickMyAccount();
  81  |     await homePage.clickLoginLink();
  82  |     await loginPage.performLogin(email, 'test@123');
  83  | 
  84  |     //const MyaccountPage = await myaccountPage.ismyaccountpageexist();
  85  |     //expect(MyaccountPage).toBe(true);
  86  | 
  87  | }
  88  | 
  89  | //4.function to search for a product and add it to cart
  90  | async function addProductToCart(page: Page) {
  91  |     await homePage.enterProductname(config.Productname);
  92  |     await homePage.clickSearchbutton();
  93  | 
  94  |     //Verify that the search results page is displayed
  95  |     const searchResultspage = await searchresultsPage.issearchresultspageexists();
  96  |     expect(searchResultspage).toBe(true);
  97  | 
  98  |     //Validate, searched product appears in results
  99  |     const searchedproduct = await searchresultsPage.isProductexist(config.Productname);
  100 |     expect(searchedproduct).toBe(true);
  101 | 
  102 |     if (await searchresultsPage.isProductexist(config.Productname)) {
  103 |         await searchresultsPage.selectProduct(config.Productname);
  104 |         await productPage.enterQuantity(config.ProductQuantity);
  105 |         await productPage.clickAddtoCart();
  106 |     }
  107 |     const isvisible = await productPage.isconfirmationmsgVisible();
  108 |     expect(isvisible).toBeTruthy();
  109 | }
  110 | 
  111 | //Function to verify the shopping cart details
  112 | async function verifyshoppingcart(page: Page) {
  113 |     await productPage.clickshoppingCart();
  114 |     expect(await shoppingcartPage.isShoppingcartpageVisible()).toBe(true);
  115 |     
  116 |     // Validate that total price is correct (based on config)
> 117 |     expect(await shoppingcartPage.Totalprice()).toBe(config.TotalPrice);
      |                                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  118 |     console.log("Shopping cart verification completed!");
  119 | 
  120 |     expect(await shoppingcartPage.clickCheckoutCart()).toBe(true);
  121 | 
  122 |     
  123 | }
  124 | 
  125 | //Function to perform checkout (disabled for demo site)
  126 | async function performCheckout(page: Page) {
  127 |     // Checkout feature is not implemented since it's a demo site.
  128 | 
  129 | };
  130 | 
  131 | test("performing E2E test @end-to-end", async ({ page }) => {
  132 | 
  133 |     const registeredmail=await performRegistration(page);
  134 |     console.log("Registration is completed!");
  135 | 
  136 |     await performLogout(page);
  137 |     console.log(" Logout is completed!");
  138 | 
  139 |     await performLogin(page,registeredmail);
  140 |     console.log(" Login is completed!");
  141 | 
  142 |     await addProductToCart(page);
  143 |     console.log("Product added to cart!");
  144 | 
  145 |     await verifyshoppingcart(page);
  146 |     console.log("Shopping cart verification completed!");
  147 | 
  148 | 
  149 | 
  150 | 
  151 | });
```