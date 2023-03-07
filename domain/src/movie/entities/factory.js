import MovieEntity from './MovieEntity.js'

export const movieEntity = ({
  description,
  genres,
  homepage,
  id,
  image,
  language,
  productionCompanies,
  rating,
  releaseDate,
  runtime,
  tagline,
  title
}) => {
  return new MovieEntity({
    description,
    genres,
    homepage,
    id,
    image,
    language,
    productionCompanies,
    rating,
    releaseDate,
    runtime,
    tagline,
    title
  })
}
