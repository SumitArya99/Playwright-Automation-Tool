const { test, expect } = require('@playwright/test');

let content;

//Creating a beforeAll method 
test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //go to login page of salesforce
    await page.goto("https://login.salesforce.com/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const Login = page.locator("input#Login");

    ///Entering UserName
    await username.type("sumit.arya@resilient-unicorn-4jj5tk.com");

    //Entering Password
    await password.type("Salesforce@99312");

    //Click Login
    await Login.click();

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //Storage state of context level
    //Storage state of information ia always on the context level not the page level.
    await context.storageState({ path: 'CTKEmail.json' });

    //Invoking a new context while making a use of state.json file
    content = await browser.newContext({ storageState: 'CTKEmail.json' });
})

test('Go to app launcher and Search CTK Email Parser and Create New Email Parser', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://resilient-unicorn-4jj5tk-dev-ed.lightning.force.com/lightning/page/home");

    const appLauncher = page.locator(".slds-icon-waffle");
    const searchBar = page.locator("[placeholder='Search apps and items...']");
    const CTKEmail = page.locator("//p[text()=' Email Parser']");
    const emailParserName = page.locator("[type='text']");
    const checkBox = page.locator("[part='checkbox']");
    const filterConfig = page.locator("[role='combobox']");
    const ORFilter = page.locator("[data-value='OR']");
    const saveButton = page.locator("[name='SaveEdit']");

    //Click on App Launcher Button
    await page.waitForTimeout(2000);
    await appLauncher.click();

    //Click on Search Bar
    await searchBar.click();

    //Search Sales on Search Bar and Select Sales App
    await page.waitForTimeout(2000);
    await page.locator('[placeholder="Search apps and items..."]').type("CTK", { delay: 100 });
    //await dropDownValue.waitFor();

    //Click on CTK Email Parser App
    await page.waitForTimeout(2000);
    await CTKEmail.click();

    //Click on New Button
    await page.locator("div[title='New']").click();

    //Enter Email Parser Name
    await page.waitForTimeout(3000);
    await emailParserName.type("Create New Record for Email");

    //Click on Checkbox
    
    await page.waitForTimeout(3000);
    await checkBox.click();

    //Assertion For Checkbox - Checkbox is selected or not
    await page.waitForTimeout(2000);
    await expect(checkBox).toBeChecked();

    //Click on Filter Configuration
    await filterConfig.click();

    //Select OR from Filter Config
    await ORFilter.click();

    //Click on Save Button to Save Email Parser.
    await saveButton.click();
});

