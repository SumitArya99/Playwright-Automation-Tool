const {test, expect} = require('@playwright/test');

test('Handling Static Dropdown', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Creating Constant for Element Locator
    const blinkingText = page.locator("a[class='blinkingText']");

    //Waiting for new Window/Tab to Open - for Child Window or Tab

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText.click(),
    ]);

    //Getting a Text of Particular element in New Tab
    const abc = await newPage.locator('p.red').textContent();
    console.log(abc);
    
    await page.pause();
});
