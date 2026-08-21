import { expect, test } from '@playwright/test'

test('CedarPass cinematic executive experience works', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/cedarpass/')

  await expect(page.getByRole('heading', { name: /make arrival feel first class/i })).toBeVisible()
  await page.getByRole('button', { name: /experience the journey/i }).click()
  await expect(page.getByRole('heading', { name: /the arrival/i })).toBeVisible()
  await page.getByRole('button', { name: /02/i }).click()
  await expect(page.getByRole('heading', { name: /the decision/i })).toBeVisible()

  await page.getByRole('button', { name: /start parking/i }).click()
  await expect(page.getByRole('heading', { name: /your plate is your pass/i })).toBeVisible()
  await page.getByRole('button', { name: /^continue$/i }).click()
  await page.getByRole('button', { name: /^pay$/i }).click()
  await expect(page.getByRole('heading', { name: /you're all set/i })).toBeVisible()

  await page.getByRole('button', { name: /increase premium spaces/i }).click()
  await expect(page.getByText('$7,560')).toBeVisible()
  await page.getByRole('button', { name: /explore a cedarpass pilot/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.screenshot({ path: `screenshots/cedarpass-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
})
