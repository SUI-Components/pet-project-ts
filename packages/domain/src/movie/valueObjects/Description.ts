import {z} from 'zod'

export const DescriptionValueObjectValidation = z.object({
  value: z.string({required_error: 'value required'})
})

export class DescriptionValueObject {
  static create({value}: z.infer<typeof DescriptionValueObjectValidation>) {
    DescriptionValueObjectValidation.parse({value})
    return new DescriptionValueObject(value, false)
  }

  static empty() {
    return new DescriptionValueObject('', true)
  }

  constructor(
    private readonly _value: z.infer<typeof DescriptionValueObjectValidation>['value'],
    private readonly _empty: boolean
  ) {}

  get value() {
    return this._value
  }

  isEmpty() {
    return this.value === undefined && this._empty
  }

  toJSON() {
    return {value: this.value}
  }
}
