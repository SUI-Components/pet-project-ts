import Helmet from '@s-ui/react-head'
import {Link} from '@s-ui/react-router'
import type {MovieEntity} from '@adv-ui/pet-domain/lib/movie/entities/MovieEntity'

import type {ContextType} from '../../contextFactory'

export default function Detail({error, movie}: {error: Error; movie: ReturnType<MovieEntity['toJSON']>}): JSX.Element {
  if (error !== null) return <h1>{error.message}</h1>
  return (
    <>
      <Helmet>
        <link rel="canonical" href="http://spa.mock/" />
      </Helmet>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <h1>{movie.title}</h1>
      <section>
        <aside>
          <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} />
        </aside>
        <p>{movie.description}</p>
      </section>
    </>
  )
}

Detail.getInitialProps = async ({context, routeInfo}: {context: ContextType; routeInfo: {params: {id: string}}}) => {
  const [error, movie] = await context.domain.GetMovieDetailUseCase.execute({id: routeInfo.params.id})
  return {error, movie: movie?.toJSON()}
}
