import {useRouter} from '@s-ui/react-router'

export default function HomePage(): JSX.Element {
  const router = useRouter()

  return <h1>Detail page for {router.params.name}</h1>
}
