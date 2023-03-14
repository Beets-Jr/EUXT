import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useState } from 'react';

import Link from 'next/link';

import 'swiper/css';
import { Navigation } from 'swiper';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type tagsProps = {
  id: string;
  name: string;
}

type answerProps = {
  id: string;
  answer: string;
  tags: tagsProps[];
};

type questionProps = {
  id: string;
  question: string;
  answer: answerProps[];
};

interface modalProps {
  open?: boolean;
  onClose(): void;
}

interface Props {
  children: React.ReactNode;
  prevs?: Boolean;
}

export function SwiperButtonNext({ children, prevs = false }: Props) {
  const swiper = useSwiper();

  return prevs ? (
    <button
      className="bg-red text-black"
      onClick={() => swiper.slidePrev()}
    >
      {children}
    </button>
  ) : (
    <button onClick={() => swiper.slideNext()}>{children}</button>
  );
};


export default function Modal({open = false, onClose }: modalProps){
  const [answerTags, setanswerTags] = useState<string[]>([])

  const { data: questions } = useQuery({queryKey: ['questions'], queryFn: getQuestions});


  const handleRadioChecked = (event: any, index: number) => {
    if(answerTags[index]){
      answerTags[index] = event.target.value
    }
    else {
      answerTags.push(event.target.value)
    }

    setanswerTags([...answerTags])
  };
  console.log(answerTags)

  return !open ? null : (
    <>
    <div className="fixed w-full h-full top-0 left-0 bg-black opacity-75 z-10"></div>
    <div className="fixed w-full h-full top-0 left-0 z-10 flex items-center">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: "swiper-forward", prevEl: "#swiper-back" }}
        >
        <SwiperSlide>      
          <div className="w-full h-full flex justify-center">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center w-[700px] h-[350px] gap-10">
              <button className="cursor-pointer self-end" onClick={onClose}>
                <AiOutlineClose />
              </button>
              <h2 className="text-xl font-bold">Welcome Helper Ui!</h2>
              <p className="font-medium text-center">
                You are lost? If so, Helper Ui can help you. Then you will have a
                series of questions, answer them sincerely and in the end you will
                have the solutions and tools that will best help you, in your
                current moment.
              </p>
              <SwiperButtonNext>
                <span className="px-6 py-2.5 bg-transparent border-2 cursor-pointer border-neutral-500 w-60 text-neutral-500 font-medium text-center text-lg rounded-lg hover:bg-gold hover:text-white hover:border-2 hover:border-gold transition duration-150">
                  Start
                </span>
              </SwiperButtonNext>
            </div>
          </div>
        </SwiperSlide>
        {questions?.map((question, index) => {
          return (
            <SwiperSlide key={question.id}>
          <div className="w-full h-full flex justify-center">
              <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center w-[700px] h-[350px] gap-6">
                <button className="cursor-pointer self-end -mt-6" onClick={onClose}>
                  <AiOutlineClose />
                </button>
                <h2 className="text-lg font-bold self-start">{question.question}</h2>
                <div className="flex flex-col gap-4 self-start ml-4" onChange={(e) => handleRadioChecked(e, index)}>
                  {question.answer?.map((answer) => {
                    return (
                      <div key={answer.id}>
                        <label>
                          <input
                            type="radio"
                            value={answer.tags.map(tag => tag.name).join(',')}
                            name={`answer${index}`}
                            className="mr-2"
                            />
                          {answer.answer}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-20">
                  <SwiperButtonNext prevs={true}>
                    <span className="hover:text-gold transition duration-200">Prevs</span>
                  </SwiperButtonNext>
                  <SwiperButtonNext><span className="hover:text-gold transition duration-200">Next</span></SwiperButtonNext>
                </div>
              </div>
          </div>
            </SwiperSlide>
          );
        })}
        
        <SwiperSlide>
        <div className="w-full h-full flex justify-center">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center w-[700px] h-[350px] gap-6">
            <button className="cursor-pointer self-end" onClick={onClose}>
              <AiOutlineClose />
            </button>
            <div className="flex flex-col items-center gap-10 mt-6">
              <h2 className="text-xl font-bold">Congratulations!</h2>
              <p className="font-medium">Here are the tools that will help you best.</p>
              <Link href={`/userTools/${answerTags}`}>
                <button className="px-6 py-2.5 bg-transparent border-2 cursor-pointer border-neutral-500 w-60 text-neutral-500 font-medium text-center text-lg rounded-lg hover:bg-gold hover:text-white hover:border-2 hover:border-gold transition duration-150">Tools</button>
              </Link>
            </div>
            </div>
            </div>
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}

async function getQuestions () {
  try {
    const response = await axios.get("http://localhost:3000/api/questions/get")
    const { data } = response

    const questions: questionProps[] = data.map((question: questionProps) => {
      return {
        id: question.id,
        question: question.question,
        answer: question.answer.map((answer: answerProps) => {
          return {
            id: answer.id,
            answer: answer.answer,
            tags: answer.tags.map((tag: tagsProps) => {
              return {
                id: tag.id,
                name: tag.name,
              };
            }),
          }
        })
      }
    })

    return questions

  } catch (err) {
    return []
  }
}