# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: form-validation.spec.ts >> フォームバリデーション >> 1. 空のフォームで送信時、両方のエラーが表示される
- Location: tests\form-validation.spec.ts:10:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('フォームバリデーション', () => {
  4   |   test.beforeEach(async ({ page }) => {
> 5   |     await page.goto('http://localhost:3000');
      |                ^ Error: page.goto: Target page, context or browser has been closed
  6   |     // スプラッシュ画面の5秒待機
  7   |     await page.waitForTimeout(5000);
  8   |   });
  9   | 
  10  |   test('1. 空のフォームで送信時、両方のエラーが表示される', async ({ page }) => {
  11  |     // 送信ボタンをクリック
  12  |     await page.click('button[type="submit"]');
  13  | 
  14  |     // エラーメッセージの確認
  15  |     const nameError = await page.textContent('text=2文字以上で入力してください');
  16  |     const passwordError = await page.textContent('text=8文字以上で入力してください');
  17  | 
  18  |     expect(nameError).toBeTruthy();
  19  |     expect(passwordError).toBeTruthy();
  20  |   });
  21  | 
  22  |   test('2. 1文字のname + 正常なpasswordで、nameエラーが表示される', async ({ page }) => {
  23  |     const nameInput = page.locator('input[placeholder="Username"]');
  24  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  25  | 
  26  |     await nameInput.fill('A');
  27  |     await passwordInput.fill('password123');
  28  | 
  29  |     await page.click('button[type="submit"]');
  30  | 
  31  |     const nameError = await page.textContent('text=2文字以上で入力してください');
  32  |     expect(nameError).toBeTruthy();
  33  | 
  34  |     // ダッシュボードに遷移しない
  35  |     const dashboard = page.locator('text=OPERATIONS CONTROL');
  36  |     await expect(dashboard).not.toBeVisible();
  37  |   });
  38  | 
  39  |   test('3. 正常なname + 7文字のpasswordで、passwordエラーが表示される', async ({ page }) => {
  40  |     const nameInput = page.locator('input[placeholder="Username"]');
  41  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  42  | 
  43  |     await nameInput.fill('testuser');
  44  |     await passwordInput.fill('pass123');
  45  | 
  46  |     await page.click('button[type="submit"]');
  47  | 
  48  |     const passwordError = await page.textContent('text=8文字以上で入力してください');
  49  |     expect(passwordError).toBeTruthy();
  50  | 
  51  |     // ダッシュボードに遷移しない
  52  |     const dashboard = page.locator('text=OPERATIONS CONTROL');
  53  |     await expect(dashboard).not.toBeVisible();
  54  |   });
  55  | 
  56  |   test('4. 2文字のname + 8文字のpasswordで、ダッシュボードに遷移する (成功)', async ({ page }) => {
  57  |     const nameInput = page.locator('input[placeholder="Username"]');
  58  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  59  | 
  60  |     await nameInput.fill('AB');
  61  |     await passwordInput.fill('password');
  62  | 
  63  |     await page.click('button[type="submit"]');
  64  | 
  65  |     // ダッシュボード画面に遷移
  66  |     const dashboard = page.locator('text=OPERATIONS CONTROL');
  67  |     await expect(dashboard).toBeVisible();
  68  |   });
  69  | 
  70  |   test('5. 正常なname + 正常なpasswordで、ダッシュボードに遷移する', async ({ page }) => {
  71  |     const nameInput = page.locator('input[placeholder="Username"]');
  72  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  73  | 
  74  |     await nameInput.fill('John Doe');
  75  |     await passwordInput.fill('SecurePassword123');
  76  | 
  77  |     await page.click('button[type="submit"]');
  78  | 
  79  |     // ダッシュボード画面に遷移
  80  |     const dashboard = page.locator('text=OPERATIONS CONTROL');
  81  |     await expect(dashboard).toBeVisible();
  82  | 
  83  |     // 特定の要素を確認
  84  |     const pendingOrders = await page.textContent('text=Pending Orders');
  85  |     expect(pendingOrders).toBeTruthy();
  86  |   });
  87  | 
  88  |   test('6. エラー表示後、正しい入力で修正すると遷移できる', async ({ page }) => {
  89  |     const nameInput = page.locator('input[placeholder="Username"]');
  90  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  91  | 
  92  |     // 最初は不正な値
  93  |     await nameInput.fill('A');
  94  |     await passwordInput.fill('pass');
  95  | 
  96  |     await page.click('button[type="submit"]');
  97  | 
  98  |     let nameError = await page.textContent('text=2文字以上で入力してください');
  99  |     expect(nameError).toBeTruthy();
  100 | 
  101 |     // 正しい値に修正
  102 |     await nameInput.fill('AB');
  103 |     await passwordInput.fill('password');
  104 | 
  105 |     await page.click('button[type="submit"]');
```