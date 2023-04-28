import React from 'react'
import { StyleTextProps, TextStyles, TextStylesNames } from './StyleText.types'
import { BriefcaseIcon, EyeDropperIcon, NewspaperIcon, SparklesIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { objectKeys } from '../../utils'

type IconsTypes = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>>;

const Icons: Record<TextStylesNames, IconsTypes> = {
  general: SparklesIcon,
  formal: BriefcaseIcon,
  casual: NewspaperIcon,
  short: EyeDropperIcon
}

export const StyleText = ({ selected, onSelect }: StyleTextProps) => {
  return (
    <div className="w-full flex align-middle justify-center my-4 gap-2">
      {
        objectKeys(TextStyles).map((key) => {
          const IconComponent = Icons[key]
          return (
            <button
              key={key}
              title={key}
              className={getClassNames(selected === key)}
              onClick={() => onSelect(key)}
            >
              <IconComponent width={20} />
            </button>
          )
        })
      }
    </div>
  )
}

function getClassNames (selected: boolean) {
  return clsx({
    'w-[100px] p-2 flex align-middle justify-center text-xs bg-white rounded border border-transparent transition-all text-zinc-800': true,
    'hover:text-violet-800': true,
    'text-violet-900 border-violet-800 bg-[#ede9fe]': selected
  })
}

export default StyleText
