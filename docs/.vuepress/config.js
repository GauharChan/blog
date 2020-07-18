module.exports = {
  title: "gauhar's blog",
  description: 'just a blog',
  themeConfig: {
    // logo: '/assets/logo.jpg',
    sidebarDepth: 6,
    lastUpdated: '最后修改时间',
    smoothScroll: true,
    algolia: {
      apiKey: '498218f807a23244f78a4f3c20eae586',
      indexName: 'gauharchan'
    },
    nav: [
      { text: 'hexo版博客', link: 'https://gauhar.gitee.io/' },
      { text: '码云', link: 'https://gitee.com/gauhar' },
      { text: 'GitHub', link: 'https://github.com/GauharChan' },
    ],
    sidebar: [
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
      [
        '/git托管代码',
        'git托管代码'
      ],
    ]
  }
}