# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wishlist.spec.ts >> verifying wishlist feature
- Location: tests/wishlist.spec.ts:28:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('button[data-original-title=\'Add to Wish List\']') resolved to 2 elements:
    1) <button title="" type="button" data-toggle="tooltip" class="btn btn-default" onclick="wishlist.add('40');" data-original-title="Add to Wish List">…</button> aka getByRole('button').nth(3)
    2) <button title="" type="button" data-toggle="tooltip" onclick="wishlist.add('42');" data-original-title="Add to Wish List">…</button> aka getByRole('button').filter({ hasText: /^$/ }).nth(3)

Call log:
  - waiting for locator('button[data-original-title=\'Add to Wish List\']')

```

# Test source

```ts
  1   | import { Locator, Page } from "@playwright/test";
  2   | 
  3   | 
  4   | import {shoppingcartpage} from "../pages/shoppingcartpage";
  5   | import { wishlistpage } from "../pages/wishlistpage";
  6   | 
  7   | export class productpage {
  8   |     private readonly page: Page;
  9   |     private readonly quantity: Locator;
  10  |     private readonly wishlistbtn:Locator;
  11  |     private readonly wishlstitemmsg:Locator;
  12  |     private readonly wishlistlink:Locator;
  13  |     private readonly addtocartbtn: Locator;
  14  |     private readonly alertmsg: Locator;
  15  |     private readonly shoppingcartlink: Locator;
  16  | 
  17  |     constructor(page: Page) {
  18  |         this.page = page;
  19  |         this.wishlistbtn=this.page.locator("button[data-original-title='Add to Wish List']");
  20  |         this.wishlstitemmsg=this.page.getByText("Success");
  21  |         this.wishlistlink=this.page.locator("span:has-text('Wish List')");
  22  |         this.quantity = this.page.getByRole('textbox', { name: 'Qty' });
  23  |         this.addtocartbtn = this.page.locator("#button-cart");
  24  |         this.alertmsg = this.page.locator(".alert.alert-success.alert-dismissible");
  25  |         this.shoppingcartlink = this.page.locator('span:has-text("Shopping Cart")');
  26  |     }
  27  | 
  28  | //action methods
  29  | 
  30  | // add the product to wishlist
  31  | 
  32  | async producttoWishlist(){
> 33  |     await this.wishlistbtn.click();
      |                            ^ Error: locator.click: Error: strict mode violation: locator('button[data-original-title=\'Add to Wish List\']') resolved to 2 elements:
  34  | }
  35  | 
  36  | //verify alert message after product added to Wishlist
  37  | async ismsgVisibleafteraddedtoWishlist() {
  38  |         try {
  39  |             if(this.wishlstitemmsg!=null){
  40  |                  return true;
  41  |             }
  42  |             else{
  43  |                 return false;
  44  |             }//await expect(this.cnfMsg).toBeVisible();
  45  |            
  46  |         } catch (error) {
  47  |             console.log(`Confirmation message not found: ${error}`);
  48  |             return false;
  49  |         }
  50  |     }
  51  | 
  52  |  //click Wishlist link to view the products in wishlist
  53  |     async clickonwishlistlink() {
  54  |         try {
  55  |             await this.wishlistlink.click();
  56  |             return new wishlistpage(this.page);
  57  |         }
  58  |         catch (error) {
  59  |             console.log(`exception occured while clicking 'Wishlist cart':${error}`);
  60  |             throw error;
  61  |         }
  62  |     }
  63  | 
  64  | 
  65  | //enter the quantity
  66  | async enterQuantity(ProductQuantity:string){
  67  |     await this.quantity.fill('');
  68  |     await this.quantity.fill(ProductQuantity);
  69  | }
  70  | 
  71  | //click Addtocart button
  72  | 
  73  | async clickAddtoCart(){
  74  |     this.addtocartbtn.click();
  75  | }
  76  | 
  77  | //verify alert message after product added to add to cart
  78  | async isconfirmationmsgVisible() {
  79  |         try {
  80  |             if(this.alertmsg!=null){
  81  |                  return true;
  82  |             }
  83  |             else{
  84  |                 return false;
  85  |             }//await expect(this.cnfMsg).toBeVisible();
  86  |            
  87  |         } catch (error) {
  88  |             console.log(`Confirmation message not found: ${error}`);
  89  |             return false;
  90  |         }
  91  |     }
  92  | 
  93  |     //click Shopping Cart to view the products in cart
  94  |     async clickshoppingCart() {
  95  |         try {
  96  |             await this.shoppingcartlink.click();
  97  |             return new shoppingcartpage(this.page);
  98  |         }
  99  |         catch (error) {
  100 |             console.log(`exception occured while clicking 'Shopping Cart':${error}`);
  101 |             throw error;
  102 |         }
  103 |     }
  104 | 
  105 | //complete workflow for add product to cart
  106 | async addProductToCart(ProductQuantity: string): Promise<void> {
  107 |         await this.enterQuantity(ProductQuantity);
  108 |         await this.clickAddtoCart();
  109 |         await this.isconfirmationmsgVisible();
  110 |     }
  111 | 
  112 | 
  113 | 
  114 | 
  115 | 
  116 | 
  117 | 
  118 | }
```