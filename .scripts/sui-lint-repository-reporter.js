import { Reporter } from "./Reporter"
export class RepositoryReporter extends Reporter{
  #data

  static create() {
    return new RepositoryReporter()
  }

  constructor(){
    super()
  }

  map(results){
    this.#data = results.monitorings
    return this
  }

  async send(){
    if(this.#data === undefined){
      throw new Error('[sui-lint] No data to send. Maybe you must call to map before')
    }

    const repository = await this._getRepository()

    this.#data.forEach(signal => {
      this.logger.webGoldenPath({ruleName: signal.rule, value: signal.value, repository})
    })
  }

}
