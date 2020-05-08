module.exports = {
  title: "gauhar's blog",
  description: 'just a blog',
  themeConfig: {
    logo: '/assets/logo.jpg',
    sidebarDepth: 3,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      [
        '/常用代码',
        '常用代码'
      ],
      [
        '/那些坑',
        '那些坑'
      ],
      [
        '/note',
        'note'
      ],
    ]

  }
}