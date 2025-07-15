'use client'

import { Fragment, useState } from 'react'

export default function Shortener() {
  const [ yurl, setYurl ] = useState<string>('')

  const shorten = (e: Event): void => {
    e.preventDefault()
    e.stopPropagation()
    setYurl((e.target as HTMLFormElement).longYurl.value)
  }

  return (
    <Fragment>
      <form className="flex mt-2" onSubmit={shorten}>
        <input className="bg-white grow-2 px-1 py-0.5 rounded-l-lg" name="longYurl" placeholder="Long yurl" type="text"/>
        <button className="bg-blue-700 px-1 py-0.5 rounded-r-lg shrink-0 text-white" type="submit">Shorten</button>
      </form>

      {
        yurl && <div className="mt-2">
          <p className="text-sm text-gray-500">Shortened yurl:</p>
          <a className="text-blue-700 hover:text-blue-800" href={yurl} target="_blank" rel="noopener noreferrer">
            {yurl}
          </a>
        </div>
      }
    </Fragment>
  )
}
