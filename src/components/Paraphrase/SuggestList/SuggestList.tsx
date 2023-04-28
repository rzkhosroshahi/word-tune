import React from 'react'
import clsx from 'clsx'
import { SuggestListProps } from './SuggestList.types'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

export const SuggestList = ({ loading, suggestions }: SuggestListProps) => {
  const [copy] = useCopyToClipboard()

  return (
    <div className="flex flex-col gap-3 mt-4">
      {
        suggestions
          ? (
              suggestions.map((suggest) => (
              <div
                key={suggest.text}
                className={getSuggestionClass(loading)}
                onClick={() => copy(suggest.text)}
              >
                {suggest.text}
              </div>
              ))
            )
          : null
      }
    </div>
  )
}

function getSuggestionClass (loading: boolean) {
  return clsx({
    'flex align-middle justify-between transition-all w-full p-2 rounded bg-white text-xs font-medium cursor-pointer select-none active:bg-violet-200 text-zinc-800': true,
    'animate-pulse': loading
  })
}

export default SuggestList
