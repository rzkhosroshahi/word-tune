export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}

export const isDarkMode = ():boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
