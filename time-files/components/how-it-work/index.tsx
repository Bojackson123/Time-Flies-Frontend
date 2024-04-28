import WorkItems from "./work-items";
import Container from "components/container";
import building from "components/images/building.webp";
import time from "components/images/time.webp";
import results from "components/images/results.webp";

const workcontent = [
  {
    title: "Model Architecture",
    banner: building,
    list: [
      {
        heading: "Visual Processing Mimicry",
        description: "Utilizes a feed-forward image classification network functionally similar to human visual processing",
      },
      {
        heading: "Activation-Driven Processing",
        description:"Processes video stimuli to monitor changes in network layer activations"
      },
      {
        heading: "Network Layer Accumulation",
        description:"Accumulates changes of stimuli as differences in activation patterns across network layers."
      },
    ],
  },
  {
    title: "Time Estimation Method",
    banner: time,
    list: [
      {
        heading: "Dynamic Threshold Mechanism",
        description: "Employs a dynamic threshold mechanism that resets when activation changes exceed it.",
      },
      {
        heading: "Salient Change Accumulation",
        description:"Accumulates salient changes in activation to estimate subjective time duration."
      },
      {
        heading: "Temporal Unit Transformation",
        description:"Transforms accumulated temporal units into standard time units (seconds) using regression."
      },
    ],
  },
  {
    title: "Validation and Results",
    banner: results,
    list: [
      {
        heading: "Human Comparison Validation",
        description: "Compares model-generated time estimates with human participant reports on the same video stimuli.",
      },
      {
        heading: "Bias and Scene Type Analysis",
        description:"Demonstrates that model estimates closely match human estimates, including biases by video scene type."
      },
      {
        heading: "Attentional Constraint Performance",
        description:"Shows improved model performance when input is constrained to approximate human visual-spatial attention."
      },
    ],
  },
];

export default function HowItWork() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto w-full max-w-[921px] text-center mb-20">
          <h2 className="text-4xl font-bold leading-[56px] text-slate-800 md:text-5xl">How Does It Work?</h2>
          <p className="mt-6 text-base font-normal leading-6 text-[#808D9E] md:text-xl md:leading-8">Using advanced machine learning techniques, our model examines various aspects of the video, including content, pacing, emotional cues, and viewer engagement, to estimate subjective time perception.&ldquo;</p>
        </div>

        <WorkItems workcontent={workcontent} />
      </Container>
    </section>
  );
}
