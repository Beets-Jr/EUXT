import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface tagId {
  id: string
}

interface Answer {
  answer: string
  tags: string[]
}

interface Question {
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

  const tags = await Promise.all(
    question.answers.map(async (answer) => {
      const tagsExists = await prisma.tag.findMany({
        where: {
          name: {
            in: answer.tags,
          },
        },
      })

      const tagsNoExists = answer.tags.filter(
        (tag) => !tagsExists.find((t) => t.name === tag),
      )

      const newTags = await Promise.all(
        tagsNoExists.map(async (tag) => {
          return prisma.tag.create({
            data: {
              name: tag,
            },
          })
        }),
      )

      const tagsExistsId = tagsExists.map((tag): tagId => {
        return { id: tag.id }
      })

      const newTagsId = newTags.map((tag): tagId => {
        return { id: tag.id }
      })

      return [...tagsExistsId, ...newTagsId]
    }),
  )

  await prisma.question.create({
    data: {
      question: question.question,
      answer: {
        create: [
          {
            answer: question.answers[0].answer,
            tags: {
              connect: tags[0],
            },
          },
          {
            answer: question.answers[1].answer,
            tags: {
              connect: tags[1],
            },
          },
          {
            answer: question.answers[2].answer,
            tags: {
              connect: tags[2],
            },
          },
          {
            answer: question.answers[3].answer,
            tags: {
              connect: tags[3],
            },
          },
        ],
      },
    },
  })

  return response.status(201).end()
}
