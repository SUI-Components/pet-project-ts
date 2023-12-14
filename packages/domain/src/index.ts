import {EntryPointFactory} from '@s-ui/domain'

import config from './config/index'

const useCases = {
  get_movie_detail_use_case: async () =>
    await import('./movie/useCases/factories/getMovieDetailUseCase')
}

const EntryPoint = new EntryPointFactory({config, useCases})

export default new EntryPoint()