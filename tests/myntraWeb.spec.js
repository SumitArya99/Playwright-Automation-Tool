const { test, expect } = require('@playwright/test');

test('Go to Myntra website', async ({ browser }) => {
     //open new browser and new page 
     const context = await browser.newContext();
     const page = await context.newPage();

     //Go to Myntra Home Page
     await page.goto("https://www.myntra.com/");

     //Creating Variable for Element Locator
     const dealOfTheDay = page.locator(".text-banner-title");

     const thirdItem = page.locator(".image-image").nth(13);

     //Getting Text -- Deal of the Day
     const text = await dealOfTheDay.nth(0).textContent();
     console.log(text);

     page.keyboard.down('End');

     await page.waitForTimeout(3000);

     page.keyboard.down('Home');

     //Click on third Item
     await thirdItem.click();

     //Click on product
     const product = page.locator(".img-responsive").first();

     const [newPage] = await Promise.all(
          [
               context.waitForEvent('page'),
               await product.click(),
          ]);

     // //Get Product Name Text
     const productName = await newPage.locator(".pdp-title").textContent();
     console.log(productName);

     //Select Product Size
     await newPage.locator("button p[class='size-buttons-unified-size']").first().click();

     //Click on Add To Bag Button
     await newPage.locator(".pdp-add-to-bag").click();

     //Click on Bag Button
     await newPage.locator(".desktop-userTitle").nth(2).click();

     //Click on Page to hold window
     await newPage.locator(".itemBlock-base-leftBlock").click();

     //click on size dropdown
     await newPage.locator("div[class='itemComponents-base-size']").click();

     //select size again
     await newPage.locator("div[class='sizeSelector-base-display']").first().click();

     //Click on Done Button
     await newPage.locator("[role='button']").nth(1).click();

     //click on Quantity dropdown tab
     await newPage.locator(".itemComponents-base-quantity").click();

     //select quantity
     await newPage.locator(".dialogs-base-display").nth(0).click();

     //Click on Done Button
     await newPage.locator("[role='button']").nth(1).click();

     //Click on Myntra Logo
     await newPage.locator("svg[class='logo-inline']").click();

     //Hover on any section----Men
     await newPage.locator("a[class='desktop-main']").nth(0).hover();

     //Select an Item
     await newPage.locator("a[href='/men-tshirts']").click();

     //Click on Product 2 from Men Section
     const product2 = newPage.locator(".product-product").first();

     const [newPage1] = await Promise.all(
          [
               context.waitForEvent('page'),
               await product2.click(),
          ]);

     // //Get Product Name Text from Men Section 
     const productName2 = await newPage1.locator(".pdp-title").textContent();
     console.log(productName2);

     //Select Product Size
     await newPage1.locator("button p[class='size-buttons-unified-size']").nth(1).click();

     //Click on Add To Bag Button
     await newPage1.locator(".pdp-add-to-bag").click();

     //Click on Bag Button
     await newPage1.locator(".desktop-userTitle").nth(2).click();

     //Click on Page to hold window
     await newPage1.locator(".itemBlock-base-leftBlock").click();

     //click on size dropdown
     await newPage1.locator("div[class='itemComponents-base-size']").first().click();

     //select size again
     await newPage1.locator("div[class='sizeSelector-base-display']").last().click();

     //Click on Done Button
     await newPage1.locator("[role='button']").nth(1).click();

     //click on Quantity dropdown tab
     await newPage1.locator(".itemComponents-base-quantity").last().click();

     //select quantity
     await newPage1.locator(".dialogs-base-display").nth(0).click();

     //Click on Done Button
     await newPage1.locator("[role='button']").nth(1).click();


     //Order Product Using Search Bar----------
     //Click On Myntra Logo Again
     await newPage1.locator("svg[class='logo-inline']").click();


     //Click on Search Bar
     await newPage1.locator(".desktop-searchBar").click();

     //Dropdown Value
     const dropdown = await newPage1.locator(".desktop-group");

     //Enter the Product Name 
     await newPage1.locator('[placeholder="Search for products, brands and more"]').type("Men T-Shirt", { delay: 100 });
     await dropdown.waitFor();



     // getting the count of dropdown results  
     const productresultcount = await dropdown.locator(".desktop-suggestion").count();
     console.log(productresultcount);

     const title = await dropdown.locator(".desktop-suggestion").allTextContents();
     console.log(title);


     for (let j = 0; j < productresultcount; ++j) {
          if (await dropdown.locator(".desktop-suggestion").nth(j).textContent() === "Men Tshirts Full Sleeves") {
               await dropdown.locator(".desktop-suggestion").nth(j).click();
               break;
          }
     }

     //clicked on selected product
     //Click on Product from Search Bar Section
     const searchProductName = newPage1.locator(".product-product").first();

     const [newPage2] = await Promise.all(
          [
               context.waitForEvent('page'),
               await searchProductName.click(),
          ]);

     // //Get Product Name Text from Men Section 
     const searchProductNameText = await newPage2.locator(".pdp-title").textContent();
     console.log(searchProductNameText);

     //Select Product Size
     await newPage2.locator("button p[class='size-buttons-unified-size']").nth(2).click();

     //Click on Add To Bag Button
     await newPage2.locator(".pdp-add-to-bag").click();

     //Click on Bag Button
     await newPage2.locator(".desktop-userTitle").nth(2).click();

     //Click on Page to hold window
     await newPage2.locator(".itemBlock-base-leftBlock").click();

     //click on size dropdown
     await newPage2.locator("div[class='itemComponents-base-size']").last().click();

     //select size again
     await newPage2.locator("div[class='sizeSelector-base-display']").nth(3).click();

     //Click on Done Button
     await newPage2.locator("[role='button']").nth(1).click();

     //click on Quantity dropdown tab
     await newPage2.locator(".itemComponents-base-quantity").last().click();

     //select quantity
     await newPage2.locator(".dialogs-base-display").nth(2).click();

     //Click on Done Button
     await newPage2.locator("[role='button']").nth(1).click();

     await newPage2.pause();

});
