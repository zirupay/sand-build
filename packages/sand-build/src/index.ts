import { ENV } from './constant';
import { getBuildConfig } from './common/getBuildConfig';
import {} from './utils';

/**
 * 构建选项
 */
type buildOptions = {
  // 环境
  env?: string;
  // 监听模式
  watch?: string;
  // 软连接
  link?: string;
  // 构建配置
  sandbuildrcPath?: string;
  // 构建完成后回调
  buildFinishCallback?: () => void;
};

/**
 * build指令回调
 * @param {*} options 指令入参
 */
async function build(options: buildOptions) {
  const {
    // 构建环境
    env = ENV.PROD,
    // 监听模式
    watch = false,
    // 指定sandbuildrc入口只有debug时会有此入参
    sandbuildrcPath = '',
  } = options;

  const { packagesInfo, allConfigs } = getBuildConfig({ env, sandbuildrcPath });
}

export default build;
