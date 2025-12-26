'use client'

import { Fragment, useState } from 'react'
import * as z from 'zod/mini'

import TinyYurl from '@/components/TinyYurl'

const schema = z.url({
  protocol: /^https?$/,
  hostname: z.regexes.domain
})

export default function Shortener() {
  const [ error, setError ] = useState<string>('')
  const [ shortened, setShortened ] = useState<boolean>(false)
  const [ yurl, setYurl ] = useState<string>('')

  const shorten = (): void => {
    if (!yurl) return

    try {
      schema.parse(yurl)
    } catch {
      setError('Oops! That\'s an invalid URL. Please double-check your input.')
      return
    }

    setShortened(true)
  }

  const updateYurl = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError('')
    setShortened(false)
    setYurl(event.target.value.trim())
  }

  return (
    <Fragment>
      <form className="flex mt-2" action={shorten}>
        <input className="bg-white dark:bg-neutral-900 dark:text-foreground grow-2 px-1 py-0.5 rounded-l-lg" name="longYurl" onChange={updateYurl} placeholder="Long yurl" type="text" value={yurl}/>
        <button className="bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-1 py-0.5 rounded-r-lg shrink-0 text-white" type="submit">Shorten</button>
      </form>

      {
        error && <div className="mt-1">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        </div>
      }

      { shortened && <TinyYurl yurl={yurl} /> }
    </Fragment>
  )
}
