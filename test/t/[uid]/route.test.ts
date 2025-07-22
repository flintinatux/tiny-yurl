import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Request } from '@whatwg-node/fetch'

import { GET } from '@/app/t/[uid]/route'
import redis from '@/lib/redis'

const shortUrl = 'http://localhost:3000/t/1234abcd'
const longUrl = 'https://domain.com/path'
const { SERVICE_NAME: prefix } = process.env

describe('GET /t/[uid]', () => {
  let err

  beforeEach(async () => {
    err = new Error('blank error')
    await redis.flushdb()
    await redis.set(`${prefix}|short|${shortUrl}`, longUrl)
  })

  describe('with an invalid tiny url', () => {
    beforeEach(async () => {
      try {
        await GET(new Request('http://localhost:3000/t/invalid'))
      } catch (error) {
        err = error
      }
    })

    it('should return a 404 Not Found', () => {
      expect(err.digest).toBe('NEXT_HTTP_ERROR_FALLBACK;404')
    })
  })

  describe('with a valid tiny url', () => {
    beforeEach(async () => {
      try {
        await GET(new Request(shortUrl))
      } catch (error) {
        err = error
      }
    })

    it('should return a 307 Found redirect', () => {
      expect(err.digest).toMatch(/^NEXT_REDIRECT/)
    })

    it('should redirect to the original URL', async () => {
      expect(err.digest).toContain(longUrl)
    })
  })
})
