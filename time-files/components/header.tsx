/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "./container";
import logo from "components/images/logo.svg";
import avatar from "components/images/user.png";
import { Squash as Hamburger } from "hamburger-react";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect} from "react";

const navigation = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "FAQ's",
    url: "/#faq",
  },
];



export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState({ isLoggedIn: false});
  const [user2, setUser2] = useState({ fullname: '', email: '', pfp: ''});
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();

  const setNavStatus = () => {
    setNavOpen(!navOpen);
  };
  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:5000/users/is_logged_in', {
      credentials: 'include' 
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Parsed data:', data.isLoggedIn);
      setUser({isLoggedIn: data.isLoggedIn}); 
      setUser2({fullname: data.fullname, email: data.email, pfp: data.pfp});
    })
    .catch(error => console.error('Error fetching auth status:', error))
    .finally(() => setIsLoading(false));

  }, []); 

  // Browser NavBar
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <Container>
        <nav className="flex items-center justify-between gap-10 py-3 md:py-5 lg:py-10">
          <div className="flex w-full max-w-max items-center justify-between gap-3 md:max-w-[430px]">
            <Link href="/" className="inline-block w-fit">
              <Image src={logo} alt="Time Files" className="inline-block h-auto w-20 object-contain sm:w-auto" />
            </Link>
            <div className="hidden md:block md:w-full md:max-w-[235px]">
              <ul className="flex flex-col items-start md:max-w-[235px] md:flex-row md:items-center md:justify-between md:gap-3">
                {navigation.map((item, index) => (
                  <li key={index} className="w-full border-b border-[#E0E0E0] md:w-max md:border-none">
                    <Link href={item.url} className={cn("hover:text inline-block bg-transparent bg-clip-text py-2 text-lg font-semibold leading-normal text-dark-500 hover:bg-G1 hover:text-transparent md:py-0 relative z-0", { "active group": pathname === item.url })}>
                      {item.label}
                      <span className="h-0.5 object-contain w-full absolute -bottom-1 left-0 right-0 bg-active-nav bg-no-repeat opacity-0 invisible group-[&.active]:opacity-100 group-[&.active]:visible transition-all bg-center bg-cover rounded"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

           {/* Shows login and register if user is not logged in */} 
          {!isLoading && !user.isLoggedIn && (
            <div className="hidden w-full max-w-[270px] items-center justify-between gap-2 md:flex md:max-w-[230px] lg:max-w-[323px]">
              <Link
                href={{
                  pathname: "/sign-in",
                  query: { type: "login" },
                }}
                className="flex items-center justify-center rounded-full bg-white px-6 py-2 text-base font-medium leading-normal text-dark-500 hover:bg-G1 hover:text-white lg:min-w-[148px] lg:px-10 lg:py-3.5"
              >
                Login{" "}
              </Link>
              <Link
                href={{
                  pathname: "/sign-in",
                  query: { type: "register" },
                }}
                className="btn-grad px-6 py-2 lg:px-[45px] lg:py-3.5"
              >
                Register
              </Link>
            </div>
          )}

           {/* Shows User Avatar and Info if user is logged in */} 
          {user.isLoggedIn && (
            <div className="relative z-0 hidden md:flex gap-2 items-center">
              <div className="size-16 rounded-full overflow-hidden ">
                <img src={`http://127.0.0.1:5000/uploads/pfp/${user2.pfp}`} alt="Avatar Name" className="size-full object-cover" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-dark">{user2.fullname}</h4>
                <p className="text-base text-dark">{user2.email}</p>
              </div>
              <Link className="absolute inset-0 opacity-0 z-50" href={"/dashboard/settings"} />
            </div>
          )}

          {/* Mobile NavBar */}
          <button className="nav-toggler block md:hidden" onClick={setNavStatus}>
            <Hamburger size={28} rounded toggled={navOpen} />
          </button>
        </nav>
        <div className={cn("absolute md:hidden shadow-md h-0 overflow-auto transition-all duration-300 top-0 left-0 w-full -z-10 bg-white/20 backdrop-blur-xl", { "h-screen": navOpen })}>
          <div className="pt-28 px-10 flex h-full flex-col">
            <ul className="space-y-4 mb-6">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.url} onClick={setNavStatus} className="text-lg font-medium text-dark-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Shows login and register if user is not logged in */}
            {!user.isLoggedIn &&(
              <div className="space-y-4">
                <Link onClick={setNavStatus} href={{
                    pathname: "/sign-in",
                    query: { type: "login" },
                  }} 
                  className="flex w-full items-center justify-center rounded-full bg-slate-600 px-6 text-base font-medium leading-normal text-white hover:bg-G1 hover:text-white md:text-dark-500 lg:px-10 py-3.5">
                  Login{" "}
                </Link>
                <Link onClick={setNavStatus} href={{
                    pathname: "/sign-in",
                    query: { type: "register" },
                  }} 
                  className="btn-grad w-full px-6 lg:px-[45px] py-3.5">
                  Register
                </Link>
              </div>
            )}

            {/* Shows User Avatar and Info if user is logged in */} 
            {user.isLoggedIn && (
              <div className="nav-menu relative z-0 bg-white rounded-t-xl -mx-10 mt-auto px-10 py-6 flex gap-2 items-center">
                <div className="size-16 rounded-full overflow-hidden">
                  <Image src={avatar} alt="Avatar Name" className="size-full object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-dark">{user2.fullname}</h4>
                  <p className="text-base text-dark">{user2.email}</p>
                </div>
                <Link className="absolute inset-0 opacity-0 z-50" href={"/dashboard/settings"} />
              </div>
            )}
          </div>
          <div className="bg-G1 bg-no-repeat bg-cover bg-center backdrop-blur-xl absolute inset-0 -z-10 opacity-20 pointer-events-none" />
        </div>
      </Container>
    </header>
  );
}
