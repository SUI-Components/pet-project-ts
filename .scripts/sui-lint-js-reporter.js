import { Reporter } from './Reporter'
import {Table} from 'console-table-printer'


export class JSReporter extends Reporter {
  #data

  static RULES_TO_SEND = ['sui/']

  static async create() {
    return new JSReporter()
  }

  constructor() {
    super()
  }

  map(results) {
    const stats = results.reduce((rulesIDs, entry) => {
      const repitedRulesFailed = entry.messages.map(message => message.ruleId)
      const rulesFailed = new Set([...repitedRulesFailed])

      rulesFailed.forEach(rule => {
        rulesIDs[rule] = rulesIDs[rule] ?? []
        rulesIDs[rule].push(entry.filePath)
      })
      return rulesIDs
    }, {})

    this.#data = {
      totalFiles: results.length,
      ...stats
    }

    return this
  }

  async send() {
    if(this.#data === undefined){
      throw new Error('[sui-lint] No data to send. Maybe you must call to map before')
    }

    const repository = await this._getRepository()

    const {totalFiles, ...rest} = this.#data
    const statsEntries = Object.entries(rest).map(entry => {
      const [rule, failedFiles] = entry
      if(!JSReporter.RULES_TO_SEND.some(whiteRule => rule.startsWith(whiteRule))) return false

      return [rule, (failedFiles.length * 100) / totalFiles]
    }).filter(Boolean)

    const stats = Object.fromEntries(statsEntries)
    const signals = []
    Object.entries(stats).forEach(entry => {
      const [rule, percentageOfFails] = entry
      const signal = {ruleName: rule, numberOfFails: percentageOfFails, repository}
      this.logger.webRuleFailed(signal)
      signals.push(signal)
    })

    // const p = new Table({title: 'List of Signals that will be send to DD'})
    // signals.forEach(signal => p.addRow(signal))
    // p.printTable()


  }
}

