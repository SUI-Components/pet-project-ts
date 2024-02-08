import {z} from 'zod'

export const IDValueObjectValidation = z.object({
  value: z.string({required_error: 'value required'})
})

export class IDValueObject {
  static create({value}: z.infer<typeof IDValueObjectValidation>) {
    IDValueObjectValidation.parse(value)
    // return new IDValueObject(value, false)
  }

  static empty() {
    // return new IDValueObject('', true)
  }

  constructor(
    private readonly _value: z.infer<typeof IDValueObjectValidation>['value'],
    private readonly _empty: boolean
  ) {}

  get value() {
    return this._value
  }

  isEmpty() {
    return this.value === undefined && this._empty
  }

  toJSON() {
    return {_value: this.value}
  }
}
