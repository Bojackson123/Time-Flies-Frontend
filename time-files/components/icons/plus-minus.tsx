import { cn } from "lib/utils";

export default function PlusMinus(props: { className?: string; opened?: boolean }) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.34375 12H17.6575" stroke="#272B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0006 6.34315V17.6569" stroke="#272B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-all origin-center duration-300", props.opened ? "rotate-[90deg]" : "rotate-0")} />
    </svg>
  );
}
