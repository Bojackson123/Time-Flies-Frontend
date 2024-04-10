import Container from "components/container";
import amazing_work_1 from "components/images/amazing-works-1.png";
import amazing_work_2 from "components/images/amazing-works-2.png";
import Image from "next/image";

export default function AmazingWorks() {
  return (
    <section className="mb-6 w-full pt-0 lg:mb-28 lg:pt-28 px-6 lg:px-10">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row max-w-7xl w-full mx-auto">
        <div className="w-full max-w-[624px]">
          <div className="grid grid-cols-2 gap-7">
            <Image src={amazing_work_1} alt="girl" className="h-full w-full object-contain" />
            <Image src={amazing_work_2} alt="girl" className="h-auto w-full object-contain" />
          </div>
        </div>
        <div className="w-full lg:max-w-[500px]">
          <p className="mb-4 text-base font-bold uppercase tracking-[-0.5px] text-[#2A85FF]">AMAZINNG WOKRS</p>
          <h2 className="mb-4 text-4xl font-semibold lg:leading-[1.2] tracking-[-3%] text-slate-800 lg:text-[56px]">Perfect Stimuli of your video</h2>
          <p className="mb-12 text-base font-normal leading-[26px] text-slate-800">Donec bibendum, dui id ultrices molestie, neque neque porta felis, id viverra ligula justo interdum mi. Nunc malesuada, risus eu maximus consequat, purus enim ultricies nisi, quis ornare elit ante et turpis. </p>
          <a href="#" className="btn-outline">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
