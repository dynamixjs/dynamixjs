import chalk from "chalk"

const l = console.log

const printInfoText = (msg: string) => l(chalk.bgBlue.white(' info '), msg)

export { printInfoText }