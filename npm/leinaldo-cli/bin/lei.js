#!/usr/bin/env node

// const { program, Option, build } = require("commander");
const { Command, Option, build } = require("commander");
const program = new Command();

// 主命令
program
  .description("CLI to play apis")
  .version("0.1.0") // 版本选项 通过-V调用查看版本
  .argument("<string>", "string to split")
  .option("-f, --first [string]", "display just the first substring") // 一般来说类型用< >声明 ，[ ]代表该选项可用作布尔选项
  .option("-nf, --no-first", "not only first substring")
  .option("-s, --separator <char>", "separator charactor", ",") // 第三个参数代表默认值
  //   .requiredOption("-r, --requiredOption", "requiredOption") // 强制参数，不输入会报错
  .option("-n, --number [number...]", "specify numbers") // variadic option 可变参数选项 可以通过...声明，获取一个数组，遇到--停止
  .option(
    "-l, --letter <letters...>",
    "specify letters",
    (value, dummyPrevious) => {
      console.log("接收letter", value);
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        // throw new commander.InvalidArgumentError("Not a number.");
      } else {
        console.log("接收的letter可以被转换为数字", parsedValue);
      }
    }
  ) // 第三个参数可以指定函数来对选项参数进行处理
  .addOption(
    new Option("-ho, --hidden-option", "u can't see its help").hideHelp()
  ) // 另一种配置方法举例
  .addOption(
    new Option("-d, --drink <size>", "drink size").choices([
      "small",
      "medium",
      "large",
    ])
  )
  .command("hello", "sub command") // 子命令的第一种写法 需要创建子命令文件lei-<子命令名称>.js
  .action((str, options, command) => {
    const limit = options.first ? 1 : undefined;
    console.log("input string:", str);
    // 对输入的字符串进行split，-f为截取第一部分 -s是输入截断的符号
    console.log("output:", str.split(options.separator, limit));
    console.log("command options", options);
    console.log("command name", command.name());
  });

// 子命令的第二种写法
program
  .command("eat")
  .argument("[foods...]", "what i eat")
  .action((foods) => {
    if (foods.length > 0) {
      console.log("eat", foods.join("、"));
    } else {
      console.log("you eat nothing");
    }
  });
program.parse();
// node bin/lei.js wojiaowl -s i -f -r -n 1 2 3 4 -l wang lei
