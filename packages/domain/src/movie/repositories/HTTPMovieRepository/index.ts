import {inlineError} from '@s-ui/decorators'

import {Config} from '../../../_config'
import {WindowFetcher} from '../../../_fetcher/WindowFetcher'
import type {IDValueObject} from '../../../_kernel/valueObjects/IDValueObject'
import {MovieEntity} from '../../entities/MovieEntity'
import {MoviesListValueObject} from '../../valueObjects/MoviesListValueObject'
import type {MovieRepository} from './../MovieRepository'
import {
  type GetAllMoviesResponseType,
  type GetMovieDetailResponseType,
  GetAllMoviesResponseSchema,
  GetMovieDetailResponseSchema
} from './schemas'

export default class HTTPMovieRepository implements MovieRepository {
  static create(config: Config) {
    return new HTTPMovieRepository(config, WindowFetcher.create())
  }

  constructor(private readonly _config: Config, private readonly _fetcher: WindowFetcher) {}

  @inlineError
  async getMovieDetail(id: IDValueObject): Promise<MovieEntity> {
    const BASE_API_URL = this._config.get('BASE_API_URL') as string
    const API_KEY = this._config.get('API_KEY') as string

    const url = `${BASE_API_URL}/movie/${id.value}?api_key=${API_KEY}`

    return this._fetcher.get<GetMovieDetailResponseType>(url, GetMovieDetailResponseSchema).then(([error, json]) => {
      if (error !== null) return MovieEntity.empty()

      return MovieEntity.create({...json, description: json.overview, image: json.poster_path, id: String(json.id)})
    })
  }

  @inlineError
  async getAll(): Promise<MoviesListValueObject> {
    const BASE_API_URL = this._config.get('BASE_API_URL') as string
    const API_KEY = this._config.get('API_KEY') as string

    const url = `${BASE_API_URL}/movie/popular?api_key=${API_KEY}`

    return this._fetcher.get<GetAllMoviesResponseType>(url, GetAllMoviesResponseSchema).then(([error, moviesJSON]) => {
      if (error !== null) return MoviesListValueObject.empty()

      return MoviesListValueObject.from({
        value: moviesJSON.results.map(json => {
          return MovieEntity.create({...json, description: json.overview, image: json.poster_path, id: String(json.id)})
        })
      })
    })
  }
}
