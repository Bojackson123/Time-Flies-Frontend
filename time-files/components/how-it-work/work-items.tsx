import Checkmark from "components/icons/checkmark";
import PlayButton from "components/icons/play-button";
import Image, { StaticImageData } from "next/image";

interface Props {
  workcontent: {
    title: string;
    banner: StaticImageData;
    list?: {
      heading?: string;
      description?: string;
    }[];
  }[];
}

export default function WorkItems(props: Props) {
  return (
    <div className="space-y-24 md:space-y-[140px] lg:px-8">
      {props.workcontent.map((item, index) => (
        <div key={index} className="w-full grid grid-cols-1 gap-y-12 group/work md:grid-cols-2 items-center">
          <div className="group-odd/work:md:pr-14 group-even/work:md:pl-14 group-even/work:md:order-last">
            <div className="relative">
            <Image 
                src={item.banner} 
                alt={item.title} 
                className="w-full object-cover rounded-2xl md:rounded-[32px] inline-block aspect-video md:aspect-auto md:h-[600px]"
              />
              <span className="hidden md:block h-[95%] w-5 bg-white z-10 rounded-full absolute top-1/2 -translate-y-1/2 group-odd/work:left-full group-even/work:right-full"></span>
              <span className="hidden md:block h-[90%] z-0 w-10 bg-white/50 rounded-full absolute top-1/2 -translate-y-1/2 group-odd/work:left-full group-even/work:right-full"></span>
              <span className="hidden md:block h-[90%] -z-10 w-10 bg-black/[0.15] blur-[50px] rounded-full absolute top-1/2 -translate-y-1/2 group-odd/work:left-full group-even/work:right-full"></span>

            </div>
          </div>
          <div className="group-odd/work:md:pl-8 group-even/work:md:pr-8">
            <h4 className="text-3xl md:text-5xl leading-normal md:leading-[60px] font-semibold text-slate-800">{item.title}</h4>
            <div className="space-y-6">
              {item.list?.map((feature, index) => (
                <div key={index} className="w-full py-3">
                  <div className="grid grid-cols-[max-content,1fr] gap-[22px]">
                    <div className="size-6 rounded-full flex items-center justify-center bg-[#AC6AFF]">
                      <Checkmark />
                    </div>
                    <h6 className="text-base font-normal text-slate-900 leading-6">{feature.heading}</h6>
                  </div>
                  {feature.description && <p className="text-base font-light text-[#757185] leading-6 mt-3">{feature.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
