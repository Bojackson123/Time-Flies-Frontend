import Container from "components/container";
import Chart from "components/icons/chart";
import insightGirl from "components/images/insight-girls.png";
import results from "components/images/Graph_AI.webp";
import Image from "next/image";

export default function ProductOverview() {
  return (
    <section className="mb-28 w-full xl:px-12 lg:mb-[242px]">
      <Container className="px-0 sm:px-6 lg:px-10">
        <div className="w-full bg-[#1D1E25] px-6 pb-12 pt-[72px] sm:px-10 md:rounded-[32px] lg:pb-0 lg:pl-[70px]">
          <div className="mb-10 flex flex-col items-center justify-between gap-5 md:mb-16 lg:mb-[132px] lg:flex-row lg:gap-10 lg:pr-[70px]">
            <div className="w-full lg:max-w-[557px]">
              <p className="mb-4 text-sm font-medium uppercase leading-5 tracking-[-0.5px] text-[#FFD88D]">PRODUCT OVERVIEW</p>
              <h2 className="text-4xl font-bold leading-normal tracking-[-3%] text-white md:text-5xl md:leading-[64px]">
                Get insights <br />
                within a few minutes
              </h2>
            </div>
            <p className="w-full text-xl font-normal leading-[34px] text-[#E6E9ED] lg:max-w-[565px]">
            Discover a new dimension in video analysis with our AI-driven tool designed for researchers. By evaluating time perception in response to video stimuli, our model offers a unique lens to understand the human mind.
              </p>
          </div>
          <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row">
            <div className="w-full rounded-[17px] bg-white p-[22px] lg:max-w-[375px] border">
              <h4 className="mb-[17px] text-[19px] font-bold leading-none text-[#060C3C]">Video Results</h4>
              <Image 
                src={results} 
                alt={"results"} 
                className="h-auto w-full lg:w-auto"
              />
          
            </div>
            <div className="w-full lg:max-w-[765px] lg:translate-y-[142px] lg:pr-4 xl:translate-x-28 2xl:pr-0">
            <video
              autoPlay
              loop
              muted
              playsInline // This attribute is often necessary for autoplay to work on mobile browsers
              className="inline-block h-auto w-full rounded-3xl object-cover"
              src="/videos/sparkler.webm" 
            >
              Your browser does not support the video tag.
            </video>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
