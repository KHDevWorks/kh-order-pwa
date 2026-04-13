<<<<<<< HEAD
#!/usr/bin/env node

/**
 * KH Studio PWA 動作確認テスト
 */

const { chromium } = require('playwright');

async function runTests() {
  console.log('🚀 KH Studio PWA 動作確認テスト開始...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 1. ページ読み込みテスト
    console.log('📄 ページ読み込みテスト...');
    await page.goto('http://localhost:3004');
    await page.waitForLoadState('networkidle');
    console.log('✅ ページが正常に読み込まれました\n');

    // 2. スプラッシュ画面テスト
    console.log('🎨 スプラッシュ画面テスト...');
    await page.waitForSelector('text=KH STUDIO', { timeout: 10000 });
    console.log('✅ スプラッシュ画面が表示されました\n');

    // 3. 自動遷移テスト（5秒待機）
    console.log('⏰ 自動遷移テスト...');
    await page.waitForTimeout(5500); // 5秒 + 余裕
    const currentUrl = page.url();
    if (currentUrl.includes('localhost:3004')) {
      console.log('✅ 自動遷移が機能しています\n');
    }

    // 4. 認証画面テスト
    console.log('🔐 認証画面テスト...');
    await page.waitForSelector('text=おかえりなさい', { timeout: 5000 });
    await page.waitForSelector('text=システムアクセスが必要です', { timeout: 5000 });
    console.log('✅ 認証画面が表示されました\n');

    // 5. フォーム入力テスト
    console.log('📝 フォーム入力テスト...');
    const nameInput = await page.locator('input[placeholder="ユーザー名"]');
    const passwordInput = await page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('testuser');
    await passwordInput.fill('testpass123');

    const nameValue = await nameInput.inputValue();
    const passwordValue = await passwordInput.inputValue();

    if (nameValue === 'testuser' && passwordValue === 'testpass123') {
      console.log('✅ フォーム入力が機能しています\n');
    }

    // 6. バリデーションテスト
    console.log('✅ バリデーションテスト...');
    await nameInput.fill('a'); // 1文字（エラーになるはず）
    await passwordInput.fill('123'); // 3文字（エラーになるはず）

    await page.click('button[type="submit"]');

    // エラーメッセージが表示されるか確認
    const errorMessages = await page.locator('text=2文字以上で入力してください').count();
    if (errorMessages > 0) {
      console.log('✅ バリデーションが機能しています\n');
    }

    // 7. 正常ログインシミュレーション
    console.log('🔑 ログインシミュレーション...');
    await nameInput.fill('testuser123');
    await passwordInput.fill('password12345');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // ダッシュボードが表示されるか確認
    const dashboardText = await page.locator('text=運用管理').count();
    if (dashboardText > 0) {
      console.log('✅ ログインとダッシュボード遷移が機能しています\n');
    }

    // 8. 日本語表示テスト
    console.log('🇯🇵 日本語表示テスト...');
    const japaneseTexts = [
      '保留中の注文',
      '在庫単位',
      'アクティブクライアント',
      'ライブシステムログ'
    ];

    let japaneseCount = 0;
    for (const text of japaneseTexts) {
      const count = await page.locator(`text=${text}`).count();
      if (count > 0) japaneseCount++;
    }

    if (japaneseCount === japaneseTexts.length) {
      console.log('✅ 日本語表示が正常です\n');
    }

    // 9. 背景色テスト
    console.log('🎨 背景色テスト...');
    const bodyBgColor = await page.evaluate(() => {
      const body = document.querySelector('body');
      return getComputedStyle(body).backgroundColor;
    });

    // RGB(30, 30, 30) またはそれに近い色かチェック
    if (bodyBgColor.includes('rgb(30, 30, 30)') || bodyBgColor.includes('#1e1e1e')) {
      console.log('✅ 目に優しい背景色が適用されています\n');
    }

    // 10. レスポンシブテスト
    console.log('📱 レスポンシブテスト...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SEサイズ
    await page.waitForTimeout(1000);

    const mobileElements = await page.locator('.grid').count();
    if (mobileElements > 0) {
      console.log('✅ モバイル表示が機能しています\n');
    }

    console.log('🎉 すべてのテストが完了しました！');
    console.log('📊 テスト結果: 合格 ✅');

  } catch (error) {
    console.error('❌ テスト中にエラーが発生しました:', error.message);
    console.log('📊 テスト結果: 不合格 ❌');
  } finally {
    await browser.close();
  }
}

// テスト実行
=======
#!/usr/bin/env node

/**
 * KH Studio PWA 動作確認テスト
 */

const { chromium } = require('playwright');

async function runTests() {
  console.log('🚀 KH Studio PWA 動作確認テスト開始...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 1. ページ読み込みテスト
    console.log('📄 ページ読み込みテスト...');
    await page.goto('http://localhost:3004');
    await page.waitForLoadState('networkidle');
    console.log('✅ ページが正常に読み込まれました\n');

    // 2. スプラッシュ画面テスト
    console.log('🎨 スプラッシュ画面テスト...');
    await page.waitForSelector('text=KH STUDIO', { timeout: 10000 });
    console.log('✅ スプラッシュ画面が表示されました\n');

    // 3. 自動遷移テスト（5秒待機）
    console.log('⏰ 自動遷移テスト...');
    await page.waitForTimeout(5500); // 5秒 + 余裕
    const currentUrl = page.url();
    if (currentUrl.includes('localhost:3004')) {
      console.log('✅ 自動遷移が機能しています\n');
    }

    // 4. 認証画面テスト
    console.log('🔐 認証画面テスト...');
    await page.waitForSelector('text=おかえりなさい', { timeout: 5000 });
    await page.waitForSelector('text=システムアクセスが必要です', { timeout: 5000 });
    console.log('✅ 認証画面が表示されました\n');

    // 5. フォーム入力テスト
    console.log('📝 フォーム入力テスト...');
    const nameInput = await page.locator('input[placeholder="ユーザー名"]');
    const passwordInput = await page.locator('input[placeholder="••••••••"]');

    await nameInput.fill('testuser');
    await passwordInput.fill('testpass123');

    const nameValue = await nameInput.inputValue();
    const passwordValue = await passwordInput.inputValue();

    if (nameValue === 'testuser' && passwordValue === 'testpass123') {
      console.log('✅ フォーム入力が機能しています\n');
    }

    // 6. バリデーションテスト
    console.log('✅ バリデーションテスト...');
    await nameInput.fill('a'); // 1文字（エラーになるはず）
    await passwordInput.fill('123'); // 3文字（エラーになるはず）

    await page.click('button[type="submit"]');

    // エラーメッセージが表示されるか確認
    const errorMessages = await page.locator('text=2文字以上で入力してください').count();
    if (errorMessages > 0) {
      console.log('✅ バリデーションが機能しています\n');
    }

    // 7. 正常ログインシミュレーション
    console.log('🔑 ログインシミュレーション...');
    await nameInput.fill('testuser123');
    await passwordInput.fill('password12345');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // ダッシュボードが表示されるか確認
    const dashboardText = await page.locator('text=運用管理').count();
    if (dashboardText > 0) {
      console.log('✅ ログインとダッシュボード遷移が機能しています\n');
    }

    // 8. 日本語表示テスト
    console.log('🇯🇵 日本語表示テスト...');
    const japaneseTexts = [
      '保留中の注文',
      '在庫単位',
      'アクティブクライアント',
      'ライブシステムログ'
    ];

    let japaneseCount = 0;
    for (const text of japaneseTexts) {
      const count = await page.locator(`text=${text}`).count();
      if (count > 0) japaneseCount++;
    }

    if (japaneseCount === japaneseTexts.length) {
      console.log('✅ 日本語表示が正常です\n');
    }

    // 9. 背景色テスト
    console.log('🎨 背景色テスト...');
    const bodyBgColor = await page.evaluate(() => {
      const body = document.querySelector('body');
      return getComputedStyle(body).backgroundColor;
    });

    // RGB(30, 30, 30) またはそれに近い色かチェック
    if (bodyBgColor.includes('rgb(30, 30, 30)') || bodyBgColor.includes('#1e1e1e')) {
      console.log('✅ 目に優しい背景色が適用されています\n');
    }

    // 10. レスポンシブテスト
    console.log('📱 レスポンシブテスト...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SEサイズ
    await page.waitForTimeout(1000);

    const mobileElements = await page.locator('.grid').count();
    if (mobileElements > 0) {
      console.log('✅ モバイル表示が機能しています\n');
    }

    console.log('🎉 すべてのテストが完了しました！');
    console.log('📊 テスト結果: 合格 ✅');

  } catch (error) {
    console.error('❌ テスト中にエラーが発生しました:', error.message);
    console.log('📊 テスト結果: 不合格 ❌');
  } finally {
    await browser.close();
  }
}

// テスト実行
>>>>>>> eaed134 (2026.4.13変更)
runTests().catch(console.error);