const { test, expect } = require('@playwright/test');

test('scrolls to recommended products section', async ({ page }) => {
    await page.goto('http://localhost:50034'); 

    await page.getByText('Read more').click();

    await page.waitForTimeout(500);

    const recommended = await page.locator('#recommended-products');
    await expect(recommended).toBeVisible();
});
