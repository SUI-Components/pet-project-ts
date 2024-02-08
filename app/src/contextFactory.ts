import {Domain} from '@adv-ui/pet-domain'

export interface ContextType {
  domain: Domain
}

export default async (): Promise<ContextType> => {
  return {
    domain: Domain.create({
      BASE_API_URL: 'https://api.themoviedb.org/3',
      API_KEY: '73b32ac270598ba6ec4f69477e773e28'
    })
  }
}
