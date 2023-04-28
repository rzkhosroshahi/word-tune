import React from 'react'
import { Toaster } from 'react-hot-toast'
import Paraphrase from './components/Paraphrase'

function App () {
  return (
    <section className="flex h-full align-middle justify-center pb-8 pr-8 pl-8 pb-4">
      <Paraphrase />
      <Toaster
        containerStyle={{
          fontSize: '12px',
          padding: '4px'
        }}
      />
    </section>
  )
}

export default App
