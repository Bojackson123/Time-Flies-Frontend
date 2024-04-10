import SigninSignup from "components/signin-signup";

export const metadata: Metadata = {
  title: "Sign In",
  datePublished: "1/1/2023",
  breadcrumbs: [{ name: "Sign In", href: "/sign-in" }],
};

export default function Page() {
  return (
    <main>
      <SigninSignup />
    </main>
  );
}
