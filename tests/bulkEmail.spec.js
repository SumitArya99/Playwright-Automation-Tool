const { test, expect } = require('@playwright/test');

test('Go to Gmail Page', async ({ browser }) => {
   //open new browser and new page 
   const context = await browser.newContext();
   const page = await context.newPage();

   //Go to Gmail Home Page
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
   await emailOrPhone.fill("aryasumit149@gmail.com");

   //Click On Next Button
   await nextButton.click();

   //Entering Password
   //await page.waitForTimeout(3000);
   await password.fill("sumitarya149");
   
   //Click On Next Button
   await nextButton.click();

   //Iterate 100 times to send 100 emails
   for (let i = 0; i < 5; i++) {
      //Click on Compose Button
      await compose.click();

      //Enter user mail id
      await page.waitForTimeout(3000);
      await toEmail.type(`account@1a042oigkxyed61771orkf9kzg22szuktt98jcajlhfiopkgkj.5h-5fgexeak.ap25.apex.salesforce.com`);

      //Enter Email Subject
      await subject.type(`Bulk Testing - Email ${i + 1}`);

      //Enter Email Body
      await emailBody.type(`Hi,
    This is email ${i + 1} of 100 regarding Gmail automation.
    Thanks & Regards,
    Sender`);

      //Click on Send Button
      await sendButton.click();
   }

   await page.pause();
});
