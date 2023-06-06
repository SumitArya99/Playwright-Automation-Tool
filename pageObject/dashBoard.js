class dashBoard {
    constructor(page) {
        this.page = page;
        this.cardTitles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink='/dashboard/cart']");
        this.checkout = page.locator("text=Checkout");
        this.productname = 'zara coat 3';
    }

    async dashBoard(productname, expect) {
        // waiting all APIs call have been made   
        await this.page.locator("div.card-body").first().waitFor();

        // getting titles of all cards  
        const titles = await this.cardTitles.allTextContents();
        console.log(titles);

        // getting the count of products   
        const productcount = await this.products.count();
        console.log(productcount);

        //iterating over products
        for (let i = 0; i < productcount; ++i) {
            //console.log(await products.nth(i).locator("b").textContent());
            if (await this.products.nth(i).locator("b").textContent() === this.productname) {
                //add product to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }

        }

        //clicking on the cart button on the top of the page
        await this.page.waitForTimeout(3000);
        await this.cart.click();

        //waiting for page to load data on UI
        await this.page.locator("div li").first().waitFor();

        //validating that the product is on the cart page
        const boolvalue = await this.page.locator("h3:has-text('zara coat 3')").isVisible();
        console.log(boolvalue);
        await expect(boolvalue).toBeTruthy();

        //Click on the checkout button
        await this.checkout.click();
    }
}

module.exports = { dashBoard };