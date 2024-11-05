import CredentialError from "../exceptions/credential.exception";
import { config } from "../config";
const makeRequest = async (
  signal: AbortSignal,
  context: string,
  method: string,
  data: { [id: string]: string | number },
  hasCredentials: boolean,
  bodyFormat: "row" | "form-data" = "row"
) => {
  
  const url = config.SERVER_URL;
  const myHeaders = new Headers()

  if (bodyFormat === 'row') {
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('accept', 'application/json')
  }

  if (hasCredentials) {
    const items = localStorage.getItem('user')
    if (!items) throw new CredentialError('')
    const user = JSON.parse(items)
    const token = user.accessToken
    myHeaders.append('Authorization', `Bearer ${token}`)
  }

  let body: BodyInit | null = null

  if (bodyFormat === 'form-data') {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })
    body = formData
  } else {
    body = Object.keys(data).length > 0 ? JSON.stringify(data) : null
  }

  const credentials = hasCredentials ? 'include' : 'omit'

  const requestOptions: RequestInit = {
    method: method,
    mode: 'cors',
    body: body,
    credentials: credentials,
    headers: myHeaders,
    signal,
  }

  const response = await fetch(`${url}/${context}`, requestOptions)
  const result = response.status !== 204 ? await response.json() : {}
  const status = response.status

  return { results: result, status: status }
}

export default makeRequest;
