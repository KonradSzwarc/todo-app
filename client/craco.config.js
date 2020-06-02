const path = require('path');
const CracoAlias = require('craco-alias');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerPort: 8888,
        defaultSizes: 'gzip',
      }),
    ],
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
};
