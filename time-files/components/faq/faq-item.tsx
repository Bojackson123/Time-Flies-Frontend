"use client";

import PlusMinus from "components/icons/plus-minus";
import { useRef, useState, useEffect } from "react";

interface Props {
  question: string;
  answer: string;
  opened?: boolean;
}

export default function FAQItem(props: Props) {
  const [faqContent, setFAQContent] = useState(props.opened);
  const [answerHeight, setAnswerHeight] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (faqContent && answerRef.current) {
      setAnswerHeight(answerRef.current.clientHeight);
    } else {
      setAnswerHeight(0);
    }
  }, [faqContent]);

  const setFAQState = () => {
    setFAQContent(!faqContent);
  };

  return (
    <div className="border-b border-[#E0E0E0] py-6">
      <button className="flex w-full items-center justify-between gap-5 text-left text-base font-semibold leading-6 text-[#272B30] md:text-xl md:leading-8" onClick={setFAQState}>
        {props.question}
        <PlusMinus opened={faqContent} className="shrink-0" />
      </button>
      <div className="overflow-hidden transition-all duration-300 h-0" style={{ height: faqContent ? answerHeight : 0 }}>
        {faqContent}
        <div className="text-base pt-3 max-w-4xl font-normal leading-7 text-[#808D9E] space-y-4" ref={answerRef}>
          <p>{props.answer}</p>
        </div>
      </div>
    </div>
  );
}
