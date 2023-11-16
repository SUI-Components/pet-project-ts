import {httpMovieRepository} from '../../repositories/factory'
import GetMovieDetailUseCase from '../GetMovieDetailUseCase'

export default ({config}) => {
  return new GetMovieDetailUseCase({
    config,
    repository: httpMovieRepository({config})
  })
}
