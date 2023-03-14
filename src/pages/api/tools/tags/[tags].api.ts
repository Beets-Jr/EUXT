import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface tag {
  name: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }

  const tagsParams = String(request.query.tags)
  const tagsName = tagsParams.split(',')
  const tags: tag[] = tagsName.map(name => ({name}))

  if (!tagsParams) {
    return response.status(400).json('not tags')
  }

  const tool = await prisma.tool.findMany({
    where: {
      tags: {
        some: {
          OR: tags,
        },
      },
    },
  })

  if (tool.length === 0) {
    return response.status(404).end("Not found tools")
  }

  return response.json(tool)
}
