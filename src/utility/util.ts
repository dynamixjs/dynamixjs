import chalk from "chalk"

const l = console.log

const printInfoText = (msg: string) => l(chalk.bgBlue.bold.white(' info '), msg)

export { printInfoText }