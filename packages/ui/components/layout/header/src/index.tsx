export interface LayoutHeaderProps {
  name: string
  lastname: string
  dni?: number
  isActive?: boolean
}

export default function LayoutHeader({
  name,
  lastname
}: LayoutHeaderProps): JSX.Element {
  return (
    <div className="sui-LayoutHeader">
      <h1>
        {name} - {lastname}
      </h1>
    </div>
  )
}

LayoutHeader.displayName = 'LayoutHeader'
