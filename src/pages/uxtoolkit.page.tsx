import Card from '@/components/Card'
import Menu from '@/components/Menu'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';


interface toolsQuery {
  id: string;
  name: string, 
  image_url: string,
  description: string,
  url: string,
}

interface tools {
  id: string
  title: string
  image: string
  description: string
  link: string
}

interface UXtoolkitProps {
  toolsIdeation: tools[]
  toolsResearch: tools[]
  toolsPrototyping: tools[]
  toolsEvaluation: tools[]
}

export default function UXtoolkit({toolsIdeation,
  toolsResearch,
  toolsPrototyping,
  toolsEvaluation}: UXtoolkitProps) {

  // const { data: toolsResearch }  = useQuery<tools[]>({queryKey: ['toolsResearch'], queryFn: getToolsResearch})
  // const { data: toolsPrototyping }  = useQuery<tools[]>({queryKey: ['toolsPrototyping'], queryFn: getToolsPrototyping})
  // const { data: toolsIdeation }  = useQuery<tools[]>({queryKey: ['toolsIdeation'], queryFn: getToolsIdeation})
  // const { data: toolsEvaluation }  = useQuery<tools[]>({queryKey: ['toolsEvaluation'], queryFn: getToolsEvaluation})

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
                  title={tool.title}
                  imageLink={tool.image}
                  description={tool.description}
                  linkToTool={tool.link}
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
    const response = await axios.get("http://localhost:3000/api/tools/category/ideation");
    
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
    const response = await axios.get("http://localhost:3000/api/tools/category/research");
    
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
    const response = await axios.get("http://localhost:3000/api/tools/category/prototyping");
    
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
    const response = await axios.get("http://localhost:3000/api/tools/category/evaluation")

    console.log(response.status)
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

export const getStaticProps: GetStaticProps = async () => {

  const toolsIdeation = await getToolsIdeation()
  const toolsResearch = await getToolsResearch()
  const toolsPrototyping = await getToolsPrototyping()
  const  toolsEvaluation = await getToolsEvaluation()

  return {
    props: {
      toolsIdeation,
      toolsResearch,
      toolsPrototyping,
      toolsEvaluation,
    },
    revalidate: 10,
  }
}