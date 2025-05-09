import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端正义-笔记中小【NoteHub】",
  description: "A VitePress Site",
  // 基础路径
  base: '/NoteHubPro/', // 替换为你的仓库名称
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, // 普通链接
      {
        text: '前端开发', // 一级菜单名称
        items: [
          { text: '前端基础', link: '/frontend-basics/html' },
          { text: '框架', link: '/frontend-framework/vue2' },
          { text: '工程化', link: '/frontend-tools/webpack' },
        ],
      },
      {
        text: '性能优化',
        items: [
          { text: '浏览器原理', link: '/browser-principlles/browser' },
          { text: '性能优化实践', link: '/browser-principlles/performance' },
        ],
      },
      {
        text: '后端开发',
        items: [
          { text: 'Node.js', link: '/backend/nodejs' },
          { text: 'Python', link: '/backend/python' },
        ],
      },
      {
        text: '鸿蒙开发',
        items: [
          { text: '入门指南', link: '/harmonyOS-development/introduction' },
          { text: '开发实践', link: '/harmonyOS-development/practice' },
        ],
      },
      {
        text: '面经',
        items: [
          { text: '项目重难点', link: '/interview-experience/project' },
        ],
      },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar:{
      // 首页不显示 sidebar
      '/': [],
      // 前端基础相关的页面
      '/frontend-basics/': [
        {
          text: '前端基础',
          items: [
            { text: 'HTML', link: '/frontend-basics/html' },
            { text: 'CSS', link: '/frontend-basics/css' },
            { text: 'JavaScript', link: '/frontend-basics/javascript' },
            { text: 'es6', link: '/frontend-basics/es6+' },
          ],
        },
      ],

      // 框架相关的页面
      '/frontend-framework/': [
        {
          text: '前端框架',
          items: [
            { text: 'Vue2', link: '/frontend-framework/vue2' },
            { text: 'Vue3', link: '/frontend-framework/vue3' },
            { text: 'React', link: '/frontend-framework/react' },
          ],
        },
      ],

      // 工程化相关的页面
      '/frontend-tools/': [
        {
          text: '工程化工具',
          items: [
            { text: 'Webpack', link: '/frontend-tools/webpack' },
            { text: 'Vite', link: '/frontend-tools/vite' },
          ],
        },
      ],
      // 浏览器工作原理
      '/browser-principlles/': [
        {
          text: '浏览器原理与性能优化',
          items: [
            { text: '浏览器原理', link: '/browser-principlles/browser' },
            { text: '性能优化', link: '/browser-principlles/performance' },
          ],
        },
      ],

       // 后端开发
       '/backend/': [
        {
          text: '后端开发',
          items: [
            { text: 'Node.js', link: '/backend/nodejs' },
            { text: 'Python', link: '/backend/python' },
          ],
        },
      ],

      // 鸿蒙开发
      '/harmonyOS-development/': [
        {
          text: '鸿蒙开发',
          items: [
            { text: '入门指南', link: '/harmonyOS-development/introduction' },
            { text: '开发实践', link: '/harmonyOS-development/practice' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fuzhengyi' }
    ],
    features: [
      {
        title: '前端基础(HTML/CSS/JavaScript)',
        details: '构建动态网页的三大支柱',
        link: '/frontend-basics/html', // 跳转路径
      },
      {
        title: '框架(Vue2/Vue3/React)',
        details: '现代前端开发框架',
        link: '/frontend-framework/vue2',
      },
      {
        title: '工程化(Webpack/Vite)',
        details: '前端工程化的利器',
        link: '/frontend-tools/webpack',
      },
      {
        title: '浏览器原理/性能优化',
        details: '深入理解浏览器原理与性能优化',
        link: '/browser-principlles/browser',
      },
      {
        title: '服务开发（Node.js/Python）',
        details: '服务端开发的核心：Node.js与Python',
        link: '/backend/nodejs',
      },
      {
        title: '鸿蒙开发',
        details: '鸿蒙开发：开启万物互联的新篇章',
        link: '/harmonyOS-development/introduction',
      },
    ],
  },
})
