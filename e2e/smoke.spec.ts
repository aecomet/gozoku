import { test, expect } from '@playwright/test';

for (const { path, selector, text } of [
  { path: '/', selector: '#page-home', text: 'GOZOKUKAI' },
  { path: '/schedule', selector: '#page-schedule', text: '' },
  { path: '/library', selector: '#page-library', text: 'ここに眠るのは' }
]) {
  test(`loads ${path}`, async ({ page }) => {
    await page.goto(`/#${path}`);
    await expect(page.locator(selector)).toBeVisible({ timeout: 10000 });
    if (text) {
      await expect(page.locator(selector)).toContainText(text);
    }
  });
}

test('navigates via toolbar links', async ({ page }) => {
  await page.goto('/#/');
  const nav = page.locator('#nav');
  for (const [name, path] of [
    ['schedule', '/schedule'],
    ['library', '/library'],
    ['home', '/']
  ]) {
    await nav.locator(`[data-page="${name}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});

test('renders 404 for unknown route', async ({ page }) => {
  await page.goto('/#/unknown-page');
  await expect(page.locator('#page-not-found')).toBeVisible();
});
