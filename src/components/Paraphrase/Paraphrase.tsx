import React from 'react'
import { useApi } from '../../hooks/useApi'
import { ParaphraseTypes } from './Paraphrase.types'
import SuggestList from './SuggestList'
import Form from '../Form'
import { TextStylesNames } from '../Form/StyleText/StyleText.types'
import Loading from '../Loading'

function Paraphrase () {
  const { fetchApi, data, setData, error, loading } = useApi<ParaphraseTypes>('paraphrase', { method: 'POST' })

  const handleSubmitForm = (text: string, style: TextStylesNames) => {
    fetchApi({
      text,
      style
    })
  }
  const onClearSuggestions = () => {
    setData(null)
  }
  return (
    <>
      <div className="w-full md:w-auto flex flex-col pt-8">
        <h1 className="pb-4 text-xl font-medium text-violet-950 dark:text-slate-800">
          Paraphrase
        </h1>
        <Form onSubmit={handleSubmitForm} loading={loading} />
        <SuggestList loading={loading} suggestions={data?.suggestions} onClear={onClearSuggestions} />
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
