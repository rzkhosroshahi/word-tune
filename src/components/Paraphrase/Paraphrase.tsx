import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import StyleText from '../StyleText'
import { TextStylesNames } from '../StyleText/StyleText.types'

function Paraphrase () {
  const textArea = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [style, setStyle] = useState<TextStylesNames>('general')

  const { fetchApi, data } = useApi('paraphrase', { method: 'POST' }, {
    style,
    text
  })
  console.log('data >>', data)

  useEffect(() => {
    if (text) {
      console.log('text >>', text)
      console.log('fetchApi >>', fetchApi)
    }
  }, [text, style])
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textArea.current) {
      setText(textArea.current.value)
    }
  }
  return (
    <div className="w-full">
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
        <StyleText selected={style} onSelect={(style) => setStyle(style)} />
        <button
          type="submit"
          className="w-full outline-0 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg bg-violet-800 rounded-md text-white"
        >
          Paraphrase
        </button>
      </form>
    </div>
  )
}

export default Paraphrase
