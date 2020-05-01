const path = require('path');
const CracoAlias = require('craco-alias');

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
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
  babel: {
    plugins: [
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
