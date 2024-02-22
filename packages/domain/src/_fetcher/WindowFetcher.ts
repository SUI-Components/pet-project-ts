import type {ZodSchema} from 'zod'

import type {Fetcher, InlineErrorResponse} from './Fetcher'

export class WindowFetcher implements Fetcher {
  static create() {
    return new WindowFetcher()
  }

  async get<O>(url: string, schema?: ZodSchema): InlineErrorResponse<O> {
    return this.#request<O>(url, {method: 'GET'}, schema)
  }

  async #request<O>(url: string, options: RequestInit = {}, schema?: ZodSchema): InlineErrorResponse<O> {
    try {
      const json = await window.fetch(url, options).then(async resp => resp.json())

      if (schema != null) schema.parse(json)

      return [null, json as O]
    } catch (error) {
      return [error as Error, null]
    }
  }
}
