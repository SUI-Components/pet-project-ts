import type {Base} from './_config/index.js'
import type {InlineError} from './_kernel/types/index.js'
import type {MovieEntity} from './movie/entities/MovieEntity.js'
import type {GetMovieDetailUseCaseInputType} from './movie/useCases/GetMovieDetailUseCase'
import type {MoviesListValueObject} from './movie/valueObjects/MoviesListValueObject.js'
import {Config} from './_config'

export class Domain {
  #config: Config

  static create(config: Base) {
    return new Domain(config)
  }

  constructor(config: Base) {
    this.#config = Config.create(config)
  }

  get config() {
    return this.#config
  }

  get GetMovieDetailUseCase() {return this.#getter<GetMovieDetailUseCaseInputType, MovieEntity>(async () => import('./movie/useCases/GetMovieDetailUseCase'))} // eslint-disable-line  
  get GetAllMovieUseCase() {return this.#getter<void, MoviesListValueObject>(async () => import('./movie/useCases/GetAllMovieUseCase'))} // eslint-disable-line  

  #getter<I, O>(loader: Function) {
    return {
      execute: async (input: I): Promise<InlineError<O>> => {
        // @ts-expect-error
        const factory = await loader().then(mod => mod.factory)
        const uc = factory(this.#config)

        return uc.execute(input) as unknown as InlineError<O>
      }
    }
  }
}
