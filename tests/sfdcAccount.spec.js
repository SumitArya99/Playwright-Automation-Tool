const { test, expect } = require('@playwright/test');

test('Login into Salesforce and Create Account, Contact and Opportunity', async ({ page }) => {

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const userName = page.locator("[type='email']");
    const password = page.locator("[type='password']");
    const login = page.locator("[type='submit']");
    const appLauncher = page.locator(".slds-icon-waffle");
    const searchBar = page.locator("[placeholder='Search apps and items...']");
    const dropDownValue = page.locator(".appLauncherMenu");
    const accountTab = page.locator("a[title='Accounts']");
    const newButton = page.locator("a[title='New']");
    const accountName = page.locator("[name='Name']");
    const phone = page.locator("[name='Phone']");
    const rating = page.locator(".slds-combobox__input-value").first();
    const ratingCriteria = page.locator("[title='Warm']");
    const accountNumber = page.locator("[name='AccountNumber']");
    const saveButton = page.locator("[name='SaveEdit']");
    const contNewButton = page.locator(".slds-m-left--xx-small").nth(1);
    const lastName = page.locator("[name='lastName']");
    const email = page.locator("[name='Email']").nth(2);
    const saveButton2 = page.locator("[name='SaveEdit']");
    const optNewButton = page.locator(".slds-m-left--xx-small").nth(2);
    const opportunityName = page.locator("[name='Name']");
    const closeDate = page.locator("[name='CloseDate']");
    const stage = page.locator(".slds-combobox__input-value").nth(1);
    const stageCriteria = page.locator("[title='Qualification']");
    const opptDropdownValue = page.locator(".slds-listbox");
    const opptSaveButton = page.locator("[name='SaveEdit']");
    const activityEmail = page.locator("[title='Email']");
    const emailSubject = page.locator("[placeholder='Enter Subject...']");
    const emailAddressField = page.locator("li.pillContainerListItem[role='presentation']").first();
    const emailAddressTo = page.locator("li.pillContainerListItem[role='presentation']").first();

    const enterEmail = page.frameLocator("iframe").locator("#cke_editor");
    //const clearEmailBody = page.frameLocator("iframe").locator("#cke_editor");
    const typeEmail = page.frameLocator("iframe").locator("#cke_editor");

    const sendButton = page.locator(".send");
    const chatterLink = page.locator("#collaborateTab__item");
    const clickOnTextArea = page.locator("[title='Share an update...']");
    const post = page.locator("[title='Share an update...']");
    const shareButton = page.locator("[title='Click, or press Ctrl+Enter']");

    //Enter UserName
    await userName.type("sumit.arya@resilient-unicorn-4jj5tk.com");

    //Enter Password
    await password.type("Salesforce@99312");

    //Click on Login
    await login.click();

    //Click on App Launcher
    await appLauncher.click();

    //Click on Search Bar
    await searchBar.click();

    //Search Sales on Search Bar and Select Sales App
    await page.waitForTimeout(3000);
    await page.locator('[placeholder="Search apps and items..."]').type("S", { delay: 100 });
    await dropDownValue.waitFor();

    // getting the count of dropdown results
    await page.waitForTimeout(3000);
    const appResultCount = await dropDownValue.locator(".slds-size_small").count();
    console.log(appResultCount);

    //Iterate for Sales App
    for (let j = 0; j < appResultCount; ++j) {
        if (await dropDownValue.locator(".slds-size_small").nth(j).textContent() === "Sales") {
            await dropDownValue.locator(".slds-size_small").nth(j).click();
            break;
        }
    }

    //Click on Account Tab
    await page.waitForTimeout(3000);
    await accountTab.click();

    //Click on New Button
    await page.waitForTimeout(3000);
    await newButton.click();

    //Enter Account Name
    await page.waitForTimeout(3000);
    await accountName.type("SFDC-Dev");

    //Enter Phone Number
    await page.waitForTimeout(3000);
    await phone.type("+2102177545");

    //Click on Rating Button
    await page.waitForTimeout(3000);
    await rating.click();

    //Select Rating
    await page.waitForTimeout(3000);
    await ratingCriteria.click();

    //Enter Account Number
    await page.waitForTimeout(3000);
    await accountNumber.type("45871568556");

    //Click on Save Button---Account
    await saveButton.click();

    //--Account Created Sucessfully---//

    //Click on Contact --- New Button
    await page.waitForTimeout(3000);
    await contNewButton.click();

    //Enter Last Name
    await page.waitForTimeout(3000);
    await lastName.type("Developer");

    //Enter Email Address
    await page.waitForTimeout(3000);
    await email.type('sfdcDev45@gmail.com');

    //Click on Save Button-----Contact
    await saveButton2.click();

    //--Account, Contact Created Sucessfully---//

    //Click on Opportunity --- New Button
    await page.waitForTimeout(3000);
    await optNewButton.click();

    //Enter Last Name
    await page.waitForTimeout(3000);
    await opportunityName.type("SALESFORCE Dev");

    //Enter Close Date
    await page.waitForTimeout(3000);
    await closeDate.type('03/08/2023');

    //Click on Stage
    await page.waitForTimeout(3000);
    await stage.click();

    //Select Stage of Opportunity
    await page.waitForTimeout(3000);
    await stageCriteria.click();

    //Search Campaign on Lookup Field and Select Campaign
    await page.waitForTimeout(3000);
    await page.locator("[placeholder='Search Campaigns...']").type("S", { delay: 100 });
    //await opptDropdownValue.waitFor();

    // getting the count of dropdown results
    await page.waitForTimeout(3000);
    const campaignLookUp = await opptDropdownValue.locator(".slds-listbox__option-text_entity").count();
    console.log(campaignLookUp);

    //Iterate for Sales App
    for (let j = 0; j < campaignLookUp; ++j) {
        if (await opptDropdownValue.locator(".slds-listbox__option-text_entity").nth(j).textContent() === "SFDC Event") {
            await opptDropdownValue.locator(".slds-listbox__option-text_entity").nth(j).click();
            break;
        }
    }
    //Click on Save Button--Opportunity
    await opptSaveButton.click();

    //Go to Activity Section

    //Click on Email
    await page.waitForTimeout(3000);
    await activityEmail.click();

    //Enter Email Subject
    await page.waitForTimeout(3000);
    await emailSubject.type("Account Related Information");

    //Click on Email address field
    await page.waitForTimeout(3000);
    await emailAddressField.click();

    //Add Email address
    await page.waitForTimeout(3000);
    await emailAddressTo.type('mohit.kumar@cynoteck.com');

    //Iframe Handling Remaining
    //Click on Email Body
    await page.waitForTimeout(3000);
    await enterEmail.click();

    // //Clear Email Body
    // await page.waitForTimeout(3000);
    // await clearEmailBody.fill("");

    //Enter Email
    await page.waitForTimeout(3000);
    await typeEmail.type('Welcome to SFDC----- Account, Contact and Opportunity Created Successfully');

    //Click on Send Button
    await page.waitForTimeout(3000);
    await sendButton.click();

    //Go to Chatter Section
    //Click on Chatter Link
    await page.waitForTimeout(3000);
    await chatterLink.click();

    //Click on TextArea
    await page.waitForTimeout(3000);
    await clickOnTextArea.click();

    //Share Post
    await page.waitForTimeout(5000);
    await post.type("Congratulations......Account, Contact and Opportunity Created Successfully...!!!");

    //Click on Share Button
    await shareButton.click();

    
    await page.pause();
});
