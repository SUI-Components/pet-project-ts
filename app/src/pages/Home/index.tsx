/* eslint @typescript-eslint/restrict-template-expressions:0 */

import {type MouseEvent, useCallback} from 'react'

import {useSuiContext} from '@s-ui/react-context'
import Helmet from '@s-ui/react-head'
import {Link} from '@s-ui/react-router'
import {MoviesListValueObject} from '@adv-ui/pet-domain/lib/movie/valueObjects/MoviesListValueObject'

import type {ContextType} from '../../contextFactory'

export default function HomePage({
  error,
  movies
}: {
  error: Error
  movies: ReturnType<MoviesListValueObject['toJSON']>['value']
}): JSX.Element {
  const {domain} = useSuiContext() as unknown as ContextType
  const prefetch = useCallback(
    async (evt: MouseEvent<HTMLAnchorElement>) => {
      const id = evt.currentTarget.getAttribute('data-id')
      if (id === null) return

      const [error, movie] = await domain.GetMovieDetailUseCase.execute({id})
      if (error != null) return

      new Image().src = `https://image.tmdb.org/t/p/w500${movie.image as string}`
    },
    [domain.GetMovieDetailUseCase]
  )

  if (error !== null) return <h1>{error.message}</h1>

  return (
    <>
      <Helmet>
        <link rel="canonical" href="http://spa.mock/" />
      </Helmet>
      <h1>Popular movies</h1>
      {movies.map(movie => (
        <p key={movie.id}>
          <Link to={`/movie/${movie.id}`} data-id={movie.id} onMouseEnter={prefetch}>
            {movie.title}
          </Link>
        </p>
      ))}
    </>
  )
}

HomePage.getInitialProps = async ({context}: {context: ContextType}) => {
  const [error, movies] = await context.domain.GetAllMovieUseCase.execute()
  return {error, movies: movies?.toJSON().value}
}
