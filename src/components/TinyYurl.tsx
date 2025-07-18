'use client'

import useSWR from 'swr'

interface TinyResponse {
  tiny: string
}

const fetcher = (yurl: string): Promise<TinyResponse> =>
  fetch('/api/shorten', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ yurl })
  }).then(res => res.json())

export default function TinyYurl({ yurl }: { yurl: string }) {
  const { data, error, isLoading } = useSWR(yurl, fetcher, { errorRetryCount: 5 })

  if (error) {
    return (
      <div className="mt-2">
        <p className="text-sm text-red-500">Error shortening yurl: {error.message}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-500">Shortening yurl...</p>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">Shortened yurl:</p>
      <a className="text-blue-700 hover:text-blue-800" href={data?.tiny} target="_blank" rel="noopener noreferrer">
        {data?.tiny}
      </a>
    </div>
  )
}
