export default class HTTPMovieRepository {
  constructor({config, fetcher, movieEntityMapper}) {
    this._config = config
    this._fetcher = fetcher
    this._movieEntityMapper = movieEntityMapper
  }

  async getMovieDetail({id}: {id: string}): Promise<any> {
    const {BASE_API_URL, API_KEY}: {BASE_API_URL: string; API_KEY: string} =
      this._config
    const url = `${BASE_API_URL}/movie/${id}?api_key=${API_KEY}`

    return this._fetcher
      .get(url)
      .then(({data}) => this._movieEntityMapper.map(data))
  }
}
