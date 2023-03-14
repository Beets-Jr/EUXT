import Card from '@/components/Card'
import Link from 'next/link';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { AiFillPlusCircle, AiOutlinePlusCircle } from 'react-icons/ai';




interface toolsQuery {
  id: string;
  name: string, 
  image_url: string,
  description: string,
  url: string,
}

interface tools {
  id: string;
  title: string, 
  image: string,
  description: string,
  link: string,
}

interface props {
  tools: tools[],
}

export default function Home({ tools }: props) {

  return (
      <main className="flex">
        <div className="p-4 m-4">
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
              <Link href="/uxtoolkit">
              <div className="flex flex-col items-center gap-4 cursor-pointer hover:scale-105">
                <div className="w-[18.75rem] h-[9.375rem] flex items-center justify-center rounded-lg shadow-md drop-shadow-md bg-cover bg-center hover:scale-105">
                    <AiOutlinePlusCircle className='h-12 w-12'/>
                </div>
                <h2 className="text-xl font-bold">More Tools</h2>
              </div>
              </Link>
          </div>
        </div>
      </main>
  )
}


async function getToolsByTags(tags: string){
  try {
    const response = await axios.get(`http://localhost:3000/api/tools/tags/${tags}`);
    
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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const tags = String(context.params?.answerTags)

  const tools = await getToolsByTags(tags)
  return {
    props: {
      tools,
    }
  }
}