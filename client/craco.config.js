const path = require('path');
const CracoAlias = require('craco-alias');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: path.resolve(__dirname, 'tsconfig.paths.json'),
      },
    },
  ],
  webpack: {
    plugins: [],
    configure: (webpackConfig, { env }) => {
      if (env === 'development') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'server' }));
      }

      if (env === 'production') {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'disabled', generateStatsFile: true }),
        );
      }

      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      '@loadable/babel-plugin',
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/core',
          libraryDirectory: process.env.NODE_ENV === 'test' ? '' : 'esm',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: process.env.NODE_ENV === 'test' ? '' : 'esm',
          camel2DashComponentName: false,
        },
        'icons',
      ],
    ],
  },
  jest: {
    configure: {
      clearMocks: true,
    },
  },
};
