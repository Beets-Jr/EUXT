import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }

  const questions = await prisma.question.findMany({
    include: {
      answer: {
        include: {
          tags: true,
        },
      },
    },
  })

  if(questions.length === 0) {
    return response.json({message: "No questions found"})
  }

  return response.json(questions)
}