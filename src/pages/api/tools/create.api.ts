import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface id {
  id: string
}

async function createOrGetTag(tagName: string): Promise<string> {
  const existingTag = await prisma.tag.findFirst({
    where: {
      name: tagName,
    },
  })

  if (existingTag) {
    return existingTag.id
  }

  const newTag = await prisma.tag.create({
    data: {
      name: tagName,
    },
  })

  return newTag.id
}

async function createOrGetCategory(categoryName: string): Promise<string> {
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: categoryName,
    },
  })

  if (existingCategory) {
    return existingCategory.id
  }

  const newCategory = await prisma.category.create({
    data: {
      name: categoryName,
    },
  })

  return newCategory.id
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  const { name, description, url, imageUrl, categoriesNames, tagsNames } =
    request.body

  const toolExist = await prisma.tool.findFirst({
    where: {
      name,
    },
  })

  if (toolExist) {
    return response.status(400).json({
      message: 'Tool already exists',
    })
  }

  const categoriesId: id[] = []
  for (const category of categoriesNames) {
    const categoryId = await createOrGetCategory(category)
    categoriesId.push({ id: categoryId })
  }

  const tagsId: id[] = []
  for (const tag of tagsNames) {
    const tagId = await createOrGetTag(tag)
    tagsId.push({ id: tagId })
  }

  await prisma.tool.create({
    data: {
      name,
      description,
      url,
      image_url: imageUrl,
      categories: {
        connect: categoriesId,
      },
      tags: {
        connect: tagsId,
      },
    },
  })

  return response.status(201).end()
}