test('Create Email Filter for Email Parser', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://resilient-unicorn-4jj5tk-dev-ed.lightning.force.com/lightning/o/ctkemailparser__Email_Parser__c/list?filterName=Recent");

    //Create Filter For First Sequence--- Domain Verification
    const emailFilterNew = page.locator("[name='New']");
    const emailFilterName = page.locator("[name='Name']");

    //For Source Dropdown Using Loop For all Option
    const source = page.locator("[role='combobox']").nth(0);
    const sourceOptionCount = page.locator("[role='option']");
    const sourceOptionName = 'CC'; //Need to change as per requirement
    //const getTextOfOption = page.locator(".slds-media__body");
    const value = page.locator("[name='ctkemailparser__Value__c']");
    const sequence = page.locator("[type='text']").nth(3);
    const saveButton = page.locator("[name='SaveEdit']");

    //Create Filter For First Sequence--- Domain Verification
    //Click on recent created Email Parser
    await page.locator("[data-navigable='true']").first().click();

    //Click on New Button of Email Filters 
    await emailFilterNew.click();

    //Enter Email Filter Name
    await emailFilterName.type("Domain_Verification");

    //Click on Source Dropdown
    await source.click();

    //Getting the Text of Source Option
    const sourceOptionText = await sourceOptionCount.locator(".slds-media__body").allTextContents();
    console.log(sourceOptionText);

    //Getting the Count of Source Option
    const sourceOptionValue = await sourceOptionCount.locator(".slds-media__body").count();
    console.log(sourceOptionValue);


    //Iterate Over Source Option.
    for (let j = 0; j < sourceOptionValue; ++j) {
        if (await sourceOptionCount.locator(".slds-media__body").nth(j).textContent() === sourceOptionName) {
            await sourceOptionCount.locator(".slds-media__body").nth(j).click();
            break;
        }
    }

    //--------For OPERATION DROPDOWN---------//

    //For Operation Dropdown Using Loop For all Option
    const operation = page.locator("[role='combobox']").nth(2);
    const operationOptionCount = page.locator("[data-field-id='Recordctkemailparser_Operation_cField']");
    const operationOptionName = 'Contains'; //Need to change as per requirement and compare with Source Option
    //const getTextOfOperation = page.locator(".slds-media__body");

    //Click on Source Dropdown
    await operation.click();

    //Getting the Text of Operation Option
    const operationOptionText = await operationOptionCount.locator(".slds-media__body").allTextContents();
    console.log(operationOptionText);

    //Getting the Count of Operation Option
    const operationOptionValue = await operationOptionCount.locator(".slds-media__body").count();
    console.log(operationOptionValue);


    //Iterate Over Operation Option.
    for (let k = 0; k < operationOptionValue; ++k) {

        await page.waitForTimeout(3000);
        const operationOptionValue = await operationOptionCount.locator(".slds-media__body").nth(k).textContent();
        if (operationOptionName.includes(operationOptionValue)) {
            await page.waitForTimeout(3000);
            await operationOptionCount.locator(".slds-media__body").nth(k).click();
            break;
        }
    }

    //Enter Value - Domain
    await value.type("gmail.com");

    //Enter Sequence Number
    await sequence.type("1");

    //Click on Save Button to Save Email Filter.
    await saveButton.click();

});

