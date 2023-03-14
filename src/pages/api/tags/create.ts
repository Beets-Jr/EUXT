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

  const tagExist = await prisma.tag.findFirst({
    where: { name: answer.tag.name },
  })

  if (tagExist) {
    return response.status(400).json({
      message: 'Tag already exists',
    })
  }

  await prisma.tag.create({ data: { name: answer.tag.name } })

  return response.status(201).end()
}
