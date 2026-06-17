# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountregistration.spec.ts >> user registration test
- Location: tests/accountregistration.spec.ts:23:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_TIMED_OUT at https://tutorialsninja.com/demo/
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { homepage } from "../pages/homepage";
  3  | import { registerpage } from "../pages/registerpage"
  4  | import { testconfig } from "../test.config.ts";
  5  | import { randomDataUtil } from "../utils/randomdatagenerator";
  6  | 
  7  | let config: testconfig;
  8  | let homePage: homepage;
  9  | let Registerpage: registerpage;
  10 | 
  11 | test.beforeEach(async ({ page }) => {
  12 |     config = new testconfig();
> 13 |     await page.goto(config.appurl);
     |                ^ Error: page.goto: net::ERR_TIMED_OUT at https://tutorialsninja.com/demo/
  14 |     homePage = new homepage(page);
  15 |     Registerpage = new registerpage(page);
  16 | });
  17 | 
  18 | test.afterEach(async ({ page }) => {
  19 |     await page.waitForTimeout(3000);
  20 |     await page.close();
  21 | });
  22 | 
  23 | test("user registration test", async ({ page }) => {
  24 |     await expect(page).toHaveURL("https://tutorialsninja.com/demo/");
  25 |     await homePage.isHomepageexist();
  26 |     await homePage.clickMyAccount();
  27 |     await homePage.clickRegisterLink();
  28 |     
  29 |     await Registerpage.setFirstName(randomDataUtil.getfirstName());
  30 |     await Registerpage.setLastName(randomDataUtil.getlastName());
  31 |     await Registerpage.setemail(randomDataUtil.getemail());
  32 |     await Registerpage.setTelephone(randomDataUtil.getphonenumber());
  33 |     const Password=randomDataUtil.getpassword();
  34 |     await Registerpage.setpassword(Password);
  35 |     await Registerpage.setconfirmpassword(Password);
  36 |     await Registerpage.clickprivacycheckbox();
  37 |     await Registerpage.clickonContinueButton();
  38 |     
  39 |     //validate confirmation message
  40 |     const confirmationmessage=await Registerpage.confirmationmsg();
  41 |     expect (confirmationmessage).toContain("Your Account Has Been Created!");
  42 | 
  43 |     Registerpage.clickContinueButton();
  44 | 
  45 | })
```