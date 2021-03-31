import { throwError, getDefault, getPath } from '../utils';
import { libBuildOptions, sandBuildRcOptions } from '../types';

/**
 * 该方法用于标准化sandbuildrc.js中的配置
 * libsOptions 标准化库构架配置
 * @param {*} option
 */
function stdLibConfig(options: libBuildOptions): libBuildOptions {
  const {
    // 入口文件，绝对路径
    entry = '',
    // 包的目录
    pkgPath = '',
    // 构建出来的文件名, 必填
    bundleName = '',
    // 是否单独提取 css 文件，默认是 false，只有 rollup 构建下生效。
    cssExtract = false,
    // 配置 esm 的构建方式，可以配置 rollup 或 babel。
    esm = undefined,
    // 配置 cjs 的构建方式，可以配置 rollup 或 babel。
    cjs = undefined,
    // 配置 umd 的构建方式，umd 只支持 rollup 构建。
    umd = undefined,
    // 是否是 ts,默认 false。
    isTs = false,
    // cjs模式可以指定node版本 默认6。其他模式下不生效
    nodeVersion = '6',
    // babel扩展
    babelConfig = undefined,
    // 别名,内置了@ -> src 的别名。只有 rollup 构建时会生效
    alias = [],
    // 替换配置replace的漏出
    replaceConfig = {},
    // 全局模块，只有 rollup，umd 模式下生效。
    umdGlobals = {},
    // 是否开启babelruntime，把 helper 方法提取到 @babel/runtime 里。一定要在 dependencies 里有 @babel/runtime 依赖
    babelRuntime = false,
  } = options;

  if (!pkgPath) {
    throwError('pkgPath为必填项');
  }

  // 读取package.json
  let pkgJson = require(getPath(pkgPath, './package.json'));

  if (!pkgJson) {
    pkgJson = {};
  }

  // 返回标准化后的构建选项
  return {
    entry,
    pkgPath,
    bundleName,
    esm,
    cjs,
    umd,
    pkg: pkgJson,
    isTs: !!isTs,
    cssExtract: !!cssExtract,
    alias,
    umdGlobals,
    babelRuntime,
    babelConfig,
    replaceConfig,
    nodeVersion,
  };
}

/**
 * 读取.sandbuildrc.js配置,并且标准化
 * @param {*} path 配置所在路径
 */
function getSandBuildConfig(sandBuildPath: string): sandBuildRcOptions {
  // 读取目标 .sandbuildrc.js 文件
  const options = getDefault(require(sandBuildPath));
  const { libsOptions = [] } = options;

  // 标准化后的配置
  const stdOpts = { libsOptions: [] as libBuildOptions[] };

  if (libsOptions && Array.isArray(libsOptions) && libsOptions.length > 0) {
    const stdconfig = [];
    for (let n = 0; n < libsOptions.length; n++) {
      const option = libsOptions[n];
      stdconfig.push(stdLibConfig(option));
    }
    stdOpts.libsOptions = stdconfig;
  }

  return stdOpts;
}

export { getSandBuildConfig };
