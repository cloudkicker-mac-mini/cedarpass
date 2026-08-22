import { expect, test } from '@playwright/test'

test('CedarPass arrival journey and booking demo work', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/cedarpass/')

  await expect(page.getByText('THE VALUE OF')).toBeVisible()
  await expect(page.locator('#opening').getByText('300', { exact: true })).toBeVisible()
  await page.locator('#chapter-2').scrollIntoViewIfNeeded()
  await expect(page.getByRole('button', { name: /claim this space/i })).toBeVisible()
  await page.getByRole('button', { name: /claim this space/i }).click()
  await expect(page.getByRole('heading', { name: /your plate is your pass/i })).toBeVisible()
  await page.getByRole('button', { name: /^continue/i }).click()
  await page.getByRole('button', { name: /pay \$10.00/i }).click()
  await expect(page.getByRole('heading', { name: /walk in/i })).toBeVisible()

  await page.locator('#chapter-4').scrollIntoViewIfNeeded()
  await expect(page.getByText('$6,480')).toBeVisible()
  await page.getByRole('slider', { name: 'Premium spaces' }).fill('50')
  await page.getByRole('slider', { name: 'Price per session' }).fill('15')
  await page.getByRole('slider', { name: 'Monthly bookings per space' }).fill('20')
  await expect(page.getByText('$15,000')).toBeVisible()
  await expect(page.getByText('$180,000')).toBeVisible()

  await page.locator('.final-frame').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /design the pilot/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.screenshot({ path: `screenshots/cedarpass-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
})
