import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SentenceModeToolbarProps } from './SentenceModeToolbartypes'

export const SentenceModeToolbar = (props: SentenceModeToolbarProps) => {
  const { disableNext, disablePrev } = props
  const onNextClick = () => {
    if (disableNext) {
      return
    }
    props.onNext()
  }
  const onPrevClick = () => {
    if (disablePrev) {
      return
    }
    props.onPrev()
  }
  return (
    <>
      <span
        className="absolute top-2 right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="next"
        style={{
          opacity: disableNext ? '0.2' : '0.7'
        }}
        onClick={onNextClick}
      >
        <ChevronRightIcon width={18} />
      </span>
      <span
        className="absolute top-[48px] right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="clear"
        onClick={props.onClear}
      >
        <XMarkIcon width={18} />
      </span>
      <span
        className="absolute top-[84px] right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="copy"
        onClick={props.onCopy}
      >
        <ClipboardDocumentCheckIcon width={18} />
      </span>
      <span
        className="absolute top-2 right-[42px] flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="prev"
        style={{
          opacity: disablePrev ? '0.2' : '0.7'
        }}
        onClick={onPrevClick}
      >
        <ChevronLeftIcon width={18} />
      </span>
    </>
  )
}

export default SentenceModeToolbar
