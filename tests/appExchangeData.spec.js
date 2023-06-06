const { test, expect } = require('@playwright/test')

test.only('Salesforce Login and Create Account in Salesforce', async ({ browser }) => {

    const context = browser.newContext();

    const page = await (await context).newPage();

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");

    const password = page.locator("input#password");

    const Login = page.locator("input#Login");

    const appLauncher = page.locator(".slds-icon-waffle");

    const viewAll = page.locator(".slds-button[aria-label='View All Applications']");

    const appExchange = page.locator("//button[contains(text(), 'Visit AppExchange')]");

    const moreButton = page.locator(".appx-button-text");

    const allAppContainer = page.locator("#appx-tiles-grid-ul");

    const appTitle = page.locator(".appx-tile-content-inner-2 .appx-txt-primary");
    
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

    //Click on App Launcher Button
    await page.waitForTimeout(3000);
    await appLauncher.click();

    //click on View All
    await page.waitForTimeout(3000);
    await viewAll.click();

    //Click on VisitAppExchange Button
    await page.waitForTimeout(3000);
    await appExchange.click();

    //click on More link
    await page.waitForTimeout(3000);
    await moreButton.first().click();

    //check for app
    await page.waitForTimeout(3000);
    const appName = await page.locator(".appx-tile-content-inner-2 .appx-txt-primary .appx-tile-title").first().textContent();
    console.log(appName);

    // //Get count of allAppContainer
    // await page.locator('#appx-tiles-grid-ul').waitFor();
    // const appCount = await allAppContainer.locator('div.appexUiTile').count();
    // console.log(appCount);

    // //Getting the Text of all the Products
    // const allApptitle = await appTitle.locator(".appx-tile-title").allTextContents();
    // console.log(allApptitle);

    // // iterating over App------Select a Praticular app
    // // await page.waitForTimeout(3000);

    // for (let i = 0; i < appCount; i++) {
    //     if (await appTitle.nth(i).locator(".appx-tile-title").textContent() === appName) {

    //         //click on new created account
    //     const appDetail = await appTitle.nth(i).locator(".appx-tile-title").textContent();
    //     await appDetail.click();

    //         break;
    //     }
    //     if(allApptitle.includes(appName))
    //     {
    //         await page.locator(".appx-tile-content-inner-2 .appx-txt-primary .appx-tile-title").click();
    //     }

    // }
    
    await page.pause();
});
