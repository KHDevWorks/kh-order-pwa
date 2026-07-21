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
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // その他の設定
  output: 'standalone',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = nextConfig;
