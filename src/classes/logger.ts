import chalk from "chalk";

export class Loggger {
  ok(arg: string) {
    console.log(`${chalk.cyan("(info)")} ${arg}`);
  }

  warn(arg: string) {
    console.log(`${chalk.yellowBright("(warn)")} ${arg}`);
  }

  error(arg: string) {
    console.log(`${chalk.red("(error)")} ${arg}`);
  }
}
