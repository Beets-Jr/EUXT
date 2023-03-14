import { useState } from 'react'
import { BiSearchAlt, BiCheckboxChecked } from 'react-icons/bi'
import { BsLightbulb } from 'react-icons/bs'
import { MdOutlineDraw } from 'react-icons/md'
import Helper from './Helper'

interface menuProps {
  handleResearch(): void
  handlePrototyping(): void
  handleIdeation(): void
  handleEvaluation(): void
}

export default function Menu({
  handleResearch,
  handlePrototyping,
  handleIdeation,
  handleEvaluation,
}: menuProps) {
  const [showTooltipIdeation, setShowTooltipIdeation] = useState(false)
  const [showTooltipResearch, setShowTooltipResearch] = useState(false)
  const [showTooltipPrototyping, setShowTooltipPrototyping] = useState(false)
  const [showTooltipEvaluation, setShowTooltipEvaluation] = useState(false)

  const handleMouseEnterResearch = () => {
    setShowTooltipResearch(true);
  };

  const handleMouseLeaveResearch = () => {
    setShowTooltipResearch(false);
  };

  const handleMouseEnterIdeation = () => {
    setShowTooltipIdeation(true);
  };

  const handleMouseLeaveIdeation = () => {
    setShowTooltipIdeation(false);
  };

  const handleMouseEnterPrototyping = () => {
    setShowTooltipPrototyping(true);
  };

  const handleMouseLeavePrototyping = () => {
    setShowTooltipPrototyping(false);
  };

  const handleMouseEnterEvaluation = () => {
    setShowTooltipEvaluation(true);
  };

  const handleMouseLeaveEvaluation = () => {
    setShowTooltipEvaluation(false);
  };



  return (
    <>
      <div className="flex flex-col gap-8 ml-6 fixed">
        <Helper styleProps="-mb-[350px] -ml-20"/>
        <div>
          <button onClick={handleResearch} onMouseEnter={handleMouseEnterResearch}  onMouseLeave={handleMouseLeaveResearch} className="relative bg-gold900 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 ease-in duration-300">
            <BiSearchAlt className="fill-neutral-100 w-12 h-12" />
            {showTooltipResearch && (<span className="absolute -top-10 left-0 bg-blue-500 text-white px-2 py-1 rounded transition duration-300">Research</span>) }
          </button>
        </div>
        <button onClick={handleIdeation} onMouseEnter={handleMouseEnterIdeation}  onMouseLeave={handleMouseLeaveIdeation} className="relative bg-gold500 w-20 h-20 ml-24 mb-5 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 ease-in duration-300">
          <BsLightbulb className="fill-neutral-100 w-12 h-12" />
          {showTooltipIdeation && (<span className="absolute -top-10 left-0 bg-blue-500 text-white px-2 py-1 rounded transition duration-300">Ideation</span>) }
        </button>
        <button onClick={handlePrototyping} onMouseEnter={handleMouseEnterPrototyping}  onMouseLeave={handleMouseLeavePrototyping} className="relative bg-gold200 w-20 h-20 ml-24 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 ease-in duration-300">
          <MdOutlineDraw className="fill-neutral-100 w-14 h-14" />          
          {showTooltipPrototyping && (<span className="absolute -top-10 left-0 bg-blue-500 text-white px-2 py-1 rounded transition duration-300">Prototyping</span>) }
        </button>
        <button onClick={handleEvaluation} onMouseEnter={handleMouseEnterEvaluation}  onMouseLeave={handleMouseLeaveEvaluation} className="relative bg-gold100 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 ease-in duration-300">
          <BiCheckboxChecked className="fill-neutral-100 w-12 h-12" />          
          {showTooltipEvaluation && (<span className="absolute -top-10 left-0 bg-blue-500 text-white px-2 py-1 rounded transition duration-300">Evaluation</span>) }
        </button>
      </div>
    </>
  )
}
