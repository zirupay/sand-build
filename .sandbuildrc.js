const path = require('path');

module.exports = {
  // lib配置
  libsOptions: [
    {
      entry: path.resolve(__dirname, './packages/sand-build/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/sand-build'),
      bundleName: 'index',
      isTs: true,
      cjs: {
        buildType: 'bable',
      },
    },
  ],
};
