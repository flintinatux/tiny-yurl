'use client'

import useSWR from 'swr'

const fetcher = (yurl: string): Promise<string> =>
  fetch('/api/shorten', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ yurl })
  }).then(res => res.json())

export default function TinyYurl({ yurl }: { yurl: string }) {
  const { data, error } = useSWR(yurl, fetcher)

  if (error) {
    return (
      <div className="mt-2">
        <p className="text-sm text-red-500">Error shortening yurl: {error.message}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-500">Shortening yurl...</p>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">Shortened yurl:</p>
      <a className="text-blue-700 hover:text-blue-800" href={data.tiny} target="_blank" rel="noopener noreferrer">
        {data.tiny}
      </a>
    </div>
  )
}
