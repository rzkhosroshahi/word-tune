import { TextStylesNames } from './StyleText/StyleText.types'

export interface FormProps {
  onSubmit: (text: string, style: TextStylesNames) => void
  loading: boolean
  sentenceMode: boolean
  improvedSentence: string
  onClear: () => void
}
