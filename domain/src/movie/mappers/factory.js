import {movieEntity} from '../entities/factory.js'
import FromApiResponseToMovieEntityMapper from './FromApiResponseToMovieEntityMapper.js'

export const fromApiResponseToMovieEntityMapper = () => {
  return new FromApiResponseToMovieEntityMapper({movieEntity})
}
