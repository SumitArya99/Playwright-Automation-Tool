const { test, expect } = require('@playwright/test')

test('Login in Salesforce Org and Getting Data From AppExchange For a Particular App', async ({ page }) => {

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

    const reviews = page.locator("a[data-tab-name='Reviews']");

    const allReviews = page.locator("h2[title='All Reviews']");

    const rating = page.locator(".appx-tooltip-opener .appx-rating-amount");

    // const reviewerName = page.locator(".slds-feed span .appx-comment .slds-media__body a[target='_blank']");

    // const reviewDescription = page.locator(".slds-feed span .appx-comment .slds-post__content.slds-text-longform.appx-comment-content");

    //const appTitle = page.locator(".appx-tile-content-inner-2 .appx-txt-primary");
    
    //Getting the title and printing it to be termnial
    //console.log(await page.title());

    //Asserting the title
    //await expect(page).toHaveTitle('Login | Salesforce');

    //Using type method -----to enter text in any field

    //Entering UserName
    await username.type("sumit.arya@resilient-unicorn-4jj5tk.com");

    //Entering Password
    await password.type("Arya@37199");

    //Click Login
    await Login.click();

    //Click in Remid Me Later Link
    //await page.getByText('Remind Me Later').click();

    //Click on App Launcher Button
   //await page.waitForTimeout(3000);
    await appLauncher.click();

    //click on View All
    //await page.waitForTimeout(3000);
    await viewAll.click();

    //Click on VisitAppExchange Button
   // await page.waitForTimeout(3000);
    await appExchange.click();

    //click on More link
   // await page.waitForTimeout(3000);
    await moreButton.first().click();

    // //Display Selected App Name
    // await page.waitForTimeout(3000);
    // const appName = await page.locator(".appx-tile-content-inner-2 .appx-txt-primary .appx-tile-title").first().textContent();
    // console.log(appName);

    //Hover on the App Title
   //await page.waitForTimeout(3000);
    await page.locator(".appx-tile-content-inner.appx-tile-content-inner-1 .appx-tile-img.appx-tile-img-brand .uiImage img").nth(24).hover();

    //click on the App Title
    await page.locator(".appx-tile-content-inner-2 span.appx-tile-descr").nth(24).click();

    //Getting Description of the Particular App
    const description = await page.locator("div.long_description[dir='ltr']").textContent();
    console.log(description);
    
    //Getting Published Date 
    const publishDate = await page.locator("//div[contains(text(), 'Listed On')]").textContent();
    console.log(publishDate);

    const publishDate2 = await page.locator("#firstReleaseDateId").textContent();
    console.log(publishDate2);

    //Click on Reviews
    await reviews.click();

    //Click on AllReviews
    await allReviews.click();

    //App Review By User 
    const appReview = await page.locator(".slds-post").allTextContents();
    console.log(appReview);

    // //get ReviewerName
    // await page.waitForTimeout(3000);
    // const userReview = await reviewerName.allTextContents();
    // //console.log(userReview);

    // //Get Review
    // await page.waitForTimeout(3000);
    // const userdescription = await reviewDescription.allTextContents();
    // console.log(userdescription,userReview);

    //User Rating
    const ratings = await rating.textContent();
    console.log(ratings);
    await page.pause();
});
