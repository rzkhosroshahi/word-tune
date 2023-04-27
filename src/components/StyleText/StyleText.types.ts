export enum TextStyles {
  general = 'General',
  casual = 'Casual',
  formal = 'Formal',
  short = 'Short',
}

export type TextStylesNames = keyof typeof TextStyles

export interface StyleTextProps {
  selected: TextStylesNames
  onSelect: (name: TextStylesNames) => void
}
