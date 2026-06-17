import { Locator, Page } from "@playwright/test";

export class registerpage {
    private readonly page: Page;
    private readonly FirstName: Locator;
    private readonly LastName: Locator;
    private readonly Email: Locator;
    private readonly Telephone: Locator;
    private readonly Password: Locator;
    private readonly confirmPassword: Locator;
    private readonly privacypolicy: Locator;
    private readonly continuebtn: Locator;
    private readonly confrmmsg:Locator;
    private readonly btncontinue:Locator;

    constructor(page: Page) {
        this.page = page;
        this.FirstName = this.page.getByLabel('First Name');
        this.LastName = this.page.getByLabel('Last Name');
        this.Email = this.page.getByLabel('E-Mail');
        this.Telephone = this.page.getByLabel('Telephone');
        this.Password = this.page.locator('#input-password');
        this.confirmPassword = this.page.locator('#input-confirm')
        this.privacypolicy = this.page.getByRole('checkbox');
        this.continuebtn = this.page.locator('input[type="submit"]');
        this.confrmmsg=this.page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.btncontinue=this.page.getByRole('link', { name: 'Continue' });
    }

//Action Methods

//1.enter FirstName
async setFirstName(FirstName:string){
    await this.FirstName.fill(FirstName);
}
//2.enter Last Name
async setLastName(LastName:string){
    await this.LastName.fill(LastName);
}
//3.enter email address
async setemail(emailaddress:string)
{
await this.Email.fill(emailaddress);
} 

//4.enter Telephone
async setTelephone(Telephone:string)
{
await this.Telephone.fill(Telephone);
} 

//5.enter password
async setpassword(password:string)
{
await this.Password.fill(password);
} 

//6.enter confirm password
async setconfirmpassword(password:string)
{
await this.confirmPassword.fill(password);
} 

//7.click the privacy checkbox
async clickprivacycheckbox(){
    await this.privacypolicy.check();
}

//8.click continue button

async clickonContinueButton(){
    await this.continuebtn.click();
}

//9. click continue after registration
async clickContinueButton(){
    await this.btncontinue.click();
}

//perform complete registration
async performRegistration(FirstName:string,LastName:string,emailaddress:string,Telephone:string,password:string)
{
await this.setFirstName(FirstName);
await this.setLastName(LastName);
await this.setemail(emailaddress);
await this.setTelephone(Telephone);
await this.setpassword(password);
await this.setconfirmpassword(password);
await this.clickprivacycheckbox();
await this.clickonContinueButton();
await this.clickContinueButton();
}

//10.verify confirmation message
async confirmationmsg(){
    return await this.confrmmsg.textContent()??'';
}

}
