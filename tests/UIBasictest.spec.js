 const {test, expect} = require('@playwright/test');

    //test('firstplaywrighttestcase', async function(){       //Method 1
    //test('firstplaywrighttestcase', async ()=> {         //Method 2
    //PlayWright Code
    //Step1 - Open Browser
    //await
    //Step2 - Enter username, password
    //await
    //Step3 - Click Login 
    // })
    test('Browser Context Declaration', async ({browser}) => {

        const context = browser.newContext();

        const page = await (await context).newPage();

        await page.goto("https://login.salesforce.com/");
    });
    
    test('Page Playwright Test', async ({page}) => {

        //go to login page of salesforce
        await page.goto("https://login.salesforce.com/");

        //Getting the title and printing it to be termnial
        console.log(await page.title());
        
        //Asserting the title
        await expect(page).toHaveTitle('Login | Salesforce');
    });

    test('Automation For Website Login', async ({page}) => {

        //go to login page of salesforce
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        //Creating Variable for Element Locator
        const username = page.locator("input#username");

        const password = page.locator("input#password");

        const sigin = page.locator("input#signInBtn");

        const cardtitle = page.locator(".card-body a");

        //Getting the title and printing it to be termnial
        console.log(await page.title());
        
        //Asserting the title
        await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
        
        //Using type method
        //Entering UserName
        await username.type("abc.gmail.com");

        //Entering Password
        await password.type("learning");

        //Click Login
        await sigin.click();

        //Asserting Message
        console.log(await page.locator("[style='display: block;']").textContent());
        
        //Contain alert Text Incorrect username/password 
        await expect(page.locator("[style='display: block;']")).toContainText("Incorrect");

        //Fill Method = Use to clear the text 
        await username.fill("");

        //Enter correct username
        await username.fill("rahulshettyacademy");
        
        // //race condition
        //await Promise.all(
        //     [
        //         page.waitForNavigation(),
        //         sigin.click(),
        //     ]
        // )

        await sigin.click(); 

        //Getting the Text of First Element
        //console.log(await cardtitle.first().textContent());

        //Getting the Text of Second Element ---- Using indexing for getting the element.
        //console.log(await cardtitle.nth(2).textContent());

        //Grbbing the element of th array---- allTextContents used for getting all text in array
        console.log(await cardtitle.allTextContents());  
        await page.pause();
    });