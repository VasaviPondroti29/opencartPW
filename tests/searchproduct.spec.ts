
import {test,expect} from "@playwright/test";
import { homepage } from "../pages/homepage";
import { searchresultspage } from "../pages/searchresultspage";
import {testconfig} from "../test.config";

export let config: testconfig;
export let homePage: homepage;
export let searchresultsPage: searchresultspage;


test.beforeEach(async ({ page }) => {
    config = new testconfig();
    await page.goto(config.appurl);
    homePage = new homepage(page);
    searchresultsPage = new searchresultspage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test("verify searching the product",async({page})=>{
await homePage.enterProductname(config.Productname);
await homePage.clickSearchbutton();

//Verify that the search results page is displayed
const searchResultspage=await searchresultsPage.issearchresultspageexists();
expect(searchResultspage).toBe(true);

//Validate, searched product appears in results
const searchedproduct=await searchresultsPage.isProductexist(config.Productname);
expect (searchedproduct).toBe(true);




})