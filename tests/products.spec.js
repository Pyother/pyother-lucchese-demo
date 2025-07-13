const { test, expect } = require('@playwright/test');

test('check if there are 5 photos of the products displayed', async ({ page }) => {
    await page.goto('http://localhost:50034');

    await expect(page.locator('#desktop-photo-1')).toBeVisible();
    await expect(page.locator('#desktop-photo-2')).toBeVisible();
    await expect(page.locator('#desktop-photo-3')).toBeVisible();
    await expect(page.locator('#desktop-photo-4')).toBeVisible();
    await expect(page.locator('#desktop-photo-5')).toBeVisible();

});