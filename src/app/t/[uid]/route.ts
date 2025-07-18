import { notFound, redirect } from 'next/navigation'

import redis from '@/lib/redis'

const { SERVICE_NAME: prefix } = process.env

export const GET = async (request: Request): Promise<Response> => {
  const tiny = request.url

  const yurl = await redis.get<string>(`${prefix}|short|${tiny}`)

  return yurl ? redirect(yurl) : notFound()
}
