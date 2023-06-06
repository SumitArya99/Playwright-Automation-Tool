const { test, expect } = require('@playwright/test');

let content;

//Creating a beforeAll method 
test.beforeAll( async({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const Login = page.locator("input#Login");

    ///Entering UserName
    await username.type("sumit.arya@resilient-unicorn-4jj5tk.com");

    //Entering Password
    await password.type("Salesforce@99312");

    //Click Login
    await Login.click();
    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //Storage state of context level
    //Storage state of information ia always on the context level not the page level.
    await context.storageState({path: 'state2.json'});

    //Invoking a new context while making a use of state.json file
    content = await browser.newContext({storageState: 'state2.json'});

})

test('Login in Salesforce', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();
    
    await page.goto("https://login.salesforce.com/");

    await page.pause();
});
