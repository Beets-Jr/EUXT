import Image from 'next/image'
import { useEffect, useState } from 'react'

import helper from '../../../public/helper.png'
import Modal from './Modal'

interface HelperProps {
  styleProps?: string;
}

export default function Helper({styleProps = ""}: HelperProps){
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [stop, setStop] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  function handleOpenModal(showModal: boolean) {
    setIsOpen(showModal)
  }

  function handleCloseModal(showModal: boolean) {
    setIsOpen(showModal)
  }
  
  const handleEnter = () => {
    setShowTooltip(false)
    setStop(false)
  };


  return (
    <div className={styleProps}>
      <button onClick={() => handleOpenModal(true)} onMouseEnter={handleEnter} className="bg-gold rounded-full h-20 w-20 flex items-center justify-center cursor-pointer hover:scale-125 ease-in duration-300 m-16">
        <Image className="h-12 w-12 " src={helper} alt="" />
      </button>
      {showTooltip && stop && (<span className="absolute -top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded transition duration-300 z-10">Hello, can I assist you?</span>) }
      <Modal open={isOpen} onClose={() => handleCloseModal(false)}/>
    </div>
  )
}