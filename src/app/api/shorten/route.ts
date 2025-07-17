import * as z from 'zod/mini'

const schema = z.object({
  yurl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain
  })
})

export const POST = async (request: Request): Promise<Response> => {
  const { yurl } = schema.parse(await request.json())

  return Response.json({ tiny: yurl })
}
