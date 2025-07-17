import useSWR from 'swr'

const fetcher = (yurl: string): Promise<string> =>
  fetch('/api/shorten', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ yurl })
  }).then(res => res.json())

export default function useTinyYurl(yurl: string) {
  return useSWR(yurl, fetcher)
}
