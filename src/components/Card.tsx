import { useState } from 'react'
import Modal from './Modal'

interface cardProps {
  imageLink: string
  title: string
  description: string
  linkToTool: string
}

export default function Card({
  title,
  imageLink,
  description,
  linkToTool,
}: cardProps) {
  const [isOpen, setIsOpen] = useState(false)
  function handleOpenModal(showModal: boolean) {
    setIsOpen(showModal)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }
  
  return (
    <>
      <div
        className="flex flex-col items-center gap-4 cursor-pointer hover:scale-105"
        onClick={() => handleOpenModal(true)}>
        <div
          className="w-[18.75rem] h-[9.375rem] rounded-lg shadow-md drop-shadow-md bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${imageLink})` }}
        ></div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {isOpen && (
        <Modal
          onCloseModal={handleCloseModal}
          title={title}
          imageLink={imageLink}
          description={description}
          linkToTool={linkToTool}
        />
      )}
    </>
  )
}
