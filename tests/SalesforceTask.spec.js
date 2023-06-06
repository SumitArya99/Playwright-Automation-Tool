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

test.only('Salesforce Login', async ({ page }) => {

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const Login = page.locator("input#Login");
    const lastName = page.locator("[name='lastName']");
    const companyName = page.locator("[name='Company']");
    const account = page.locator("tbody tr a[target='_blank']");
    const accountrows = page.locator("tbody tr");

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

    await page.waitForLoadState('networkidle');

    //Click in Remid Me Later Link
    //await page.getByText('Remind Me Later').click();

    //Click on Lead tab
    await page.getByRole('link', { name: 'Leads' }).click();

    //Click on New Button
    await page.locator('.forceActionLink').first().click();

    //Enter the Last Name
    await lastName.type("Petofy87");

    //Enter the Company Name
    await companyName.type("cynoPetofy25");

    //Click on Save Button
    await page.locator("[name='SaveEdit']").click();

    //Click on Convert Button---- Convert Lead to Account, Contact and Opportunity
    await page.waitForTimeout(3000);
    await page.locator('[name="Convert"]').click();

    //Click on Convert Button
    await page.waitForTimeout(3000);
    await page.locator('[data-aura-class="runtime_sales_leadConvertModalFooter"]').nth(1).click();

    //check for account
    await page.waitForTimeout(3000);
    const accounts = await page.locator(".bodyConvertedItem .primaryField [data-refid='recordId']").first().textContent();
    console.log(accounts);

    //check for contact
    const contacts = await page.locator(".bodyConvertedItem .primaryField [data-refid='recordId']").nth(1).textContent();
    console.log(contacts);

    //check for opportunity
    const opportunity = await page.locator(".bodyConvertedItem .primaryField [data-refid='recordId']").last().textContent();
    console.log(opportunity);

    //click on Goto Leads Button
    await page.locator('//button[text()="Go to Leads"]').click();

    //Click on Accounts tab
    await page.getByRole('link', { name: 'Accounts' }).click();
    await page.locator("tbody tr a[target='_blank']").first().waitFor();

    // getting titles of all cards   
    // const accountname = await account.allTextContents();
    //console.log(accountname);

    // getting the count of accounts 
    const accountcount = await accountrows.count();
    console.log(accountcount);


    // iterating over products ------Select converted account 
    await page.waitForTimeout(3000);
    for (let i = 0; i < accountcount; i++) {
        if (await accountrows.nth(i).locator("a.slds-truncate").textContent() === accounts) {

            //click on new created account
            await accountrows.nth(i).locator("a.slds-truncate").click();
            break;
        }
    }

    // //click on contact with the help of hover on the created contact
    // await page.waitForTimeout(3000);
    // await page.locator('//span[@id="window"]').click();
    
    // //click on opportunity with the help of hover on the created opportunity
    // await page.waitForTimeout(3000);
    // await page.locator('//span[@id="window"]').click();

    // //click on Contact tab
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Contacts' }).click();
    const contactlist = await page.locator("tr:nth-of-type(1) > .cellContainer.lockTrigger.slds-cell-edit").textContent();
    console.log(contactlist);

    // await page.waitForTimeout(3000);
    // await page.getByRole('link', { name: 'Opportunities' }).click(); 
    // page.locator("a.slds-truncate").click();

    await page.pause();
});