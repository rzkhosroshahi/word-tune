import React, { FormEvent, useRef, useState } from 'react'
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useApi } from '../../hooks/useApi'
import StyleText from '../StyleText'
import { TextStylesNames } from '../StyleText/StyleText.types'
import { ParaphraseTypes } from './Paraphrase.types'
import SuggestList from './SuggestList'
import Spinner from '../Spinner'

function Paraphrase () {
  const textArea = useRef<HTMLTextAreaElement>(null)
  const [style, setStyle] = useState<TextStylesNames>('general')
  const { fetchApi, data, error, loading } = useApi<ParaphraseTypes>('paraphrase', { method: 'POST' })

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textArea.current) {
      fetchApi({
        style,
        text: textArea.current.value
      })
    }
  }
  const handleSelectTextStyle = (style: TextStylesNames) => {
    if (textArea.current) {
      setStyle(style)
      fetchApi({
        style,
        text: textArea.current.value
      })
    }
  }
  const handleClearText = () => {
    if (textArea.current) {
      textArea.current.value = ''
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
  return (
    <>
      <div className="w-full md:w-auto flex flex-col pt-8">
        <h1 className="pb-4 text-xl font-medium text-violet-950">
          Paraphrase
        </h1>
        <form action="" onSubmit={handleSubmitForm}>
          <div
            className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:bg-violet-400 outline-violet-800"
          >
            <div
              className="absolute top-2 right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded"
              onClick={handlePasteText}
            >
              <ClipboardIcon width={18} />
            </div>
            <div
              className="absolute top-[48px] right-1 flex align-middle justify-center bg-white shadow w-[32px] h-[32px] rounded"
              onClick={handleClearText}
            >
              <XMarkIcon width={18} />
            </div>
            <textarea
              ref={textArea}
              className="w-full border-none py-2 pl-3 pr-10 pt-4 text-sm leading-5 text-gray-900 outline-0 bg-transparent text-base resize-none"
              rows={6}
              placeholder="write down your text and paraphrase"
            />
          </div>

          <StyleText selected={style} onSelect={handleSelectTextStyle} />
          <button
            type="submit"
            disabled={loading}
            className="w-[100%] flex align-middle justify-center outline-0 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg bg-violet-800 rounded-md text-white"
          >
            {
              loading
                ? <Spinner />
                : null
            }
            Paraphrase
          </button>
        </form>
        {
          error === null
            ? <SuggestList loading={loading} suggestions={data?.suggestions} />
            : (
              <div className="text-red-500">
                something is wrong {JSON.stringify(error)}
              </div>
              )
        }
      </div>
      {
        loading
          ? (
            <div className="fixed w-full overflow-hidden">
              <div className="sticky top-0 left-0 w-[500px] h-0.5 bg-violet-800 rounded animation-slide-out-in" />
            </div>
            )
          : null
      }
    </>
  )
}

export default Paraphrase
