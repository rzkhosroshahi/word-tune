import config from '../config'

/**
 * Make http request calls
 * @param {String} url - url to http requests
 * @param {Object} options - fetch api options
 * @param {Object} data - object data for api calls
 */
export async function httpRequest<TResponse> (url: string, options: Partial<Request> = {}, data: Object = {}): Promise<TResponse> {
  const customOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    },
    ...(data && { body: JSON.stringify(data) }),
    body: JSON.stringify(data),
    ...options
  }
  const response = await fetch(url, customOptions)
  return await response.json() as Promise<TResponse>
}
