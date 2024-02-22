export type InlineErrorResponse<O> = Promise<[null, O] | [Error, null]>

export interface Fetcher {
  get: <O>(url: string) => InlineErrorResponse<O>
}
