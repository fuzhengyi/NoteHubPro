import { ThemeConfig } from 'vitepress';

declare module 'vitepress' {
  export interface ThemeConfig {
    features?: Array<{
      title: string;
      details: string;
      link: string;
    }>;
  }
}