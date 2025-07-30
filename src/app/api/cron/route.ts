import redis from '@/lib/redis'

const { CRON_SECRET } = process.env

export async function GET(req: Request): Promise<Response> {
  if (req.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await redis.get('healthcheck')

  return Response.json({ ok: true })
}
