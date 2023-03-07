import {httpMovieRepository} from '../../repositories/factory.js'
import GetMovieDetailUseCase from '../GetMovieDetailUseCase.js'

export default ({config}) => {
  return new GetMovieDetailUseCase({
    config,
    repository: httpMovieRepository({config})
  })
}
