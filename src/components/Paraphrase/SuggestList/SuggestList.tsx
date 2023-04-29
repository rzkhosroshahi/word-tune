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
          ? <div className="flex justify-between items-center py-1 cursor-pointer select-none font-bold" onClick={onClear}>
              <p>Suggestions</p>
              <span className="text-xs cursor-pointer">
                X Clear
              </span>
            </div>
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
    'flex align-middle justify-between transition-all w-full p-2 rounded bg-white text-sm font-medium cursor-pointer select-none': true,
    'text-zinc-800 dark:text-zinc-300 bg-white dark:bg-slate-700 active:bg-violet-200 dark:active:bg-slate-300': true,
    'animate-pulse': loading
  })
}

export default SuggestList
