import React, { FormEvent, useRef, useState } from 'react'
import StyleText from './StyleText'
import Spinner from '../Spinner'
import TopToolbar from './TopToolbar'
import { TextStylesNames } from './StyleText/StyleText.types'
import { FormProps } from './Form.type'

export const Form = (props: FormProps) => {
  const { onSubmit, loading } = props
  const textArea = useRef<HTMLTextAreaElement>(null)
  const [style, setStyle] = useState<TextStylesNames>('general')

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textArea.current && textArea.current.value) {
      onSubmit(textArea.current.value, style)
    }
  }
  const handleSelectTextStyle = (style: TextStylesNames) => {
    setStyle(style)
    if (textArea.current && textArea.current.value) {
      onSubmit(textArea.current.value, style)
    }
  }
  const handlePasteText = async () => {
    if (!textArea.current) {
      return
    }
    const text = await navigator.clipboard.readText()
    if (text) {
      textArea.current.value = text
    }
  }
  const handleClearText = () => {
    if (textArea.current) {
      textArea.current.value = ''
    }
  }
  return (
    <form action="" onSubmit={handleSubmitForm}>
      <div
        className="textarea-container relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus-visible:bg-violet-400 border-2 border-transparent dark:bg-slate-800"
      >
        <TopToolbar onPaste={handlePasteText} onClear={handleClearText} />
        <textarea
          ref={textArea}
          className="w-full border-none py-2 pl-3 pr-10 pt-4 text-sm leading-5 text-gray-900 dark:text-slate-400 outline-0 bg-transparent text-base resize-none dark:bg-slate-800"
          rows={6}
          placeholder="write down your text and paraphrase"
        />
      </div>

      <StyleText selected={style} onSelect={handleSelectTextStyle} />
      <button
        type="submit"
        disabled={loading}
        className="w-[100%] flex align-middle justify-center outline-0 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg bg-violet-800 rounded-md text-white dark:text-slate-300 dark:bg-slate-800"
      >
        {
          loading
            ? <Spinner />
            : null
        }
        Paraphrase
      </button>
    </form>
  )
}

export default Form
