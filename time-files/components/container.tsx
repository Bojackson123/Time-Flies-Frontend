import { cn } from "lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Container(props: Props) {
  return <div className={cn("container xl:max-w-[1360px]", props.className)}>{props.children}</div>;
}
