import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }
  
  const category = String(request.query.category)

  if (!category) {
    return response.status(400).end()
  }

  const tool = await prisma.tool.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
    },
  })

  if (tool.length === 0) {
    return response.status(404).end()
  }

  return response.json(tool)
}
