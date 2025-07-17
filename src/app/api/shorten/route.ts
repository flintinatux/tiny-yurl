import { uid } from 'uid/secure'
import * as z from 'zod/mini'

const schema = z.object({
  yurl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain
  })
})

const tiny: Record<string, string> = {}

export const POST = async (request: Request): Promise<Response> => {
  const { yurl } = schema.parse(await request.json())

  tiny[yurl] = tiny[yurl] || `${request.headers.get('origin')}/t/${uid(8)}`

  return Response.json({ tiny: tiny[yurl] })
}
