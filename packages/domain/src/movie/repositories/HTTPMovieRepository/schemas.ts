import {z} from 'zod'

export const GetMovieDetailResponseSchema = z.object({
  id: z.number({required_error: 'ID required'}),
  title: z.string({required_error: 'title required'}),
  overview: z.string({required_error: 'overview required'}),
  poster_path: z.string({required_error: 'poster_path required'})
})
export type GetMovieDetailResponseType = z.infer<typeof GetMovieDetailResponseSchema>

export const GetAllMoviesResponseSchema = z.object({
  page: z.number({required_error: 'page required'}),
  results: z.array(GetMovieDetailResponseSchema)
})
export type GetAllMoviesResponseType = z.infer<typeof GetAllMoviesResponseSchema>
