import { defineConfig } from 'vitepress'
const config = defineConfig({
  base: '/flow/',
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
            text: '项目脚本',
            link: '/script.md'
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
          }
        ]
      },
      {
        text: 'Git集',
        collapsible: true,
        items: [
          {
            text: 'branch',
            link: '/git/branch.md'
          },
          {
            text: 'commit',
            link: '/git/commit.md'
          },
          {
            text: 'merge',
            link: '/git/merge.md'
          },
          {
            text: 'ignore',
            link: '/git/ignore.md'
          }
        ]
      },
      {
        text: 'npm',
        collapsible: true,
        items: [
          {
            text: '升级版本',
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
      pattern: 'https://github.com/nanjingcaiyong/flow/edit/master/docs/:path',
      text: '编辑页面'
    },
    algolia: {
      apiKey: '053f6f4b49dfe29342d5b8085343882e',
      appId: 'V3NR2825R3',
      indexName: 'caiyongio',
      algoliaOptions: {
        hitsPerPage: 10,
      },
    },
    // github
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nanjingcaiyong/flow' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present rich'
    }
  }
})

export default config