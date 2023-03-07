import {FetcherFactory} from '@s-ui/domain'

import {movieEntity} from '../entities/factory.js'
import {fromApiResponseToMovieEntityMapper} from '../mappers/factory.js'
import HTTPMovieRepository from './HTTPMovieRepository.js'

export const httpMovieRepository = ({config}) => {
  return new HTTPMovieRepository({
    config,
    fetcher: FetcherFactory.httpFetcher(config),
    movieEntityMapper: fromApiResponseToMovieEntityMapper({config, movieEntity})
  })
}
