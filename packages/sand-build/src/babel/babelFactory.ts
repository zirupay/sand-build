import { babelBuild } from './babelBuild';
import { libBuildOptions } from '../types';

/**
 * babel构建生产器
 * @param {*} config 配置
 * @param {*} env 环境
 * @param {*} moduleType 模块类型
 */
function babelFactory(config: libBuildOptions, moduleType: string) {
  const { pkgPath, isTs, babelConfig, nodeVersion, babelRuntime } = config;

  // babel构建factory的数组
  const babelBuildList = [];

  babelBuildList.push(async (options: any) => {
    // 是否开启监听
    const { watch = false } = options;
    await babelBuild({
      pkgPath,
      watch,
      moduleType,
      isTs,
      babelConfig,
      nodeVersion,
      babelRuntime,
    });
  });

  return babelBuildList;
}

export { babelFactory };
