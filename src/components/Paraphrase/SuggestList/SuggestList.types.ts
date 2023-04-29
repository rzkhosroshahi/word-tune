import { Suggestions } from '../Paraphrase.types'

export interface SuggestListProps {
  suggestions?: Suggestions[]
  loading: boolean
  sentenceMode: boolean
  onClear: () => void
  onClick: (text: string) => void
}
