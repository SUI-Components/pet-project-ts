import {z} from 'zod'

export const ImageValueObjectValidation = z.object({
  value: z.string({required_error: 'value required'})
})

export class ImageValueObject {
  static create({value}: z.infer<typeof ImageValueObjectValidation>) {
    ImageValueObjectValidation.parse({value})
    return new ImageValueObject(value, false)
  }

  static empty() {
    return new ImageValueObject('', true)
  }

  constructor(
    private readonly _value: z.infer<typeof ImageValueObjectValidation>['value'],
    private readonly _empty: boolean
  ) {}

  get value() {return this._value} // eslint-disable-line 

  isEmpty() {return !this.value && this._empty} // eslint-disable-line
  toJSON() {return {value: this.value}} // eslint-disable-line 
}
