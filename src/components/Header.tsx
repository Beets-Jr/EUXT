import Image from 'next/image'
import Link from 'next/link'

import uxLerisLogo from '../../public/uxLerisLogo.svg'

export default function Header() {
  return (
    <header className="bg-gold flex justify-between w-full items-center py-3 px-40 md:px-20">
      <Link href="/">
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
      </Link>
      <nav>
        <ul className="flex gap-5 text-gray-50 font-bold">
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
    </header>
  )
}
