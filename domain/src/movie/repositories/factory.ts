import {FetcherFactory} from '@s-ui/domain'

import {movieEntity} from '../entities/factory'
import {fromApiResponseToMovieEntityMapper} from '../mappers/factory'
import HTTPMovieRepository from './HTTPMovieRepository'

export const httpMovieRepository = ({config}) => {
  return new HTTPMovieRepository({
    config,
    fetcher: FetcherFactory.httpFetcher(config),
    movieEntityMapper: fromApiResponseToMovieEntityMapper({config, movieEntity})
  })
}
