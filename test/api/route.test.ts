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
      const { tiny } = await res.json()
      expect(tiny).toMatch(/http:\/\/localhost:3000\/t\/[a-z0-9]{8}/)
    })

    describe('when the same URL is shortened again', () => {
      let firstTiny

      beforeEach(async () => {
        firstTiny = (await res.json()).tiny
        res = await POST(req('https://domain.com/path'))
      })

      it('should return the same tiny URL', async () => {
        const { tiny } = await res.json()
        expect(tiny).toBe(firstTiny)
      })
    })
  })
})
