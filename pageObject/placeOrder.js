class placeOrder {
    constructor(page) {
        this.page = page;
        this.CreditCard = page.locator("div.payment__type").first();
        this.creditcard = page.locator(".form__cc .text-validated");
        this.CVV = page.locator(".input.txt").nth(1);
        this.NameonCard = page.locator(".input.txt").nth(2);
        this.month = page.locator("select.input.ddl").first();
        this.Date = page.locator("select.input.ddl").last();
        this.dropdown = page.locator(".ta-results");
        this.mail = "aryasumit149@gmail.com";
        this.placeorder = page.locator("text=Place Order ");
        this.thankyou = " Thankyou for the order. ";
    }

    async placeOrder(creditcard, month, Date, CVV, NameonCard, mail, thankyou, expect) {
        // Clicking on the Credit Card button    
        await this.CreditCard.click();

        //Clearing the inputs for the Credit card    
        await this.creditcard.fill(" ");


        //Entering the value of credit card
        await this.creditcard.fill("378282246310005");

        //Selecting the month from the dropdown
        await this.month.selectOption("04");

        //Selecting the Date from the dropdown
        await this.Date.selectOption("14");

        //Entering CVV Number
        await this.CVV.fill("123");

        //Entering the value of Name on Card
        await this.NameonCard.fill("Demo");

        //selecting country from dynamic dropdown
        await this.page.locator("[placeholder='Select Country']").type("ind", { delay: 100 });

        await this.dropdown.waitFor();

        // getting the count of dropdown results  
        const resultcount = await this.dropdown.locator("button").count();
        console.log(resultcount);

        for (let j = 0; j < resultcount; ++j) {
            if (await this.dropdown.locator("button").nth(j).textContent() === " India") {
                await this.dropdown.locator("button").nth(j).click();
                break;
            }
        }

        //validate the login email is mentioned on the checkout page
        await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(this.mail);

        //CLicking on place order button 
        await this.placeorder.click();

        //verify the order is placed 
        await expect(this.page.locator(".hero-primary")).toHaveText(this.thankyou);

    }


}
module.exports = { placeOrder };