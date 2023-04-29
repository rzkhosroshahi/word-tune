import React, { useState } from 'react'
import * as Switch from '@radix-ui/react-switch'
import { useApi } from '../../hooks/useApi'
import { ParaphraseTypes } from './Paraphrase.types'
import SuggestList from './SuggestList'
import Form from '../Form'
import { TextStylesNames } from '../Form/StyleText/StyleText.types'
import Loading from '../Loading'

function Paraphrase () {
  const [sentenceMode, setSentenceMode] = useState(false)
  const [improvedSentence, setImprovedSentence] = useState('')
  const { fetchApi, data, setData, error, loading } = useApi<ParaphraseTypes>('paraphrase', { method: 'POST' })

  const handleSubmitForm = (text: string, style: TextStylesNames) => {
    fetchApi({
      text,
      style
    })
  }
  const handleClearSuggestions = () => {
    setData(null)
  }
  const onClickOnSuggestions = (text: string) => {
    setImprovedSentence(text)
  }
  const onTextAreaClear = () => {
    handleClearSuggestions()
    setImprovedSentence('')
  }
  return (
    <>
      <div className="flex w-full md:max-w-[760px] flex-col pt-8">
        <h1 className="pb-4 text-xl font-medium text-violet-950 dark:text-slate-800">
          Paraphrase
        </h1>
        <div className="flex mb-2 self-end items-center">
          <label className="Label text-xs font-bold pr-2 text-violet-950 dark:text-slate-800" htmlFor="sentence-mode">
            Sentence mode
          </label>
          <Switch.Root
            className="switch-root w-[42px] h-[25px] bg-white dark:bg-slate-500 rounded-[42px] relative outline-none"
            id="sentence-mode"
            onCheckedChange={(on) => setSentenceMode(on)}
          >
            <Switch.Thumb className="switch-thumb block w-[21px] h-[21px] bg-slate-300 dark:bg-slate-400 rounded-[21px] transition-transform translate-x-[2px]" />
          </Switch.Root>
        </div>
        <Form
          onSubmit={handleSubmitForm}
          sentenceMode={sentenceMode}
          improvedSentence={improvedSentence}
          onClear={onTextAreaClear}
          loading={loading}
        />
        <SuggestList
          loading={loading}
          sentenceMode={sentenceMode}
          suggestions={data?.suggestions}
          onClick={onClickOnSuggestions}
          onClear={handleClearSuggestions}
        />
        {
          error !== null
            ? <div className="text-red-500">
                something is wrong {JSON.stringify(error)}
              </div>
            : null
        }
      </div>
      {
        loading
          ? <Loading />
          : null
      }
    </>
  )
}

export default Paraphrase
