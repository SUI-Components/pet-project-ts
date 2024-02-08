import {z} from 'zod'

import {MovieEntity} from '../entities/MovieEntity'

const MoviesListValueObjectValidations = z.object({
  value: z.instanceof(MovieEntity, {message: 'value required'}).array()
})

export class MoviesListValueObject {
  static from({value}: z.infer<typeof MoviesListValueObjectValidations>) {
    MoviesListValueObjectValidations.parse({value})
    return new MoviesListValueObject(value, false)
  }

  static empty() {
    return new MoviesListValueObject([], true)
  }

  constructor(
    private readonly _value: z.infer<typeof MoviesListValueObjectValidations>['value'],
    private readonly _empty: boolean
  ) {}

  get value() {return this._value} // eslint-disable-line 

  isEmpty() {return !this.value && this._empty} // eslint-disable-line
  toJSON() {return {value: this.value.map(m => m.toJSON())}} // eslint-disable-line 
}
