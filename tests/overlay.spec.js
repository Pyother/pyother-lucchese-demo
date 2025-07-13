const { test, expect } = require('@playwright/test');

test('opens size overlay and selects a size', async ({ page }) => {
    await page.goto('http://localhost:50034');

    await page.locator('#overlay-opener').click();

    const overlay = page.locator('.overlay');
    await expect(overlay).toBeVisible();

    await page.locator('#overlay-size-button-10').click();
    await expect(page.locator('#selected-size-display')).toHaveText('10');

    await page.getByText('Done').click();
    await expect(overlay).toBeHidden();
});
