import logo from "components/images/logo.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F9FAFF] px-4 pb-8 pt-12 sm:pb-12 sm:pt-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center border-b border-[#EAECF0] pb-10 sm:pb-16">
          <a href="/" className="mb-4 inline-block sm:mb-10">
            <Image src={logo} alt="Time Files" className="object-contain" />
          </a>
          <h2 className="mb-10 text-center text-2xl font-semibold leading-7 text-[#101828] sm:text-left md:text-3xl md:leading-[38px]"></h2>
          <div className="mx-auto flex w-full max-w-[352px] flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <a href="#" className="flex h-[54px] w-full items-center justify-center  rounded-full bg-G1 p-px text-base font-semibold leading-6 shadow-small  sm:max-w-[160px]">
              <span className="flex h-full w-full  items-center justify-center gap-2 rounded-full bg-white">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5001 18.3334C15.1025 18.3334 18.8334 14.6025 18.8334 10.0001C18.8334 5.39771 15.1025 1.66675 10.5001 1.66675C5.89771 1.66675 2.16675 5.39771 2.16675 10.0001C2.16675 14.6025 5.89771 18.3334 10.5001 18.3334Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.5001 18.3334C15.1025 18.3334 18.8334 14.6025 18.8334 10.0001C18.8334 5.39771 15.1025 1.66675 10.5001 1.66675C5.89771 1.66675 2.16675 5.39771 2.16675 10.0001C2.16675 14.6025 5.89771 18.3334 10.5001 18.3334Z" stroke="url(#paint0_linear_7606_219)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.83342 6.66675L13.8334 10.0001L8.83342 13.3334V6.66675Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.83342 6.66675L13.8334 10.0001L8.83342 13.3334V6.66675Z" stroke="url(#paint1_linear_7606_219)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="paint0_linear_7606_219" x1="2.16675" y1="10.0001" x2="18.8334" y2="10.0001" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6CCCF5" />
                      <stop offset="1" stopColor="#6455F0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_7606_219" x1="2.16675" y1="10.0001" x2="18.8334" y2="10.0001" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6CCCF5" />
                      <stop offset="1" stopColor="#6455F0" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="inline-block bg-G1 bg-clip-text text-transparent">View demo</span>
              </span>
            </a>
            <a href="/video" className="btn-grad px-9 font-semibold shadow-small sm:w-fit">
              Get started
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row sm:gap-10">
          <p className="text-base font-normal leading-6 text-[#98A2B3]">&copy; {new Date().getFullYear()} Time flies. All rights reserved.</p>
          <ul className="flex items-center gap-4 ">
            <li>
              <a href="#" className="bg-none text-base font-normal leading-6 text-[#98A2B3] hover:bg-G1 hover:bg-clip-text hover:text-transparent">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="bg-none text-base font-normal leading-6 text-[#98A2B3] hover:bg-G1 hover:bg-clip-text hover:text-transparent">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="bg-none text-base font-normal leading-6 text-[#98A2B3] hover:bg-G1 hover:bg-clip-text hover:text-transparent">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
