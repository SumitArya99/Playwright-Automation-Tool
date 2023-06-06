const { test, expect } = require('@playwright/test');

let content;

//Creating a beforeAll method 
test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/client/");

    //Creating Variable for Element Locator
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    //Enter UserName
    await username.type("aryasumit149@gmail.com");

    //Enter Password
    await password.type("Sumitarya99@");

    //Click Login
    await login.click();

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //Storage state of context level
    //Storage state of information ia always on the context level not the page level.
    await context.storageState({ path: 'state.json' });

    //Invoking a new context while making a use of state.json file
    content = await browser.newContext({ storageState: 'state.json' });

});

test('Click on Add to Cart and Check Product in Cart', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    const cardtitle = page.locator(".card-body b");

    const products = page.locator(".card-body");

    const prdouctName = 'zara coat 3';

    const cartButton = page.locator("[routerlink='/dashboard/cart']");

    //Getting the Text of all the Products
    const alltitle = await cardtitle.allTextContents();
    console.log(alltitle);

    //Getting the Count of the Product
    const productCount = await products.count();
    console.log(productCount);

    // //Iterating Over the Product
    for (let i = 0; i < productCount; i++) {
        if (await products.nth(i).locator("b").textContent() === prdouctName) {
            //Click on Add to Cart Button
            await products.nth(i).locator("text= Add To Cart").click();
        }
    }

    //Clicking on cart Button on the top of the page
    await cartButton.click();

    await page.locator("div li").first().waitFor();

    //Validating that the product is on the cart page ------(isVisible return Boolean Value)
    const boolValue = await page.locator("h3:has-text('zara coat 3')").isVisible();
    console.log(boolValue);

});

test('Click on Checkout Button', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    const cartButton = page.locator("[routerlink='/dashboard/cart']");

    //Clicking on cart Button on the top of the page
    await cartButton.click();

    const checkOutButton = page.locator("text=Checkout");

    //Clicking on the Chekout Button
    await checkOutButton.click();
});

test('Fill the Details and click on place order', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    const cartButton = page.locator("[routerlink='/dashboard/cart']");

    //Clicking on cart Button on the top of the page
    await cartButton.click();

    const checkOutButton = page.locator("text=Checkout");

    //Clicking on the Chekout Button
    await checkOutButton.click();

    const creditCardNumber = page.locator("input[type='text']").nth(0);

    const month = page.locator("select.input").first();

    const date = page.locator("select.input").last();

    const cvv = page.locator(".input.txt").nth(1);

    const nameCard = page.locator(".input.txt").nth(2);

    const dropdown = page.locator(".ta-results");

    const placeorder = page.locator("text=Place Order ");

    const mail = "aryasumit149@gmail.com";

    //Enter Credit Card Number
    await creditCardNumber.fill("487963214");

    //Select Month from the Dropdown
    await month.selectOption("04");

    //Select Date from the Dropdown
    await date.selectOption("15");

    //Enter CVV Number
    await cvv.fill("458");

    //Enter Name on Card
    await nameCard.fill("Cynoteck");

    //Selecting Country From Dyanmic Dropdown
    await page.locator("[placeholder='Select Country']").type("ind", { delay: 100 }); //Delay used for hold the loctaor

    await dropdown.waitFor();

    //Getting the Count of the result in dropdown
    const dropdownCount = await dropdown.locator("button").count();
    console.log(dropdownCount);

    //iterating over the dropdown result
    for (let j = 0; j < dropdownCount; ++j) {
        if (await dropdown.locator("button").nth(j).textContent() === " India") {
            await dropdown.locator("button").nth(j).click();
            break;
        }
    }

    //validate the login email is mentioned on the checkout page
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(mail);

    //CLicking on place order button 
    await placeorder.click();

    const thankyou = " Thankyou for the order. ";

    //verify the order is placed 
    await expect(page.locator(".hero-primary")).toHaveText(thankyou);

    //fetching order id
    const orderid = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderid);

    const orderhistory = page.locator("label[routerlink='/dashboard/myorders']");

    await orderhistory.click();
});

test('Verify the Order in Order History Page', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    const orderhistory = page.locator("[routerlink='/dashboard/myorders']");

    await orderhistory.click();

    const Row = page.locator("tbody tr");

    // waiting all APIs call have been made   
    await page.locator("tbody tr th").first().waitFor();

    // getting titles of all cards  
    const OrderID = await Row.locator("th").allTextContents();
    console.log(OrderID);

    //Count of All the Table row in a tbody
    const rowCount = await page.locator('tbody tr').count();
    console.log(rowCount);

    //Waiting for the Data to be populated 
    await page.locator("tbody").waitFor();

    //Taking all the rows on order history page into an array
    const rows = await page.locator("tr.ng-star-inserted");

    //Getting the Count of Rows
    const rowsCount = await rows.count();
    //console.log(rowsCount);

    //fetching order id to compare with order history page.
    const orderid = await page.locator(".ng-star-inserted").nth(9).textContent();
    
    //Iterating over rows Count
    for (let a = 0; a < rowsCount; a++) {
        const rowID = await rows.nth(a).locator("th").textContent();
        //console.log(rowID);
        if (orderid.includes(rowID)) {
            await rows.nth(a).locator("button").first().click();
        }
    }
    //Asserting the OrderID
    const newOrderId = await page.locator(".col-text").textContent();
    expect(orderid.includes(newOrderId)).toBeTruthy();

    await page.pause();
});
