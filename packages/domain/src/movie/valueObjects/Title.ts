import {z} from 'zod'

export const TitleValueObjectValidation = z.object({
  value: z.string({required_error: 'value required'})
})

export class TitleValueObject {
  static create({value}: z.infer<typeof TitleValueObjectValidation>) {
    TitleValueObjectValidation.parse({value})
    return new TitleValueObject(value, false)
  }

  static empty() {
    return new TitleValueObject('', true)
  }

  constructor(
    private readonly _value: z.infer<typeof TitleValueObjectValidation>['value'],
    private readonly _empty: boolean
  ) {}

  get value() {return this._value} // eslint-disable-line 

  isEmpty() {return !this.value && this._empty} // eslint-disable-line
  toJSON() {return {value: this.value}} // eslint-disable-line 
}
