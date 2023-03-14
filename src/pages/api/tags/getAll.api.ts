import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }

  const tags = await prisma.tag.findMany({})

  if (tags.length === 0) {
    return response.status(404).end()
  }

  return response.json(tags)
}
