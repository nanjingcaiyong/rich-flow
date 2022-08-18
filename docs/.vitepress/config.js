import { defineConfig } from 'vitepress'
const config = defineConfig({
  base: '/rich-flow/',
  lang: 'zh-CN',
  title: 'rich-flow 中文文档',
  description: '致力于提升研发效率和规范的工程化解决方案',
  lastUpdated: true,
  themeConfig: {
    sidebar: [
      {
        text: '创建项目',
        collapsible: true,
        items: [
          {
            text: '初始化项目',
            link: '/project.md'
          }
        ]
      },
      {
        text: 'Git',
        collapsible: true,
        items: [
          {
            text: '命令封装',
            link: '/git.md'
          }
        ]
      },
      {
        text: '规范检查',
        collapsible: true,
        items: [
          {
            text: 'ESLint',
            link: '/eslint.md'
          }
        ]
      },
      {
        text: 'npm相关操作',
        collapsible: true,
        items: [
          {
            text: 'publish',
            link: '/npm.md'
          }
        ]
      }
    ],
    nav:  [
      { 
        text: '介绍', 
        link: '/guide.md',
      },
      {
        text: '版本',
        link: '/CHANGELOG.md'
      }
    ],
    editLink: {
      pattern: 'https://github.com/nanjingcaiyong/rich-flow/edit/main/docs/:path',
      text: '编辑页面'
    },
    algolia: {
      apiKey: '6b309d5f974ba74bf99a3613aa539ff7',
      appId: '3Z4NVAYK05',
      indexName: 'rich-flow',
      algoliaOptions: {
        hitsPerPage: 10,
      },
    },
    // github
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nanjingcaiyong/rich-flow' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present rich'
    }
  }
})

export default config