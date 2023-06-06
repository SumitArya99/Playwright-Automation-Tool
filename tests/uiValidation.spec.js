const {test, expect} = require('@playwright/test');

test('Back/Forward Navigation', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.goto("https://www.google.com/");

    //for move back to browser
    await page.goBack();

    //for move forward to browser
    await page.goForward();

});

test('Show/Hide Element', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    //Click on hide Button
    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();
    //await expect(page.locator("#displayed-text")).toBeTruthy();
});

test('Pop-Up/Alert/Dialog Handling', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.pause();

    //For Populate the alert handle the positive case like- OK
    await page.on('dialog', dialog => dialog.accept());

    //For Populate the alert handle the negative case like- Cancel
    //await page.on('dialog', dialog => dialog.dismiss());

    await page.locator("#confirmbtn").click();
});

test('Mouse Hover', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //hover on element
    await page.locator("#mousehover").hover();
    
    //Click on Top
    await page.locator("[href='#top']").click();

    //Click on Reload
    await page.locator("//a[text()='Reload']").click();
});

test.only('iframe Handling', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    page.keyboard.down('End');

    //Navigate to iframe
    await page.waitForTimeout(3000);
    const iframeHandle = await page.frameLocator("#courses-iframe");
    
    //Clicking on All Access Plan
    await page.waitForTimeout(3000);
    await iframeHandle.locator("li a[href='lifetime-access']:visible").click();

    page.keyboard.down('Home');

    //Click on Alert Button
    await page.locator("#alertbtn").click();
    
    await page.on('dialog', dialog => dialog.accept());   

});

test('Screenshot Functionality', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    //Taking Screenshot of the textbox
    await page.locator("#displayed-text").screenshot({path: "textBoxHide.png"});

    //Click on hide Button
    await page.locator("#hide-textbox").click();

    //Take screenshot of the entire page
    //await page.screenshot({path: "screenshot.png"});
});

test('Visual Testing', async ({page}) => {

    await page.goto("https://www.salesforce.com/in/");

    expect(await page.screenshot()).toMatchSnapshot('visualTesting.png');
});
