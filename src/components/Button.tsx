import Link from 'next/link'

interface buttonProps {
  title: string
  link: string
}

export default function Button({ title, link }: buttonProps) {
  return (
    <Link href={link} target="_blank">
      <button className="px-6 py-2.5 bg-transparent border-2 border-neutral-500 w-60 text-neutral-500 font-medium text-lg rounded-lg hover:bg-gold hover:text-white hover:border-2 hover:border-gold transition duration-150">
        {title}
      </button>
    </Link>
  )
}
