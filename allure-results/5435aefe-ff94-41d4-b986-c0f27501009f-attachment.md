# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logindatadrivenfromjson.spec.ts >> Login Test with JSON Data: Invalid email login
- Location: tests/logindatadrivenfromjson.spec.ts:32:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Warning: No match"
Received string:    "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { homepage } from "../pages/homepage.ts";
  3  | import { testconfig } from "../test.config.ts";
  4  | import { loginpage } from "../pages/loginpage.ts";
  5  | import { myaccountpage } from "../pages/myaccountpage.ts";
  6  | import { dataprovider } from "../utils/dataprovider.ts";
  7  | 
  8  | let config: testconfig;
  9  | let homePage: homepage;
  10 | let loginPage: loginpage;
  11 | let myaccountPage: myaccountpage;
  12 | 
  13 | test.beforeEach(async ({ page }) => {
  14 |     config = new testconfig();
  15 |     await page.goto(config.appurl);
  16 |     homePage = new homepage(page);
  17 |     loginPage = new loginpage(page);
  18 |     myaccountPage = new myaccountpage(page);
  19 | });
  20 | 
  21 | test.afterEach(async ({ page }) => {
  22 |     await page.waitForTimeout(3000);
  23 |     await page.close();
  24 | });
  25 | 
  26 | //Load JSON testdata logindata.json
  27 | 
  28 | const jsonpath = "testdata/login.json file";
  29 | const jsontestdata = dataprovider.gettestdatafromjson(jsonpath);
  30 | 
  31 | for (const data of jsontestdata) {
  32 |     test(`Login Test with JSON Data: ${data.testName}`, async ({ page }) => {
  33 | 
  34 |         await homePage.clickMyAccount();
  35 |         await homePage.clickLoginLink();
  36 |         await loginPage.performLogin(data.email, data.password);
  37 | 
  38 |         if (data.expected.toLowerCase() === 'success') {
  39 |             const MyaccountPage = await myaccountPage.ismyaccountpageexist();
  40 |             expect(MyaccountPage).toBe(true);
  41 | 
  42 |         }
  43 |         else {
  44 |             const errormessage = await loginPage.Errormsg();
> 45 |             expect(errormessage).toContain('Warning: No match');
     |                                  ^ Error: expect(received).toContain(expected) // indexOf
  46 |         }
  47 | 
  48 |     })
  49 | };
  50 | 
```