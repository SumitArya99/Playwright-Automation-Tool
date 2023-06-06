const {test, expect} = require('@playwright/test');

test('Handling Static Dropdown', async ({page}) => {

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");

    const password = page.locator("input#password");

    const dropdown = page.locator("select.form-control");

    //Enter correct username
    await username.fill("rahulshettyacademy");

    //entering password
    await password.type("learning"); 

    //Selecting a particular value from static dropdown
    console.log(await dropdown.selectOption("consult"));
    
 
    await page.pause();
});

test('Handling Radio Button', async ({page}) => {

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");

    const password = page.locator("input#password");

    const radioButton = page.locator(".radiotextsty");

    //Enter correct username
    await username.fill("rahulshettyacademy");

    //entering password
    await password.type("learning"); 

    //Selecting a particular Radio Button
    await radioButton.last().click();
    
    
    //clicking on the Okay Button
    await page.locator("#okayBtn").click();

    //Applying Assertion on Radio Button
    await expect(radioButton.last()).toBeChecked();

    //Printing Boolean Value on Console for Assertion
    console.log(await radioButton.last().isChecked());
 
    await page.pause();
});

test('Handling CheckBox', async ({page}) => {

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Creating Variable for Element Locator
    const username = page.locator("input#username");

    const password = page.locator("input#password");

    const radioButton = page.locator(".radiotextsty");

    const CheckBox = page.locator("#terms");

    //Enter correct username
    await username.fill("rahulshettyacademy");

    //entering password
    await password.type("learning"); 

    //Selecting a particular Radio Button
    await radioButton.last().click();

    //clicking on the Okay Button
    await page.locator("#okayBtn").click();

    //Applying Assertion on Radio Button
    await expect(radioButton.last()).toBeChecked();

    //Printing Boolean Value on Console for Assertion
    console.log(await radioButton.last().isChecked());

    //Click on CheckBox
    await CheckBox.click();

    //Applying Assertion on CheckBox
    await expect(CheckBox).toBeChecked();

    //Printing Boolean Value on Console for Assertion
    console.log(await CheckBox.isChecked());

    //Unchecking the CheckBox
    await CheckBox.uncheck();

    //Applying Indirect Assertion for Unchecking the CheckBox
    expect(await CheckBox.isChecked()).toBeFalsy();

 
    await page.pause();
});

test('Handling Blinking Text', async ({page}) => {

    //go to login page of salesforce
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Creating Variable for Element Locator
    const blinkingText = page.locator("a[class='blinkingText']");

    //Click on BlinkingText
    await blinkingText.click();

    //Applying Assertion on BlinkingText
    await expect(blinkingText).toHaveAttribute('class', 'blinkingText');

    console.log(blinkingText);
    

    await page.pause();
});