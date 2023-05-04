import { IconNames } from '../../Icons/Icon'

export enum TextStyles {
  general = 'General',
  casual = 'Casual',
  formal = 'Formal',
  short = 'Short',
  long = 'Long',
}

export type TextStylesNames = keyof typeof TextStyles

export interface StyleTextProps {
  selected: TextStylesNames
  onSelect: (name: TextStylesNames) => void
}

export type stylesType = {
  type: TextStylesNames,
  icon: IconNames
}
