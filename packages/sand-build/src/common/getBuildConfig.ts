import { getSandBuildConfig } from './stdConfig';
import {
  buildConfigFileName,
  buildTypeEnum,
  ENV,
  moduleTypeEnum,
} from '../constant';
import { getPath } from '../utils';
import { finalBuildConfig, buildConfigItem } from '../types';
import { factory } from '../rollup';
import { babelFactory } from '../babel/babelFactory';

type getBuildOpts = {
  sandbuildrcPath: string;
  env: string;
};

/**
 * 处理rc文件生成可用的配置文件
 * @param opts getBuildOpts
 */
function getBuildConfig(opts: getBuildOpts): finalBuildConfig {
  const { env, sandbuildrcPath } = opts;

  // 读取sandbuildrc.js配置,并且标准化配置
  const { libsOptions = [] } = getSandBuildConfig(
    sandbuildrcPath || getPath(process.cwd(), `./.${buildConfigFileName}.js`)
  );

  // rollup和babel配置集合
  let allConfigs = [] as buildConfigItem[];

  libsOptions.forEach((config) => {
    const { esm, cjs, umd } = config;
    if (esm) {
      // 需要构建esm
      const { buildType = buildTypeEnum.rollup } = esm;
      allConfigs = allConfigs.concat([
        {
          type: buildType,
          configs:
            buildType === buildTypeEnum.rollup
              ? factory(config, env, moduleTypeEnum.esm) // rollup esm
              : babelFactory(config, moduleTypeEnum.esm), // babel esm
        },
      ]);
    }
    if (cjs) {
      // 需要构建cjs
      const { buildType = buildTypeEnum.rollup } = cjs;
      allConfigs = allConfigs.concat([
        {
          type: buildType,
          configs:
            buildType === buildTypeEnum.rollup
              ? factory(config, env, moduleTypeEnum.cjs) // rollup cjs
              : babelFactory(config, moduleTypeEnum.cjs), // babel cjs
        },
      ]);
    }
    if (umd) {
      const { buildType = buildTypeEnum.rollup } = umd;
      const isProd = env === ENV.PROD;
      if (buildType === buildTypeEnum.rollup && isProd) {
        // 需要构建umd
        allConfigs = allConfigs.concat([
          {
            type: buildType,
            configs: factory(config, env, moduleTypeEnum.umd),
          },
        ]);
      }
    }
  });

  return {
    // 处理后的配置数组 类型：buildConfigItem[]
    allConfigs,
    // 读取 sandbuildrc.js 标准化后的配置
    packagesInfo: libsOptions,
  };
}

export { getBuildConfig };
