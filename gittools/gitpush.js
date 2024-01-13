import * as fs from 'fs'
import { simpleGit } from 'simple-git'
import { v4 } from 'uuid'

const cwd = process.cwd()
const git = simpleGit(cwd)


console.log('Deploying to github')

const gitPush = async () => {
    if (!fs.existsSync(`${cwd}/.git`)) {
        await git.init()
        await git.addRemote('origin', 'https://dynamixjs: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@github.com/dynamixjs/dynamixjs.git', { })
    }

    await git.add('./')
    await git.commit(v4(), '.')
    await git.push('origin', 'master')

    console.log('Complete.')
    
}  


gitPush()