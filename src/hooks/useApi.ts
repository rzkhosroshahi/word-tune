import { useCallback, useEffect, useState } from 'react'
import { httpRequest } from '../modules/httpRequest'
import { config } from '../config'

/**
 * ReactHook to make api calls
 * @param {string} endpoint - endpoint string
 * @param {Object} options - fetch api options
 */
export function useApi<TResponse> (endpoint: string, options?: Partial<Request>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState<number>(0)
  const [data, setData] = useState<TResponse | null>()

  const fetchApi = useCallback((body: Object = {}) => {
    setIsLoading(true)
    setError(null)
    httpRequest<TResponse>(`${config.baseUrl}/${endpoint}`, options, body)
      .then((resp) =>
        setData(resp)
      )
      .catch((ex) => {
        setError(ex)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [endpoint, retryCount])

  useEffect(() => {
    if (options?.method === 'GET') {
      fetchApi()
    }
  }, [fetchApi])

  const retry = () => {
    setRetryCount(retryCount + 1)
  }
  return { data, loading: isLoading, error, retry, retryCount, fetchApi }
}
