import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface Tag {
  id: string
  newName: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const tag: Tag = request.body

  await prisma.tag.update({
    where: {
      id: tag.id,
    },
    data: {
      name: tag.newName,
    },
  })

  return response.status(200).end()
}
