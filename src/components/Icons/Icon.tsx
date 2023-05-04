import React from 'react'
import CasualIcon from './CasualIcon'
import ExpandIcon from './ExpandIcon'
import GeneralIcon from './GeneralIcon'
import ShortenIcon from './ShortenIcon'
import FormalIcon from './FormalIcon'

export type IconNames = 'casualIcon' | 'expandIcon' | 'generalIcon' | 'shortenIcon' | 'formalIcon'
export interface IconsProps {
  name: IconNames
}

const IconsComponents: Record<IconNames, any> = {
  casualIcon: CasualIcon,
  expandIcon: ExpandIcon,
  generalIcon: GeneralIcon,
  shortenIcon: ShortenIcon,
  formalIcon: FormalIcon
}

export const Icon = ({ name }: IconsProps) => {
  const Component = IconsComponents[name]
  return <Component />
}

export default Icon
