// @ts-check

const {themes} = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "조현수 · 김용성 청첩장",
  favicon: "img/favicon.ico",

  url: "https://hscho-yskim.github.io",
  baseUrl: "/",

  organizationName: "hscho-yskim",
  projectName: "hscho-yskim.github.io",
  deploymentBranch: "gh-pages",
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "조현수 · 김용성",
        items: [],
      },
      footer: {
        style: "dark",
        copyright: `© ${new Date().getFullYear()} 조현수 · 김용성`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
