import { expect, test } from '@playwright/test'

test('CedarPass arrival film works', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/cedarpass/')

  await expect(page.getByRole('heading', { name: 'THE ARRIVAL' })).toBeVisible()
  await page.getByRole('button', { name: /^begin/i }).click()
  await expect(page.getByRole('heading', { name: /the lot is free/i })).toBeVisible()
  await page.getByRole('button', { name: /scene 3/i }).click()
  await expect(page.getByRole('button', { name: /park here/i })).toBeVisible()
  await page.getByRole('button', { name: /park here/i }).click()
  await expect(page.getByRole('heading', { name: /your plate is your pass/i })).toBeVisible()
  await page.getByRole('button', { name: /^continue$/i }).click()
  await page.getByRole('button', { name: /pay \$10.00/i }).click()
  await expect(page.getByRole('heading', { name: /you're parked/i })).toBeVisible()

  await page.locator('.closing-shot').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /create a pilot plan/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.screenshot({ path: `screenshots/cedarpass-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
})
