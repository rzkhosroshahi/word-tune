export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}

export const isDarkMode = ():boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function findTextStartAndEnd (paragraph: string, text: string): { start: number, end: number } {
  const startIndex = paragraph.indexOf(text)
  if (startIndex < 0) {
    return { start: -1, end: -1 }
  }

  const endIndex = startIndex + text.length
  return { start: startIndex, end: endIndex }
}
