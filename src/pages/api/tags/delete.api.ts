import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface Tag {
  id: string
  name: string
}

interface Answer {
  id: string
  answer: string
  tag: Tag
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const answer: Answer = request.body

  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      tags: {
        disconnect: {
          id: answer.tag.id,
        },
      },
    },
  })

  return response.status(201).end()
}
