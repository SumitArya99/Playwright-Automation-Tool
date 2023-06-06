const { test, expect } = require('@playwright/test')

test('Page Playwright Test', async ({ page }) => {

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Getting the title and printing it to be termnial
    console.log(await page.title());

    //Asserting the title
    await expect(page).toHaveTitle('Login | Salesforce');
});

test.only('Login in Salesforce Org and Getting Data From AppExchange For a Particular App Where Rating Criteria is Below 3 Stars', async ({ browser }) => {

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

    // const allAppContainer = page.locator("#appx-tiles-grid-ul");

    // const appTitle = page.locator(".appx-tile-content-inner-2 .appx-txt-primary");

    const reviews = page.locator("a[data-tab-name='Reviews']");

    const allReviews = page.locator("h2[title='All Reviews']");

    const rating = page.locator(".appx-tooltip-opener .appx-rating-amount");

    // const reviewerName = page.locator(".slds-feed span .appx-comment .slds-media__body a[target='_blank']");

    // const reviewDescription = page.locator(".slds-feed span .appx-comment .slds-post__content.slds-text-longform.appx-comment-content");
    
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


    //Click on Filter Button
    await page.locator("button.appx-button-filter").click();

    //Select Rating Button
    await page.locator(".custom-slds-box").nth(2).click();

    //Select the Rating Criteria
    await page.locator("input.slds-checkbox_faux[value='rt2']").click();

    //Click On Done Button
    await page.locator("button.custom-slds-button-position[type='button']").nth(2).click();

    //click on Apply Button
    await page.locator("//span[text()='Apply']").click();

    // //click on Swipe Button
    // await page.locator("button.filter-panel-close-button[type='button']").click();

    // //check for first app
    await page.waitForTimeout(3000);
    const appName = await page.locator(".appx-tile-content-inner-2 .appx-txt-primary .appx-tile-title").nth(2).textContent();
    console.log(appName);

        
    //Hover on the App Title
   //await page.waitForTimeout(3000);
    await page.locator(".appx-tile-content-inner.appx-tile-content-inner-1 .appx-tile-img.appx-tile-img-brand .uiImage img").nth(2).hover();

    //click on the App Title
    await page.locator(".appx-tile-content-inner-2 span.appx-tile-descr").nth(2).click();

    //Getting Description of the Particular App
    const description = await page.locator("//div[@id='highlightSectionId']/div[1]").textContent();
    console.log(description);
    
    //Getting Published Date 
    const publishDate = await page.locator("//div[contains(text(), 'Listed On')]").textContent();
    console.log(publishDate);

    const publishDate2 = await page.locator("#firstReleaseDateId").textContent();
    console.log(publishDate2);

    //Click on Reviews
    await reviews.click();

    //Click on AllReviews
    //await page.waitForTimeout(3000);
    await allReviews.click();

    //Reviewer Name and Date Time
    await page.waitForTimeout(3000);
    const userName = await page.locator(".slds-post__header.slds-post__content" ).allTextContents();
    console.log(userName);

    // //Reviewer Description about App 
    // const reviewDescription = await page.locator(".slds-post__content").allTextContents();
    // console.log(reviewDescription);

    //User Rating
    const ratings = await rating.textContent();
    console.log(ratings);
    
    //Click on Back Button
    await page.locator("a[class='slds-truncate']").click();
   // }    
    await page.pause();
});
