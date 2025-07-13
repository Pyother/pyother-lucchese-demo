const { test, expect } = require('@playwright/test');

test.describe('Recommended & Bestsellers Sections', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:50034');
    });

    // Recommended Products
    test('recommended products render correctly', async ({ page }) => {
        const recommendations = page.locator('[id^="recommended-product-"]');
        await expect(recommendations.first()).toBeVisible();
    });

    test('hovering over a recommended product changes image', async ({ page }) => {
        const product = page.locator('[id^="recommended-product-"]').first();
        const image = product.locator('img').first();

        const srcBefore = await image.getAttribute('src');
        await product.hover();
        const srcAfter = await image.getAttribute('src');

        expect(srcBefore).not.toEqual(srcAfter);
    });

    // Bestsellers
    test('bestsellers section renders correctly', async ({ page }) => {
        const bestsellers = page.locator('[id^="bestseller-"]');
        await expect(bestsellers.first()).toBeVisible();
    });

    test('hovering over a bestseller changes image and shows color swatches', async ({ page }) => {
        const bestseller = page.locator('[id^="bestseller-"]').first();
        const image = bestseller.locator('img').first();

        const srcBefore = await image.getAttribute('src');
        await bestseller.hover();
        const srcAfter = await image.getAttribute('src');

        expect(srcBefore).not.toEqual(srcAfter);

        const colorSwatches = bestseller.locator('div.flex-row img.rounded-circle');
        await expect(colorSwatches.first()).toBeVisible();
    });
    
});
