// @ts-check

const {themes} = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "조현수 · 김용성 청첩장",
  favicon: "img/favicon.ico?v=3",

  url: "https://hscho-yskim.github.io",
  baseUrl: "/",

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/svg+xml",
        href: "/img/favicon.svg?v=3",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        href: "/img/apple-touch-icon.png?v=3",
      },
    },
  ],

  organizationName: "hscho-yskim",
  projectName: "hscho-yskim.github.io",
  deploymentBranch: "gh-pages",
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  customFields: {
    // Naver Cloud Platform Maps Client ID.
    // Web 서비스 URL allowlist에 https://hscho-yskim.github.io 추가 필요.
    naverMapsClientId: "1li32iz1ka",
  },

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
