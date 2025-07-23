// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // primary: {
        //   DEFAULT: '#e53935', // 赤（メインカラー）
        //   dark: '#c62828', // ホバー用など
        //   light: '#ffcdd2', // アクセント背景
        // },
        primary: {
          DEFAULT: '#1a1a1a', // 通常のボタン色（黒に近いグレー）
          light: '#333333', // ホバーや明るめ
          dark: '#000000', // より濃い黒（ホバーなどに使える）
        },
        neutral: {
          DEFAULT: '#f5f5f5', // 背景
          dark: '#616161', // テキスト等
          border: '#e0e0e0', // ボーダー
        },
        accent: {
          DEFAULT: '#E60023', // 赤のアクセントカラー（ロゴやリンクに使える）
        },
      },
    },
  },
  plugins: [],
};
export default config;
