import { uid } from 'uid/secure'
import * as z from 'zod/mini'

import redis from '@/lib/redis'

const { SERVICE_NAME: prefix } = process.env

const schema = z.object({
  yurl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain
  })
})

const thirtyDays = 30 * 24 * 60 * 60

export const POST = async (request: Request): Promise<Response> => {
  const { yurl } = schema.parse(await request.json())

  let tiny = await redis.get(`${prefix}|long|${yurl}`)

  if (!tiny) {
    tiny = `${request.headers.get('origin')}/t/${uid(8)}`

    await redis.multi()
      .set(`${prefix}|long|${yurl}`, tiny, { ex: thirtyDays })
      .set(`${prefix}|short|${tiny}`, yurl, { ex: thirtyDays })
      .exec()
  }

  return Response.json({ tiny })
}
