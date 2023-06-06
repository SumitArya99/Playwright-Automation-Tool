const { test, expect, request } = require('@playwright/test');

//Line no. 4 signifies that we are using apiUtils.js utility in our parent file
const { apiUtils } = require('./Utilities/apiutils');

const loginPayload = { userEmail: "aryasumit149@gmail.com", userPassword: "Sumitarya99@" };

const orderPayload = { orders: [{ country: "British Indian Ocean Territory", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };

const fakePayLoad = {data: [], message: "No Orders"};

//Definging Token as a Global Variable
let response;

test.beforeAll(async () => {

    //Login API -----(context= (create a session))
    const apiContext = await request.newContext();

    //Creating an Object of apiUtils Class
    const apiUtil = new apiUtils(apiContext, loginPayload);

    //Object of a class can access all the methods presented in the class.
    response = await apiUtil.getOrder(orderPayload);    
});

test('Network Test', async ({ page }) => {

    //Adding js script to handle api automation 
    page.addInitScript(value => {

        //'token' --> key value in local storage
        window.localStorage.setItem('token', value)
    }, response.token);

    //go to login page
    await page.goto("https://rahulshettyacademy.com/client");

    //--------Show Fake Message to USER---------(41-54)
    //We are moving from UI to API whenever we are using (page.route)
    //Mocking/Network Interception the API response.
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63f70fa5568c3e9fb11ed61f", 
    route => {
        const response = page.request.fetch(route.request());
        //fullfill method will send the response to the browser
        //fullfill method takes body in string
        let body = JSON.stringify(fakePayLoad);
        route.fulfill({
            response,
            body,
        })
    });

    //Intercepting the API response -> fake response through playwright -> sending to the fake  response to browser -> rendering data on the UI

    //Clicking on the OrderHistory Link
    const orderhistory = page.locator("[routerlink='/dashboard/myorders']");
    await orderhistory.click();

    // waiting for message to be populated.  
    const fakeMessage = await page.locator(".mt-4").textContent();
    console.log(fakeMessage);
    expect(fakeMessage.includes(" You have No Orders")).toBeTruthy();

    // const Row = page.locator("tbody tr");
    
    // //Getting the Count of Rows
    // const rowsCount = await Row.count();
    // console.log(rowsCount);
    
    // //Iterating over rows Count
    // for (let a = 0; a < rowsCount; a++) {
    //     const rowID = await Row.nth(a).locator("th").textContent();
    //     //console.log(rowID);
    //     if (response.orderId.includes(rowID)) {
    //         await Row.nth(a).locator("button").first().click();
    //     }
    // }
    // //Asserting the OrderID
    //  const newOrderId = await page.locator(".col-text").textContent();
    //  console.log(newOrderId);
    //  expect(response.orderId.includes(newOrderId)).toBeTruthy();

    await page.pause();
});
