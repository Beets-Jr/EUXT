import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface tagId {
  id: string
}

interface Answer {
  id: string
  answer: string
  tags: string[]
}

interface Question {
  id: string
  question: string
  answers: Answer[]
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const question: Question = request.body

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      question: question.question,
    },
  })

  return response.status(201).end()
}
