import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Request } from '@whatwg-node/fetch'

import { GET } from '@/app/api/cron/route'

const { CRON_SECRET } = process.env
const endpoint = 'http://localhost:3000/api/cron'

describe('GET /api/cron', () => {
  let res

  describe('when the authorization header is invalid', () => {
    beforeEach(async () => {
      res = await GET(new Request(endpoint, {
        headers: {
          'authorization': 'Bearer invalid-secret'
        }
      }))
    })

    it('should return a 401 status code', () => {
      expect(res.status).toBe(401)
    })
  })

  describe('when the authorization header is valid', () => {
    beforeEach(async () => {
      res = await GET(new Request(endpoint, {
        headers: {
          'authorization': `Bearer ${CRON_SECRET}`
        }
      }))
    })

    it('should return a 200 status code', () => {
      expect(res.status).toBe(200)
    })
  })
})
