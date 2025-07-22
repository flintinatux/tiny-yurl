import * as z from 'zod'

const { $ZodError } = z.core

export default function api(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request)
    } catch (error) {
      if (error instanceof $ZodError) {
        return Response.json({ error: error.message }, { status: 400 })
      }

      console.error(error)

      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
