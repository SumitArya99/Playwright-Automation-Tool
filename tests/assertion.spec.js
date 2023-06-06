import test, { page, browser, expect } from '@playwright/test';

test('Assertion Demo', async ({ page }) => {

    await page.goto('https://kitchen.applitools.com/');

    //Assertions --- check element present or not
    await expect(page.locator('text=The Kitchen')).toHaveCount(1);

    if (await page.$('text=The Kitchen')) {
        await page.locator('text=The Kitchen').click();
    }

    //Check Element  hidden or Visible
    await expect(page.locator('text=The Kitchen')).toBeVisible();
    //Soft Assertion: failed soft assertions do not terminate test execution, but mark the test as failed.
    //await expect.soft(page.locator('text=The Kitchen')).toBeHidden();

    //Check Element Enabled or Disabled
    await expect(page.locator('text=The Kitchen')).toBeEnabled();
    //Soft Assertion: failed soft assertions do not terminate test execution, but mark the test as failed.
    //await expect.soft(page.locator('text=The Kitchen')).toBeDisabled();

    //Check Text
    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    //await expect(page.locator('text=The Kitchen')).not.toHaveText('The Kitchen');

    //Check Attribute value and Class
    await expect(page.locator('text=The Kitchen')).toHaveAttribute('class', 'chakra-heading css-dpmy2a');
    await expect(page.locator('text=The Kitchen')).toHaveClass(/.*css-dpmy2a/);

    //Check url and title
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    await expect(page).toHaveTitle(/.*Kitchen/);

    //Check visual validation with screenshot
    await expect(page).toHaveScreenshot()
    
    await page.pause();
}); 