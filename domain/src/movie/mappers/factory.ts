import {movieEntity} from '../entities/factory'
import FromApiResponseToMovieEntityMapper from './FromApiResponseToMovieEntityMapper'

export const fromApiResponseToMovieEntityMapper = () => {
  return new FromApiResponseToMovieEntityMapper({movieEntity})
}
