import FAQItem from "./faq-item";

const faqs = [
  {
    question: "Is this service free?",
    answer: "Yes, it is free! You can use our service without any cost. Just make an account and have instant access to our platform.",
    opened: true,
  },
  {
    question: "What is the focus of this AI model?",
    answer: "Our AI model specializes in estimating the perception of time in response to video stimuli, providing researchers with detailed insights into how viewers experience and process video content over time.",
  },
  {
    question: "Who can benefit from using this model?",
    answer: "This tool is invaluable for cognitive scientists, psychologists, neurologists, and any other researchers who are studying time perception, attention, and sensory processing in relation to video content.",
  },
  {
    question: 'What kind of video content can be analyzed?',
    answer: "Our AI model is versatile and can analyze a wide range of video content, from short clips to longer formats, across various genres and contexts.",
  },
  {
    question: "How do you ensure the privacy and confidentiality of the video content?",
    answer: "We adhere to strict data protection policies to ensure that all video content and associated data are securely handled and stored, maintaining the highest levels of confidentiality.",
  },
  {
    question: "Is there a limit to the length of video that can be analyzed?",
    answer: "Currently, our model is optimized for videos up to 64 seconds to ensure accuracy and detail in the results. Please refer to the technical specifications for more details.",
  },
  
];
// Component function
export default function FAQ() {
  // JavaScript logic goes here
  return (
    // Returns the HTML
    // Style the component using Tailwind CSS className parameters
    <section id="faq" className="mb-14 w-full pt-14 md:mb-36 md:pt-24">
      <div className="container">
        <div className="mx-auto w-full max-w-[1064px]">
          <div className="mx-auto w-full max-w-[790px] text-center">
            <h2 className="text-4xl font-bold leading-[56px] text-slate-800 md:text-5xl">FAQ</h2>
            <p className=" mt-4 text-base font-normal leading-6 text-[#808D9E] md:text-xl md:leading-8">Read the most frequently asked questions.</p>
          </div>
          {/* <!------------faq container------------> */}
          <div className="mt-12 w-full">
            {faqs.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
