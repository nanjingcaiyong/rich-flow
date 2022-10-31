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
        text: '初始化',
        collapsible: true,
        items: [
          {
            text: '项目安装',
            link: '/install.md'
          },
          {
            text: '使用模板',
            link: '/project.md'
          },
          {
            text: '启动脚本',
            link: '/start.md'
          }
        ]
      },
      {
        text: '安装插件',
        collapsible: true,
        items: [
          {
            text: 'ESLint',
            link: '/eslint.md'
          },
          {
            text: 'StyleLint',
            link: '/eslint.md'
          },
          {
            text: 'CommitLint',
            link: '/eslint.md'
          }
        ]
      },
      {
        text: 'Git集',
        collapsible: true,
        items: [
          {
            text: 'renew',
            link: '/git.md'
          },
          {
            text: 'add',
            link: '/git.md'
          },
          {
            text: 'branch',
            link: '/git.md'
          },
          {
            text: 'commit',
            link: '/git.md'
          },
          {
            text: 'fetch',
            link: '/git.md'
          },
          {
            text: 'merge',
            link: '/git.md'
          },
          {
            text: 'pull',
            link: '/git.md'
          },
          {
            text: 'push',
            link: '/git.md'
          },
          {
            text: 'switch',
            link: '/git.md'
          },
        ]
      },
      {
        text: 'npm相关操作',
        collapsible: true,
        items: [
          {
            text: '升级版本',
            link: '/npm.md'
          },
          {
            text: '发包',
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