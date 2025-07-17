'use client'

// import useTinyYurl from '@/swr/useTinyYurl'

export default function TinyYurl({ yurl }: { yurl: string }) {
  // const { data, error, isLoading } = useTinyYurl(yurl)

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">Shortened yurl:</p>
      <a className="text-blue-700 hover:text-blue-800" href={yurl} target="_blank" rel="noopener noreferrer">
        {yurl}
      </a>
    </div>
  )
}
