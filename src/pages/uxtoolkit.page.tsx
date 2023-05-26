import Card from '@/components/Card'
import Menu from '@/components/Menu'

import { api } from '@/lib/axios'
import { prisma } from '@/lib/prisma'
import { GetStaticProps } from 'next'
import { useState } from 'react'


interface toolsQuery {
  id: string;
  name: string, 
  image_url: string,
  description: string,
  url: string,
}

interface tools {
  id: string
  name: string
  image_url: string
  description: string
  url: string
}

interface UXtoolkitPros {
  toolsResearch: tools[]
  toolsEvaluation: tools[]
  toolsPrototyping: tools[]
  toolsIdeation: tools[]
}


export default function UXtoolkit ({ toolsResearch, toolsEvaluation, toolsIdeation, toolsPrototyping} : UXtoolkitPros) {

  const [tools, setTools] = useState<tools[] | undefined>(toolsResearch)
  const [categoryTitle, setCategoryTitle] = useState("Research")
  
  const handleResearch = async () => {
    setCategoryTitle("Research")
    setTools(toolsResearch)
  }
  
  const handlePrototyping = async () => {
    setCategoryTitle("Prototyping")
    setTools(toolsPrototyping)
  }

  const handleIdeation = async () => {
    setCategoryTitle("Ideation")
    setTools(toolsIdeation)
  }
  
  const handleEvaluation = async () => {
    setCategoryTitle("Evaluation")
    setTools(toolsEvaluation)
  }

  return (
      <main className="flex">
        <aside className="w-64 my-80">
          <Menu
            handleEvaluation={handleEvaluation}
            handleIdeation={handleIdeation}
            handlePrototyping={handlePrototyping}
            handleResearch={handleResearch} />
        </aside>
        <div className="flex-1 p-4 m-4">
          <h2 className="font-bold mb-4">Tools for {categoryTitle}: </h2>
          <div className="grid 2xl:grid-cols-4 gap-4 xl:grid-cols-3 lg:grid-cols-2 lg:gap-20">
              { tools?.map((tool) => {
                return(
                <Card
                  key={tool.id}
                  title={tool.name}
                  imageLink={tool.image_url}
                  description={tool.description}
                  linkToTool={tool.url}
                />
                )
              })}
          </div>
        </div>
      </main>
  )
}


async function getToolsIdeation() {
  try {
    const response = await api.get("/tools/category/ideation");
    
    if(response.status === 404) {
      return null;
    }

    const { data } = response;

    const tools = data.map((tool: toolsQuery) => {
        return {
          id: tool.id,
          title: tool.name,
          description: tool.description,
          image: tool.image_url,
          link: tool.url,
        };
      });

    return tools
  } catch (err) {
    return null
  }
}

async function getToolsResearch() {
  try {
    const response = await api.get("/tools/category/research");
    console.log(response)
    
    if(response.status === 404) {
      return null;
    }

    const { data } = response;

    const tools = data.map((tool: toolsQuery) => {
      return {
        id: tool.id,
        title: tool.name,
        description: tool.description,
        image: tool.image_url,
        link: tool.url,
      };
    });

    return tools
  } catch (err) {
    return null;
  }
}

async function getToolsPrototyping() {
  try {
    const response = await api.get("/tools/category/prototyping");
    
      if(response.status === 404) {
          return null;
      }
  
      const { data } = response;
  
        const tools = data.map((tool: toolsQuery) => {
          return {
            id: tool.id,
            title: tool.name,
            description: tool.description,
            image: tool.image_url,
            link: tool.url,
          };
        });
  
    return tools
  }
  catch (error) {
    return null
  }
}

async function getToolsEvaluation() {
  try {
    const response = await api.get("/tools/category/evaluation")
    const { data } = response;

    const tools = data.map((tool: toolsQuery) => {
      return {
        id: tool.id,
        title: tool.name,
        description: tool.description,
        image: tool.image_url,
        link: tool.url,
      };
    });

    return tools
  } catch (err) {
    return null
  }
  
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const toolsResearch = await prisma.tool.findMany({
    where: {
      categories: {
        some: {
          name: 'research',
        },
      },
    },
  })

  const toolsPrototyping = await prisma.tool.findMany({
    where: {
      categories: {
        some: {
          name: 'prototyping',
        },
      },
    },
  })

  const toolsEvaluation = await prisma.tool.findMany({
    where: {
      categories: {
        some: {
          name: 'evaluation',
        },
      },
    },
  })


  const toolsIdeation = await prisma.tool.findMany({
    where: {
      categories: {
        some: {
          name: 'ideation',
        },
      },
    },
  })


  return {
    props: {
      toolsResearch,
      toolsEvaluation,
      toolsPrototyping,
      toolsIdeation,
    },
    revalidate: 60 * 60, // 1 hour
  }
}