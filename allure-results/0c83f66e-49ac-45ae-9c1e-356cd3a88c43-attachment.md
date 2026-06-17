# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> verifying wishlist feature
- Location: tests/wishlist.spec.ts:28:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Target page, context or browser has been closed
Call log:
  - waiting for locator('h2:has-text("My Wish List")')

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { myaccountpage } from "../pages/myaccountpage";
  3  | 
  4  | export class wishlistpage {
  5  |     private readonly page: Page;
  6  |     private readonly wishlistcartheader: Locator;
  7  |     private readonly addtoCartbtn:Locator;
  8  |     private readonly removebtn:Locator;
  9  |     private readonly Continuebtn:Locator;
  10 |     private readonly alertmsg:Locator;
  11 |    
  12 |     constructor(page:Page){
  13 |         this.page=page;
  14 |         this.wishlistcartheader=this.page.locator('h2:has-text("My Wish List")');
  15 |         this.addtoCartbtn=this.page.locator("button[data-original-title='Add to Cart']");
  16 |         this.removebtn=this.page.locator("a[data-original-title='Remove']");
  17 |         this.Continuebtn=this.page.getByText('Continue');
  18 |         this.alertmsg=this.page.getByText("Success");
  19 |     }
  20 | 
  21 | //Action methods
  22 | //check shopping cart page is visible
  23 | async iswishlistpageVisible() {
  24 |         try {
> 25 |             const headerText = await this.wishlistcartheader.textContent();
     |                                                              ^ Error: locator.textContent: Target page, context or browser has been closed
  26 |             return headerText?.includes('My Wish List');
  27 |         } catch (error) {
  28 |           console.log(`exception occured while showing Wishlist page:${error}`);
  29 |             throw error;
  30 |         }
  31 |         return false;
  32 |     }
  33 | 
  34 | //remove the item from the wishlist
  35 | 
  36 | async Removeitemfromwishlist() {
  37 |         try {
  38 |             await this.removebtn.click();
  39 |         }
  40 |         catch (error) {
  41 |             console.log(`exception occured while clicking 'remove item button':${error}`);
  42 |             throw error;
  43 |         }
  44 |     }
  45 | 
  46 | //add item to Add to Cart from wishlist
  47 | 
  48 | async additemtoAddtocart(){
  49 |     await this.addtoCartbtn.click();
  50 | }
  51 | 
  52 | //validate successful message after add product to cart from wishlist
  53 | async iscnfmsgVisibleafteraddtotheCart() {
  54 |         try {
  55 |             if(this.alertmsg!=null){
  56 |                  return true;
  57 |             }
  58 |             else{
  59 |                 return false;
  60 |             }
  61 |            
  62 |         } catch (error) {
  63 |             console.log(`Confirmation message not found: ${error}`);
  64 |             return false;
  65 |         }
  66 |     }
  67 | //click continue button
  68 | async clickoncontinuebtn(){
  69 |     await this.Continuebtn.click();
  70 |     return new myaccountpage(this.page);
  71 | }
  72 | 
  73 | 
  74 | 
  75 | }
```