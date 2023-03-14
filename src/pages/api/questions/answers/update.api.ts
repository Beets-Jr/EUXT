import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface Answer {
  id: string
  answer: string
  tags: string[]
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
      answer: answer.answer,
    },
  })

  return response.status(201).end()
}
