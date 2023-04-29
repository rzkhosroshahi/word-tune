import React from 'react'
import clsx from 'clsx'
import { StyleTextProps, TextStyles, TextStylesNames } from './StyleText.types'
import { BriefcaseIcon, EyeDropperIcon, NewspaperIcon, SparklesIcon } from '@heroicons/react/24/outline'
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
              type="button"
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
    'w-[100px] p-2 flex align-middle justify-center text-xs rounded border border-transparent transition-all': true,
    'hover:text-violet-800 dark:hover:text-slate-200': true,
    'text-zinc-800 dark:text-slate-400': true,
    'bg-white dark:bg-slate-800': !selected,
    'bg-violet-100 dark:bg-slate-500 text-violet-900 dark:text-slate-900 border-violet-800 dark:border-slate-800': selected
  })
}

export default StyleText
