import React, { FormEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import StyleText from './StyleText'
import Spinner from '../Spinner'
import TopToolbar from './TopToolbar'
import { TextStylesNames } from './StyleText/StyleText.types'
import { FormProps } from './Form.type'
import SentenceModeToolbar from './SentenceModeToolbar'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import { findTextStartAndEnd } from '../../utils'

export const Form = (props: FormProps) => {
  const { onSubmit, loading, sentenceMode, improvedSentence } = props
  const textArea = useRef<HTMLTextAreaElement>(null)
  const [splitText, setTextSplit] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)
  const [style, setStyle] = useState<TextStylesNames>('general')
  const [copy] = useCopyToClipboard()

  useEffect(() => {
    if (improvedSentence) {
      replaceText(improvedSentence)
      handleNextSentence()
    }
  }, [improvedSentence])

  const handleSubmitForm = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!textArea.current || !textArea.current.value) {
      return
    }
    if (sentenceMode) {
      handleSubmitInSentenceMode()
      return
    }
    onSubmit(textArea.current.value, style)
  }
  const splitInitiallyTextsInSentenceMode = () => {
    if (textArea.current && textArea.current.value) {
      const textSplit = textArea.current.value.split(/[.\n]/gi).filter((s) => s !== '')
      setTextSplit(textSplit)
      onSubmit(textSplit[0], style)
      selectTextInTextarea(textSplit[0])
    }
  }
  const handleSubmitInSentenceMode = () => {
    if (splitText.length) {
      selectTextInTextarea(splitText[index])
      console.log('here >>')
      onSubmit(splitText[index], style)
      return
    }
    splitInitiallyTextsInSentenceMode()
  }
  const selectTextInTextarea = (text: string) => {
    if (textArea.current && textArea.current.value) {
      const { start, end } = findTextStartAndEnd(textArea.current.value, text)
      textArea.current.focus()
      textArea.current.setSelectionRange(start, end)
    }
  }
  const handleNextSentence = () => {
    if (index === splitText.length - 1) {
      resetAfterSentenceModeEnd()
      return
    }
    setIndex(index + 1)
    selectTextInTextarea(splitText[index + 1])
    onSubmit(splitText[index + 1], style)
  }
  const replaceText = (text: string) => {
    if (textArea.current && textArea.current.value) {
      textArea.current.value = textArea.current.value.replace(splitText[index], text)
    }
  }
  const handlePrevSentence = () => {
    if (index === 0) {
      return
    }
    setIndex(index - 1)
    selectTextInTextarea(splitText[index - 1])
    onSubmit(splitText[index + 1], style)
  }
  const handleSelectTextStyle = (style: TextStylesNames) => {
    setStyle(style)
    if (textArea.current && textArea.current.value) {
      handleSubmitForm()
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
  const resetAfterSentenceModeEnd = () => {
    console.log('here >>')
    setIndex(0)
    setTextSplit([])
    props.onClear()
  }
  const handleClearText = () => {
    if (textArea.current) {
      textArea.current.value = ''
      setIndex(0)
      props.onClear()
    }
  }
  const handleCopyText = () => {
    if (textArea.current && textArea.current.value) {
      copy(textArea.current.value)
        .then(() => {
          toast('Text Copied!')
        })
    }
  }
  return (
    <form action="" onSubmit={handleSubmitForm} className="flex flex-col">
      <div
        className="textarea-container relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus-visible:bg-violet-400 border-2 border-transparent dark:bg-slate-800"
      >
        {
          sentenceMode
            ? <SentenceModeToolbar
                onNext={handleNextSentence}
                onPrev={handlePrevSentence}
                onClear={handleClearText}
                onCopy={handleCopyText}
                disableNext={!splitText.length || splitText.length - 1 === index}
                disablePrev={index === 0}
              />
            : <TopToolbar onPaste={handlePasteText} onClear={handleClearText} />
        }
        <textarea
          ref={textArea}
          className="w-full border-none py-2 pl-3 pr-10 pt-4 text-sm leading-5 text-gray-900 dark:text-slate-400 outline-0 bg-transparent text-base resize-none dark:bg-slate-800"
          rows={15}
          placeholder="write down your text and paraphrase"
        />
      </div>

      <StyleText selected={style} onSelect={handleSelectTextStyle} />
      <button
        type="submit"
        disabled={loading}
        className="w-[100%] min-h-[38px] flex items-center justify-center outline-0 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg bg-violet-800 rounded-md text-white dark:text-slate-300 dark:bg-slate-800 disabled:bg-violet-500 dark:disabled:bg-slate-500 "
      >
        {
          loading
            ? <Spinner />
            : <span>Paraphrase</span>
        }

      </button>
    </form>
  )
}

export default Form
