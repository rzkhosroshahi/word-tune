import React from 'react'
import { Toaster } from 'react-hot-toast'
import Paraphrase from './components/Paraphrase'
import { isDarkMode } from './utils'

function App () {
  return (
    <section className="flex min-h-[100%] align-middle justify-center pb-8 pr-8 pl-8 pb-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-500 dark:to-slate-600">
      <Paraphrase />
      <Toaster
        toastOptions={{
          style: {
            background: isDarkMode() ? '#334155' : 'white',
            color: isDarkMode() ? '#cbd5e1' : 'black'
          }
        }}
        containerStyle={{
          fontSize: '12px',
          padding: '4px'
        }}
      />
    </section>
  )
}

export default App
