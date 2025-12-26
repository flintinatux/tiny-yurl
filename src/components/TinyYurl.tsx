'use client'

import ClipboardJS from 'clipboard'
import { useEffect, useState } from 'react'
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
  const [ copied, setCopied ] = useState<boolean>(false)

  const { data, error, isLoading } = useSWR(yurl, fetcher, { errorRetryCount: 5 })

  useEffect(() => {
    const clipboard = new ClipboardJS('.copyToClipboard')

    clipboard.on('success', () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })

    return () => {
      clipboard.destroy()
    }
  }, [])

  if (error) {
    return (
      <div className="mt-2">
        <p className="text-sm text-red-500 dark:text-red-400">Error shortening yurl: { error.message }</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Shortening yurl...</p>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">Shortened yurl:</p>
      <div className="flex items-end justify-between">
        <a className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" href={ data?.tiny } target="_blank" rel="noopener noreferrer">
          { data?.tiny }
          <span className="material-icons pl-0.5">open_in_new</span>
        </a>
        <button
          className="bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-foreground border copyToClipboard cursor-pointer px-0.75 py-0.25 rounded text-sm"
          data-clipboard-text={ data?.tiny }
        >
          <span className="material-icons pr-[2px]">
            { copied ? 'check' : 'content_copy' }
          </span>
          { copied ? 'Copied!' : 'Copy' }
        </button>
      </div>
    </div>
  )
}
