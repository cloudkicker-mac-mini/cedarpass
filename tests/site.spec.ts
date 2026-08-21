import { expect, test } from '@playwright/test'

test('CedarPass original marketing experience works', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/cedarpass/')

  await expect(page.getByRole('heading', { name: /the upgrade before the entrance/i })).toBeVisible()

  await page.getByRole('button', { name: /see the opportunity/i }).click()
  await expect(page.getByRole('heading', { name: /revenue hiding between the stripes/i })).toBeVisible()

  const slider = page.getByRole('slider', { name: 'Premium spaces' })
  await slider.fill('60')
  await expect(page.getByText('$5,760')).toBeVisible()

  const guestFlow = page.getByRole('button', { name: /guest flow/i })
  if (!(await guestFlow.isVisible())) await page.getByRole('button', { name: /toggle menu/i }).click()
  await guestFlow.click()
  await page.getByRole('button', { name: /02\s*scan/i }).click()
  await expect(page.getByRole('heading', { name: /point. tap. done/i })).toBeVisible()

  await page.getByRole('button', { name: /build my pilot/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.screenshot({ path: `screenshots/cedarpass-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
})
