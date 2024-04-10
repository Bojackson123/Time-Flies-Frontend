import BgIllustration from "components/bg-illustration";
import Footer from "components/footer";
import Header from "components/header";

interface Props {
  children: React.ReactNode;
}

export default function PrimaryLayout(props: Props) {
  return (
    <div className="relative z-10 bg-white">
      {props.children}
    </div>
  );
}
