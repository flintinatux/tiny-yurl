import { uid } from 'uid/secure'
import * as z from 'zod/mini'

const {
  VERCEL_ENV,
  VERCEL_PROJECT_PRODUCTION_URL
} = process.env

const host = VERCEL_PROJECT_PRODUCTION_URL
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

  tiny[yurl] = tiny[yurl] || `${protocol}${host}/${uid(8)}`

  return Response.json({ tiny: tiny[yurl] })
}
