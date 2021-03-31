/**
 * 环境
 */
const ENV = {
  PROD: 'production',
  DEV: 'development',
};

// 产物类型枚举
const moduleTypeEnum = {
  cjs: 'cjs',
  esm: 'esm',
  umd: 'umd',
};

// 构建方式类型
const buildTypeEnum = {
  rollup: 'rollup',
  babel: 'babel',
};

// 构建配置文件名
const buildConfigFileName = 'sandbuildrc';

// 需要处理的文件
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

export { ENV, buildTypeEnum, moduleTypeEnum, buildConfigFileName, extensions };
