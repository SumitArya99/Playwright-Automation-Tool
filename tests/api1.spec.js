const { test, expect, request } = require('@playwright/test');


const loginpaylod = { userEmail: "abhishek.khanna@cynoteck.com", userPassword: "Abhi@123" };
const orderpayload = {orders: [{country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let newtoken;
let newOrderId;

test.beforeAll(async () => {
//  login API
    const apicontext = await request.newContext();

    const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginpaylod
        })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    newtoken = loginResponseJson.token;
    console.log(newtoken);

    // Order API
    const orderResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
            data: orderpayload,
            headers: {
                'Authorization': newtoken,
                'Content-Type' : 'application/json'
            }
    })
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);

    // getting the order id
    newOrderId = orderResponseJson.orders[0]; 
    console.log(newOrderId);

});

test('Automation', async function ({ page }) {

    //add a js script to handle api automation
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, newtoken);

    await page.goto("https://rahulshettyacademy.com/client/");

    const orderhistory = page.locator("[routerlink='/dashboard/myorders']");
    const AllOrderID = page.locator("th[scope='row']");
    const Row = page.locator("tbody tr");


    // clicking on order History Button
    await orderhistory.click();

    // // waiting all APIs call have been made   
    // await page.locator("tbody tr th").first().waitFor();

    // // getting titles of all cards  
    // const OrderID = await Row.locator("th").allTextContents();

    // console.log(OrderID);

    // // await page.pause();

    // getting the first table row
    await Row.locator('th').first().waitFor();

    //Count of all the table row in a tbody 
    const rowCount = await Row.count();
    console.log(rowCount);

    //iterating over products
    for (let k = 0; k < rowCount; ++k) {
       
        const rowID = await Row.nth(k).locator("th").textContent();
        console.log(rowID);

        if(newOrderId.includes(rowID))
        {
            await Row.nth(k).locator("button").first().click();
        }
    }

    // //Assertion the OrderID
    // const newOrder = await page.locator(".col-text").textContent();
    // expect(newOrderId.includes(newOrder)).toBeTruthy();
    await page.pause();

});
