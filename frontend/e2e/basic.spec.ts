import { test, expect } from '@playwright/test'

const base = 'http://localhost:4173'

test('select question and check code', async ({ page }) => {
  await page.goto(base)
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Sort an Array')
  await page.getByText('2. Two Sum').click()
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Two Sum')
  const editor = page.getByRole('textbox')
  await editor.fill('def two_sum(nums, target):\n    return 0')
  await page.getByRole('button', { name: 'Check' }).click()
  await expect(page.getByText('Solution does not match exactly.')).toBeVisible()
})
