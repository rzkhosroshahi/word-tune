import React from 'react'

export const Loading = () => {
  return (
    <div className="fixed w-full overflow-hidden">
      <div className="sticky top-0 left-0 w-[100%] h-1 bg-violet-800 dark:bg-slate-500 rounded animation-slide-out-in" />
    </div>
  )
}

export default Loading
