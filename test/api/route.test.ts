import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Request } from '@whatwg-node/fetch'

import { POST } from '@/app/api/shorten/route'
import redis from '@/lib/redis'

const endpoint = 'http://localhost:3000/api/shorten'
const UID = 'abcd1234'

const req = (yurl: string): Request =>
  new Request(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'test-origin': 'http://localhost:3000'
    },
    body: JSON.stringify({ yurl })
  })

vi.mock('uid/secure', () => ({
  uid: (length: number) => UID
}))

describe('POST /api/route', () => {
  let res;

  beforeEach(async () => {
    await redis.flushdb();
  })

  describe('with an invalid URL', () => {
    beforeEach(async () => {
      res = await POST(req('not-a-url'))
    })

    it('should return a 400 Bad Request', () => {
      expect(res.status).toBe(400)
    })
  })

  describe('with a valid URL', () => {
    beforeEach(async () => {
      res = await POST(req('https://domain.com/path'))
    })

    it('should return a 200 OK', () => {
      expect(res.status).toBe(200)
    })

    it('should return a JSON response with a tiny URL', async () => {
      const data = await res.json()
      expect(data.tiny).toBe(`http://localhost:3000/t/${UID}`)
    })
  })
})
