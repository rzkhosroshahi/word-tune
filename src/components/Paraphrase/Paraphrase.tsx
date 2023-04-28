import React, { FormEvent, useRef, useState } from 'react'
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
  return (
    <>
      <div className="w-full flex flex-col pt-8">
        <h1 className="pb-4 text-xl font-medium text-violet-950">
          Paraphrase
        </h1>
        <form action="" onSubmit={handleSubmitForm}>
          <textarea
            ref={textArea}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg outline outline-transparent focus:outline-violet-800"
            rows={5}
            placeholder="write down your text and paraphrase"
          />
          <StyleText selected={style} onSelect={handleSelectTextStyle} />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex align-middle justify-center outline-0 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg bg-violet-800 rounded-md text-white"
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
              <div>
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
