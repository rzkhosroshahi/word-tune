import React from 'react'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { SuggestListProps } from './SuggestList.types'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

export const SuggestList = (props: SuggestListProps) => {
  const { loading, suggestions, onClear, onClick, sentenceMode } = props
  const [copy] = useCopyToClipboard()

  const handleClickOnText = (text: string) => {
    if (sentenceMode) {
      onClick(text)
      return
    }
    copy(text)
      .then(() => {
        toast('Text Copied!')
      })
  }
  return (
    <div className="flex flex-col gap-3 mt-4">
      {
        suggestions
          ? <span className="text-xs py-1 cursor-pointer select-none" onClick={onClear}>Clear</span>
          : null
      }
      {
        suggestions
          ? (
              suggestions.map((suggest) => (
                <div
                  key={suggest.text}
                  className={getSuggestionClass(loading)}
                  onClick={() => handleClickOnText(suggest.text)}
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
    'flex align-middle justify-between transition-all w-full p-2 rounded bg-white text-xs font-medium cursor-pointer select-none text-zinc-800': true,
    'bg-white dark:bg-slate-400 active:bg-violet-200 dark:active:bg-slate-300': true,
    'animate-pulse': loading
  })
}

export default SuggestList
