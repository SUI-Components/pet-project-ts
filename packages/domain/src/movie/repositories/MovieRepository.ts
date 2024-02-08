import type {IDValueObject} from '../../_kernel/valueObjects/IDValueObject'
import type {MovieEntity} from '../entities/MovieEntity'
import type {MoviesListValueObject} from '../valueObjects/MoviesListValueObject'

export interface MovieRepository {
  getMovieDetail: (id: IDValueObject) => Promise<MovieEntity>
  getAll: () => Promise<MoviesListValueObject>
}
