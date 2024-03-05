import {exec as execNode}  from 'child_process'
import {promisify} from 'util'

import {initTracker, createServerLogger}  from '@adv-ui/logger'

const exec = promisify(execNode)
initTracker({appName: 'adevinta', devMode: false})

export class Reporter {
  logger

  constructor() {
    this.logger = createServerLogger()
  }

  async _getRepository(){
    const {stdout: url} = await exec(`git config --get remote.origin.url`).catch(
      () => 'git@github.com:sui/remote-url.git'
    )

    const cleanUrl = url.trim().replace('\n', '')
    const isHttp = cleanUrl.startsWith('https://')

    if (isHttp) {
      return cleanUrl.split('/')[2]
    } else {
      const [, address] = cleanUrl.split('@')
      return address.split('/')[1].replace('.git', '')
    }
  }
}
