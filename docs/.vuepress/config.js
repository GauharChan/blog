module.exports = {
  title: "gauhar's blog",
  description: 'just a blog',
  base: '/blog/',
  head: [
    [
      'script',
      {
        async: true,
        // crossorigin: 'anonymous',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1206812165499181'
      }
    ],
    [
      'link',
      {
        rel: 'icon', href: '/favicon.ico'
      }
    ]
  ], 
  themeConfig: {
    // logo: '/assets/logo.jpg',
    sidebarDepth: 6,
    lastUpdated: '最后修改时间',
    smoothScroll: true,
    algolia: {
      apiKey: '67b9e9d809235b458744688bdb34d141',
      indexName: 'gauharchanioblog',
      appId: '5TXT39BJUN',
    },
    nav: [
      {
        text: '其他版本博客', 
        items: [
          { text: 'vitepress版', link: 'https://gauharchan.github.io/' },
          { text: '某node资源', link: 'https://gauhar.gitee.io/vuepress_node/' },
          { text: 'hexo版(不维护)', link: 'https://gauhar.gitee.io/' },
        ]
      },
      { text: '码云', link: 'https://gitee.com/gauhar' },
      { text: 'GitHub', link: 'https://github.com/GauharChan/blog' },
    ],
    sidebar: [
      [
        '/vite-plugin-shared',
        'vite插件-shared'
      ],
      [
        '/Taro开发中的坑',
        'Taro+NutUI'
      ],
      [
        '/react笔记',
        'react'
      ],
      [
        '/vue3',
        'vue3'
      ],
      [
        '/vue3源码',
        'vue3源码'
      ],
      [
        '/antv',
        'antv'
      ],
      [
        '/typeScript',
        'typeScript'
      ],
      [
        '/taro',
        'taro1.x'
      ],
      [
        '/uniapp',
        'uniapp'
      ],
      [
        '/es6笔记',
        'es6笔记'
      ],
      [
        '/问题',
        '问题'
      ],
      [
        '/js学习笔记',
        'js学习笔记'
      ],
      [
        '/webpack',
        'webpack'
      ],
      [
        '/vue笔记',
        'vue笔记'
      ],
      [
        '/常用代码',
        '常用代码'
      ],
      [
        '/工作常用代码',
        '工作常用代码'
      ],
      [
        '/工作上遇到的坑',
        '工作上遇到的坑'
      ],
      [
        '/那些坑',
        '那些坑'
      ],
      [
        '/正则表达式',
        '正则表达式'
      ],
      
      [
        '/flutter',
        'flutter'
      ],
      [
        '/js笔记',
        'js笔记'
      ],
      [
        '/note',
        'note'
      ],
      // [
      //   '/git托管代码',
      //   'git托管代码'
      // ],
    ]
  }
}