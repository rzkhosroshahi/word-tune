import React from 'react'
import clsx from 'clsx'
import { stylesType, StyleTextProps } from './StyleText.types'
import Icon from '../../Icons'

const styles: stylesType[] = [
  {
    type: 'general',
    icon: 'generalIcon'
  },
  {
    type: 'casual',
    icon: 'casualIcon'
  },
  {
    type: 'formal',
    icon: 'formalIcon'
  },
  {
    type: 'short',
    icon: 'shortenIcon'
  },
  {
    type: 'long',
    icon: 'expandIcon'
  }
]

export const StyleText = ({ selected, onSelect }: StyleTextProps) => {
  return (
    <div className="w-full flex align-middle justify-center my-4 gap-2">
      {
        styles.map((style) => {
          return (
            <button
              key={style.type}
              type="button"
              title={style.type}
              className={getClassNames(selected === style.type)}
              onClick={() => onSelect(style.type)}
            >
              <Icon name={style.icon} />
              <span className="hidden text-sm md:block">
                {style.type}
              </span>
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
