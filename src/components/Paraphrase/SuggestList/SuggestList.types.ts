import { Suggestions } from '../Paraphrase.types'

export interface SuggestListProps {
  suggestions?: Suggestions[]
  loading: boolean
  onClear: () => void
}
