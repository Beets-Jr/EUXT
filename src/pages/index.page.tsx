import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

import illustrtion1 from '../../public/illustration1.svg'
import uxLerisLogo from '../../public/uxLerisLogo.svg'
import beetsjr from '../../public/beetsjr.png'
import Helper from '@/components/Helper'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <main>
        <div className='py-2'>
          <Helper styleProps="-mt-10 fixed"/>
        </div>
        <section className="flex justify-center mb-60 mt-32" id="home">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/G-C0Gqu9Ybw"
            title="Ferramentas computacionais voltadas ao usuário são tema de pesquisa na UFSCar"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-md"
          />
        </section>
        <section className="flex flex-col items-center min-h-screen mb-60 gap-14 m-2" id="uxtoolkit">
          <h2 className="font-bold text-5xl text-neutral-500">UX ToolKit</h2>
          <div className="flex xl:flex-row md:flex-col items-center gap-5">
            <Image src={illustrtion1} width={664} height={463} alt="" />
            <div className="flex flex-col xl:items-start md:items-center">
              <p className="w-96 text-md text-neutral-500 xl:mb-16 md:mb-8 xl:text-left md:text-center">
                The UX Toolkit is a collection of tools for different stages of
                the user experience design process. You can select a specific
                stage of your project, such as research, ideation, prototyping,
                or evaluation, and receive a set of recommended tools that can
                be used during that stage. Additionally, the UX Toolkit includes
                the Helper UX feature that allows you to answer a series of
                questions and receive a tailored set of tools based on your
                responses.
              </p>
              <Button title="UX ToolKit" link="/uxtoolkit" />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center min-h-screen mb-48 gap-14 m-2" id="about">
          <h2 className="font-bold text-5xl text-neutral-500">About</h2>
          <div className="flex xl:flex-row md:flex-col items-center xl:gap-20 md:gap-2">
            <Image src={uxLerisLogo} width={340} height={340} alt="" />
            <div className="flex flex-col xl:items-start md:items-center">
              <p className="w-96 text-md text-neutral-500 xl:mb-16 md:mb-8 xl:text-left md:text-center">
                User eXperience – Laboratory of Studies in Networks, Innovation
                and Software is a research group that belongs to LERIS. LERIS is
                the main laboratory and it is localized at Department of
                Computer Science in the Federal University of São Carlos –
                Sorocaba, Brazil (UFSCar). UXLeris researchers work to
                approximate academic research to practical issues in the
                software industry by conducting experimental and empirical
                studies.
              </p>
              <Button title="More Info" link="http://uxleris.sor.ufscar.br/" />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-zinc-900 mt-auto flex justify-between w-full items-center py-10 px-40 lg:flex-row md:px-20 md:flex-col md:gap-20">
        <div className="flex flex-col lg:gap-11 md:gap-2">
          <div className="flex gap-5">
            <Image
              height={64}
              width={64}
              src={uxLerisLogo}
              alt="Quadrado branco preenchido com UX na parte de cima e leris na parte de baixo, UX possui um contorno dourado"
            />
            <div className="flex flex-col justify-center text-gray-50">
              <h1 className="font-bold">EUXT</h1>
              <p className="">Exploring User eXperience Tools</p>
            </div>
          </div>
          <span className="text-white">© EUXT 2023 - All Rights Reserved.</span>
        </div>
        <nav>
          <ul className="flex flex-col gap-5 items-center text-gray-50 font-bold">
            <li>
              <Link className="hover:brightness-90" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:brightness-90" href="/uxtoolkit">
                UX Toolkit
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <span className="text-white text-xl">
            created with <span className="text-red-700 text-3xl">♥️ </span>by:
          </span>
          <Link href={'https://beetsjr.com.br/'} target="_blank">
            <Image src={beetsjr} width={230} height={95} alt="" />
          </Link>
        </div>
      </footer>
    </div>
  )
}
