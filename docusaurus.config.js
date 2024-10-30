// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '应用上云平台',
  tagline: '应用上云平台',
  url: '/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',
  organizationName: 'Cloud Native',
  projectName: 'Cloud Native',
  noIndex: true,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '应用上云平台',
        logo: {
          alt: 'Logo',
          src: 'img/logo.ico',
        },
        items: [
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'docs',
            label: '文档',
          },
          {
            to: '/api/Intro',
            label: 'OpenAPI',
            position: 'left'
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
};

module.exports = config;
