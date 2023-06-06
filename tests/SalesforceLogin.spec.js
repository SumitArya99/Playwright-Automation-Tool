const { test, expect } = require('@playwright/test')

//test('firstplaywrighttestcase', async function(){       //Method 1
//test('firstplaywrighttestcase', async ()=> {         //Method 2
//PlayWright Code
//Step1 - Open Browser
//await
//Step2 - Enter username, password
//await
//Step3 - Click Login 
// })

test('Browser Context Declaration', async ({ browser }) => {

    const context = browser.newContext();

    const page = await (await context).newPage();

    await page.goto("https://login.salesforce.com/");
});

test('Page Playwright Test', async ({ page }) => {

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Getting the title and printing it to be termnial
    console.log(await page.title());

    //Asserting the title
    await expect(page).toHaveTitle('Login | Salesforce');
});

test('Salesforce Login and Create Account in Salesforce', async ({ page }) => {

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const Login = page.locator("input#Login");
    const accountname = page.locator("[name='Name']");
    const website = page.locator("[name='Website']");


    //Getting the title and printing it to be termnial
    console.log(await page.title());

    //Asserting the title
    await expect(page).toHaveTitle('Login | Salesforce');

    //Using type method -----to enter text in any field

    //Entering UserName
    await username.type("sumit.arya@resilient-unicorn-4jj5tk.com");

    //Entering Password
    await password.type("Arya@37199");

    //Click Login
    await Login.click();

    //Click in Remid Me Later Link
    // await page.getByText('Remind Me Later').click();

    //Click on acount tab
    await page.getByRole('link', { name: 'Accounts' }).click();

    //Click on New Button
    await page.locator('.forceActionLink').first().click();

    //Enter the Account Name
    await accountname.type("Cynoteck01");

    //Enter the Website Name
    await website.type("aryasumit99@cynoteck.com");

    //Click on Save Button
    await page.locator("[name='SaveEdit']").click();

    await page.pause();
});