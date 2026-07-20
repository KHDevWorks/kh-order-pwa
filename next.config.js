<<<<<<< HEAD
const withPWA = require('next-pwa')({
  dest: 'public',
  // 開発環境 (development) の時は PWA を無効にする
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // その他の設定
=======
const withPWA = require('next-pwa')({
  dest: 'public',
  // 開発環境 (development) の時は PWA を無効にする
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // その他の設定
<<<<<<< HEAD
>>>>>>> eaed134 (2026.4.13変更)
=======
  output: 'standalone',
<<<<<<< HEAD
>>>>>>> f3979d6 (docker環境)
});
=======
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};
<<<<<<< HEAD
>>>>>>> 4284093 (修正)
=======

module.exports = nextConfig;
>>>>>>> 47e70da (修正)