test('Create Email Parser Actions', async ({ }) => {

    //Creating a new page using content
    const page = await content.newPage();

    await page.goto("https://resilient-unicorn-4jj5tk-dev-ed.lightning.force.com/lightning/o/ctkemailparser__Email_Parser__c/list?filterName=Recent");
    await page.waitForTimeout(5000);

    const emailParserActionName = page.locator("[name='Name']");
    const actionType = page.locator(".slds-input_faux");
    const typeCount = page.locator("[role='option']");
    const actionTypeOtionName = 'Create Record for Contact Object'; //Need to change as per requirement
    const objectType = page.locator("[name='ctkemailparser__ObjectType__c']");
    const saveButtonEmailAction = page.locator("[name='SaveEdit']");
    const emailParserLookup = page.locator("[type='text']").nth(1);
    const emailParserLookupOption = page.locator('.slds-listbox__option-text_entity').first();

    //Click on recent created Email Parser
    await page.locator("[data-navigable='true']").first().click();

    //Zoom Out For Capturing Email Filter Actions----
    await page.evaluate(() => {
        document.body.style.transform = 'scale(55%)'
    });

    const emailParserActions = page.locator("[name='New']").nth(2);

    await page.waitForTimeout(3000);

    page.keyboard.down('End');

    //Click on New
    await page.waitForTimeout(3000);
    await emailParserActions.click();

    await page.reload();

    //Enter Email Parser Action Name
    await page.waitForTimeout(5000);
    await emailParserActionName.fill("Create Record for a Particular Object Contact Record"); //also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement

    //Click On Type
    await actionType.click();

    //Getting the Text of Type Option
    const typeOptionText = await typeCount.locator(".slds-media__body").allTextContents();
    console.log(typeOptionText);

    //Getting the Count of Source Option
    const typeOptionValue = await typeCount.locator(".slds-media__body").count();
    console.log(typeOptionValue);


    //Iterate Over Source Option.
    for (let i = 0; i < typeOptionValue; ++i) {

        const typeOptionValue = await typeCount.locator(".slds-media__body").nth(i).textContent();
        if (actionTypeOtionName.includes(typeOptionValue)) {
            await page.waitForTimeout(3000);
            await typeCount.locator(".slds-media__body").nth(i).click();
            break;
        }
    }

    //Click on email parser Lookup
    await page.waitForTimeout(3000);
    await emailParserLookup.click();

    //Click on recent created  email parser lookup
    await page.waitForTimeout(3000);
    await emailParserLookupOption.click();

    //Enter Object Type Name
    await page.waitForTimeout(3000);
    await objectType.type("Contact"); //Need to change as per requirement (Object Name)

    //Click on Save Button to Save Email Parser Action.
    await saveButtonEmailAction.click();

    //---------------For Build Functionality----------------//

    const actionNameCount = page.locator("[data-label='Email Parser Action Name']");
    const emailActionName = 'Create Record for a Particular Object Contact Record'; //Need to change as per requirement
    const buildButton = page.locator("[name='ctkemailparser__EmailParserAction__c.ctkemailparser__Build']");

    //Zoom Out For Capturing Email Filter Actions----
    await page.evaluate(() => {
        document.body.style.transform = 'scale(40%)'
    });

    //await page.waitForTimeout(3000);
    page.keyboard.down('End');

    //Getting the Text of Email Parser Actions
    //Need to Change the Location of email action as per email action name......like first(),last() or nth(..) as per need
    const emailActionText = await actionNameCount.locator("[data-label='Email Parser Action Name'] slot span").last().textContent();
    console.log(emailActionText);

    //Getting the Count of Email Parser Actions
    const emailActionValue = await actionNameCount.count();
    console.log(emailActionValue);

    //Iterate Over Email Parser Actions.
    for (let m = 0; m < emailActionValue; ++m) {

        if (await actionNameCount.locator("[data-label='Email Parser Action Name'] slot span").nth(m).textContent() === emailActionName) {
            await actionNameCount.locator("[data-label='Email Parser Action Name'] slot span").nth(m).click();
            break;
        }
    }

    //Reload Page
    await page.waitForTimeout(2000);
    await page.reload();

    //Click on Build Button
    await page.waitForTimeout(2000);
    await buildButton.click();

    // //-----------------------CREATE RECORD MAPPING-----------------------//

    const fieldMappingNameCount = page.locator(".slds-table.slds-table_cell-buffer.slds-table_bordered tbody tr.slds-hint-parent");
    const fieldMappingName = 'Last Name (LastName)'; //Need to change as per requirement

    page.keyboard.down('End');

    //Getting the Text of Email Parser Actions
    const fieldMappingNameText = await fieldMappingNameCount.locator("td").first().textContent();
    console.log(fieldMappingNameText);

    //Getting the Count of Email Parser Actions
    const fieldMappingValue = await fieldMappingNameCount.count();
    console.log(fieldMappingValue);

    //Iterate Over Email Parser Actions.
    for (let n = 0; n < fieldMappingValue; ++n) {

        const fieldMappingValue = await fieldMappingNameCount.locator("td").nth(n).textContent();

        if (fieldMappingName.includes(fieldMappingValue)) {
            await page.waitForTimeout(3000);
            await fieldMappingNameCount.locator("td").nth(n).click();
            break;
        }
    }

    //---------------------SELECT SOURCE DROPDOWN VALUE----------------------//

    const fieldMappingName2 = 'lastName'; //Need to change as per requirement
    const sourceDropdown = page.locator(".slds-combobox__input-value").nth(1); //Need to Change as per requirement.
    const sourceValueCount = page.locator("[role='option']"); //Need to Change as per requirement.
    const fieldMappingSaveButton = page.locator(".slds-m-left_x-small");

    //Click on Source
    await sourceDropdown.click();

    //Getting the Text of Type Option
    const sourceOptionText = await sourceValueCount.locator(".slds-media__body").allTextContents();
    console.log(sourceOptionText);

    //Getting the Count of Source Option
    const sourceOptionValue = await sourceValueCount.count();
    console.log(sourceOptionValue);

    //Iterate Over Source Option.
    for (let s = 0; s < sourceOptionValue; ++s) {
        const sourceOptionValue = await sourceValueCount.locator(".slds-media__body").nth(s).textContent();

        if (fieldMappingName2.includes(sourceOptionValue)) {
            await sourceValueCount.locator(".slds-media__body").nth(s).click();
            break;
        }
    }

    // Click On Save Button
    await fieldMappingSaveButton.click();

    await page.pause();

});