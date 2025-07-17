import { uid } from 'uid/secure'
import * as z from 'zod/mini'

const {
  VERCEL_ENV,
  VERCEL_URL
} = process.env

const protocol = VERCEL_ENV === 'development' ? 'http://' : 'https://'

const schema = z.object({
  yurl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain
  })
})

const tiny: Record<string, string> = {}

export const POST = async (request: Request): Promise<Response> => {
  const { yurl } = schema.parse(await request.json())

  tiny[yurl] = tiny[yurl] || `${protocol}${VERCEL_URL}/${uid(8)}`

  return Response.json({ tiny: tiny[yurl] })
}
