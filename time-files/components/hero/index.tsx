import ai_video_curve from "components/images/ai-video-curve.png";
import angular_circle from "components/images/angular-circle.png";
import circleLines from "components/images/circleOfLines.svg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative px-6 lg:px-10 z-0">
      <div className="relative mx-auto w-full max-w-[992px] pb-24 pt-10 md:pb-[235px] md:pt-20">
        <h1 className="text-center text-3xl font-semibold leading-normal text-[#18212F] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[72px]">
          Unlock the Secrets of Time Perception with our{" "}
          <span className="relative">
            AI Video
            <Image src={ai_video_curve} alt="curve" className="absolute left-0 right-0 top-[90%] pointer-events-none" />
          </span>{" "}
          Analyzer
        </h1>
        <p className="mb-8 mt-6 text-center text-lg font-normal leading-6 text-slate-800 md:text-xl md:leading-8">
          Click the button below to get started with our AI video analyzer.
        </p>
        <Link href="/video" className="btn-grad mx-auto w-fit">
          Get started
        </Link>
        <div className="relative mx-auto mt-16 w-full max-w-5xl">
        <video
          autoPlay
          loop
          muted
          playsInline 
          className="inline-block h-auto w-full rounded-3xl object-cover"
          src="/videos/hiking.webm" 
      >
        Your browser does not support the video tag.
      </video>

          <div className="absolute bottom-12 left-1/2 flex w-fit -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#DEDBE9]/[0.85] px-4 py-2 sm:gap-3.5 sm:px-[22px] sm:py-[11px]">
            <Image src={angular_circle} alt="Process circle" className="w-5 h-5 object-contain animate-spin pointer-events-none" />
            <p className="text-sm font-normal sm:leading-8 text-slate-600 sm:text-lg">AI is analyzing your video</p>
          </div>

          <div className="h-6 rounded-b-[20px] bg-white block w-[calc(100%-56px)] absolute left-1/2 -translate-x-1/2 pointer-events-none top-full -z-30" />
          <div className="h-6 rounded-b-[20px] bg-white/50 block left-[67px] absolute right-[77px] top-[calc(100%+24px)] pointer-events-none -z-10" />
          <div className="h-16 rounded-b-[20px] block right-[77px] absolute left-[67px] top-full pointer-events-none bg-black/10 -z-40 blur-[58px]" />
        </div>
      </div>

      <Image src={circleLines} alt="circle" className="pointer-events-none absolute left-1/2 top-32 -z-10 h-auto -translate-x-1/2 object-contain opacity-100 max-w-[973px] w-full" />
    </section>
  );
}
