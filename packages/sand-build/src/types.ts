import { Alias } from '@rollup/plugin-alias';

/**
 * 构建方式
 */
type buildMethod = 'rollup' | 'babel';

/**
 * 构建类型
 */
type buildType = {
  buildType: buildMethod;
};

/**
 * babel配置
 */
type extBabelOptions = {
  presets: [];
  plugins: [];
};

/**
 * rollup umd 构建时的全局配置
 */
type umdGlobalsOptions = {
  [key: string]: string;
};

/**
 * rollup 构建时替换配置
 */
type replaceOptions = {
  [key: string]: string;
};

/**
 * 获取babel配置
 */
export type getBabelConfigOpts = {
  // 构建方式
  buildType: string;
  // 模块化类型
  moduleType: string;
  // cjs node版本号
  nodeVersion: string;
  // babelruntime 优化
  babelRuntime: boolean;
  // 文件全路径
  filePath?: string;
};

/**
 * rollup配置
 */
export type rollupConfig = {
  input: string;
  output: any;
  plugins: any[];
  onwarn: any;
  external: any;
};

/**
 * 构建配置的最小粒度
 */
export type buildConfigItem = {
  type: string;
  configs: any[];
};

/**
 * 配置文件类型
 */
export type sandBuildRcOptions = {
  libsOptions: libBuildOptions[];
};

/**
 * 最终的构建产物
 */
export type finalBuildConfig = {
  // 处理后的配置数组 类型：buildConfigItem[]
  allConfigs: buildConfigItem[];
  // 读取 sandbuildrc.js 标准化后的配置
  packagesInfo: libBuildOptions[];
};

/**
 * 获取rollup插件
 */
export type rollupPluginOpts = {
  // 构建类型esm | cjs | umd
  moduleType: string;
  // 是否单独提起css文件
  cssExtract: boolean;
  // 构建环境
  env: string;
  // 是不是ts
  isTs: boolean;
  // 别名配置
  aliasConfig: Alias[];
  // 包名
  pkgName: string;
  // isUmd
  isUmd: boolean;
  // 是否开启babelruntime
  babelRuntime: boolean;
  // packages文件绝对路径
  packagesPath: string;
  // 覆盖的babel配置
  babelConfig: (opt: extBabelOptions) => extBabelOptions | undefined;
  // replace插件漏出的扩展配置，
  replaceConfig: replaceOptions;
  // cjs模式下的node版本
  nodeVersion: string;
};

/**
 * 库构建时的配置文件
 */
export type libBuildOptions = {
  // 包的目录。(rollup生效、babel生效)
  pkgPath: string;
  // 入口文件，绝对路径。(rollup生效、babel不生效)
  entry: string;
  // 构建出来的文件名。 (rollup生效、babel不生效)
  bundleName: string;
  // 是否单独提取 css 文件，默认是 false。(rollup生效、babel不生效)
  cssExtract: boolean;
  // 配置 esm 的构建方式。(rollup生效、babel生效)
  esm: buildType;
  // 配置 cjs 的构建方式。(rollup生效、babel生效)
  cjs: buildType;
  // 配置 umd 的构建方式。(rollup生效、babel不生效)
  umd: buildType;
  // 是否是 ts,默认 false。(rollup生效、babel生效)
  isTs: boolean;
  // cjs模式可以指定node版本 默认6。(rollup生效、babel生效)
  nodeVersion: string;
  // babel扩展。(rollup生效、babel生效)
  babelConfig: (opt: extBabelOptions) => extBabelOptions | undefined;
  // 别名,内置了@ -> src 的别名。(rollup生效、babel不生效)
  alias: Alias[];
  // 是否开启babelruntime，把 helper 方法提取到 @babel/runtime 里。一定要在 dependencies 里有 @babel/runtime 依赖。 (rollup生效、babel生效)
  babelRuntime: boolean;
  // 替换配置replace的漏出
  replaceConfig: replaceOptions;
  // 全局模块。(rollup生效、babel不生效)
  umdGlobals: umdGlobalsOptions;
  // package.json内容
  pkg: any;
};
