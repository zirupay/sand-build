/**
 * 获取依赖配置dependencies和peerDependencies的集合
 * @param {*} param0
 */
function getDepsConfig(pkg: any): string[] {
  const depArray: string[] = [];
  return depArray
    .concat(Object.keys(pkg.dependencies || {}))
    .concat(Object.keys(pkg.peerDependencies || {}));
}

export { getDepsConfig };
