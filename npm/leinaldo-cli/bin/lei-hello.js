#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

// 子程序
program
  .argument("<name>", "username of the people greeted")
  .option("-hb, --hobby <string>", "hobby of the person greeted")
  //   .option("--username2", "name of the person greeted")
  .action((username, options) => {
    console.log("options", options);
    console.log("1 hello!!!", username);
    if (options.hobby) {
      console.log("you like", options.hobby);
    }
  });
program.parse(process.argv);

console.log("2 hello!!!", program.args[0]);
console.log("opts:", program.opts(), "args:", program.args);

// node bin/lei hello wl -h football
/* 
options { hobby: 'football' }
1 hello!!! wl
you like football
2 hello!!! wl
opts: { hobby: 'football' } args: [ 'wl' ]
 */
