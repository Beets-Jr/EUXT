import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'DELETE') {
    return response.status(405).end()
  }

  const { id } = request.body

  const answers = await prisma.answer.findMany({
    where: {
      question_id: id,
    },
  })

  await Promise.all(
    answers.map(async (answer) => {
      await prisma.answer.delete({
        where: {
          id: answer.id,
        },
      })
    }),
  )

  await prisma.question.delete({
    where: {
      id,
    },
  })

  return response.status(201).end()
}
