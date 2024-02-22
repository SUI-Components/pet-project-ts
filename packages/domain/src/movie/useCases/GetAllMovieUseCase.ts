import {inlineError, tracer} from '@s-ui/decorators'

import type {Config} from '../../_config'
import type {InlineError} from '../../_kernel/types'
import HTTPMovieRepository from '../repositories/HTTPMovieRepository'
import {MoviesListValueObject} from '../valueObjects/MoviesListValueObject'

class GetAllMovieUseCase {
  constructor(private readonly _repository: HTTPMovieRepository) {}

  static create(config: Config) {
    return new GetAllMovieUseCase(HTTPMovieRepository.create(config))
  }

  @tracer({metric: 'GetAllMovieUseCase'})
  @inlineError
  async execute(): Promise<MoviesListValueObject> {
    const [error, movie] = (await this._repository.getAll()) as unknown as InlineError<MoviesListValueObject>

    if (error !== null) {
      return MoviesListValueObject.empty()
    }

    return movie
  }
}

export const factory = GetAllMovieUseCase.create
