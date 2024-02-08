import {z} from 'zod'

import {inlineError, tracer} from '@s-ui/decorators'

import type {Config} from '../../_config'
import type {InlineError} from '../../_kernel/types'
import {IDValueObject} from '../../_kernel/valueObjects/IDValueObject'
import {MovieEntity} from '../entities/MovieEntity'
import HTTPMovieRepository from '../repositories/HTTPMovieRepository'

const GetMovieDetailUseCaseInputSchema = z.object({id: z.string({required_error: 'ID required'})})
export type GetMovieDetailUseCaseInputType = z.infer<typeof GetMovieDetailUseCaseInputSchema>

class GetMovieDetailUseCase {
  constructor(private readonly _repository: HTTPMovieRepository) {}

  static create(config: Config) {
    return new GetMovieDetailUseCase(HTTPMovieRepository.create(config))
  }

  @tracer({metric: 'GetMovieDetailUseCase'})
  @inlineError
  async execute({id}: GetMovieDetailUseCaseInputType): Promise<MovieEntity> {
    const [error, movie] = (await this._repository.getMovieDetail(
      IDValueObject.create({value: id})
    )) as unknown as InlineError<MovieEntity>

    if (error !== null) {
      return MovieEntity.empty()
    }

    return movie
  }
}

export const factory = GetMovieDetailUseCase.create
