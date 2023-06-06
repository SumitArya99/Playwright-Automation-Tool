const { test, expect } = require('@playwright/test');

test('Go to Gmail Page', async ({ browser }) => {
   //open new browser and new page 
   const context = await browser.newContext();
   const page = await context.newPage();

   //Go to Myntra Home Page
   await page.goto("https://www.gmail.com/");

   //Creating Variable for Element Locator
   const emailOrPhone = page.locator("#identifierId");

   const nextButton = page.locator("//span[text()='Next']");

   const password = page.locator("[type='password']");

   const compose = page.locator("//div[text()='Compose']");

   const toEmail = page.locator("[role='combobox']");

   const subject = page.locator("[placeholder='Subject']");

   const emailBody = page.locator("[role='textbox']");

   const sendButton = page.locator("//div[text()='Send']");

   //Entering UserName
   await emailOrPhone.type("aryasumit149@gmail.com");

   //Click On Next Button
   await nextButton.click();

   //Entering Password
   await page.waitForTimeout(3000);
   await password.type("sumitarya149");

   //Click On Next Button
   await nextButton.click();

   //Click on Compose Button
   await compose.click();

   //Enter user mail id
   await page.waitForTimeout(3000);
   await toEmail.type('sumit.arya@cynoteck.com');

   //Enter Email Subject
   await subject.type("Regarding Gmail Automation.");

   //Enter Email Body
   await emailBody.type(`Hi Sir,
      Your Gmail Automated Successfully.
      Thanks & Regards
      Sumit Arya`);

   

   //Click on Send Button
   await sendButton.click();

   await page.pause();

});