import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const { id } = request.body

  await prisma.tool.delete({
    where: {
      id,
    },
  })

  return response.status(200).end()
}
