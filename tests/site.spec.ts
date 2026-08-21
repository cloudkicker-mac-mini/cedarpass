import { expect, test } from '@playwright/test'

test('marketing experience and product previews work', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', message => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/cedarpass/')
  await expect(page.getByRole('heading', { name: /turn proximity into a premium/i })).toBeVisible()
  await expect(page.getByText('Scan the sign').first()).toHaveCount(1)

  await page.getByRole('button', { name: /try the guest experience/i }).click()
  await page.getByRole('button', { name: 'Park here' }).click()
  await expect(page.getByRole('heading', { name: /what are you driving/i })).toBeVisible()
  await page.getByRole('button', { name: /continue to pay/i }).click()
  await expect(page.getByRole('heading', { name: /choose how to pay/i })).toBeVisible()
  await page.getByRole('button', { name: /pay \$8.00/i }).click()
  await expect(page.getByRole('heading', { name: /welcome. go enjoy/i })).toBeVisible()

  await page.getByRole('button', { name: 'Event night' }).click()
  await expect(page.getByText('$7,440')).toBeVisible()

  await page.getByRole('button', { name: /design my cedarpass pilot/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  await page.screenshot({ path: `screenshots/cedarpass-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
})
