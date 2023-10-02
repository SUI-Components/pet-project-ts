import {tracer} from '@s-ui/decorators'

export default class GetMovieDetailUseCase {
  constructor({repository}) {
    this._repository = repository
  }

  @tracer({metric: 'get_movie_detail'})
  execute({id}) {
    return id
    // const movieEntity = this._repository.getMovieDetail({id})

    // return movieEntity.toJSON()
  }
}
