const { test, expect } = require('@playwright/test');
test('Framework', async function ({ page }) {
    await page.goto("https://rahulshettyacademy.com/client/");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productname = 'zara coat 3';
    const cart = page.locator("[routerlink='/dashboard/cart']");
    const checkout = page.locator("text=Checkout");
    const CreditCard = page.locator("div.payment__type").first();
    const creditcard = page.locator(".form__cc .text-validated");
    const CVV = page.locator(".input.txt").nth(1);
    const NameonCard = page.locator(".input.txt").nth(2);
    const month = page.locator("select.input.ddl").first();
    const Date = page.locator("select.input.ddl").last();
    const dropdown = page.locator(".ta-results");
    const mail = "boxer621993@gmail.com";
    const placeorder = page.locator("text=Place Order ");
    const thankyou = " Thankyou for the order. ";
    const orderhistory = page.locator("label[routerlink='/dashboard/myorders']");
    const AllOrderID = page.locator("th[scope='row']");
    const Row = page.locator("tbody tr");


    // entering email 
    await userName.type("boxer621993@gmail.com");

    // entering password   
    await password.type("Pass@123");

    // clicking log in button    
    await signIn.click();

    // waiting all APIs call have been made   
    await page.locator("div.card-body").first().waitFor();

    // getting titles of all cards  
    const titles = await cardTitles.allTextContents();

    console.log(titles)

    // getting the count of products   
    const productcount = await products.count();

    console.log(productcount);

    //iterating over products
    for (let i = 0; i < productcount; ++i) {
        //console.log(await products.nth(i).locator("b").textContent());
        if (await products.nth(i).locator("b").textContent() === productname) {
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    //clicking on the cart button on the top of the page
    await cart.click();

    //waiting for page to load data on UI
    await page.locator("div li").first().waitFor();

    //validating that the product is on the cart page
    const boolvalue = await page.locator("h3:has-text('zara coat 3')").isVisible();
    console.log(boolvalue);
    await expect(boolvalue).toBeTruthy();
    //is visible return boolean value

    //Click on the checkout button
    await checkout.click();

    // Clicking on the Credit Card button    
    await CreditCard.click();

    //Clearing the inputs for the Credit card    
    await creditcard.fill(" ");


    //Entering the value of credit card
    await creditcard.fill("378282246310005");

    //Selecting the month from the dropdown
    await month.selectOption("04");

    //Selecting the Date from the dropdown
    await Date.selectOption("14");

    //Entering CVV Number
    await CVV.fill("123");

    //Entering the value of Name on Card
    await NameonCard.fill("Demo");

    //selecting country from dynamic dropdown
    await page.locator("[placeholder='Select Country']").type("ind", { delay: 100 });

    await dropdown.waitFor();

    // getting the count of dropdown results  
    const resultcount = await dropdown.locator("button").count();
    console.log(resultcount);

    for (let j = 0; j < resultcount; ++j) {
        if (await dropdown.locator("button").nth(j).textContent() === " India") {
            await dropdown.locator("button").nth(j).click();
            break;
        }
    }

    //validate the login email is mentioned on the checkout page
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(mail);

    //CLicking on place order button 
    await placeorder.click();

    //verify the order is placed 
    await expect(page.locator(".hero-primary")).toHaveText(thankyou);

    //fetching order id
    const orderid = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderid);

    await orderhistory.click();

    // waiting all APIs call have been made   
    await page.locator("tbody tr th").first().waitFor();

    // getting titles of all cards  
    const OrderID = await Row.locator("th").allTextContents();

    console.log(OrderID);

    // getting the first table row
    await Row.locator('th').first().waitFor();

    //Count of all the table row in a tbody 
    const rowCount = await Row.count();
    console.log(rowCount);

    //iterating over products
    for (let k = 0; k < rowCount; ++k) {
       
        const rowID = await Row.nth(k).locator("th").textContent();

        if(orderid.includes(rowID))
        {
            await Row.nth(k).locator("button").first().click();
        }
    }

    //Assertion the OrderID
    const newOrder = await page.locator(".col-text").textContent();
    expect(orderid.includes(newOrder)).toBeTruthy();

await page.pause();


});