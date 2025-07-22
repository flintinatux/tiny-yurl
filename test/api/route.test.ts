import { beforeEach, describe, expect, it } from 'vitest'
import { Request } from '@whatwg-node/fetch'

import { POST } from '@/app/api/shorten/route'

const endpoint = 'http://localhost:3000/api/shorten'

const req = (yurl: string): Request =>
  new Request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ yurl })
  })

describe('POST /api/route', () => {
  let res;

  describe('with an invalid URL', () => {
    beforeEach(async () => {
      res = await POST(req('not-a-url'))
    })

    it('should return a 400 Bad Request', () => {
      expect(res.status).toBe(400)
    })
  })
})
