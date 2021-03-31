#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const { build } = require('../lib/index');
const pkg = require('../package.json');

/**
 * 版本号指令
 */
program.version(`${pkg.version}`, '-v, --version');

/**
 * build命令 支持3个参数 -w -e -l
 * -w 监听模式
 * -e 构建环境
 * -l 是否创建软连
 */
program
  .command('build')
  .description('sand-build build --env <env> --watch --link')
  // build的子命令
  .option('-w, --watch', '开启监听')
  .option('-e, --env <env>', '构建方式（production||development')
  .option(
    '-l, --link',
    '构建完成后在根目录下的node_modules下创建软链接链接到构建产物方便调试'
  )
  .action(build); // 命中指令后指令build回调

console.log(chalk.green(`🛠 ${pkg.name}:  ${pkg.version}`));

program.parse(process.argv);
