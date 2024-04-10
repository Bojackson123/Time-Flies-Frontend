import Container from "components/container";

export default function HowItWorks() {
  return (
    <section className="mb-14 w-full pt-14 md:mb-24 md:pt-24">
      <Container>
        <div className="mb-14 w-full text-center">
          
          <h2 className="mt-5 text-4xl font-semibold leading-normal tracking-[-3%] text-slate-800 md:text-[64px] md:leading-[68px]">How it works</h2>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-20 rounded-3xl border border-[#CCD4FF] bg-[#F9FAFF] pb-12 md:pb-[88px] px-6 pt-12 md:pt-28 sm:pl-9 sm:pr-9 lg:flex-row lg:gap-10 xl:pl-[105px] xl:pr-24">
          <div className=" w-full lg:max-w-[480px]">
            <div className="grid w-full grid-cols-[max-content,1fr] items-center gap-8 border-b border-[#E9ECF2] pb-6 md:pb-[60px]">
              <span className="flex aspect-square w-12 items-center justify-center rounded-full bg-[#B5E4CA] text-2xl font-semibold leading-[46px] text-slate-800 sm:w-16 md:text-[37px]">1</span>
              <div>
                <h6 className="text-[25px] font-semibold leading-8 tracking-[-1.07px] text-slate-800">Login or Register</h6>
                <p className="mt-2 text-[17px] font-normal leading-6 text-[#808D9E]">Sign in or create an account to begin.</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-[max-content,1fr] items-center gap-8 border-b border-[#E9ECF2] py-6 md:py-[60px]">
              <span className="flex aspect-square w-12 items-center justify-center rounded-full bg-[#FFBC99] text-2xl font-semibold leading-9 text-slate-800 sm:w-16 md:text-[28px]">2</span>
              <div>
                <h6 className="text-[25px] font-semibold leading-8 tracking-[-1.07px] text-slate-800">Upload Video</h6>
                <p className="mt-2 text-[17px] font-normal leading-6 text-[#808D9E]">Upload your video for analysis.</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-[max-content,1fr] items-center gap-8 pt-6 md:pt-[60px] ">
              <span className="flex aspect-square w-12 items-center justify-center rounded-full bg-[#CABDFF] text-2xl font-semibold leading-9 text-slate-800 sm:w-16 md:text-[28px]">3</span>
              <div>
                <h6 className="text-[25px] font-semibold leading-8 tracking-[-1.07px] text-slate-800">Get Results</h6>
                <p className="mt-2 text-[17px] font-normal leading-6 text-[#808D9E]">Receive instant insights into time perception.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-[505px]">
            <h2 className="text-4xl font-semibold leading-[56px] tracking-[-1px] text-slate-800 md:text-5xl">Try it out yourself!</h2>
            <p className="mb-11 mt-5 text-[17px] leading-7 tracking-[-0.53px] text-slate-800">Click get started to upload a video or learn more if you would like to understand out our model works.</p>
            <div className="flex w-full flex-col items-center gap-5 sm:flex-row">
              <a href="/video" className="btn-grad w-fit px-9">
                Get Started
              </a>
              <a href="/about" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
