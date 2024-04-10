import Container from "components/container";
import ElectricPlug from "components/icons/electric-plug";

const allFeatures = [
  {
    icon: ElectricPlug,
    title: "Understanding Time Perception",
    desc: "Exploring human time perception through a novel model based on non-temporal perceptual processes.",
  },
  {
    icon: ElectricPlug,
    title: "Visual Processing and Time Estimation",
    desc: "Simulating human visual processing with a neural network to drive activation changes for time estimation.",
  },
  {
    icon: ElectricPlug,
    title: "Accumulation and Duration Estimation",
    desc: "Estimating time duration through the accumulation of salient activation changes within the network.",
  },
  {
    icon: ElectricPlug,
    title: "Replicating Human Biases in Time Perception",
    desc: "The system replicates human time perception biases, evident in varying scenarios from busy cities to calm cafes.",
  },
  {
    icon: ElectricPlug,
    title: "From Stimulus to Estimation",
    desc: "The model illustrates the journey from visual stimulus to duration estimation, offering insights into human experience.",
  },
  {
    icon: ElectricPlug,
    title: "A New Direction in Perception Research",
    desc: "Presenting a new avenue for research into the foundations of time perception in the human brain.",
  },
];

export default function AIFeatures() {
  return (
    <section className="py-14 md:py-[100px]">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12 md:mb-24 leading-[56px] text-slate-800 md:text-5xl">All AI Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {allFeatures.map((item, index) => (
            <div key={index}>
              <div className="mb-9 size-12 rounded-xl flex items-center justify-center bg-G1 bg-no-repeat bg-center bg-cover">
                <item.icon className="text-white" />
              </div>
              <h4 className="text-2xl font-medium text-slate-900">{item.title}</h4>
              <p className="text-slate-700 text-base mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
