import Container from "components/container";
import aboutcurve from "components/images/about-curve.png";
import banner from "components/images/about-hero-banner.svg";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="pt-10 md:pt-[100px] pb-6">
      <Container className="grid lg:grid-cols-2 justify-center gap-12 lg:gap-0 lg:justify-start text-center lg:text-left items-center">
        <div className="lg:max-w-[560px] w-full">
          <h1 className="text-3xl font-semibold leading-normal text-[#18212F] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[78px]">
            Understanding Our AI Time Perception <br className="hidden lg:inline-block" /> Model <Image src={aboutcurve} alt="curve" className="hidden lg:inline ml-9 object-contain w-[45%]" />
          </h1>
          <p className="mb-8 mt-6 text-lg font-normal leading-6 text-slate-800 md:text-xl md:leading-8">This page is your gateway to exploring how we utilize AI to interpret subjective time perception from video stimuli.</p>
          <Link href="/video" className="btn-grad mx-auto lg:mx-0 w-fit">
            Get started
          </Link>
        </div>
        <div className="lg:pl-12">
          <Image src={banner} alt="hero Banner" className="block w-full ml-auto object-contain lg:max-w-[510px]" />
        </div>
      </Container>
    </section>
  );
}
