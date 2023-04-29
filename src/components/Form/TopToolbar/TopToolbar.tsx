import React from 'react'
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TopToolbarProps } from './TopToolbar.types'

export const TopToolbar = (props: TopToolbarProps) => {
  return (
    <>
      <span
        className="absolute top-2 right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="paste"
        onClick={props.onPaste}
      >
        <ClipboardIcon width={18} />
      </span>
      <span
        className="absolute top-[48px] right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded cursor-pointer dark:bg-slate-500 dark:text-slate-300"
        title="clear"
        onClick={props.onClear}
      >
        <XMarkIcon width={18} />
      </span>
    </>
  )
}

export default TopToolbar
