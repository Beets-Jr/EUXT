import { AiOutlineClose } from 'react-icons/ai'

interface ModalProps {
  imageLink: string
  title: string
  description: string
  linkToTool: string
  onCloseModal(close: boolean): void
}

export default function Modal({
  title,
  imageLink,
  onCloseModal,
  description,
  linkToTool,
}: ModalProps) {
  function handleCloseModal(close: boolean) {
    onCloseModal(close)
  }

  function handleOpenTool(link: string) {
    window.open(link, '_blank')
  }

  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 bg-black opacity-75 z-10"></div>
      <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h3 className="text-xl mb-4 font-bold">{title}</h3>
            <button
              onClick={() => handleCloseModal(false)}
              className="w-4 h-4 -mt-3 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            >
              <AiOutlineClose className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-8 items-center">
            <div
              className="w-[18.75rem] h-[9.375rem] rounded-lg shadow-md drop-shadow-md bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${imageLink})` }}
            ></div>
            <div className="flex flex-col gap-8">
              <p className="text-gray-700 w-60">{description}</p>
              <button
                className="py-2 bg-transparent border-2 border-neutral-500 w-60 text-neutral-500 font-medium text-lg rounded-lg hover:bg-gold hover:text-white hover:border-2 hover:border-gold transition duration-150"
                onClick={() => handleOpenTool(linkToTool)}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
