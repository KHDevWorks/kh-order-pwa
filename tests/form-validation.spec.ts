import { test, expect } from '@playwright/test';

test.describe('フォームバリデーション', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // スプラッシュ画面の5秒待機
    await page.waitForTimeout(5000);
  });

  test('1. 空のフォームで送信時、両方のエラーが表示される', async ({ page }) => {
    // 送信ボタンをクリック
    await page.click('button[type="submit"]');

    // エラーメッセージの確認
    const nameError = await page.textContent('text=2文字以上で入力してください');
    const passwordError = await page.textContent('text=8文字以上で入力してください');

    expect(nameError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });

  test('2. 1文字のname + 正常なpasswordで、nameエラーが表示される', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('A');
    await passwordInput.fill('password123');

    await page.click('button[type="submit"]');

    const nameError = await page.textContent('text=2文字以上で入力してください');
    expect(nameError).toBeTruthy();

    // ダッシュボードに遷移しない
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).not.toBeVisible();
  });

  test('3. 正常なname + 7文字のpasswordで、passwordエラーが表示される', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('testuser');
    await passwordInput.fill('pass123');

    await page.click('button[type="submit"]');

    const passwordError = await page.textContent('text=8文字以上で入力してください');
    expect(passwordError).toBeTruthy();

    // ダッシュボードに遷移しない
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).not.toBeVisible();
  });

  test('4. 2文字のname + 8文字のpasswordで、ダッシュボードに遷移する (成功)', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('AB');
    await passwordInput.fill('password');

    await page.click('button[type="submit"]');

    // ダッシュボード画面に遷移
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).toBeVisible();
  });

  test('5. 正常なname + 正常なpasswordで、ダッシュボードに遷移する', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('John Doe');
    await passwordInput.fill('SecurePassword123');

    await page.click('button[type="submit"]');

    // ダッシュボード画面に遷移
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).toBeVisible();

    // 特定の要素を確認
    const pendingOrders = await page.textContent('text=Pending Orders');
    expect(pendingOrders).toBeTruthy();
  });

  test('6. エラー表示後、正しい入力で修正すると遷移できる', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    // 最初は不正な値
    await nameInput.fill('A');
    await passwordInput.fill('pass');

    await page.click('button[type="submit"]');

    let nameError = await page.textContent('text=2文字以上で入力してください');
    expect(nameError).toBeTruthy();

    // 正しい値に修正
    await nameInput.fill('AB');
    await passwordInput.fill('password');

    await page.click('button[type="submit"]');

    // ダ���シュボードに遷移
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).toBeVisible();
  });

  test('7. Login/Register モード切り替えが動作する', async ({ page }) => {
    // デフォルトはログインモード
    let heading = await page.textContent('text=WELCOME BACK');
    expect(heading).toBeTruthy();

    // Registerに切り替え
    await page.click('button:has-text("Don\'t have an account? Sign Up")');

    heading = await page.textContent('text=CREATE ACCOUNT');
    expect(heading).toBeTruthy();

    // Loginに戻す
    await page.click('button:has-text("Already registered? Login")');

    heading = await page.textContent('text=WELCOME BACK');
    expect(heading).toBeTruthy();
  });

  test('8. ダッシュボードからログアウトできる', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="••••••••"]');

    // ログイン
    await nameInput.fill('testuser');
    await passwordInput.fill('password123');
    await page.click('button[type="submit"]');

    // ダッシュボード確認
    const dashboard = page.locator('text=OPERATIONS CONTROL');
    await expect(dashboard).toBeVisible();

    // ログアウト（右上のLogOutアイコン）
    const logoutBtn = page.locator('svg.lucide-log-out').first();
    await logoutBtn.click();

    // 認証画面に戻る
    const authHeading = await page.textContent('text=WELCOME BACK');
    expect(authHeading).toBeTruthy();
  });
});
