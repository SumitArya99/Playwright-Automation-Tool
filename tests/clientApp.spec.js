const {test, expect} = require('@playwright/test');

test('@regression Automation For Website Login', async ({page}) => {

    //go to login page of salesforce

    await page.goto("https://rahulshettyacademy.com/client/");

    //Creating Variable for Element Locator
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const cardtitle = page.locator(".card-body b");
   
    //Entering UserName
    await username.type("aryasumit149@gmail.com");
    //Entering Password
    await password.type("Sumitarya99@");

    //Click Login
    await login.click();

    //Getting the Text of First Element
    //console.log(await cardtitle.first().textContent());

    //Getting the Text of Second Element ---- Using indexing for getting the element.
    //console.log(await cardtitle.nth(2).textContent());

    //Waiting for all APIs call to be made
    await page.waitForLoadState('networkidle');

    //Grbbing the element of th array---- allTextContents used for getting all text in array
    console.log(await cardtitle.allTextContents());
   
    await page.pause();
});