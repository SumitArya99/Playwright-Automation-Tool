const { test, expect } = require('@playwright/test')

// test('Page Playwright Test', async ({ page }) => {

//     //go to login page of salesforce
//     await page.goto("https://login.salesforce.com/");

//     //Getting the title and printing it to be termnial
//     console.log(await page.title());

//     //Asserting the title
//     await expect(page).toHaveTitle('Login | Salesforce');
// });

test.only('Login in Salesforce Org and Getting Data From AppExchange For all App Where Rating Criteria is 1 Stars', async ({ browser }) => {

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

    const reviews = page.locator("a[data-tab-name='Reviews']");

    const allReviews = page.locator("h2[title='All Reviews']");

    const rating = page.locator(".appx-tooltip-opener .appx-rating-amount");


    //Getting the title and printing it to be termnial
    console.log(await page.title());

    //Asserting the title
    // await expect(page).toHaveTitle('Login | Salesforce');

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
    await page.locator("input.slds-checkbox_faux[value='rt1']").click();

    //Click On Done Button
    await page.locator("button.custom-slds-button-position[type='button']").nth(2).click();

    //click on Apply Button
    await page.locator("//span[text()='Apply']").click();

    // //click on Swipe Button
    await page.locator("button.filter-panel-close-button[type='button']").click();

    // //check for Last app-------Need To Add Last Element Location
    await page.waitForTimeout(3000);
    const appName = await page.locator(".appx-tile-content-inner-2 .appx-txt-primary .appx-tile-title").nth(53).textContent();
    console.log(appName);

    //Get count of allAppContainer
    const appCount = await allAppContainer.locator('.appx-tile-medium').count();
    //page.keyboard.down('End');
    console.log(appCount);


    // Getting the Text of all App Below 1 Star Rating.
    const allApptitle = await appTitle.locator(".appx-tile-title").allTextContents();
    console.log(allApptitle);

    //iterating over App------Select App from One to Fourteen
    await page.waitForTimeout(3000);
    for (let i = 0; i < appCount; ++i) {
        page.keyboard.down('End');
        const titleApp = await appTitle.locator(".appx-tile-title").nth(i).textContent();
        page.keyboard.down('End');
        console.log(titleApp);

    //Hover on the App Title
    //await page.waitForTimeout(3000);
    await page.locator(".appx-tile-content-inner.appx-tile-content-inner-1 .appx-tile-img.appx-tile-img-brand .uiImage img").nth(i).hover();

    //click on the App Title
    await page.locator(".appx-tile-content-inner-2 span.appx-tile-descr").nth(i).click();

    //Getting Description of the Particular App
    const description = await page.locator(".long_description").textContent();
    console.log(description);

    //Getting Pricing Deatils of App
    const pricingDetail = await page.locator("div.appx-details-price").textContent();
    console.log(pricingDetail);

    //Getting OverView of the App and skip those app where overview section in null
    if (titleApp != "Ideas Anywhere") {
        if (titleApp != "Cap Adresse - Data Quality Application") {
            if(titleApp != "TFS Integration by DemandBlue"){
            const overView = await page.locator(".slds-box.slds-theme_default.appx-text--wrap ul").textContent();
            console.log(overView);
        }
    }
    }

    //Getting PublishedOn ----Where Published DATE ONLY
    const publishOn = await page.locator("//div[contains(text(), 'Listed On')]").textContent();

    //Getting Latest Detail ------for LATEST RELAESE DATE
    const latestRelease = await page.locator(".slds-text-color_weak").nth(4).textContent();

    //Getting Latest Release ----Where PublishedOn & Latest Release 
    if (publishOn == "Listed On" && latestRelease == "Latest Release") {
        const latestReleaseDate = await page.locator("#latestReleaseDateId").textContent();
        console.log(latestRelease);
        console.log(latestReleaseDate);

        //Getting PublishedOn ----Where PublishedOn Only
    } else {
        const publishDate = await page.locator("#firstReleaseDateId").textContent();
        console.log(publishOn);
        console.log(publishDate);
    }

    //Click on Reviews
    await reviews.click();

    //Click on AllReviews
    await page.waitForTimeout(3000);
    await allReviews.click();

    //For Review Count till 60 comment----one time 20 review Loaded
    await page.waitForTimeout(3000);
    const user = await page.locator("article.slds-post.appx-post.appx-comment header .slds-media__body").count();
    var a = 0;
    var b = user;
    a = a + b;
    page.keyboard.down('End');
    // a = a + b;
    // page.keyboard.down('End');
    // a = a + b;
    
    //App Review and Description By User 
    for (let j = 0; j < a; j++) {
        page.keyboard.down('End');
        const user = await page.locator("article.slds-post.appx-post.appx-comment header .slds-media__body").nth(j).allTextContents();
        const desc = await page.locator("article.slds-post.appx-post.appx-comment div.slds-post__content.slds-text-longform.appx-comment-content").nth(j).allTextContents();
        const result = user + "\n" + desc;
        console.log(result);
    }

    //User Rating
    const ratings = await rating.textContent();
    console.log(ratings);

    //Page Up For Back Buttton
    page.keyboard.down('Home');

    //Click on Back Button
    await page.locator("a[class='slds-truncate']").click();
    }
    
    await page.pause();
});
