export interface Country {
  map(arg0: (country: Country) => import('react').JSX.Element): unknown
  id: number
  title: string
  flag: string
}
